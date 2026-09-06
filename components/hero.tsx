import { useTranslations } from "next-intl";
import Image from "next/image";
import { StyledButton } from "./styled-button";
import { StatsTerminal } from "./stats-terminal";

const SOCIAL_LINKS = [
    {
        href: "#",
        icon: "/assets/instagram.svg",
        colors: {
            background: "#F258CB",
            foreground: "#fff",
            shadow: "#CC3BA5",
            insetShadow: "#CC3BA5",
        }
    },
    {
        href: "#",
        icon: "/assets/iks.svg",
        colors: {
            background: "#282828",
            foreground: "#fff",
            shadow: "#000000",
            insetShadow: "#000000",
        }
    },
    {
        href: "#",
        icon: "/assets/linkedin.svg",
        colors: {
            background: "#5893F2",
            foreground: "#fff",
            shadow: "#3B6ECC",
            insetShadow: "#3B6ECC",
        }
    },
    {
        href: "#",
        icon: "/assets/youtube.svg",
        colors: {
            background: "#F2585B",
            foreground: "#fff",
            shadow: "#CC3B3D",
            insetShadow: "#CC3B3D",
        }
    }
]

export function HeroSection() {
    const t = useTranslations("Hero");
    
    return (
        <div className="mx-auto max-w-480 px-4 pt-16 pb-16 sm:px-8 lg:min-h-244.25">
            <div className="flex flex-col gap-8 sm:gap-12">
                <p className="text-center font-caveat text-title font-bold text-[clamp(2.5rem,6.67vw,8rem)] leading-tight">
                    {t("community")}
                </p>
                <p className="text-center text-title font-extrabold text-[clamp(2.5rem,6.67vw,8rem)] leading-tight">
                    {t("welcome")}
                </p>

                <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,3fr)_minmax(0,1fr)] lg:gap-6">
                    <div className="h-auto w-full max-w-60 justify-self-center sm:max-w-72 lg:col-start-1 lg:-translate-y-1 lg:max-w-106 lg:justify-self-end">
                        <StatsTerminal />
                    </div>
                    <div className="flex min-w-0 flex-col items-center gap-8 lg:col-start-2 lg:gap-12 lg:pt-8">
                        <p className="max-w-219 text-center text-text-secondary font-medium text-lg sm:text-2xl">
                            {t.rich("description", {
                                strong: (chunks) => <span className="font-bold">{chunks}</span>,
                            })}
                        </p>
                        <div className="flex flex-col gap-8 items-center justify-center">
                            <StyledButton className="h-18 w-full" icon={<Image src="/assets/discord.svg" width={24} height={24} alt="discordlogo" />}>
                                {t("joinDiscord")}
                            </StyledButton>

                            <div className="grid grid-cols-4 gap-4">
                                {SOCIAL_LINKS.map((link, index) => (
                                    <StyledButton key={index} colors={link.colors} className="size-16" icon={<Image src={link.icon} width={39} height={39} alt="sociallogo" />} />
                                ))}
                            </div>
                        </div>
                    </div>
                    <Image
                        priority
                        src="/assets/penguen.svg"
                        width={423}
                        height={514}
                        alt={t("mascotAlt")}
                        className="h-auto w-full max-w-60 justify-self-center sm:max-w-72 lg:col-start-3 lg:-translate-y-35 lg:max-w-106 lg:justify-self-end"
                    />
                </div>
            </div>
        </div>
    )
}
