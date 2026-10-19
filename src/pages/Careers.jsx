import { useState } from "react";
import { Link } from "react-router-dom";

// --- DATA ---

const values = [
  {
    title: "People First, Always",
    description:
      "Fair pay, flexible hours, and genuine care. We believe you can't make beautiful things if you're not treated beautifully.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  {
    title: "Slow, On Purpose",
    description:
      "We don't chase deadlines that compromise craft. We plan carefully, ship deliberately, and protect the quality of the work.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    title: "Small Team, Big Ownership",
    description:
      "Everyone here owns their domain. You'll have real autonomy, real impact, and direct access to the founder.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: "Craft Over Hype",
    description:
      "We hire for taste, rigour, and honesty — not for buzzwords or titles. If you care deeply about the details, you'll fit right in.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="6" cy="6" r="3" />
        <circle cx="6" cy="18" r="3" />
        <line x1="20" y1="4" x2="8.12" y2="15.88" />
        <line x1="14.47" y1="14.48" x2="20" y2="20" />
        <line x1="8.12" y1="8.12" x2="12" y2="12" />
      </svg>
    ),
  },
];

const openRoles = [
  {
    id: 1,
    title: "Senior Womenswear Designer",
    department: "Design",
    type: "Full-time",
    location: "Mumbai, India",
    experience: "5+ years",
  },
  {
    id: 2,
    title: "Menswear Designer",
    department: "Design",
    type: "Full-time",
    location: "Mumbai, India",
    experience: "3+ years",
  },
  {
    id: 3,
    title: "Supply Chain & Sourcing Lead",
    department: "Operations",
    type: "Full-time",
    location: "Mumbai / Jaipur",
    experience: "4+ years",
  },
  {
    id: 4,
    title: "Brand Content Lead",
    department: "Marketing",
    type: "Full-time",
    location: "Remote (India)",
    experience: "3+ years",
  },
  {
    id: 5,
    title: "Customer Care Specialist",
    department: "Support",
    type: "Full-time",
    location: "Mumbai, India",
    experience: "1+ years",
  },
  {
    id: 6,
    title: "Design Internship (6 months)",
    department: "Design",
    type: "Internship",
    location: "Mumbai, India",
    experience: "Fresher",
  },
];

const benefits = [
  "Competitive salary, reviewed twice a year",
  "Flexible working hours and remote options",
  "Health insurance for you and your family",
  "Annual craft immersion trip to our atelier in Jaipur",
  "Generous employee discount on all HIMAANIX pieces",
  "Learning budget for courses, books, and conferences",
  "Paid parental leave, above statutory minimum",
  "25 days of paid time off plus public holidays",
];

const hiringSteps = [
  {
    step: "01",
    title: "Apply",
    description:
      "Send us your CV and a short note about why HIMAANIX. We read every application personally.",
  },
  {
    step: "02",
    title: "Intro Call",
    description:
      "A 30-minute conversation with our team to understand your background, interests, and expectations.",
  },
  {
    step: "03",
    title: "Craft Interview",
    description:
      "A deeper conversation — and, for design roles, a portfolio review or short creative brief.",
  },
  {
    step: "04",
    title: "Offer",
    description:
      "We move quickly when it's right. Most candidates hear from us within two weeks of applying.",
  },
];

const faqs = [
  {
    q: "Do you offer remote roles?",
    a: "Yes! Several roles (such as our Brand Content Lead) are fully remote or offer hybrid flexibility. For studio and atelier roles requiring hands-on fabric cutting and pattern testing, teams are based out of Mumbai and Jaipur.",
  },
  {
    q: "Do you hire interns or freshers?",
    a: "Absolutely. We actively look for fresh eyes, curiosity, and raw aesthetic sensibility. Our 6-month paid internships provide direct mentorship from lead designers with real ownership over pieces.",
  },
  {
    q: "What does your interview process look like?",
    a: "Our process is respectful and transparent: an initial application review, an informal 30-minute intro call, followed by a focused craft discussion or portfolio walkthrough. We never ask for days of unpaid spec work.",
  },
  {
    q: "Can I apply speculatively if there's no open role?",
    a: "Always. If our values and aesthetic resonate with you, send an introductory note and your portfolio to careers@himaanix.com. We keep stellar candidates on priority as new slots open.",
  },
  {
    q: "What is the culture like?",
    a: "Calm, thoughtful, and craft-obsessed. We reject frantic hustle culture in favour of focused depth. Decisions are guided by quality, integrity, and genuine mutual respect.",
  },
];

const labelClass =
  "text-[11px] font-semibold uppercase tracking-[0.22em] text-[#e91e63]";

