import type { Metadata } from "next";
import { Inter, Caveat, Dosis } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/navbar";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", caveat.variable, dosis.variable, "font-dosis", inter.variable)}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
