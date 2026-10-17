# Authentik OIDC setup

This app uses Better Auth 1.7.7 with `@better-auth/sso` 1.7.7, the Better Auth Drizzle adapter, Drizzle ORM, and PostgreSQL through postgres.js. Authentik handles OIDC authorization code sign-in; Better Auth owns the application session in PostgreSQL. The public site remains accessible without a session. `/dashboard` checks the session on the server for every request. No other private server action or application API route currently exists.

## Configuration

Copy `.env.example` to `.env.local` for development. Fill in real values locally or through a runtime secret manager. Do not commit them. Generate `BETTER_AUTH_SECRET` with `openssl rand -base64 32` (or another cryptographically secure generator). It must be at least 32 characters.

| Variable | Purpose |
| --- | --- |
| `BETTER_AUTH_URL` | Public application origin, for example `https://app.example.com`, without a path. Never use an internal Docker hostname. |
| `BETTER_AUTH_SECRET` | Session signing secret. Keep server only. |
| `DATABASE_URL` | PostgreSQL connection string reachable from the application container. Keep server only. |
| `AUTHENTIK_ISSUER` | Exact `issuer` reported by Authentik discovery, including trailing slash when present. |
| `AUTHENTIK_CLIENT_ID`, `AUTHENTIK_CLIENT_SECRET` | Authentik confidential client credentials. Keep the secret server only. |
| `AUTHENTIK_EMAIL_DOMAIN` | Bare domain used for provider lookup. Set it to the permitted users' email domain. Authentik policy must enforce who may sign in. |
| `AUTHENTIK_PROVIDER_ID`, `NEXT_PUBLIC_AUTHENTIK_PROVIDER_ID` | Matching provider ID; both default to `authentik`. The public ID is not a credential. |

The Docker build needs `AUTHENTIK_ISSUER` while Next.js collects route configuration. For a Dokploy Dockerfile build, set it under Build-time Secrets with the exact key `AUTHENTIK_ISSUER`; the Dockerfile mounts it as an environment variable for the build command. Set the same value in the application's runtime environment. The auth route accepts only the configured public origin and Authentik origin as trusted origins. If Authentik discovery advertises endpoints on another origin, review and explicitly add that origin in `lib/auth.ts`. Do not trust arbitrary origins.

## Authentik application

Create an OAuth2/OpenID Connect provider and application in Authentik. Use a confidential client with authorization code flow and `openid`, `profile`, and `email` scopes. Use Authentik access policies to restrict users. Prefer exact redirect URI matching. With the default provider ID and example origin, the redirect URI is:

`https://app.example.com/api/auth/sso/callback/authentik`

Set `AUTHENTIK_ISSUER` to the exact `issuer` value from the application's discovery document. For the example slug, inspect `https://sso.example.com/application/o/my-app/.well-known/openid-configuration`. Authentik can also use a global issuer mode, so never assume the example issuer. Better Auth resolves the configured provider through discovery during sign-in. The server must reach discovery, token, userinfo, and JWKS endpoints directly without proxy challenges or redirects. The browser must reach Authentik's authorization endpoint.

## Database and provider configuration

The repository previously had no database or ORM. `db/schema.ts` defines the Better Auth and SSO tables. `drizzle/0000_authentik_sso.sql` creates `user`, `session`, `account`, `verification`, and `ssoProvider`; `drizzle/0001_web_admin_groups.sql` adds the optional Authentik group claim to existing users with an empty-array default. Review table names and permissions against any existing database before applying. Neither migration drops or recreates unrelated data.

Generate and check migrations locally:

```bash
pnpm db:generate
pnpm db:check
```

Apply the reviewed migration manually in development and production using the appropriate `DATABASE_URL`:

```bash
pnpm db:migrate
```

Do not run migrations automatically during image build or application startup. For future Better Auth upgrades, update `db/schema.ts`, generate a new Drizzle migration, and review it before deployment.

