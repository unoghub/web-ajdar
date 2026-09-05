import Image from "next/image";

export function Navbar() {
    return (
        <nav>
            <Image
                src="/assets/logo.svg" 
                width={100} 
                height={50} 
                alt="unoglogo" 
            />
            <p className="font-semibold">testing</p>
        </nav>
    )
}