import Image from "next/image";
import { StyledButton } from "./styled-button";

export function HeroSection() {
    return (
        <div className="min-h-244.25 relative">
            <div className="flex items-center h-full justify-center mt-32">
                <div className="flex flex-col gap-12">
                    <p className="font-caveat text-title font-bold text-9xl">
                        ÜNOG Oyun Geliştirici Topluluğuna
                    </p>
                    <p className="text-center text-title font-extrabold text-9xl">
                        HOŞ GELDİNİZ!
                    </p>

                    <div className="flex items-center justify-center mt-8">
                        <p className="text-center text-text-secondary font-medium text-2xl max-w-219">
                            Sohbet et, ekip kur, etkinliklere katıl ve birlikte oyun geliştir.
                            İster yeni başlıyor ol ister deneyimli ol, ÜNOG'da seni destekleyen bir topluluk bulacaksın.
                        </p>
                    </div>

                    <div className="flex items-center justify-center">
                        <StyledButton icon={<Image src="/assets/discord.svg" width={24} height={24} alt="discordlogo" />}>
                            Discord'a Katıl
                        </StyledButton>
                    </div>
                </div>
            </div>

            <div className="absolute top-56 left-[1421.06px] w-[422.94px] h-[513.59px] rotate-0 opacity-100">
                <Image
                    src="/assets/penguen.svg"
                    fill
                    alt="pengu"
                />
            </div>
        </div>
    )
}