export default function Careers() {
  const [selectedDept, setSelectedDept] = useState("All");
  const [openFaq, setOpenFaq] = useState(0);

  const departments = ["All", "Design", "Operations", "Marketing", "Support"];

  const filteredRoles =
    selectedDept === "All"
      ? openRoles
      : openRoles.filter((role) => role.department === selectedDept);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <main className="overflow-hidden bg-white text-gray-900">
      {/* ── Hero ── */}
      <section className="border-b border-gray-100 px-5 pb-16 pt-12 sm:px-8 sm:pb-24 sm:pt-16 lg:px-[5%]">
        <div className="mx-auto max-w-[1200px]">
          <p className={labelClass}>HIMAANIX / CAREERS</p>

          <h1 className="mt-5 max-w-3xl font-serif text-[clamp(2.1rem,5vw,3.75rem)] font-normal leading-[1.15] tracking-[-0.025em] text-gray-900">
            Build something worth keeping.
          </h1>

          <p className="mt-6 max-w-2xl text-[16px] leading-[1.85] text-gray-500 sm:text-lg">
            We're a small team making considered clothing for people who dress
            with intention. If that sounds like you, we'd love to meet.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#open-roles"
              className="inline-flex items-center gap-2.5 rounded-lg bg-[#e91e63] px-8 py-3.5 text-[12px] font-bold uppercase tracking-[0.14em] text-white transition-all duration-300 hover:bg-[#c41050] hover:shadow-[0_6px_20px_rgba(233,30,99,0.3)]"
            >
              See Open Roles
              <span className="text-sm">↓</span>
            </a>

            <a
              href="mailto:careers@himaanix.com"
              className="inline-flex items-center gap-2.5 rounded-lg border border-gray-300 bg-white px-8 py-3.5 text-[12px] font-bold uppercase tracking-[0.14em] text-gray-800 transition-all duration-300 hover:border-gray-900 hover:bg-gray-900 hover:text-white"
            >
              Say Hello
            </a>
          </div>
        </div>
      </section>

      {/* ── Life At HIMAANIX (Values) ── */}
      <section className="bg-gray-50 px-5 py-16 sm:px-8 lg:px-[5%] lg:py-24">
        <div className="mx-auto max-w-[1200px]">
          <p className={labelClass}>Life At HIMAANIX</p>
          <h2 className="mt-4 font-serif text-[clamp(1.7rem,3.5vw,2.5rem)] font-normal leading-[1.22] text-gray-900">
            Four things we actually believe
          </h2>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {values.map((val) => (
              <article
                key={val.title}
                className="group flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-pink-200 hover:shadow-[0_8px_30px_rgba(233,30,99,0.08)]"
              >
                <div>
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-50 text-[#e91e63] transition-transform duration-300 group-hover:scale-110">
                    {val.icon}
                  </span>

                  <h3 className="mt-6 font-serif text-xl font-normal text-gray-900">
                    {val.title}
                  </h3>

                  <p className="mt-3 text-[14px] leading-[1.75] text-gray-500">
                    {val.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Open Roles ── */}
      <section id="open-roles" className="scroll-mt-10 px-5 py-16 sm:px-8 lg:px-[5%] lg:py-24">
        <div className="mx-auto max-w-[1200px]">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className={labelClass}>Open Roles</p>
              <h2 className="mt-4 font-serif text-[clamp(1.7rem,3.5vw,2.5rem)] font-normal leading-[1.22] text-gray-900">
                6 roles currently open
              </h2>
            </div>

            {/* Department Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDept(dept)}
                  className={`rounded-full px-4 py-1.5 text-[12px] font-semibold transition-colors duration-200 ${
                    selectedDept === dept
                      ? "bg-[#e91e63] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>

          {/* Fallback Banner */}
          <div className="mt-8 rounded-xl border border-pink-100 bg-[#fff0f5] p-5 text-[14px] leading-[1.7] text-gray-700">
            Don't see your role? We're always open to meeting people who share our
            values — email us at{" "}
            <a
              href="mailto:careers@himaanix.com"
              className="font-semibold text-[#e91e63] hover:underline"
            >
              careers@himaanix.com
            </a>
            .
          </div>

          {/* Role Cards Grid */}
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filteredRoles.map((role) => (
              <article
                key={role.id}
                className="group flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-pink-200 hover:shadow-[0_8px_30px_rgba(233,30,99,0.08)]"
              >
                <div>
                  <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-gray-400">
                    <span className="text-[#e91e63]">{role.department}</span>
                    <span>·</span>
                    <span>{role.type}</span>
                  </div>

                  <h3 className="mt-3 font-serif text-[20px] font-normal text-gray-900">
                    {role.title}
                  </h3>

                  <div className="mt-6 flex flex-wrap items-center gap-2 text-[12px] text-gray-500">
                    <span className="rounded-md bg-gray-50 px-2.5 py-1 border border-gray-100">
                      📍 {role.location}
                    </span>
                    <span className="rounded-md bg-gray-50 px-2.5 py-1 border border-gray-100">
                      ⏱ {role.experience}
                    </span>
                    <span className="rounded-md bg-gray-50 px-2.5 py-1 border border-gray-100">
                      💼 {role.type}
                    </span>
                  </div>
                </div>

                <a
                  href={`mailto:careers@himaanix.com?subject=Application for ${encodeURIComponent(
                    role.title
                  )}`}
                  className="mt-8 inline-flex items-center justify-between border-t border-gray-100 pt-4 text-[12px] font-bold uppercase tracking-[0.14em] text-[#e91e63] transition-colors group-hover:text-[#c41050]"
                >
                  Apply For Role
                  <span className="text-base transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── What You'll Get (Benefits) ── */}
      <section className="border-t border-gray-100 bg-gray-50 px-5 py-16 sm:px-8 lg:px-[5%] lg:py-24">
        <div className="mx-auto max-w-[1200px]">
          <div className="max-w-2xl">
            <p className={labelClass}>What You'll Get</p>
            <h2 className="mt-4 font-serif text-[clamp(1.7rem,3.5vw,2.5rem)] font-normal leading-[1.22] text-gray-900">
              Benefits that respect the whole of you
            </h2>
            <p className="mt-4 text-[15px] leading-[1.8] text-gray-500">
              We don't believe in perks that look good on paper but never
              materialise. Everything listed here is available from day one — and
              we're always open to adding more.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3.5 rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-colors hover:border-pink-200"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-pink-50 text-[11px] font-bold text-[#e91e63]">
                  ✓
                </span>
                <span className="text-[14px] leading-[1.65] font-medium text-gray-700">
                  {benefit}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Hiring Process ── */}
      <section className="px-5 py-16 sm:px-8 lg:px-[5%] lg:py-24">
        <div className="mx-auto max-w-[1200px]">
          <p className={labelClass}>Our Hiring Process</p>
          <h2 className="mt-4 font-serif text-[clamp(1.7rem,3.5vw,2.5rem)] font-normal leading-[1.22] text-gray-900">
            Four steps, no games
          </h2>

          <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {hiringSteps.map((step, index) => (
              <div key={step.step} className="relative">
                {/* Connecting Line (Desktop) */}
                {index !== hiringSteps.length - 1 && (
                  <div className="absolute left-[24px] top-6 hidden h-px w-[calc(100%-16px)] bg-pink-200 lg:block" />
                )}

                <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-[#e91e63] font-serif text-xl text-white shadow-sm ring-8 ring-white">
                  {step.step}
                </div>

                <h3 className="mt-6 text-[16px] font-semibold text-gray-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-[14px] leading-[1.7] text-gray-500">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQs ── */}
      <section className="border-t border-gray-100 bg-gray-50 px-5 py-16 sm:px-8 lg:px-[5%] lg:py-24">
        <div className="mx-auto max-w-[800px]">
          <div className="text-center">
            <p className={labelClass}>Questions</p>
            <h2 className="mt-4 font-serif text-[clamp(1.7rem,3.5vw,2.5rem)] font-normal leading-[1.22] text-gray-900">
              Careers FAQs
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

      {/* ── Footer CTA ── */}
      <section className="px-5 py-16 text-center sm:px-8 sm:py-20 lg:py-24">
        <p className={labelClass}>Don't See Your Role?</p>

        <h2 className="mx-auto mt-4 max-w-xl font-serif text-[clamp(1.7rem,4vw,2.5rem)] font-normal leading-[1.2] text-gray-900">
          We'd still love to hear from you.
        </h2>

        <p className="mx-auto mt-4 max-w-md text-[15px] leading-[1.8] text-gray-500">
          Send your CV and a short note about what you'd love to work on. We
          read every message personally.
        </p>

        <div className="mt-8">
          <a
            href="mailto:careers@himaanix.com"
            className="inline-flex items-center gap-2.5 rounded-lg bg-[#e91e63] px-9 py-4 text-[12px] font-bold uppercase tracking-[0.14em] text-white transition-all duration-300 hover:bg-[#c41050] hover:shadow-[0_6px_20px_rgba(233,30,99,0.3)]"
          >
            Email Careers Team
            <span className="text-sm">→</span>
          </a>
        </div>
      </section>
    </main>
  );
}