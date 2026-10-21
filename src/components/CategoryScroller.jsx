
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const categories = [

    {
        name: "Women",
        image:
            "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=350&q=85",
        color: "#8ce8c6",
    },
    {
        name: "Men",
        image:
            "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=350&q=85",
        color: "#9bcaff",
    },
    {
        name: "Kids",
        image:
            "https://images.unsplash.com/photo-1503919005314-30d93d07d823?auto=format&fit=crop&w=350&q=85",
        color: "#ffc58b",
    },
    {
        name: "Footwear",
        image:
            "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=350&q=85",
        color: "#9bcaff",
    },
    {
        name: "Jewellery",
        image:
            "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=350&q=85",
        color: "#8ce8c6",
    },
    {
        name: "Sneakers",
        image:
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=350&q=85",
        color: "#9bcaff",
    },
    {
        name: "Watches",
        image:
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&h=700&q=85",
        color: "#9bcaff",
    },
];

export default function CategoryScroller() {
    const sliderRef = useRef(null);
    const dragRef = useRef({
        active: false,
        startX: 0,
        scrollLeft: 0,
        moved: false,
    });

    // Scroll left or right by most of the visible carousel width.
    const scroll = (direction) => {
        const slider = sliderRef.current;
        if (!slider) return;

        slider.scrollBy({
            left: direction * slider.clientWidth * 0.8,
            behavior: "smooth",
        });
    };

    const startDrag = (event) => {
        if (event.button !== 0) return;

        dragRef.current = {
            active: true,
            startX: event.clientX,
            scrollLeft: sliderRef.current.scrollLeft,
            moved: false,
        };
    };

    const moveDrag = (event) => {
        const slider = sliderRef.current;
        const drag = dragRef.current;

        if (!slider || !drag.active) return;

        const distance = event.clientX - drag.startX;

        if (Math.abs(distance) > 5) {
            drag.moved = true;
        }

        if (drag.moved) {
            slider.scrollLeft = drag.scrollLeft - distance;
        }
    };

    const stopDrag = () => {
        dragRef.current.active = false;
    };

    const preventClickAfterDrag = (event) => {
        if (dragRef.current.moved) {
            event.preventDefault();
            event.stopPropagation();
        }

        dragRef.current.moved = false;
    };

    const getCategoryPath = (name) => {
        if (name === "Men" || name === "Sneakers") return "/shoes/men";
        if (name === "Women" || name === "Footwear") return "/shoes/women";
        if (name === "Watches") return "/watches/women";
        return `/shop?category=${encodeURIComponent(name)}`;
    };

    return (
        <section className="w-full border-b border-gray-100 bg-white py-5 sm:py-6">
            <div className="relative mx-auto w-full max-w-[1800px] px-10 sm:px-14">
                {/* Left arrow */}
                <button
                    type="button"
                    onClick={() => scroll(-1)}
                    aria-label="Scroll categories left"
                    className="absolute left-1 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-slate-800 shadow-md transition hover:border-pink-500 hover:text-pink-600"
                >
                    <ChevronLeft size={22} />
                </button>

                {/* Horizontal carousel */}
                <div
                    ref={sliderRef}
                    onMouseDown={startDrag}
                    onMouseMove={moveDrag}
                    onMouseUp={stopDrag}
                    onMouseLeave={stopDrag}
                    onClickCapture={preventClickAfterDrag}
                    onWheel={(event) => {
                        const slider = sliderRef.current;

                        if (
                            slider &&
                            Math.abs(event.deltaY) > Math.abs(event.deltaX)
                        ) {
                            slider.scrollLeft += event.deltaY;
                        }
                    }}
                    className="flex w-full gap-3 overflow-x-auto overscroll-x-contain pb-2 sm:gap-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                    style={{
                        cursor: dragRef.current.active ? "grabbing" : "grab",
                        touchAction: "pan-x pan-y",
                    }}
                >
                    {categories.map((category) => (
                        <Link
                            key={category.name}
                            to={getCategoryPath(category.name)}
                            draggable={false}
                            onDragStart={(event) => event.preventDefault()}
                            className="group w-[150px] shrink-0 select-none sm:w-[175px] lg:w-[185px]"
                        >
                            <div className="relative h-[155px] overflow-hidden rounded-xl bg-gray-100 sm:h-[175px]">
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    draggable={false}
                                    loading="lazy"
                                    className="pointer-events-none h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                                />
                                <div
                                    className="absolute inset-x-1 bottom-0 flex h-[46px] items-center justify-center rounded-xl px-1 text-base font-semibold text-slate-900 sm:text-lg"
                                    style={{ backgroundColor: category.color }}
                                >
                                    {category.name}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Right arrow */}
                <button
                    type="button"
                    onClick={() => scroll(1)}
                    aria-label="Scroll categories right"
                    className="absolute right-1 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-slate-800 shadow-md transition hover:border-pink-500 hover:text-pink-600"
                >
                    <ChevronRight size={22} />
                </button>
            </div>
        </section>
    );
}
