import type { Locale } from "./config";

const tr = {
  Navbar: {
    community: "Topluluk",
    events: "Etkinlikler",
    projects: "Projeler",
    blog: "Blog",
    contact: "İletişim",
  },
  LocaleSwitcher: {
    label: "Dil seçin",
    error: "Dil değiştirilemedi. Lütfen tekrar deneyin.",
  },
  Hero: {
    community: "ÜNOG Oyun Geliştirici Topluluğuna",
    welcome: "HOŞ GELDİNİZ!",
    description: "Sohbet et, ekip kur, etkinliklere katıl ve birlikte oyun geliştir. İster yeni başlıyor ol ister deneyimli ol, <strong>ÜNOG</strong>'da seni destekleyen bir topluluk bulacaksın.",
    joinDiscord: "Discord'a Katıl",
    mascotAlt: "ÜNOG penguen maskotu",
  },
  Stats: {
    active: "şu an aktif",
    online: "{count, number} geliştirici çevrimiçi",
  },
  About: {
    heading: "ÜNOG <accent>Kimdir?</accent>",
    identity: {
      title: "Biz Kimiz?",
      description: "2017 yılında kurulan ve Türkiye'nin dört bir yanından mühendisleri, tasarımcıları ve oyunseverleri bir araya getiren, bağımsız ve kâr amacı gütmeyen bir oyun geliştirici topluluğuyuz.",
    },
    mission: {
      title: "Misyon",
      description: "Game Jam'ler, atölyeler, buluşmalar ve yayınlarla yaratıcı iş birliklerini artırmak. Bilgiyi erişilebilir kılarak sektördeki dönüşüme katkıda bulunmak.",
    },
    vision: {
      title: "Vizyon",
      description: "Türkiye'de oyun geliştirme kültürünü güçlendirmek, bilgi paylaşımını yaygınlaştırmak ve bağımsız oyun geliştiriciler için sürdürülebilir bir ekosistem inşa etmek.",
    },
  },
} as const;

// Preserve the keys while allowing each language to provide its own text.
type TranslationShape<T> = {
  [Key in keyof T]: T[Key] extends string ? string : TranslationShape<T[Key]>;
};

const en = {
  Navbar: {
    community: "Community",
    events: "Events",
    projects: "Projects",
    blog: "Blog",
    contact: "Contact",
  },
  LocaleSwitcher: {
    label: "Select language",
    error: "Could not change the language. Please try again.",
  },
  Hero: {
    community: "WELCOME To the",
    welcome: "ÜNOG Game Developer Community!",
    description: "Chat, build a team, join events and develop games together. Whether you're just starting out or already experienced, you'll find a supportive community at <strong>ÜNOG</strong>.",
    joinDiscord: "Join Discord",
    mascotAlt: "ÜNOG penguin mascot",
  },
  Stats: {
    active: "active now",
    online: "{count, number} developers online",
  },
  About: {
    heading: "<accent>Who is</accent> ÜNOG?",
    identity: {
      title: "Who Are We?",
      description: "Founded in 2017, we are an independent, nonprofit game developer community bringing together engineers, designers and gamers from across Türkiye.",
    },
    mission: {
      title: "Mission",
      description: "Encourage creative collaboration through game jams, workshops, meetups and broadcasts. Contribute to the industry's transformation by making knowledge accessible.",
    },
    vision: {
      title: "Vision",
      description: "Strengthen game development culture in Türkiye, expand knowledge sharing and build a sustainable ecosystem for independent game developers.",
    },
  },
} as const satisfies TranslationShape<typeof tr>;

export const messages = { tr, en } satisfies Record<Locale, TranslationShape<typeof tr>>;
export type Messages = TranslationShape<typeof tr>;
