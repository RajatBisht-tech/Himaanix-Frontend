import { useState } from "react";
import { Link } from "react-router-dom";

// --- DATA ---

const highlights = [
  {
    title: "Free Shipping",
    description: "On orders above ₹2,999",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 18H3c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v11" />
        <path d="M14 9h4l4 4v4c0 .6-.4 1-1 1h-2" />
        <circle cx="7" cy="18" r="2" />
        <path d="M15 18H9" />
        <circle cx="17" cy="18" r="2" />
      </svg>
    ),
  },
  {
    title: "Fast Dispatch",
    description: "Within 24–48 hours",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    title: "Ships Worldwide",
    description: "40+ countries",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        <path d="M2 12h20" />
      </svg>
    ),
  },
  {
    title: "Insured Delivery",
    description: "Every parcel, every time",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
];

const options = [
  {
    title: "Standard Delivery",
    speed: "3–5 business days",
    price: "Free on orders above ₹2,999",
    subtext: "₹99 for orders below ₹2,999",
    availability: "Available across all serviceable PIN codes in India",
  },
  {
    title: "Express Delivery",
    speed: "1–2 business days",
    price: "₹199 flat",
    subtext: "Metro cities only",
    availability: "Mumbai, Delhi, Bengaluru, Hyderabad, Chennai, Kolkata, Pune",
  },
  {
    title: "International Shipping",
    speed: "7–14 business days",
    price: "Calculated at checkout",
    subtext: "Duties & taxes included",
    availability: "Shipping to 40+ countries worldwide",
  },
  {
    title: "Store Pickup",
    speed: "Ready in 24 hours",
    price: "Free",
    subtext: "Select flagship stores",
    availability: "Mumbai, Delhi, Bengaluru",
  },
];

const steps = [
  {
    num: "1",
    title: "Order Placed",
    description: "You receive an instant confirmation email and SMS with your order number.",
  },
  {
    num: "2",
    title: "Processing",
    description: "We pick, quality-check, and pack your order within 24–48 hours.",
  },
  {
    num: "3",
    title: "Shipped",
    description: "You get a tracking link via email and SMS the moment your parcel leaves our studio.",
  },
  {
    num: "4",
    title: "Delivered",
    description: "Signature required on delivery. You'll be notified an hour before arrival.",
  },
];

const faqs = [
  {
    q: "How can I track my order?",
    a: "Once your order is shipped, you will receive an email and SMS containing a tracking link. You can also track the live status of your order directly from the 'Account' section on our website.",
  },
  {
    q: "Do you deliver to my PIN code?",
    a: "We deliver to almost all PIN codes across India via our trusted courier partners. You can enter your PIN code on any product page or at checkout to verify serviceability instantly.",
  },
  {
    q: "What are the shipping charges?",
    a: "Standard delivery is completely free for all orders above ₹2,999 (and ₹99 for orders below). Express delivery is available for ₹199 in select metro cities. International shipping rates vary by region and are calculated at checkout.",
  },
  {
    q: "Can I change my delivery address after ordering?",
    a: "Yes, you can update your delivery address, provided your order hasn't been dispatched yet. Please contact our customer support team as soon as possible with your order number to request the change.",
  },
  {
    q: "What if I'm not available at delivery time?",
    a: "Don't worry. Our delivery partners will attempt to deliver your parcel up to 3 times. If you miss the first attempt, they will usually contact you via phone or SMS to reschedule for a convenient time.",
  },
  {
    q: "Do you offer Cash on Delivery (COD)?",
    a: "Yes, Cash on Delivery is available for the majority of PIN codes in India for orders up to ₹10,000. Please note that a nominal convenience fee of ₹50 may apply to COD orders.",
  },
  {
    q: "What about customs and duties on international orders?",
    a: "To ensure a smooth delivery experience, all applicable duties, taxes, and customs fees are calculated and included at checkout. You will not be asked to pay any unexpected additional charges upon delivery.",
  },
  {
    q: "Can I return my order?",
    a: "Absolutely. We offer a hassle-free 14-day return and exchange policy for domestic orders. The item must be unused, with all original tags attached. For more details, please view our Returns & Exchanges page.",
  },
];

const labelClass =
  "text-[11px] font-semibold uppercase tracking-[0.22em] text-[#e91e63]";

