import { useState } from "react";
import { Link } from "react-router-dom";

// --- DATA ---

const commitments = [
  {
    title: "Better Materials",
    description:
      "Organic cottons, traceable linens, and low-impact dyes. Every fibre is chosen for how it feels, ages, and returns to the earth.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
      </svg>
    ),
  },
  {
    title: "Fair Craft Partners",
    description:
      "We work with family-run ateliers who set their own hours and are paid above market. Our makers are named, not numbered.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: "Thoughtful Packaging",
    description:
      "Recycled, recyclable, and plastic-free wherever possible. Our mailers are compostable and our tags are seed-paper.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
  },
  {
    title: "Made to Last",
    description:
      "We design against trends. Longer-lasting garments mean fewer replacements, less waste, and a lighter footprint over time.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
];

const stats = [
  { value: "70%", label: "Less Water Used" },
  { value: "100%", label: "Plastic-Free Packaging" },
  { value: "3", label: "Fair-Trade Ateliers" },
  { value: "0", label: "Synthetic Pesticides" },
];

const materials = [
  {
    title: "Organic Cotton",
    origin: "Gujarat & Tamil Nadu, India",
    description:
      "Grown without synthetic pesticides, using crop rotation and rainwater harvesting.",
  },
  {
    title: "European Linen",
    origin: "Certified mills, Europe",
    description:
      "Traceable from field to fibre. Flax requires no irrigation and minimal processing.",
  },
  {
    title: "Low-Impact Dyes",
    origin: "OEKO-TEX certified",
    description:
      "Free from harmful chemicals, with reduced water usage compared to conventional dyeing.",
  },
  {
    title: "Natural Fibres",
    origin: "Worldwide",
    description:
      "We prioritise biodegradable fibres and avoid synthetic blends wherever technically possible.",
  },
];

const roadmap = [
  {
    year: "2026",
    goal: "100% traceable supply chain",
    status: "In progress",
  },
  {
    year: "2026",
    goal: "Zero single-use plastic in packaging",
    status: "Achieved",
  },
  {
    year: "2027",
    goal: "50% of fabrics from certified organic sources",
    status: "In progress",
  },
  {
    year: "2027",
    goal: "Solar-powered primary atelier",
    status: "Planned",
  },
  {
    year: "2028",
    goal: "Carbon-neutral shipping across India",
    status: "Planned",
  },
  {
    year: "2028",
    goal: "Take-back & repair program nationwide",
    status: "Planned",
  },
];

const faqs = [
  {
    q: "Are your materials really organic?",
    a: "Yes. All our cotton is GOTS-certified organic, grown without synthetic pesticides, toxic fertilizers, or genetically modified seeds. We request transaction certificates for every batch of yarn.",
  },
  {
    q: "Is your packaging plastic-free?",
    a: "100%. Our outer shipping mailers are made from corn-starch based bio-resins that decompose in home composts. Internal tissue paper is FSC-certified, and our garment tags are embedded with wildflower seeds.",
  },
  {
    q: "How do you ensure fair wages for makers?",
    a: "We work exclusively with small, family-run ateliers in Mumbai, Jaipur, and South India. We conduct direct audits, guarantee year-round work rather than seasonal contracts, and pay at least 25% above local market benchmarks.",
  },
  {
    q: "Do you offer repairs or take-backs?",
    a: "We currently provide complimentary seam repairs and button replacements for any HIMAANIX piece within 2 years of purchase. We are building a formal nationwide take-back program slated for 2028.",
  },
  {
    q: "How do you measure your carbon footprint?",
    a: "We track energy use at our central studio, transport distances for raw materials, and shipping emissions. By prioritizing localized sourcing within India, we keep freight distances and emissions significantly lower than industry standards.",
  },
  {
    q: "What's your biggest sustainability challenge?",
    a: "Sourcing 100% plastic-free elastic bands and trims for structured garments without compromising stretch and durability. We are actively collaborating with Indian textile innovators to test plant-based rubber alternatives.",
  },
];

const labelClass =
  "text-[11px] font-semibold uppercase tracking-[0.22em] text-[#e91e63]";

