import { useTranslations } from "next-intl";
import { LocaleSwitcher } from "./locale-switcher";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

const LINKS = [
    { label: "community", href: "#" },
    { label: "events", href: "#" },
    { label: "projects", href: "#" },
    { label: "blog", href: "#" },
    { label: "contact", href: "#" },
] as const;

export function Navbar() {
    const t = useTranslations("Navbar");
    return (
        <nav className="border-b border-border bg-white shadow">
            <div className="mx-auto flex min-h-[66px] w-full max-w-[1280px] flex-wrap items-center gap-y-3 px-6 py-2 min-[1200px]:flex-nowrap min-[1200px]:px-12 min-[1200px]:py-0">
                <Image
                    src="/assets/logo.svg"
                    width={75}
                    height={50}
                    alt="unoglogo"
                    className="shrink-0 select-none"
                />
                <div className="order-3 flex w-full items-center justify-center gap-6 overflow-x-auto min-[1200px]:order-none min-[1200px]:ml-auto min-[1200px]:w-auto min-[1200px]:gap-8">
                    <div className="flex items-center gap-5 min-[1200px]:gap-10">
                        {LINKS.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                className={`relative flex h-16.5 items-center whitespace-nowrap text-lg font-medium text-text hover:underline ${link.label === "events" ? "after:absolute after:inset-x-0 after:bottom-0 after:h-1.5 after:bg-[#0090C6]" : ""}`}
                            >
                                {t(link.label)}
                            </Link>
                        ))}
                    </div>

                    <Button className="h-[30px] min-w-[106px] cursor-pointer rounded-xl bg-[#0090C6] px-3 text-base font-semibold hover:bg-[#0090C6]/80">
                        GÖNÜLLÜ OL
                    </Button>
                </div>

                <div className="ml-auto flex flex-wrap items-center justify-end gap-4 border-l border-gray-900 pl-4 min-[1200px]:ml-6 min-[1200px]:flex-nowrap min-[1200px]:gap-5">
                    <Link
                        href="#"
                        className="whitespace-nowrap text-base font-medium text-text decoration-border hover:underline"
                    >
                        Hakkımızda
                    </Link>
                    <Link
                        href="#"
                        className="whitespace-nowrap text-base font-medium text-text decoration-border hover:underline"
                    >
                        Press Kit
                    </Link>
                    <LocaleSwitcher />
                    {/* <Button render={<Link href="/login" />} className="h-[30px] min-w-[106px] cursor-pointer rounded-full bg-[#74C74E] px-3 text-base hover:bg-[#74C74E]/80">
                        Giriş Yap
                    </Button> */}
                </div>
            </div>
        </nav>
    )
}
