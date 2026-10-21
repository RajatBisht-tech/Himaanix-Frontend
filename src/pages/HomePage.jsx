import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    ArrowRight,
    Truck,
    RefreshCw,
    ShieldCheck,
    Headphones,
} from "lucide-react";

import BannerSlider from "../components/BannerSlider.jsx";
import CategoryScroller from "../components/CategoryScroller.jsx";
import ProductGrid from "../components/ProductGrid.jsx";
import { getProducts } from "../api/productApi.js";

const benefits = [
    {
        title: "Free shipping",
        description: "On orders above ₹1,999",
        Icon: Truck,
    },
    {
        title: "Easy returns",
        description: "Hassle-free eligible returns",
        Icon: RefreshCw,
    },
    {
        title: "Secure payments",
        description: "Safe & protected checkout",
        Icon: ShieldCheck,
    },
    {
        title: "We're here to help",
        description: "Support when you need it",
        Icon: Headphones,
    },
];

function SectionHeading({
    eyebrow,
    title,
    emphasis,
    description,
    link,
    linkText,
}) {
    return (
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
                <span className="mb-3 block text-xs font-bold uppercase tracking-[0.22em] text-pink-600">
                    {eyebrow}
                </span>

                <h2 className="font-serif text-3xl leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
                    {title} <em className="font-normal">{emphasis}</em>
                </h2>

                {description && (
                    <p className="mt-3 text-sm leading-6 text-gray-500 sm:text-base">
                        {description}
                    </p>
                )}
            </div>

            {/* Fix #1 Merge B: unified with blog "Read more" underline style */}
            <Link
                to={link}
                className="inline-block border-b border-slate-900 pb-1 text-sm text-slate-900 transition-opacity hover:opacity-60"
            >
                {linkText}
            </Link>
        </div>
    );
}

