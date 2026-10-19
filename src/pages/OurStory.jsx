import React from "react";
import { Link } from "react-router-dom";
import {
    Scissors,
    Leaf,
    Heart,
    Sparkles,
    ArrowRight,
    Quote,
    MapPin,
    Users,
    Package,
    Globe,
    Feather,
    Sun,
    Mountain,
} from "lucide-react";

const CHAPTERS = [
    {
        id: "chapter-01",
        number: "Chapter 01",
        title: "A Small Room in Mumbai",
        body: [
            "HIMAANIX began in 2021 in a one-room studio in Bandra, Mumbai. No investors, no grand launch — just a cutting table, a sewing machine, and a quiet conviction that clothing had lost its soul.",
            "Our founder, Himaani, had spent a decade in fast fashion. She watched trends churn, quality drop, and wardrobes fill with things nobody loved. She wanted to build the opposite: a wardrobe house that valued fewer, better things.",
            "The first collection was twelve pieces. Twelve essentials, cut in natural fabrics, made by hand. They sold out in three weeks — not because of marketing, but because people were hungry for clothes that felt like they mattered again.",
        ],
        icon: Scissors,
        pull: "We didn't set out to build a brand. We set out to build a wardrobe we'd actually want to keep.",
    },
    {
        id: "chapter-02",
        number: "Chapter 02",
        title: "The Hands Behind the Cloth",
        body: [
            "By 2022, we had outgrown the studio. Rather than scale to a factory, we chose something slower and harder: partnership with family-run ateliers across India.",
            "Our primary craft partner is a third-generation tailoring house in Jaipur. The same families who cut our first shirts still cut them today. They set their own hours, are paid above market rate, and are named — not numbers — on every invoice we receive.",
            "We visit them twice a year. Not for audits, but for tea. Because you cannot make a garment with care if the people making it aren't cared for.",
        ],
        icon: Users,
        pull: "Every piece carries a name. Not a logo — a lineage.",
    },
    {
        id: "chapter-03",
        number: "Chapter 03",
        title: "Cloth That Breathes",
        body: [
            "We believe a garment is only as honest as its cloth. So we went to the source.",
            "Our cottons come from organic farms in Gujarat and Tamil Nadu, where the soil is rotated and the water is managed. Our linens are sourced from certified European mills that trace every fibre to its field.",
            "We use low-impact dyes, avoid synthetic blends wherever possible, and are moving — piece by piece — toward a fully traceable supply chain. Not because it's fashionable. Because it's right.",
        ],
        icon: Leaf,
        pull: "Cloth should feel like a second skin. Not a statement. Not a compromise.",
    },
    {
        id: "chapter-04",
        number: "Chapter 04",
        title: "Designing Against Trends",
        body: [
            "We don't have seasonal drops. We don't chase micro-trends. We release a small number of pieces each year, each one refined until we'd wear it ourselves without hesitation.",
            "Every silhouette is fit-tested on real bodies — tall, short, curvy, lean, pregnant, recovering, ageing. Our patterns are drawn to flatter, not to conform. And our construction is built to last far longer than the average wardrobe item.",
            "When you buy a HIMAANIX piece, you're not buying this season. You're buying the next hundred wears.",
        ],
        icon: Feather,
        pull: "A timeless piece isn't one that never changes. It's one that never needs to.",
    },
    {
        id: "chapter-05",
        number: "Chapter 05",
        title: "A Wardrobe, Not a Warehouse",
        body: [
            "The fashion industry produces over 100 billion garments a year. Most end up in landfill within twelve months. We believe there is a different way — and it starts with restraint.",
            "We release less. We produce fewer runs. We design pieces that layer, transition, and age beautifully. And we price them fairly — not to maximise margin, but to reflect the true cost of making something well.",
            "Our promise is simple: no hype, no waste, no shortcuts. Only things worth keeping.",
        ],
        icon: Heart,
        pull: "We'd rather make one hundred pieces people treasure than ten thousand they discard.",
    },
    {
        id: "chapter-06",
        number: "Chapter 06",
        title: "Where We're Going",
        body: [
            "By 2026, HIMAANIX ships to over 40 countries. We've grown slowly and deliberately — never faster than our craft partners could sustain, never larger than our values could hold.",
            "Next, we're expanding into new categories — knitwear, outerwear, and eventually home — without ever losing the small-studio mindset that started it all.",
            "We're not trying to be the biggest. We're trying to be the one you return to. The brand you quietly trust for the pieces you reach for every week, for years.",
        ],
        icon: Mountain,
        pull: "Growth is not the goal. Longevity is.",
    },
];

const PRINCIPLES = [
    {
        icon: Scissors,
        title: "Make Less, Better",
        body: "Smaller collections, deeper craft. Every piece must earn its place.",
    },
    {
        icon: Sun,
        title: "Honest Materials",
        body: "Natural fibres, traced origins, low-impact dyes. No greenwashing.",
    },
    {
        icon: Users,
        title: "People First",
        body: "Fair wages, safe studios, and long-term partnerships with our makers.",
    },
    {
        icon: Sparkles,
        title: "Quiet by Design",
        body: "No logos, no noise. Pieces that speak through cut and cloth alone.",
    },
];

