import { X } from "lucide-react";

export function StatsTerminal() {
    return (
        <div className="bg-terminal-black rounded-xl text-white border-terminal-black border-2 h-52 p-1">
            <div className="flex items-end justify-end w-full rounded-t-lg bg-white h-8">
                <X className="text-terminal-black size-8 font-bold self-center" />
            </div>

            <div className="flex flex-col font-dosis text-2xl mx-8 mt-4">
                <p className="text-[#6B6A7A]">
                    // şu an aktif
                </p>
                <p className="text-[#28CE91]">
                    {"> 6.000 geliştirici çevrimiçi"}
                </p>
                <p className="text-[#F97316]">
                    |
                </p>
            </div>
        </div>
    )
}