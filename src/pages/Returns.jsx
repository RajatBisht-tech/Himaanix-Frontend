import { useState } from "react";
import { Link } from "react-router-dom";

// --- DATA ---

const highlights = [
  {
    title: "30-Day Returns",
    description: "From date of delivery",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
        <path d="M3 3v5h5" />
      </svg>
    ),
  },
  {
    title: "Easy Process",
    description: "4 simple steps",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
  {
    title: "Free Pickup",
    description: "On all returns in India",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" rx="2" />
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
  {
    title: "Fast Refunds",
    description: "Within 5–7 business days",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
];

const steps = [
  {
    num: "1",
    title: "Raise a Request",
    description:
      "Log into your account and raise a return request from the Orders section, or email us at returns@himaanix.com with your order number.",
  },
  {
    num: "2",
    title: "Pack Your Item",
    description:
      "Place the item back in its original packaging with all tags attached. Include the return slip we email you.",
  },
  {
    num: "3",
    title: "Schedule Pickup",
    description:
      "Choose a convenient date and time for pickup. Our courier partner will collect the parcel from your doorstep — free of charge.",
  },
  {
    num: "4",
    title: "Get Refunded",
    description:
      "Once we receive and inspect the item, your refund is processed within 5–7 business days to your original payment method.",
  },
];

const eligibleItems = [
  "Unworn, unwashed items in original condition",
  "Items with all original tags attached",
  "Items in their original packaging",
  "Returns raised within 30 days of delivery",
  "Items with a valid proof of purchase",
];

const nonEligibleItems = [
  "Worn, washed, or altered items",
  "Items with removed or damaged tags",
  "Intimate wear, swimwear, and innerwear",
  "Personalized or custom-made items",
  "Items marked as 'Final Sale' at purchase",
];

const timeline = [
  { method: "Credit / Debit Card", duration: "5–7 business days" },
  { method: "UPI / Net Banking", duration: "3–5 business days" },
  { method: "Original Store Credit", duration: "Instant" },
  { method: "Cash on Delivery Refund", duration: "5–7 business days (bank transfer)" },
];

const trustBadges = [
  {
    title: "100% Secure Refunds",
    text: "Every refund is tracked and confirmed by our support team.",
  },
  {
    title: "No Hidden Charges",
    text: "Free returns, no restocking fees. Ever.",
  },
  {
    title: "Quick Turnaround",
    text: "Most returns are resolved within one week.",
  },
];

const faqs = [
  {
    q: "How long do I have to return an item?",
    a: "You have 30 days from the date of delivery to initiate a return request for eligible items.",
  },
  {
    q: "Is return shipping free?",
    a: "Yes, we offer 100% free doorstep pickup for all domestic return requests across India.",
  },
  {
    q: "How long does the refund take?",
    a: "Refunds are processed within 5–7 business days after the item reaches our studio and passes quality inspection.",
  },
  {
    q: "Can I exchange instead of returning?",
    a: "Yes! You can choose an exchange for a different size or color directly during the return request process in your account.",
  },
  {
    q: "What if I received a damaged or wrong item?",
    a: "Please notify us within 48 hours of delivery at returns@himaanix.com with photos of the issue. We will arrange an immediate priority replacement or refund.",
  },
  {
    q: "Do you accept returns on sale items?",
    a: "Yes, items purchased during seasonal sales are eligible for return unless explicitly marked as 'Final Sale' at purchase.",
  },
  {
    q: "Can I return part of my order?",
    a: "Absolutely. You can select specific individual items to return from a multi-item order.",
  },
  {
    q: "How will I know my return is received?",
    a: "You will receive an automated email and SMS confirmation as soon as your return package arrives at our warehouse and is scanned in.",
  },
];

const labelClass =
  "text-[11px] font-semibold uppercase tracking-[0.22em] text-[#e91e63]";

export default function Returns() {
  const [openFaq, setOpenFaq] = useState(0);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <main className="overflow-hidden bg-white text-gray-900">
      {/* ── Hero ── */}
      <section className="border-b border-gray-100 px-5 pb-14 pt-10 sm:px-8 sm:pb-16 sm:pt-12 lg:px-[5%]">
        <div className="mx-auto max-w-[1200px]">
          <p className={labelClass}>HIMAANIX / RETURNS</p>

          <h1 className="mt-5 max-w-3xl font-serif text-[clamp(1.9rem,4.5vw,3.25rem)] font-normal leading-[1.18] tracking-[-0.025em] text-gray-900">
            Returns & Refunds
          </h1>

          <p className="mt-6 max-w-2xl text-[15px] leading-[1.85] text-gray-500 sm:text-base">
            Not quite right? No problem. We offer 30-day easy returns on all
            eligible items — because finding the perfect piece should feel
            effortless.
          </p>
        </div>
      </section>

      {/* ── Highlights Grid ── */}
      <section className="bg-gray-50 px-5 py-12 sm:px-8 lg:px-[5%] lg:py-16">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {highlights.map((item) => (
            <div
              key={item.title}
              className="flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-6 shadow-sm"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-pink-50 text-[#e91e63]">
                {item.icon}
              </span>
              <div>
                <h3 className="text-[15px] font-semibold text-gray-900">
                  {item.title}
                </h3>
                <p className="mt-1 text-[13px] text-gray-500">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── How To Return ── */}
      <section className="px-5 py-16 sm:px-8 lg:px-[5%] lg:py-24">
        <div className="mx-auto max-w-[1200px]">
          <p className={labelClass}>How To Return</p>
          <h2 className="mt-4 font-serif text-[clamp(1.7rem,3.5vw,2.5rem)] font-normal leading-[1.22] text-gray-900">
            Four simple steps to send it back
          </h2>

          <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {steps.map((step, index) => (
              <div key={step.num} className="relative">
                {/* Connecting Line (Desktop) */}
                {index !== steps.length - 1 && (
                  <div className="absolute left-[24px] top-6 hidden h-px w-[calc(100%-16px)] bg-pink-200 lg:block" />
                )}

                <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-[#e91e63] font-serif text-xl text-white shadow-sm ring-8 ring-white">
                  {step.num}
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

      {/* ── Eligibility ── */}
      <section className="bg-gray-50 px-5 py-16 sm:px-8 lg:px-[5%] lg:py-24">
        <div className="mx-auto max-w-[1200px]">
          <p className={labelClass}>Eligibility</p>
          <h2 className="mt-4 font-serif text-[clamp(1.7rem,3.5vw,2.5rem)] font-normal leading-[1.22] text-gray-900">
            What can — and can't — be returned
          </h2>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
            {/* Eligible Card */}
            <div className="rounded-2xl border border-emerald-100 bg-white p-7 sm:p-9 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 font-bold">
                  ✓
                </span>
                <h3 className="font-serif text-2xl font-normal text-gray-900">
                  Eligible for Return
                </h3>
              </div>

              <ul className="mt-6 space-y-3.5 text-[14px] text-gray-600">
                {eligibleItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="mt-1 text-emerald-500 font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Non-Eligible Card */}
            <div className="rounded-2xl border border-rose-100 bg-white p-7 sm:p-9 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-50 text-rose-500 font-bold">
                  ✕
                </span>
                <h3 className="font-serif text-2xl font-normal text-gray-900">
                  Not Eligible
                </h3>
              </div>

              <ul className="mt-6 space-y-3.5 text-[14px] text-gray-600">
                {nonEligibleItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="mt-1 text-rose-400 font-bold">✕</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Warning Banner */}
          <div className="mt-8 rounded-xl border border-amber-200/60 bg-amber-50/60 p-5 text-[14px] leading-[1.7] text-amber-900">
            <strong>Important:</strong> Items must be returned in their original condition. We reserve the right to refuse a return if the item has been used, damaged, or is missing tags or packaging.
          </div>
        </div>
      </section>

      {/* ── Refund Timeline & Trust Badges ── */}
      <section className="px-5 py-16 sm:px-8 lg:px-[5%] lg:py-24">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            
            {/* Timeline Left */}
            <div className="lg:col-span-7">
              <p className={labelClass}>Refund Timeline</p>
              <h2 className="mt-4 font-serif text-[clamp(1.7rem,3.5vw,2.5rem)] font-normal leading-[1.22] text-gray-900">
                How long will my refund take?
              </h2>

              <div className="mt-8 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
                <div className="divide-y divide-gray-100">
                  {timeline.map((item) => (
                    <div
                      key={item.method}
                      className="flex flex-wrap items-center justify-between gap-2 p-5 text-[14px]"
                    >
                      <span className="font-medium text-gray-900">{item.method}</span>
                      <span className="font-semibold text-[#e91e63]">{item.duration}</span>
                    </div>
                  ))}
                </div>
              </div>

              <p className="mt-4 text-[13px] leading-[1.7] text-gray-500">
                Refunds are processed to the original payment method. Store credit is issued instantly and never expires.
              </p>
            </div>

            {/* Badges Right */}
            <div className="flex flex-col justify-center space-y-6 lg:col-span-5">
              {trustBadges.map((badge) => (
                <div
                  key={badge.title}
                  className="rounded-xl border border-pink-100 bg-[#fff0f5] p-6"
                >
                  <h3 className="font-serif text-lg font-normal text-gray-900">
                    {badge.title}
                  </h3>
                  <p className="mt-1 text-[13.5px] leading-[1.7] text-gray-600">
                    {badge.text}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── FAQ Section ── */}
      <section className="border-t border-gray-100 bg-gray-50 px-5 py-16 sm:px-8 lg:px-[5%] lg:py-24">
        <div className="mx-auto max-w-[800px]">
          <div className="text-center">
            <p className={labelClass}>Questions</p>
            <h2 className="mt-4 font-serif text-[clamp(1.7rem,3.5vw,2.5rem)] font-normal leading-[1.22] text-gray-900">
              Returns FAQs
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

      {/* ── Help / CTA ── */}
      <section className="px-5 py-16 text-center sm:px-8 sm:py-20 lg:py-24">
        <p className={labelClass}>Need Help With a Return?</p>

        <h2 className="mx-auto mt-4 max-w-xl font-serif text-[clamp(1.7rem,4vw,2.5rem)] font-normal leading-[1.2] text-gray-900">
          We're here to make it easy
        </h2>

        <p className="mx-auto mt-4 max-w-md text-[15px] leading-[1.8] text-gray-500">
          Reach out to our returns team and we'll guide you through every step.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="mailto:returns@himaanix.com"
            className="inline-flex items-center gap-2.5 rounded-lg bg-[#e91e63] px-8 py-3.5 text-[12px] font-bold uppercase tracking-[0.14em] text-white transition-all duration-300 hover:bg-[#c41050] hover:shadow-[0_6px_20px_rgba(233,30,99,0.3)]"
          >
            Email Returns Team
          </a>

          <Link
            to="/contact"
            className="inline-flex items-center gap-2.5 rounded-lg border border-gray-300 px-8 py-3.5 text-[12px] font-bold uppercase tracking-[0.14em] text-gray-800 transition-all duration-300 hover:border-gray-900 hover:bg-gray-900 hover:text-white"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </main>
  );
}