export default function HomePage() {
    const [bestDeals, setBestDeals] = useState([]);
    const [newArrivals, setNewArrivals] = useState([]);
    const [bestDealsLoading, setBestDealsLoading] = useState(true);
    const [newArrivalsLoading, setNewArrivalsLoading] = useState(true);
    const [bestDealsError, setBestDealsError] = useState("");
    const [newArrivalsError, setNewArrivalsError] = useState("");

    useEffect(() => {
        let active = true;

        const loadSection = async (
            params,
            setProducts,
            setLoading,
            setError
        ) => {
            setLoading(true);
            setError("");

            try {
                const { data } = await getProducts({ limit: 4, ...params });
                if (!data?.success || !Array.isArray(data.products)) {
                    throw new Error("Invalid products response");
                }
                if (active) setProducts(data.products);
            } catch (error) {
                if (active) {
                    setProducts([]);
                    setError(
                        error.response?.data?.message ||
                            error.message ||
                            "Unable to load products."
                    );
                }
            } finally {
                if (active) setLoading(false);
            }
        };

        void loadSection(
            { sort: "featured" },
            setBestDeals,
            setBestDealsLoading,
            setBestDealsError
        );
        void loadSection(
            { sort: "newest", category: "Women" },
            setNewArrivals,
            setNewArrivalsLoading,
            setNewArrivalsError
        );

        return () => {
            active = false;
        };
    }, []);

    return (
        <main className="w-full overflow-hidden bg-white">
            {/* Main Fashion Banner */}
            <BannerSlider />

            {/* Shopping Benefits */}
            <section className="border-y border-gray-100 bg-white px-5 py-5 sm:px-8 lg:py-6">
                <div className="mx-auto grid max-w-[1400px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                    {benefits.map(({ title, description, Icon }, index) => (
                        <div
                            key={title}
                            className={`flex items-center gap-4 px-4 py-4 sm:px-6 lg:justify-center ${index !== 0
                                    ? "border-t border-gray-100 sm:border-t-0"
                                    : ""
                                } ${index % 2 !== 0
                                    ? "sm:border-l sm:border-gray-100"
                                    : ""
                                } ${index !== 0
                                    ? "lg:border-l lg:border-gray-100"
                                    : ""
                                }`}
                        >
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gray-50">
                                <Icon
                                    size={21}
                                    strokeWidth={1.5}
                                    className="text-slate-800"
                                />
                            </div>

                            <div>
                                <h3 className="text-sm font-semibold text-slate-900">
                                    {title}
                                </h3>

                                <p className="mt-1 text-xs leading-5 text-gray-500">
                                    {description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Himaanix Family Fashion Hero */}
            <section className="mx-2 overflow-hidden bg-[#f2eee8] sm:mx-5 lg:mx-8">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    {/* Left: Family Image */}
                    <div className="relative min-h-[300px] overflow-hidden sm:min-h-[420px] lg:min-h-[540px]">
                        <img
                            src="/Family.png"
                            alt="Himaanix fashion collection for women, men and kids"
                            loading="eager"
                            className="absolute inset-0 h-full w-full object-cover object-[25%_center]"
                        />
                    </div>

                    {/* Right: Hero Text */}
                    <div className="flex items-center bg-[#f2eee8] px-7 py-12 sm:px-12 lg:px-14 xl:px-16">
                        <div className="max-w-xl">
                            <span className="text-xs font-bold tracking-[0.23em] text-pink-600">
                                The Himaanix Edit
                            </span>

                            <h1 className="mt-5 font-serif text-4xl leading-[1.08] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl xl:text-6xl">
                                Find your style.
                                <br />
                                <em className="font-normal">
                                    Own your story.
                                </em>
                            </h1>

                            <p className="mt-5 max-w-md text-sm leading-7 text-gray-600 sm:text-base">
                                Discover standout pieces and everyday favourites
                                for every moment. Find styles that feel uniquely
                                you.
                            </p>

                            <Link
                                to="/shop"
                                className="mt-7 inline-flex min-h-12 items-center gap-4 bg-slate-900 px-6 py-4 text-xs font-bold tracking-wider text-white transition hover:bg-pink-600"
                            >
                                Explore collection
                                <ArrowRight size={16} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Category Navigation */}
            <CategoryScroller />

            {/* Price Drop & Best Deals */}
            <section className="bg-white px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
                <div className="mx-auto max-w-[1800px]">
                    {/* Section Heading */}
                    <div className="mb-9 flex flex-col items-center text-center">
                        {/* Fix #2: removed uppercase — source is already title-cased */}
                        <span className="mb-3 text-xs font-semibold tracking-[0.3em] text-pink-600">
                            The Himaanix Edit
                        </span>

                        <h2 className="font-serif text-3xl tracking-wide text-slate-900 sm:text-4xl">
                            BEST DEALS
                        </h2>

                        <div className="mt-4 h-px w-24 bg-pink-500" />
                    </div>

                    {/* Product Grid */}
                    {bestDealsError ? (
                        <p
                            role="alert"
                            className="py-8 text-center text-sm text-red-700"
                        >
                            {bestDealsError}
                        </p>
                    ) : (
                        <ProductGrid
                            products={bestDeals}
                            loading={bestDealsLoading}
                            loadingCount={4}
                        />
                    )}

                    {/* View All */}
                    <div className="mt-8 flex justify-center">
                        <Link
                            to="/shop"
                            className="inline-flex min-w-[160px] items-center justify-center gap-3 bg-slate-900 px-8 py-4 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-pink-600"
                        >
                            VIEW ALL
                            <ArrowRight size={15} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* New Arrivals */}
            <section className="mx-auto max-w-[1600px] px-5 py-14 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
                {/* Fix #3: linkText changed to sentence case */}
                <SectionHeading
                    eyebrow="Fresh finds"
                    title="Just landed."
                    emphasis="Just you."
                    description="New favourites, ready to meet you."
                    link="/shop?category=Women"
                    linkText="See women’s styles"
                />

                {newArrivalsError ? (
                    <p
                        role="alert"
                        className="py-8 text-center text-sm text-red-700"
                    >
                        {newArrivalsError}
                    </p>
                ) : (
                    <ProductGrid
                        products={newArrivals}
                        loading={newArrivalsLoading}
                        loadingCount={4}
                    />
                )}
            </section>

            {/* Blog Posts */}
            <section className="bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
                <div className="mx-auto max-w-[1420px]">
                    <h2 className="mb-12 text-center text-2xl font-normal tracking-[0.18em] text-slate-900 sm:mb-14 sm:text-3xl">
                        BLOG POSTS
                    </h2>

                    <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
                        {/* Blog 1: Women's Fashion */}
                        <article className="group">
                            <Link
                                to="/blog/everyday-kurtis-for-women"
                                className="block overflow-hidden bg-gray-100"
                            >
                                <img
                                    src="/Kurtis.png"
                                    alt="Himaanix comfortable everyday kurtis for women"
                                    loading="lazy"
                                    className="aspect-[1.9/1] w-full object-cover object-center transition duration-500 group-hover:scale-[1.03]"
                                />
                            </Link>

                            <h3 className="mt-6 text-lg font-normal leading-8 tracking-[0.02em] text-slate-900 sm:text-xl">
                                Comfortable Everyday Kurtis for Women: What to
                                Wear to Work and Beyond
                            </h3>

                            <p className="mt-5 text-sm leading-7 text-gray-600">
                                Finding the right kurti for everyday wear is
                                about balancing comfort, style and versatility.
                                Discover breathable fabrics, flattering prints
                                and easy-to-maintain designs that take you
                                effortlessly from busy workdays to relaxed
                                weekends.
                            </p>

                            <Link
                                to="/blog/everyday-kurtis-for-women"
                                className="mt-5 inline-block border-b border-slate-900 pb-1 text-sm text-slate-900 transition-opacity hover:opacity-60"
                            >
                                Read more
                            </Link>
                        </article>

                        {/* Blog 2: Kids' Fashion */}
                        <article className="group">
                            <Link
                                to="/blog/kids-fashion"
                                className="block overflow-hidden bg-gray-100"
                            >
                                <img
                                    src="/HimaanixLittle.png"
                                    alt="Himaanix Little fashion collection for kids"
                                    loading="lazy"
                                    className="aspect-[1.9/1] w-full object-cover object-center transition duration-500 group-hover:scale-[1.03]"
                                />
                            </Link>

                            <h3 className="mt-6 text-lg font-normal leading-8 tracking-[0.02em] text-slate-900 sm:text-xl">
                                Stylish Comfort for Little Explorers
                            </h3>

                            <p className="mt-5 text-sm leading-7 text-gray-600">
                                Discover stylish outfits for little explorers,
                                from playful everyday looks to charming festive
                                ensembles. Explore comfortable fabrics,
                                delightful prints and versatile designs that let
                                kids move freely while looking their best for
                                every occasion.
                            </p>

                            <Link
                                to="/blog/kids-fashion"
                                className="mt-5 inline-block border-b border-slate-900 pb-1 text-sm text-slate-900 transition-opacity hover:opacity-60"
                            >
                                Read more
                            </Link>
                        </article>

                        {/* Blog 3: Men's Fashion */}
                        <article className="group">
                            <Link
                                to="/blog/mens-fashion"
                                className="block overflow-hidden bg-gray-100"
                            >
                                <img
                                    src="/EveryMan.png"
                                    alt="Himaanix modern men's ethnic and everyday fashion"
                                    loading="lazy"
                                    className="aspect-[1.9/1] w-full object-cover object-center transition duration-500 group-hover:scale-[1.03]"
                                />
                            </Link>

                            <h3 className="mt-6 text-lg font-normal leading-8 tracking-[0.02em] text-slate-900 sm:text-xl">
                                Modern Styles for Every Man
                            </h3>

                            <p className="mt-5 text-sm leading-7 text-gray-600">
                                From office-ready outfits to festive
                                celebrations and weekend outings, discover
                                versatile menswear designed for modern living.
                                Explore timeless kurtas, refined colours and
                                comfortable styles that make dressing well
                                effortless for every occasion.
                            </p>

                            <Link
                                to="/blog/mens-fashion"
                                className="mt-5 inline-block border-b border-slate-900 pb-1 text-sm text-slate-900 transition-opacity hover:opacity-60"
                            >
                                Read more
                            </Link>
                        </article>
                    </div>

                    {/* View All Blogs */}
                    <div className="mt-10 flex justify-center">
                        <Link
                            to="/blog"
                            className="inline-flex min-w-[156px] items-center justify-center gap-3 bg-slate-900 px-8 py-4 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-pink-600"
                        >
                            VIEW ALL
                            <ArrowRight size={15} />
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}