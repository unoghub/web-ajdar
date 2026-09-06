import type { Metadata } from "next";
import { Inter, Caveat, Dosis } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/navbar";
import { NextIntlClientProvider } from 'next-intl';
import { getLocale } from "next-intl/server";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

const dosis = Dosis({
  variable: "--font-dosis",
  subsets: ["latin"],
  weight: "variable",
});

export const metadata: Metadata = {
  title: "ÜNOG",
  description: "",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const locale = await getLocale();
  return (
    <html
      lang={locale}
      className={cn("h-full", "antialiased", caveat.variable, dosis.variable, "font-dosis", inter.variable)}
    >
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider>
          <Navbar />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
