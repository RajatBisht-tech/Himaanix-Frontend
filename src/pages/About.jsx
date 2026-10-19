import { Link } from "react-router-dom";

const values = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="6" cy="6" r="3" />
        <circle cx="6" cy="18" r="3" />
        <line x1="20" y1="4" x2="8.12" y2="15.88" />
        <line x1="14.47" y1="14.48" x2="20" y2="20" />
        <line x1="8.12" y1="8.12" x2="12" y2="12" />
      </svg>
    ),
    title: "Considered Craft",
    description:
      "Every piece is cut, stitched, and finished with intention. We work with a small circle of master tailors who share our obsession with detail.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
      </svg>
    ),
    title: "Responsible Materials",
    description:
      "Organic cottons, traceable linens, and low-impact dyes. We choose fabrics that feel beautiful on the skin and gentle on the planet.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    title: "Made to Last",
    description:
      "We design against trends. Our silhouettes are timeless, our construction is durable, and our pieces are meant to be worn for years, not seasons.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3z" />
        <path d="M5 19l.5 2L8 21.5 5.5 22 5 24l-.5-2L2 21.5 4.5 21 5 19z" />
        <path d="M19 15l.5 2 2 .5-2 .5-.5 2-.5-2-2-.5 2-.5.5-2z" />
      </svg>
    ),
    title: "Quiet Luxury",
    description:
      "No loud logos, no fleeting hype. Just refined essentials that speak through cut, cloth, and quiet confidence.",
  },
];

const milestones = [
  {
    year: "2021",
    title: "A Quiet Beginning",
    description:
      "HIMAANIX started in a small Mumbai studio with a single idea — create clothing that feels as good as it looks, without the noise.",
  },
  {
    year: "2022",
    title: "The First Collection",
    description:
      "Our debut edit of 12 essentials sold out in three weeks. We knew we were onto something worth building.",
  },
  {
    year: "2023",
    title: "Craft Partners",
    description:
      "We partnered with family-run ateliers across India, ensuring fair wages and hand-finished quality on every piece.",
  },
  {
    year: "2024",
    title: "Going Global",
    description:
      "We began shipping internationally, bringing quiet luxury to wardrobes across 40+ countries.",
  },
  {
    year: "2026",
    title: "What's Next",
    description:
      "New categories, deeper sustainability commitments, and a growing community of people who dress with intention.",
  },
];

const statistics = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    value: "12,000+",
    label: "Happy Customers",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
    value: "48 hrs",
    label: "Dispatch Time",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    value: "40+",
    label: "Countries Shipped",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    value: "4.9 / 5",
    label: "Average Rating",
  },
];

const directors = [
  { initial: "A", name: "Aman" },
  { initial: "H", name: "Himanshu" },
];

/* Brand tokens matching the live site */
const pink = "#e91e63";
const labelClass =
  "text-[11px] font-semibold uppercase tracking-[0.22em] text-[#e91e63]";