const NUMBERS = [
    { icon: Users, value: "12,000+", label: "Customers Worldwide" },
    { icon: Package, value: "120+", label: "Pieces Crafted" },
    { icon: Globe, value: "40+", label: "Countries Shipped" },
    { icon: MapPin, value: "3", label: "Craft Ateliers" },
];

export default function OurStory() {
    return (
        <div>
            {/* Hero */}
            <section className="bg-[#EFE6DD] py-20 md:py-28">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="hx-eyebrow mb-4">HIMAANIX / OUR STORY</div>
                    <h1 className="font-serif text-5xl md:text-7xl leading-[1.05] max-w-4xl">
                        Fewer things. Made properly. Kept for years.
                    </h1>
                    <p className="mt-6 text-[#5C524C] max-w-2xl text-base md:text-lg leading-relaxed">
                        HIMAANIX is a modern wardrobe house built on a single conviction:
                        that clothing should be made slowly, worn often, and loved for
                        longer than a season.
                    </p>
                </div>
            </section>

            {/* Opening quote */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                <Quote className="w-8 h-8 text-[#C89D66] mx-auto mb-6" />
                <p className="font-serif text-2xl md:text-4xl leading-snug text-[#1A1110] italic">
                    "We didn't start HIMAANIX to sell clothes. We started it to change
                    what people keep."
                </p>
                <div className="hx-eyebrow mt-6 text-[#91857D]">
                    — Himaani, Founder
                </div>
            </section>

            {/* Chapters */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                <div className="space-y-24 md:space-y-32">
                    {CHAPTERS.map((c, i) => {
                        const isReversed = i % 2 === 1;
                        return (
                            <div
                                key={c.id}
                                id={c.id}
                                className="scroll-mt-24 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start"
                            >
                                {/* Text */}
                                <div
                                    className={`lg:col-span-7 ${isReversed ? "lg:order-2 lg:pl-8" : "lg:order-1"
                                        }`}
                                >
                                    <div className="flex items-center gap-3 mb-4">
                                        <c.icon className="w-5 h-5 text-[#C89D66]" />
                                        <span className="hx-eyebrow text-[#91857D]">
                                            {c.number}
                                        </span>
                                    </div>
                                    <h2 className="font-serif text-3xl md:text-5xl leading-tight mb-6">
                                        {c.title}
                                    </h2>
                                    <div className="space-y-4 text-[#5C524C] leading-relaxed">
                                        {c.body.map((p, j) => (
                                            <p key={j}>{p}</p>
                                        ))}
                                    </div>
                                </div>

                                {/* Pull quote */}
                                <div
                                    className={`lg:col-span-5 ${isReversed ? "lg:order-1 lg:pr-8" : "lg:order-2"
                                        }`}
                                >
                                    <div className="bg-[#F5F0EB] border-l-2 border-[#C89D66] p-8 md:p-10">
                                        <p className="font-serif text-xl md:text-2xl leading-snug text-[#1A1110] italic">
                                            "{c.pull}"
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Numbers band */}
            <section className="bg-[#1A1110] text-[#FDFBF7] py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
                        {NUMBERS.map((n) => (
                            <div key={n.label} className="text-center">
                                <n.icon className="w-5 h-5 text-[#C89D66] mx-auto mb-4" />
                                <div className="font-serif text-4xl md:text-5xl text-[#FDFBF7]">
                                    {n.value}
                                </div>
                                <div className="hx-eyebrow mt-2 text-[#FDFBF7]/60">
                                    {n.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Principles */}
            <section className="bg-[#F5F0EB] py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="hx-eyebrow mb-3">What Guides Us</div>
                    <h2 className="font-serif text-3xl md:text-5xl mb-12 max-w-2xl">
                        Four principles, applied without exception
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {PRINCIPLES.map((v) => (
                            <div
                                key={v.title}
                                className="bg-[#FDFBF7] border border-[#2B1B17]/10 p-8 hover:border-[#1A1110] transition-colors group"
                            >
                                <v.icon className="w-6 h-6 text-[#C89D66] mb-5 group-hover:scale-110 transition-transform" />
                                <h3 className="font-serif text-xl mb-3">{v.title}</h3>
                                <p className="text-sm text-[#5C524C] leading-relaxed">
                                    {v.body}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Closing CTA */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="bg-[#1A1110] text-[#FDFBF7] p-10 md:p-16 text-center">
                    <div className="hx-eyebrow mb-4 text-[#C89D66]">
                        The Story Continues
                    </div>
                    <h2 className="font-serif text-3xl md:text-5xl mb-6 max-w-2xl mx-auto leading-tight">
                        Be part of the next chapter.
                    </h2>
                    <p className="text-[#FDFBF7]/70 leading-relaxed max-w-xl mx-auto mb-8">
                        Explore the pieces we make, or reach out — we love hearing from the
                        people who wear what we make.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link
                            to="/"
                            className="inline-flex items-center justify-center gap-2 bg-[#FDFBF7] text-[#1A1110] px-8 py-4 text-xs uppercase tracking-[0.28em] hover:bg-[#EFE6DD] transition-colors"
                        >
                            Shop The Edit <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link
                            to="/contact"
                            className="inline-flex items-center justify-center gap-2 border border-[#FDFBF7]/40 px-8 py-4 text-xs uppercase tracking-[0.28em] hover:bg-[#FDFBF7]/10 transition-colors"
                        >
                            Talk To Us
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}