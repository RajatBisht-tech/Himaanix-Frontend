
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const banners = [
    {
        src: "/banner1.png",
        alt: "Himaanix women's fashion collection",
    },
    {
        src: "/banner2.png",
        alt: "Himaanix men's fashion collection",
    },
    {
        src: "/banner3.png",
        alt: "Himaanix kids fashion collection",
    },
    {
        src: "/LuxeEdit.png",
        alt: "Himaanix kids fashion collection",
    },
];

export default function BannerSlider() {
    const [active, setActive] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setActive((current) => (current + 1) % banners.length);
        }, 4000);

        return () => clearInterval(timer);
    }, []);

    const previous = () => {
        setActive((current) => (current - 1 + banners.length) % banners.length);
    };

    const next = () => {
        setActive((current) => (current + 1) % banners.length);
    };

    return (
        <section
            className="relative w-full overflow-hidden bg-white"
            aria-label="Himaanix fashion banner carousel"
        >
            {/* Full image without cropping */}
            <div className="relative w-full">
                {banners.map((banner, index) => (
                    <img
                        key={banner.src}
                        src={banner.src}
                        alt={banner.alt}
                        loading={index === 0 ? "eager" : "lazy"}
                        draggable="false"
                        onError={(event) => {
                            event.currentTarget.style.visibility = "hidden";
                        }}
                        className={`block h-auto w-full object-contain transition-opacity duration-500 ${active === index
                                ? "relative z-10 opacity-100"
                                : "pointer-events-none absolute inset-0 z-0 opacity-0"
                            }`}
                    />
                ))}
            </div>

            {/* Previous */}
            <button
                type="button"
                onClick={previous}
                aria-label="Previous banner"
                className="absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-md transition hover:bg-pink-600 hover:text-white sm:left-5"
            >
                <ChevronLeft size={23} />
            </button>

            {/* Next */}
            <button
                type="button"
                onClick={next}
                aria-label="Next banner"
                className="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-md transition hover:bg-pink-600 hover:text-white sm:right-5"
            >
                <ChevronRight size={23} />
            </button>

            {/* Slide indicators */}
            <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 sm:bottom-4">
                {banners.map((banner, index) => (
                    <button
                        key={banner.src}
                        type="button"
                        onClick={() => setActive(index)}
                        aria-label={`Go to banner ${index + 1}`}
                        aria-pressed={active === index}
                        className={`h-2.5 rounded-full transition-all duration-300 ${active === index
                                ? "w-7 bg-pink-600"
                                : "w-2.5 bg-white shadow-sm"
                            }`}
                    />
                ))}
            </div>
        </section>
    );
}
