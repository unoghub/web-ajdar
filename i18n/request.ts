import { cookies } from "next/headers";
import { getRequestConfig } from "next-intl/server";
import { defaultLocale, isLocale, localeCookie } from "./config";
import { messages } from "./messages";

export default getRequestConfig(async ({ locale: requestedLocale }) => {
  const value = requestedLocale ?? (await cookies()).get(localeCookie)?.value;
  const locale = isLocale(value) ? value : defaultLocale;

  return { locale, messages: messages[locale] };
});
