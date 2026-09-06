import { useTranslations } from "next-intl";
import { LocaleSwitcher } from "./locale-switcher";
import Image from "next/image";
import Link from "next/link";

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
        <nav className="border-b border-border shadow">
            <div className="grid grid-cols-7 gap-20 p-5 mx-72">
                <Image
                    src="/assets/logo.svg"
                    width={75}
                    height={50}
                    alt="unoglogo"
                    className="select-none"
                />
                {LINKS.map((link) => (
                    <Link
                        key={link.label}
                        href={link.href}
                        className="font-medium text-xl text-text hover:underline decoration-border self-center"
                    >
                        {t(link.label)}
                    </Link>
                ))}

                <LocaleSwitcher />
            </div>
        </nav>
    )
}