export default function Shipping() {
  const [openFaq, setOpenFaq] = useState(0);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <main className="overflow-hidden bg-white text-gray-900">
      {/* ── Hero ── */}
      <section className="px-5 pb-12 pt-10 sm:px-8 sm:pb-16 sm:pt-12 lg:px-[5%]">
        <div className="mx-auto max-w-[1200px]">
          <p className={labelClass}>HIMAANIX / SHIPPING</p>

          <h1 className="mt-5 max-w-3xl font-serif text-[clamp(1.9rem,4.5vw,3.25rem)] font-normal leading-[1.18] tracking-[-0.025em] text-gray-900">
            Shipping & Delivery
          </h1>

          <p className="mt-6 max-w-2xl text-[15px] leading-[1.85] text-gray-500 sm:text-base">
            Everything you need to know about how, when, and where your HIMAANIX
            order will reach you — safely and on time.
          </p>
        </div>
      </section>

      {/* ── Highlights Grid ── */}
      <section className="border-t border-gray-100 bg-gray-50 px-5 py-12 sm:px-8 lg:px-[5%] lg:py-16">
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

      {/* ── Delivery Options ── */}
      <section className="px-5 py-16 sm:px-8 lg:px-[5%] lg:py-24">
        <div className="mx-auto max-w-[1200px]">
          <p className={labelClass}>Delivery Options</p>
          <h2 className="mt-4 font-serif text-[clamp(1.7rem,3.5vw,2.5rem)] font-normal leading-[1.22] text-gray-900">
            Choose the speed that suits you
          </h2>

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:gap-8">
            {options.map((option) => (
              <article
                key={option.title}
                className="group flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-pink-200 hover:shadow-[0_8px_30px_rgba(233,30,99,0.08)] sm:p-9"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <h3 className="font-serif text-[22px] font-normal text-gray-900">
                      {option.title}
                    </h3>
                    <span className="inline-flex rounded-full bg-pink-50 px-3 py-1 text-[11px] font-bold tracking-wide text-[#e91e63]">
                      {option.speed}
                    </span>
                  </div>

                  <div className="mt-6 space-y-4 text-[14px]">
                    <div className="flex items-start gap-3">
                      <svg className="mt-0.5 h-4 w-4 shrink-0 text-[#e91e63]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <div>
                        <p className="font-medium text-gray-900">{option.price}</p>
                        <p className="text-gray-500">{option.subtext}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <svg className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <p className="text-gray-500">{option.availability}</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="bg-gray-50 px-5 py-16 sm:px-8 lg:px-[5%] lg:py-24">
        <div className="mx-auto max-w-[1200px]">
          <p className={labelClass}>How It Works</p>
          <h2 className="mt-4 font-serif text-[clamp(1.7rem,3.5vw,2.5rem)] font-normal leading-[1.22] text-gray-900">
            From our studio to your doorstep
          </h2>

          <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {steps.map((step, index) => (
              <div key={step.num} className="relative">
                {/* Connecting Line (Desktop) */}
                {index !== steps.length - 1 && (
                  <div className="absolute left-[24px] top-6 hidden h-px w-[calc(100%-16px)] bg-pink-200 lg:block" />
                )}

                <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-[#e91e63] font-serif text-xl text-white shadow-sm ring-8 ring-gray-50">
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

      {/* ── International Customers Banner ── */}
      <section className="px-5 py-12 sm:px-8 lg:px-[5%]">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-8 rounded-2xl bg-[#fff0f5] p-8 sm:p-12 md:flex-row">
          <div className="md:max-w-xl">
            <h3 className="font-serif text-2xl font-normal text-gray-900 sm:text-3xl">
              International Customers
            </h3>
            <p className="mt-4 text-[15px] leading-[1.8] text-gray-600">
              We ship to over 40 countries worldwide. All applicable duties and taxes
              are calculated at checkout, so there are no surprises when your parcel
              arrives. International orders typically reach you within 7–14 business days.
            </p>
          </div>
          <svg className="h-24 w-24 shrink-0 text-[#e91e63] opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </section>

      {/* ── FAQ Section ── */}
      <section className="px-5 py-16 sm:px-8 lg:px-[5%] lg:py-24">
        <div className="mx-auto max-w-[800px]">
          <div className="text-center">
            <p className={labelClass}>Ask About Shipping</p>
            <h2 className="mt-4 font-serif text-[clamp(1.7rem,3.5vw,2.5rem)] font-normal leading-[1.22] text-gray-900">
              Questions & Answers
            </h2>
          </div>

          <div className="mt-12 space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className={`rounded-xl border transition-colors duration-300 ${
                    isOpen ? "border-pink-200 bg-white shadow-sm" : "border-gray-100 bg-white hover:border-pink-100"
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
                        isOpen ? "rotate-180 bg-pink-50 text-[#e91e63]" : "text-gray-400"
                      }`}
                    >
                      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </button>
                  
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
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

      {/* ── CTA ── */}
      <section className="border-t border-gray-100 bg-gray-50 px-5 py-16 text-center sm:px-8 sm:py-20">
        <h2 className="mx-auto max-w-xl font-serif text-[clamp(1.7rem,4vw,2.2rem)] font-normal leading-[1.2] text-gray-900">
          Still need help with your order?
        </h2>
        <p className="mt-4 text-[15px] text-gray-500">
          Our customer service team is here to assist you.
        </p>
        <Link
          to="/contact"
          className="mt-8 inline-flex items-center gap-2.5 rounded-lg border-2 border-gray-900 px-8 py-3 text-[12px] font-bold uppercase tracking-[0.14em] text-gray-900 transition-all duration-300 hover:bg-gray-900 hover:text-white"
        >
          Contact Support
        </Link>
      </section>
    </main>
  );
}