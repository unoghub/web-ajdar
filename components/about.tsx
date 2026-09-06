const GRID_ITEMS = [
    {
        type: "text",
        number: "01",
        title: "Biz Kimiz?",
        description:
            "2017 yılında kurulan ve Türkiye'nin dört bir yanından mühendisleri, tasarımcıları ve oyunseverleri bir araya getiren, bağımsız ve kâr amacı gütmeyen bir oyun geliştirici topluluğuyuz.",
    },
    {
        type: "image",
        src: "/images/second.png",
    },
    {
        type: "text",
        number: "03",
        title: "Misyon",
        description:
            "Game Jam'ler, atölyeler, buluşmalar ve yayınlarla yaratıcı iş birliklerini artırmak. Bilgiyi erişilebilir kılarak sektördeki dönüşüme katkıda bulunmak.",
    },
    {
        type: "image",
        src: "/images/first.png",
    },
    {
        type: "text",
        number: "02",
        title: "Vizyon",
        description:
            "Türkiye'de oyun geliştirme kültürünü güçlendirmek, bilgi paylaşımını yaygınlaştırmak ve bağımsız oyun geliştiriciler için sürdürülebilir bir ekosistem inşa etmek.",
    },
    {
        type: "image",
        src: "/images/third.png",
    },
];

export function AboutSection() {
    return (
        <div className="mx-auto max-w-430 px-4 pt-16 pb-16 sm:px-8 lg:min-h-244.25">
            <div className="text-9xl font-bold flex items-center justify-center mt-8">
                <p>ÜNOG <span className="font-caveat">Kimdir?</span></p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3 mt-20">
                {GRID_ITEMS.map((item, index) => {
                    if (item.type === "image") {
                        return (
                            <div
                                key={index}
                                className="h-56 w-126.5 overflow-hidden rounded-2xl shadow-md"
                            >
                                <img
                                    src={item.src}
                                    alt=""
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        );
                    }

                    return (
                        <div
                            key={index}
                            className="h-56 w-126.5 rounded-2xl bg-white px-7 py-4 shadow-md"
                        >
                            <span className="italic text-gray-500">
                                {item.number}
                            </span>

                            <h3 className="mt-1 font-caveat font-bold text-3xl">
                                {item.title}
                            </h3>

                            <p className="mt-3 leading-6 text-xl">
                                {item.description}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}