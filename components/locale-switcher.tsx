"use client";

import { useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { setLocale } from "@/app/actions";
import { isLocale, locales } from "@/i18n/config";

export function LocaleSwitcher() {
  const locale = useLocale();
  const t = useTranslations("LocaleSwitcher");
  const [isPending, startTransition] = useTransition();

  return (
    <div className="self-center">
      <select
        aria-label={t("label")}
        aria-busy={isPending}
        className="border p-1 px-2 rounded-md"
        value={locale}
        disabled={isPending}
        onChange={(event) => {
          const nextLocale = event.target.value;
          if (!isLocale(nextLocale)) return;

          startTransition(async () => {
            try {
              await setLocale(nextLocale);
            } catch {
            }
          });
        }}
      >
        {locales.map((value) => (
          <option key={value} value={value}>{value.toUpperCase()}</option>
        ))}
      </select>
    </div>
  );
}
