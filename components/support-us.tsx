import Image from "next/image";
import { StyledButton } from "./styled-button";
import { PatreonBlob } from "./ui/patreon-blob";

export function SupportUs() {
  return (
    <div className="mx-17 max-w-480 flex items-center justify-between">
      <div className="flex flex-col gap-4">
        <span className="font-caveat font-bold text-5xl">Topluluğumuzu Destekleyenler!</span>
        <p className="font-extrabold text-6xl max-w-160 leading-20">
          Sizler Sayesinde Büyüyor ve Gelişiyoruz.
        </p>
        <p className="text-2xl max-w-200">
          Etkinliklerimize sponsor olan kurumlardan Patreon'daki bireysel destekçilerimize kadar her
          bir iş birliği, bu topluluğun ücretsiz ve canlı kalmasını sağlıyor.
        </p>
        <StyledButton
          colors={{
            background: "#F69A31",
            foreground: "#F69A31",
            insetShadow: "#F69A31",
            shadow: "#F69A31",
          }}
          className="text-3xl font-extrabold w-fit text-white rounded-2xl p-8"
        >
          <PatreonBlob className="size-8 self-center" />
          Destekçimiz Olun
        </StyledButton>
      </div>

      <Image src="/assets/hornet.png" width={512} height={512} alt="hornet" />
    </div>
  );
}
