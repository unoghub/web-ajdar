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
    },
  },
  {
    href: "#",
    icon: "/assets/iks.svg",
    colors: {
      background: "#282828",
      foreground: "#fff",
      shadow: "#000000",
      insetShadow: "#000000",
    },
  },
  {
    href: "#",
    icon: "/assets/linkedin.svg",
    colors: {
      background: "#5893F2",
      foreground: "#fff",
      shadow: "#3B6ECC",
      insetShadow: "#3B6ECC",
    },
  },
  {
    href: "#",
    icon: "/assets/youtube.svg",
    colors: {
      background: "#F2585B",
      foreground: "#fff",
      shadow: "#CC3B3D",
      insetShadow: "#CC3B3D",
    },
  },
];

export function HeroSection() {
  const t = useTranslations("Hero");

  return (
    <section className="relative isolate min-h-[calc(100svh-5rem)] overflow-hidden">
      <Image
        priority
        src="/assets/bigfart.png"
        width={3508}
        height={3508}
        alt=""
        sizes="(min-width: 1024px) max(25rem, 48vw), 0px"
        className="pointer-events-none absolute right-[-8vw] bottom-[-14vw] z-0 hidden w-[clamp(38rem,54vw,68rem)] select-none lg:block"
      />

      <div className="relative z-10 mx-auto max-w-480 px-4 pt-16 pb-16 sm:px-8 lg:px-16">
        <div className="flex flex-col items-center gap-8 sm:gap-12 lg:max-w-460 lg:items-start">
          <p className="text-center font-caveat text-title font-bold text-[clamp(2.5rem,6.67vw,8rem)] leading-tight lg:text-left">
            {t("community")}
          </p>
          <p className="text-center text-title font-extrabold text-[clamp(2.5rem,6.67vw,8rem)] leading-tight lg:text-left">
            {t("welcome")}
          </p>

          <div className="flex w-full flex-col items-center gap-8 lg:items-start">
            <p className="max-w-219 text-center text-text-secondary font-medium text-lg sm:text-2xl lg:max-w-xl lg:text-left">
              {t.rich("description", {
                strong: (chunks) => <span className="font-bold">{chunks}</span>,
              })}
            </p>
            <div className="flex flex-col items-center justify-center gap-8 lg:items-start">
              <StyledButton
                className="h-18 w-full lg:w-60"
                icon={<Image src="/assets/discord.svg" width={24} height={24} alt="discordlogo" />}
              >
                {t("joinDiscord")}
              </StyledButton>

              <div className="grid grid-cols-4 gap-4">
                {SOCIAL_LINKS.map((link, index) => (
                  <StyledButton
                    key={index}
                    colors={link.colors}
                    className="size-16"
                    icon={<Image src={link.icon} width={39} height={39} alt="sociallogo" />}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
