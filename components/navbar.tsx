import Image from "next/image";
import Link from "next/link";

const LINKS = [
    {
        label: "Topluluk",
        href: "#"
    },
    {
        label: "Etkinlikler",
        href: "#",
    },
    {
        label: "Projeler",
        href: "#",
    },
    {
        label: "Blog",
        href: "#",
    },
    {
        label: "İletişim",
        href: "#",
    },
]

export function Navbar() {
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
                        {link.label}
                    </Link>
                ))}

                <select className="border p-1 px-2 rounded-md">
                    <option>TR</option>
                </select>
            </div>
        </nav>
    )
}