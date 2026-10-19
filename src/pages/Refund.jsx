import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// --- DATA ---

const highlights = [
  {
    title: "Transparent",
    description: "No hidden charges, ever",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Free Returns",
    description: "Within India, always",
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
    description: "As quick as 3 business days",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
];

const sections = [
  { id: "overview", number: "01", title: "Overview" },
  { id: "eligibility", number: "02", title: "Refund Eligibility" },
  { id: "non-refundable", number: "03", title: "Non-Refundable Items" },
  { id: "calculation", number: "04", title: "How Refunds Are Calculated" },
  { id: "timelines", number: "05", title: "Refund Timelines" },
  { id: "process", number: "06", title: "Refund Process" },
  { id: "exchanges", number: "07", title: "Exchanges" },
  { id: "delayed", number: "08", title: "Failed or Delayed Refunds" },
  { id: "cancellations", number: "09", title: "Order Cancellations" },
  { id: "changes", number: "10", title: "Changes to This Policy" },
  { id: "contact", number: "11", title: "Contact Us" },
];

const eligibilityConditions = [
  "The item is unworn, unwashed, and unaltered.",
  "All original tags are attached and intact.",
  "The item is returned in its original packaging.",
  "The return request was raised within 30 days of delivery.",
  "Proof of purchase (order number or invoice) is provided.",
];

const nonRefundableItems = [
  "Intimate wear, innerwear, and swimwear.",
  "Personalized or custom-made items.",
  "Items marked 'Final Sale' at the time of purchase.",
  "Gift cards and store credit vouchers.",
  "Items damaged by misuse, improper care, or alteration.",
];

const calculationRules = [
  {
    term: "Full Refund",
    text: "The full purchase price of the item is refunded when the entire order is returned and all eligibility conditions are met.",
  },
  {
    term: "Partial Refund",
    text: "A partial refund may be issued if the item is returned without its original packaging, or if a promotional discount was applied at the time of purchase and the item no longer meets the threshold for that discount.",
  },
  {
    term: "Shipping Charges",
    text: "Original shipping charges are refunded only if the return is due to a defect, damage, or an error on our part. For change-of-mind returns, shipping charges are non-refundable.",
  },
  {
    term: "Return Shipping",
    text: "Return pickup is free within India. For international orders, return shipping costs are borne by the customer and are non-refundable.",
  },
];

const refundTimelines = [
  {
    method: "Credit / Debit Card",
    duration: "5–7 business days",
    text: "Refunded to the original card used at checkout.",
  },
  {
    method: "UPI / Net Banking",
    duration: "3–5 business days",
    text: "Credited directly to the bank account or UPI ID used.",
  },
  {
    method: "Store Credit",
    duration: "Instant",
    text: "Issued as HIMAANIX credit. Never expires. Usable site-wide.",
  },
  {
    method: "Cash on Delivery (COD)",
    duration: "5–7 business days",
    text: "Refunded via bank transfer to the account details you provide.",
  },
];

const processSteps = [
  {
    title: "Return Received",
    text: "Your parcel arrives at our warehouse. You receive an acknowledgement within 24 hours.",
  },
  {
    title: "Quality Inspection",
    text: "Our team inspects the item against the eligibility criteria. This takes up to 48 hours.",
  },
  {
    title: "Approval",
    text: "If the item passes inspection, your refund is approved and initiated immediately.",
  },
  {
    title: "Processing",
    text: "The refund is sent to your payment provider. Processing time depends on the method (see timelines above).",
  },
  {
    title: "Confirmation",
    text: "You receive a final confirmation email once the refund has been successfully processed.",
  },
];

const labelClass =
  "text-[11px] font-semibold uppercase tracking-[0.22em] text-[#e91e63]";

const bodyClass = "text-[15px] leading-[1.9] text-gray-600";

// --- SMALL HELPERS ---

function PolicySection({ id, number, title, children }) {
  return (
    <section
      id={id}
      className="scroll-mt-28 border-b border-gray-100 py-10 first:pt-0 last:border-b-0 last:pb-0"
    >
      <div className="flex items-center gap-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-pink-50 text-[12px] font-bold tracking-[0.1em] text-[#e91e63]">
          {number}
        </span>
        <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-normal leading-[1.2] text-gray-900">
          {title}
        </h2>
      </div>
      <div className="mt-6 space-y-5">{children}</div>
    </section>
  );
}

function CheckList({ items, tone = "pink" }) {
  const isNegative = tone === "rose";
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-[15px] leading-[1.7] text-gray-600">
          <span
            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${
              isNegative ? "bg-rose-50 text-rose-500" : "bg-pink-50 text-[#e91e63]"
            }`}
          >
            {isNegative ? "✕" : "✓"}
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function RefundPolicy() {
  const [activeId, setActiveId] = useState(sections[0].id);

  // Highlight the TOC link for the section currently in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleTocClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveId(id);
    }
  };

  return (
    <main className="overflow-hidden bg-white text-gray-900">
      {/* ── Hero ── */}
      <section className="border-b border-gray-100 px-5 pb-14 pt-10 sm:px-8 sm:pb-16 sm:pt-12 lg:px-[5%]">
        <div className="mx-auto max-w-[1200px]">
          <p className={labelClass}>HIMAANIX / LEGAL</p>

          <h1 className="mt-5 max-w-3xl font-serif text-[clamp(1.9rem,4.5vw,3.25rem)] font-normal leading-[1.18] tracking-[-0.025em] text-gray-900">
            Refund Policy
          </h1>

          <p className="mt-6 max-w-2xl text-[15px] leading-[1.85] text-gray-500 sm:text-base">
            How we handle refunds — clearly, fairly, and without hidden charges.
          </p>

          <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-1.5 text-[12px] font-medium text-gray-500">
            <span className="h-1.5 w-1.5 rounded-full bg-[#e91e63]" />
            Last updated: September 16, 2026
          </p>
        </div>
      </section>

      {/* ── Highlights ── */}
      <section className="bg-gray-50 px-5 py-10 sm:px-8 lg:px-[5%] lg:py-12">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-4 sm:grid-cols-3 lg:gap-6">
          {highlights.map((item) => (
            <div
              key={item.title}
              className="flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-6 shadow-sm"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-pink-50 text-[#e91e63]">
                {item.icon}
              </span>
              <div>
                <h3 className="text-[15px] font-semibold text-gray-900">{item.title}</h3>
                <p className="mt-1 text-[13px] text-gray-500">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Policy body: sticky TOC + content ── */}
      <section className="px-5 py-14 sm:px-8 lg:px-[5%] lg:py-20">
        <div className="mx-auto grid max-w-[1200px] gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Table of contents */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-24">
              <nav
                aria-label="Table of contents"
                className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
              >
                <p className={labelClass}>Contents</p>

                <ul className="mt-5 space-y-1">
                  {sections.map((s) => {
                    const isActive = activeId === s.id;
                    return (
                      <li key={s.id}>
                        <a
                          href={`#${s.id}`}
                          onClick={(e) => handleTocClick(e, s.id)}
                          className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-[14px] transition-colors duration-200 ${
                            isActive
                              ? "bg-pink-50 font-medium text-[#e91e63]"
                              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                          }`}
                        >
                          <span
                            className={`text-[11px] font-bold tracking-[0.1em] ${
                              isActive ? "text-[#e91e63]" : "text-gray-400"
                            }`}
                          >
                            {s.number}
                          </span>
                          {s.title}
                        </a>
                      </li>
                    );
                  })}
                </ul>

                <p className="mt-5 border-t border-gray-100 pt-5 text-[13px] text-gray-500">
                  Need help with a refund?{" "}
                  <Link to="/contact" className="font-medium text-[#e91e63] hover:underline">
                    Contact us.
                  </Link>
                </p>
              </nav>
            </div>
          </aside>

          {/* Content */}
          <div className="lg:col-span-8">
            {/* 01 Overview */}
            <PolicySection id="overview" number="01" title="Overview">
              <p className={bodyClass}>
                At HIMAANIX, we want you to shop with complete confidence. If a purchase
                doesn't work out, we offer a straightforward refund process designed to be
                fast, transparent, and free of hidden charges.
              </p>
              <p className={bodyClass}>
                This Refund Policy explains when refunds are issued, how they are
                calculated, which payment methods we support, and how long each refund takes
                to reach you.
              </p>
              <p className={bodyClass}>
                This policy should be read together with our{" "}
                <Link to="/returns" className="font-medium text-[#e91e63] hover:underline">
                  Returns Policy
                </Link>
                , which covers eligibility, the return process, and timelines for sending
                items back.
              </p>
            </PolicySection>

            {/* 02 Eligibility */}
            <PolicySection id="eligibility" number="02" title="Refund Eligibility">
              <p className={bodyClass}>
                A refund is issued once a returned item has been received at our warehouse
                and passed a quality inspection. To qualify for a refund, the item must meet
                the following conditions:
              </p>
              <CheckList items={eligibilityConditions} />
            </PolicySection>

            {/* 03 Non-refundable */}
            <PolicySection id="non-refundable" number="03" title="Non-Refundable Items">
              <p className={bodyClass}>
                The following items are not eligible for refunds under any circumstance, in
                line with standard retail practice and hygiene regulations:
              </p>
              <CheckList items={nonRefundableItems} tone="rose" />

              <div className="rounded-xl border border-amber-200/60 bg-amber-50/60 p-5 text-[14px] leading-[1.7] text-amber-900">
                <strong>Please note:</strong> Items excluded from refunds are also excluded
                from exchanges. If you're unsure whether an item is eligible, contact us
                before placing your order.
              </div>
            </PolicySection>

            {/* 04 Calculation */}
            <PolicySection id="calculation" number="04" title="How Refunds Are Calculated">
              <p className={bodyClass}>
                Refund amounts are calculated based on the actual amount paid for the
                returned item. The following principles apply:
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {calculationRules.map((rule) => (
                  <div
                    key={rule.term}
                    className="rounded-xl border border-gray-100 bg-gray-50 p-5 transition-colors duration-300 hover:border-pink-200 hover:bg-white"
                  >
                    <h3 className="font-serif text-lg font-normal text-gray-900">
                      {rule.term}
                    </h3>
                    <p className="mt-2 text-[14px] leading-[1.75] text-gray-600">
                      {rule.text}
                    </p>
                  </div>
                ))}
              </div>
            </PolicySection>

            {/* 05 Timelines */}
            <PolicySection id="timelines" number="05" title="Refund Timelines">
              <p className={bodyClass}>
                Once your returned item passes inspection (typically within 48 hours of
                receipt at our warehouse), your refund is initiated immediately. The time it
                takes to reach you depends on your payment method:
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {refundTimelines.map((item) => (
                  <div
                    key={item.method}
                    className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-pink-200 hover:shadow-[0_8px_24px_rgba(233,30,99,0.07)]"
                  >
                    <h3 className="text-[15px] font-semibold text-gray-900">
                      {item.method}
                    </h3>
                    <span className="mt-3 inline-flex rounded-full bg-pink-50 px-3 py-1 text-[12px] font-bold text-[#e91e63]">
                      {item.duration}
                    </span>
                    <p className="mt-3 text-[13.5px] leading-[1.7] text-gray-500">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </PolicySection>

            {/* 06 Process */}
            <PolicySection id="process" number="06" title="Refund Process">
              <p className={bodyClass}>
                The refund process follows a fixed sequence, and you will be notified by
                email and SMS at every step:
              </p>
              <ol className="mt-2">
                {processSteps.map((step, index) => (
                  <li key={step.title} className="relative flex gap-4 pb-7 last:pb-0">
                    {index !== processSteps.length - 1 && (
                      <span className="absolute bottom-1 left-[15px] top-9 w-px bg-pink-200" />
                    )}
                    <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e91e63] font-serif text-[15px] text-white shadow-sm">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="text-[15px] font-semibold text-gray-900">
                        {step.title}
                      </h3>
                      <p className="mt-1 text-[14px] leading-[1.75] text-gray-500">
                        {step.text}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </PolicySection>

            {/* 07 Exchanges */}
            <PolicySection id="exchanges" number="07" title="Exchanges">
              <p className={bodyClass}>
                If you would prefer to exchange an item for a different size or colour
                rather than receive a refund, you may request an exchange subject to stock
                availability. Exchanges follow the same 30-day window as returns.
              </p>
              <p className={bodyClass}>
                If the exchange item is priced higher, you will be asked to pay the
                difference. If lower, the difference is refunded to your original payment
                method or issued as store credit — your choice.
              </p>
              <p className={bodyClass}>
                Exchanges are not available for items marked 'Final Sale' or for categories
                excluded from returns (see Section 03).
              </p>
            </PolicySection>

            {/* 08 Failed / delayed */}
            <PolicySection id="delayed" number="08" title="Failed or Delayed Refunds">
              <p className={bodyClass}>
                In rare cases, a refund may be delayed due to bank processing times,
                incorrect payment details, or technical issues at the payment provider. If
                your refund has not arrived within the stated timeline:
              </p>
              <ul className="space-y-3">
                {[
                  <>
                    First, check your bank statement or UPI app — refunds sometimes appear
                    with a slight delay or under an unfamiliar merchant name.
                  </>,
                  <>
                    If the refund is still missing after 10 business days, contact us at{" "}
                    <a
                      href="mailto:refunds@himaanix.com"
                      className="font-medium text-[#e91e63] hover:underline"
                    >
                      refunds@himaanix.com
                    </a>{" "}
                    with your order number and refund reference.
                  </>,
                  <>
                    If you provided incorrect bank details for a COD refund, we will reach
                    out to reconfirm. Refunds to incorrect accounts cannot be reversed by
                    HIMAANIX and must be resolved with your bank.
                  </>,
                ].map((content, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-[15px] leading-[1.8] text-gray-600"
                  >
                    <span className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#e91e63]" />
                    <span>{content}</span>
                  </li>
                ))}
              </ul>
            </PolicySection>

            {/* 09 Cancellations */}
            <PolicySection id="cancellations" number="09" title="Order Cancellations">
              <p className={bodyClass}>
                You may cancel an order free of charge at any time before it is dispatched.
                Once dispatched, the order cannot be cancelled — but you may return it after
                delivery, following our Returns Policy.
              </p>
              <p className={bodyClass}>
                If an order is cancelled before dispatch, a full refund (including any
                shipping charges) is issued immediately to your original payment method.
              </p>
              <p className={bodyClass}>
                HIMAANIX reserves the right to cancel an order in the event of stock
                unavailability, pricing errors, or suspected fraudulent activity. In such
                cases, a full refund is issued without delay.
              </p>
            </PolicySection>

            {/* 10 Changes */}
            <PolicySection id="changes" number="10" title="Changes to This Policy">
              <p className={bodyClass}>
                We may update this Refund Policy from time to time to reflect changes in our
                practices, technology, legal requirements, or operational needs. When we
                make material changes, we will update the 'Last Updated' date at the top of
                this page.
              </p>
              <p className={bodyClass}>
                Your continued use of the HIMAANIX website after any changes constitutes
                acceptance of the updated policy. We encourage you to review this page
                periodically.
              </p>
            </PolicySection>

            {/* 11 Contact */}
            <PolicySection id="contact" number="11" title="Contact Us">
              <p className={bodyClass}>
                If you have questions about this Refund Policy, or about a specific refund,
                our team is here to help.
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                <a
                  href="mailto:refunds@himaanix.com"
                  className="rounded-xl border border-gray-100 bg-gray-50 p-5 transition-colors duration-300 hover:border-pink-200 hover:bg-white"
                >
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-gray-400">
                    Email
                  </p>
                  <p className="mt-2 text-[15px] font-semibold text-gray-900">
                    refunds@himaanix.com
                  </p>
                </a>

                <a
                  href="tel:+919876543210"
                  className="rounded-xl border border-gray-100 bg-gray-50 p-5 transition-colors duration-300 hover:border-pink-200 hover:bg-white"
                >
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-gray-400">
                    Phone
                  </p>
                  <p className="mt-2 text-[15px] font-semibold text-gray-900">
                    +91 98765 43210
                  </p>
                  <p className="mt-0.5 text-[13px] text-gray-500">Mon–Sat, 10am–7pm IST</p>
                </a>
              </div>

              <p className={bodyClass}>
                You can also reach us through our{" "}
                <Link to="/contact" className="font-medium text-[#e91e63] hover:underline">
                  Contact page
                </Link>
                .
              </p>
            </PolicySection>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="border-t border-gray-100 bg-gray-50 px-5 py-16 text-center sm:px-8 sm:py-20 lg:py-24">
        <p className={labelClass}>Need a Refund Status?</p>

        <h2 className="mx-auto mt-4 max-w-xl font-serif text-[clamp(1.7rem,4vw,2.5rem)] font-normal leading-[1.2] text-gray-900">
          Our refunds team is one email away.
        </h2>

        <p className="mx-auto mt-4 max-w-lg text-[15px] leading-[1.8] text-gray-500">
          Share your order number and we'll look into it right away. Most refund queries
          are resolved within 24 hours.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="mailto:refunds@himaanix.com"
            className="inline-flex items-center gap-2.5 rounded-lg bg-[#e91e63] px-8 py-3.5 text-[12px] font-bold uppercase tracking-[0.14em] text-white transition-all duration-300 hover:bg-[#c41050] hover:shadow-[0_6px_20px_rgba(233,30,99,0.3)]"
          >
            Email Refunds Team
          </a>

          <Link
            to="/contact"
            className="inline-flex items-center gap-2.5 rounded-lg border border-gray-300 bg-white px-8 py-3.5 text-[12px] font-bold uppercase tracking-[0.14em] text-gray-800 transition-all duration-300 hover:border-gray-900 hover:bg-gray-900 hover:text-white"
          >
            Contact Us
          </Link>
        </div>

        {/* Related policies */}
        <div className="mx-auto mt-14 max-w-md border-t border-gray-200 pt-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400">
            Related Policies
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/returns"
              className="rounded-full border border-gray-200 bg-white px-5 py-2 text-[13px] font-medium text-gray-700 transition-colors hover:border-[#e91e63] hover:text-[#e91e63]"
            >
              Returns Policy
            </Link>
            <Link
              to="/shipping"
              className="rounded-full border border-gray-200 bg-white px-5 py-2 text-[13px] font-medium text-gray-700 transition-colors hover:border-[#e91e63] hover:text-[#e91e63]"
            >
              Shipping & Delivery
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}