export default function About() {
  return (
    <main className="overflow-hidden bg-white text-gray-900">
      {/* ── Hero ── */}
      <section className="border-b border-gray-100 px-5 pb-16 pt-10 sm:px-8 sm:pb-20 sm:pt-12 lg:px-[5%]">
        <div className="mx-auto max-w-[1200px]">
          <p className={labelClass}>Himaanix / Our Story</p>

          <h1 className="mt-5 max-w-3xl font-serif text-[clamp(1.9rem,4.5vw,3.25rem)] font-normal leading-[1.18] tracking-[-0.025em] text-gray-900">
            Clothing with intention, made
            <br className="hidden sm:block" /> for the long run.
          </h1>

          <p className="mt-6 max-w-2xl text-[15px] leading-[1.85] text-gray-500 sm:text-base">
            HIMAANIX is a modern wardrobe house built on a simple belief: fewer,
            better things. We design timeless essentials in natural fabrics,
            crafted by hands that care — for people who dress with purpose.
          </p>
        </div>
      </section>

      {/* ── Philosophy (two-column) ── */}
      <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-[5%]">
        <div className="mx-auto grid max-w-[1200px] gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className={labelClass}>Our Philosophy</p>
            <h2 className="mt-4 font-serif text-[clamp(1.7rem,3.5vw,2.6rem)] font-normal leading-[1.22] tracking-[-0.02em] text-gray-900">
              We believe in the quiet power of
              <br className="hidden sm:block" /> well-made things.
            </h2>
          </div>

          <div className="space-y-5 self-center text-[15px] leading-[1.9] text-gray-500">
            <p>
              The fashion industry moves fast. We chose to move deliberately.
              Every HIMAANIX piece begins with a question:{" "}
              <em className="font-medium text-gray-800">
                will this still feel right in five years?
              </em>{" "}
              If the answer isn't an immediate yes, we go back to the drawing
              board.
            </p>
            <p>
              That means sourcing fabrics we'd want against our own skin.
              Cutting patterns that flatter real bodies, not just mannequins.
              And finishing every seam as though it were for ourselves —
              because, in a way, it is.
            </p>
            <p>
              We don't chase seasons. We build a wardrobe you can return to,
              again and again, and always feel like yourself in.
            </p>
          </div>
        </div>
      </section>

      {/* ── Values cards ── */}
      <section className="bg-gray-50 px-5 py-16 sm:px-8 sm:py-20 lg:px-[5%]">
        <div className="mx-auto max-w-[1200px]">
          <p className={labelClass}>What We Stand For</p>
          <h2 className="mt-4 font-serif text-[clamp(1.7rem,3.5vw,2.5rem)] font-normal leading-[1.22] tracking-[-0.02em] text-gray-900">
            Four values behind every stitch
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {values.map((value) => (
              <article
                key={value.title}
                className="group rounded-xl border border-gray-100 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-pink-200 hover:shadow-[0_8px_30px_rgba(233,30,99,0.08)]"
              >
                <span className="inline-flex text-[#e91e63] transition-transform duration-300 group-hover:scale-110">
                  {value.icon}
                </span>

                <h3 className="mt-5 text-[15px] font-semibold text-gray-900">
                  {value.title}
                </h3>

                <p className="mt-2.5 text-[13px] leading-[1.75] text-gray-500">
                  {value.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Statistics ── */}
      <section className="border-y border-gray-100 px-5 py-12 sm:px-8 sm:py-14">
        <div className="mx-auto grid max-w-[1000px] grid-cols-2 gap-8 sm:grid-cols-4 sm:gap-6">
          {statistics.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center text-center">
              <span className="text-[#e91e63]">{stat.icon}</span>
              <p className="mt-3 font-serif text-[clamp(1.6rem,2.8vw,2.25rem)] font-normal tracking-tight text-gray-900">
                {stat.value}
              </p>
              <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-400">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Leadership ── */}
      <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-[5%]">
        <div className="mx-auto max-w-[720px] text-center">
          <p className={labelClass}>Leadership</p>
          <h2 className="mt-4 font-serif text-[clamp(1.7rem,3.5vw,2.5rem)] font-normal leading-[1.22] text-gray-900">
            Our Directors
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[15px] leading-[1.85] text-gray-500">
            HIMAANIX is guided by a leadership team committed to building a
            thoughtful, trusted, and enduring fashion brand.
          </p>

          <div className="mx-auto mt-10 grid max-w-[520px] gap-4 sm:grid-cols-2">
            {directors.map((director) => (
              <article
                key={director.name}
                className="group flex flex-col items-center rounded-xl border border-gray-100 bg-white px-6 py-10 transition-all duration-300 hover:-translate-y-1 hover:border-pink-200 hover:shadow-[0_8px_30px_rgba(233,30,99,0.08)]"
              >
                <span className="grid h-16 w-16 place-items-center rounded-full bg-[#e91e63] font-serif text-xl text-white transition-transform duration-300 group-hover:scale-105">
                  {director.initial}
                </span>

                <h3 className="mt-5 text-lg font-semibold text-gray-900">
                  {director.name}
                </h3>
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                  Director
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Journey timeline ── */}
      <section className="bg-gray-50 px-5 py-16 sm:px-8 sm:py-20 lg:px-[5%]">
        <div className="mx-auto max-w-[800px]">
          <div className="text-center">
            <p className={labelClass}>The Journey</p>
            <h2 className="mt-4 font-serif text-[clamp(1.7rem,3.5vw,2.5rem)] font-normal leading-[1.22] text-gray-900">
              From one idea to a wardrobe house
            </h2>
          </div>

          <div className="relative mt-14">
            {/* Center line */}
            <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gray-200 md:block" />

            <div className="space-y-6 md:space-y-0">
              {milestones.map((milestone, index) => {
                const isLeft = index % 2 === 0;
                return (
                  <div
                    key={milestone.year}
                    className={`relative md:flex md:items-start md:pb-12 ${
                      isLeft ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    {/* Card */}
                    <div className="w-full md:w-[calc(50%-24px)]">
                      <article className="rounded-xl border border-gray-100 bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-pink-200 hover:shadow-[0_8px_24px_rgba(233,30,99,0.07)] sm:p-7">
                        <p className="text-[12px] font-bold tracking-[0.12em] text-[#e91e63]">
                          {milestone.year}
                        </p>
                        <h3 className="mt-2 text-[15px] font-semibold text-gray-900">
                          {milestone.title}
                        </h3>
                        <p className="mt-2 text-[13px] leading-[1.75] text-gray-500">
                          {milestone.description}
                        </p>
                      </article>
                    </div>

                    {/* Dot on center line */}
                    <div className="absolute left-1/2 top-7 z-10 hidden h-3 w-3 -translate-x-1/2 rounded-full border-2 border-[#e91e63] bg-white md:block" />

                    {/* Other-side spacer */}
                    <div className="hidden w-[calc(50%-24px)] md:block" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-5 py-16 text-center sm:px-8 sm:py-20">
        <p className={labelClass}>Dress with purpose</p>

        <h2 className="mx-auto mt-4 max-w-xl font-serif text-[clamp(1.7rem,4vw,2.75rem)] font-normal leading-[1.2] text-gray-900">
          Fewer things. Better stories.
        </h2>

        <Link
          to="/shop"
          className="mt-8 inline-flex items-center gap-2.5 rounded-lg bg-[#e91e63] px-8 py-3.5 text-[12px] font-bold uppercase tracking-[0.14em] text-white transition-all duration-300 hover:bg-[#c41050] hover:shadow-[0_6px_20px_rgba(233,30,99,0.3)]"
        >
          Shop Himaanix
          <span className="text-sm">→</span>
        </Link>
      </section>
    </main>
  );
}