The single Authentik provider is configured with Better Auth's `defaultSSO` option in `lib/auth.ts`, using server-only environment values. No bootstrap account, registration script, or row in `ssoProvider` is needed. The App Router handler blocks provider mutation and email/password endpoints. Update the environment values and restart the app to rotate OIDC credentials. If a provider row with the same ID was previously registered, the configured `defaultSSO` provider takes precedence; review and remove obsolete rows through a controlled database maintenance process.

## Local and Docker operation

Run `pnpm install`, apply the migration, configure the environment, and start `pnpm dev`. The Authentik application needs a local redirect URI such as `http://localhost:3000/api/auth/sso/callback/authentik` for development. If Authentik does not permit plain HTTP redirect URIs, use a local HTTPS origin and set `BETTER_AUTH_URL` accordingly.

Build the standalone Docker image with `docker build --secret id=AUTHENTIK_ISSUER,env=AUTHENTIK_ISSUER -t unog-web .`, with `AUTHENTIK_ISSUER` set in the build shell. Supply secrets at **runtime**, for example `docker run --env-file ./production.env -p 4001:4001 unog-web`; never copy a production env file into the image. The container listens on port 4001. Terminate HTTPS at the reverse proxy and forward the original Host and protocol headers. Route the public `BETTER_AUTH_URL` to this container, including `/api/auth/*`. Authentik and the app must both be publicly reachable over HTTPS. Keep PostgreSQL private; a private hostname works only if the app container's DNS and routing can reach it. Allow the app server outbound access to Authentik's OIDC endpoints.

## Verification and troubleshooting

Open `/login`, start Authentik sign-in, authenticate a permitted test user, and confirm the callback returns to `/dashboard`. Open `/dashboard` in a fresh private browser session to verify the login redirect. Sign out and verify `/dashboard` is inaccessible. Better Auth sign-out ends the **local application session**; it does not necessarily end the Authentik SSO browser session.

For an issuer mismatch, compare `AUTHENTIK_ISSUER` byte-for-byte with discovery `issuer`, including the trailing slash. For an untrusted origin, check every discovery endpoint origin and the server's trusted origins. For a redirect URI mismatch, compare the Authentik provider's exact allowed URI with `${BETTER_AUTH_URL}/api/auth/sso/callback/${AUTHENTIK_PROVIDER_ID}`. For discovery failures, check DNS, TLS, firewall, and reverse-proxy challenges from the **application server**. If sessions fail after callback, verify the public URL, HTTPS proxy headers, cookie domain, `BETTER_AUTH_SECRET`, and database connectivity. If tables are missing, apply the migration against the database in `DATABASE_URL` and check PostgreSQL schema/search path and privileges.

The Authentik credentials and a reachable Authentik installation are required for a live end-to-end test; the repository's automated tests cannot complete a real OIDC login without them. Better Auth links accounts by provider ID and verified OIDC subject. Do not enable email-based trusted-provider account linking unless you have reviewed its verification rules and intend that behavior.

## `web-admin` group claim

Create an Authentik OAuth2/OIDC scope mapping with scope name `web-admin`, attach it to this application's provider, and return a dictionary containing the `web_admin_groups` claim:

```python
return {
    "web_admin_groups": [
        {"name": group.name, "oidcID": group.num_pk}
        for group in request.user.ak_groups.all()
    ]
}
```

The login request asks for `web-admin` alongside `openid`, `profile`, and `email`. Authentik exposes scope-mapping claims through UserInfo; it includes them in the ID token only if the provider's **Include claims in id_token** setting is enabled. Better Auth maps `web_admin_groups` to `webAdminGroups`, validates the array shape, and saves it on every sign-in. After applying `drizzle/0001_web_admin_groups.sql` with `pnpm db:migrate`, the next successful login exposes the value as `session.user.webAdminGroups`. Sign out and sign in again after changing scopes or mappings. The stored list is a sign-in snapshot; refresh it before using group membership for sensitive authorization decisions.