export default function Sustainability() {
  const [openFaq, setOpenFaq] = useState(0);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Achieved":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "In progress":
        return "bg-pink-50 text-[#e91e63] border-pink-200";
      case "Planned":
      default:
        return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  return (
    <main className="overflow-hidden bg-white text-gray-900">
      {/* ── Hero ── */}
      <section className="border-b border-gray-100 px-5 pb-16 pt-12 sm:px-8 sm:pb-24 sm:pt-16 lg:px-[5%]">
        <div className="mx-auto max-w-[1200px]">
          <p className={labelClass}>HIMAANIX / SUSTAINABILITY</p>

          <h1 className="mt-5 max-w-3xl font-serif text-[clamp(2.1rem,5vw,3.75rem)] font-normal leading-[1.15] tracking-[-0.025em] text-gray-900">
            Made slowly, so it lasts.
          </h1>

          <p className="mt-6 max-w-2xl text-[16px] leading-[1.85] text-gray-500 sm:text-lg">
            Sustainability isn't a marketing line for us. It's the whole reason
            HIMAANIX exists — to make clothing that respects the earth, the people
            who make it, and the people who wear it.
          </p>
        </div>
      </section>

      {/* ── Four Commitments ── */}
      <section className="bg-gray-50 px-5 py-16 sm:px-8 lg:px-[5%] lg:py-24">
        <div className="mx-auto max-w-[1200px]">
          <p className={labelClass}>Our Four Commitments</p>
          <h2 className="mt-4 font-serif text-[clamp(1.7rem,3.5vw,2.5rem)] font-normal leading-[1.22] text-gray-900">
            Sustainability in four parts
          </h2>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {commitments.map((item) => (
              <article
                key={item.title}
                className="group flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-pink-200 hover:shadow-[0_8px_30px_rgba(233,30,99,0.08)]"
              >
                <div>
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-50 text-[#e91e63] transition-transform duration-300 group-hover:scale-110">
                    {item.icon}
                  </span>

                  <h3 className="mt-6 font-serif text-xl font-normal text-gray-900">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-[14px] leading-[1.75] text-gray-500">
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Impact Statistics Grid ── */}
      <section className="border-y border-gray-100 px-5 py-14 sm:px-8 lg:py-16">
        <div className="mx-auto grid max-w-[1000px] grid-cols-2 gap-8 sm:grid-cols-4 sm:gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center text-center">
              <p className="font-serif text-[clamp(2.2rem,4vw,3.2rem)] font-normal tracking-tight text-[#e91e63]">
                {stat.value}
              </p>
              <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── What We Make With (Materials) ── */}
      <section className="px-5 py-16 sm:px-8 lg:px-[5%] lg:py-24">
        <div className="mx-auto max-w-[1200px]">
          <div className="max-w-2xl">
            <p className={labelClass}>What We Make With</p>
            <h2 className="mt-4 font-serif text-[clamp(1.7rem,3.5vw,2.5rem)] font-normal leading-[1.22] text-gray-900">
              Materials we're proud to name
            </h2>
            <p className="mt-4 text-[15px] leading-[1.85] text-gray-500">
              We choose fibres for how they feel on the skin, how they age in the
              wardrobe, and how they return to the earth. No shortcuts, no
              greenwashing.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {materials.map((mat) => (
              <div
                key={mat.title}
                className="group flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-pink-200 hover:shadow-[0_8px_24px_rgba(233,30,99,0.07)]"
              >
                <div>
                  <span className="inline-flex rounded-md bg-gray-50 border border-gray-100 px-3 py-1 text-[11px] font-semibold text-gray-500">
                    📍 {mat.origin}
                  </span>

                  <h3 className="mt-5 font-serif text-xl font-normal text-gray-900">
                    {mat.title}
                  </h3>

                  <p className="mt-3 text-[13.5px] leading-[1.75] text-gray-500">
                    {mat.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Roadmap ── */}
      <section className="bg-gray-50 px-5 py-16 sm:px-8 lg:px-[5%] lg:py-24">
        <div className="mx-auto max-w-[1200px]">
          <div className="max-w-2xl">
            <p className={labelClass}>Our Roadmap</p>
            <h2 className="mt-4 font-serif text-[clamp(1.7rem,3.5vw,2.5rem)] font-normal leading-[1.22] text-gray-900">
              Goals we hold ourselves to
            </h2>
            <p className="mt-4 text-[15px] leading-[1.85] text-gray-500">
              We publish our commitments publicly so we can be held accountable.
              Progress reports will be shared every year.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {roadmap.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between gap-4 rounded-xl border border-gray-100 bg-white p-6 shadow-sm"
              >
                <div>
                  <span className="font-serif text-2xl font-normal text-gray-900">
                    {item.year}
                  </span>
                  <p className="mt-1 text-[14px] font-medium text-gray-700">
                    {item.goal}
                  </p>
                </div>

                <span
                  className={`shrink-0 rounded-full border px-3 py-1 text-[11px] font-semibold tracking-wide ${getStatusBadge(
                    item.status
                  )}`}
                >
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quote Banner ── */}
      <section className="px-5 py-16 sm:px-8 lg:px-[5%] lg:py-20">
        <div className="mx-auto max-w-[1000px] rounded-2xl bg-[#fff0f5] p-8 text-center sm:p-14 md:p-16">
          <blockquote className="font-serif text-[clamp(1.5rem,3.5vw,2.4rem)] font-normal italic leading-[1.3] text-gray-900">
            "The most sustainable garment is the one you keep wearing."
          </blockquote>
          <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.24em] text-[#e91e63]">
            — HIMAANIX Design Principle
          </p>
        </div>
      </section>

      {/* ── Sustainability FAQs ── */}
      <section className="border-t border-gray-100 bg-gray-50 px-5 py-16 sm:px-8 lg:px-[5%] lg:py-24">
        <div className="mx-auto max-w-[800px]">
          <div className="text-center">
            <p className={labelClass}>Questions</p>
            <h2 className="mt-4 font-serif text-[clamp(1.7rem,3.5vw,2.5rem)] font-normal leading-[1.22] text-gray-900">
              Sustainability FAQs
            </h2>
          </div>

          <div className="mt-12 space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className={`rounded-xl border transition-colors duration-300 ${
                    isOpen
                      ? "border-pink-200 bg-white shadow-sm"
                      : "border-gray-200/80 bg-white hover:border-pink-100"
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="flex w-full items-center justify-between px-6 py-5 text-left focus:outline-none"
                  >
                    <span className="text-[15px] font-medium text-gray-900">
                      {faq.q}
                    </span>
                    <span
                      className={`ml-4 shrink-0 rounded-full p-1 transition-transform duration-300 ${
                        isOpen
                          ? "rotate-180 bg-pink-50 text-[#e91e63]"
                          : "text-gray-400"
                      }`}
                    >
                      <svg
                        width="20"
                        height="20"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </span>
                  </button>

                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-6 text-[14px] leading-[1.8] text-gray-500">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Final Call To Action ── */}
      <section className="px-5 py-16 text-center sm:px-8 sm:py-20 lg:py-24">
        <p className={labelClass}>Join The Movement</p>

        <h2 className="mx-auto mt-4 max-w-xl font-serif text-[clamp(1.7rem,4vw,2.5rem)] font-normal leading-[1.2] text-gray-900">
          Dress with intention. Wear it for years.
        </h2>

        <p className="mx-auto mt-4 max-w-md text-[15px] leading-[1.8] text-gray-500">
          Explore pieces built to last — or reach out if you have questions about
          our materials, makers, or methods.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2.5 rounded-lg bg-[#e91e63] px-8 py-3.5 text-[12px] font-bold uppercase tracking-[0.14em] text-white transition-all duration-300 hover:bg-[#c41050] hover:shadow-[0_6px_20px_rgba(233,30,99,0.3)]"
          >
            Shop The Edit
            <span className="text-sm">→</span>
          </Link>

          <Link
            to="/contact"
            className="inline-flex items-center gap-2.5 rounded-lg border border-gray-300 bg-white px-8 py-3.5 text-[12px] font-bold uppercase tracking-[0.14em] text-gray-800 transition-all duration-300 hover:border-gray-900 hover:bg-gray-900 hover:text-white"
          >
            Ask Us Anything
          </Link>
        </div>
      </section>
    </main>
  );
}