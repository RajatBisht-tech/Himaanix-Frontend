import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// --- DATA ---

const highlights = [
  {
    title: "Plain Language",
    description: "No legal maze",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    title: "Fair Terms",
    description: "Balanced rights",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Indian Law",
    description: "Mumbai jurisdiction",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        <path d="M2 12h20" />
      </svg>
    ),
  },
  {
    title: "Your Rights",
    description: "Clear and honoured",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
];

const sections = [
  { id: "acceptance", number: "01", title: "Acceptance of Terms" },
  { id: "eligibility", number: "02", title: "Eligibility" },
  { id: "account", number: "03", title: "Your Account" },
  { id: "orders", number: "04", title: "Orders & Acceptance" },
  { id: "pricing", number: "05", title: "Pricing & Payment" },
  { id: "shipping", number: "06", title: "Shipping & Delivery" },
  { id: "returns", number: "07", title: "Returns, Refunds & Cancellations" },
  { id: "ip", number: "08", title: "Intellectual Property" },
  { id: "acceptable-use", number: "09", title: "Acceptable Use" },
  { id: "user-content", number: "10", title: "User Content & Reviews" },
  { id: "liability", number: "11", title: "Limitation of Liability" },
  { id: "indemnity", number: "12", title: "Indemnity" },
  { id: "termination", number: "13", title: "Termination" },
  { id: "governing-law", number: "14", title: "Governing Law & Disputes" },
  { id: "changes", number: "15", title: "Changes to These Terms" },
  { id: "contact", number: "16", title: "Contact Us" },
];

const accountRules = [
  "You are responsible for maintaining the confidentiality of your login credentials.",
  "You are responsible for all activity that occurs under your account.",
  "You must notify us immediately of any unauthorised use or security breach.",
  "We reserve the right to suspend or terminate accounts that violate these Terms.",
];

const orderRefusalReasons = [
  "Product unavailability or stock errors.",
  "Pricing or description errors on the website.",
  "Suspected fraud or unauthorised transactions.",
  "Failure to meet eligibility criteria in these Terms.",
];

const prohibitedUses = [
  "Violate any applicable law or regulation.",
  "Post or transmit any harmful, abusive, or fraudulent content.",
  "Attempt to gain unauthorised access to our systems or accounts.",
  "Use automated tools to scrape, copy, or misuse the Services.",
  "Impersonate HIMAANIX, its team, or any other person.",
  "Interfere with the security, integrity, or performance of the Services.",
];

const labelClass =
  "text-[11px] font-semibold uppercase tracking-[0.22em] text-[#e91e63]";

const bodyClass = "text-[15px] leading-[1.9] text-gray-600";

// --- SUB-COMPONENTS ---

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

export default function Terms() {
  const [activeId, setActiveId] = useState(sections[0].id);

  // ScrollSpy for TOC highlighting
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
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
            Terms & Conditions
          </h1>

          <p className="mt-6 max-w-2xl text-[15px] leading-[1.85] text-gray-500 sm:text-base">
            The rules that govern your use of HIMAANIX — written in plain language,
            without the legal maze.
          </p>

          <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-1.5 text-[12px] font-medium text-gray-500">
            <span className="h-1.5 w-1.5 rounded-full bg-[#e91e63]" />
            Last updated: September 16, 2026
          </p>
        </div>
      </section>

      {/* ── Highlights ── */}
      <section className="bg-gray-50 px-5 py-10 sm:px-8 lg:px-[5%] lg:py-12">
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

      {/* ── Main Policy Content with Sticky TOC ── */}
      <section className="px-5 py-14 sm:px-8 lg:px-[5%] lg:py-20">
        <div className="mx-auto grid max-w-[1200px] gap-10 lg:grid-cols-12 lg:gap-14">
          
          {/* Table of contents (Sticky Sidebar) */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-24">
              <nav
                aria-label="Table of contents"
                className="max-h-[calc(100vh-8rem)] overflow-y-auto rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
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
                          className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-[13.5px] transition-colors duration-200 ${
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
                          <span className="truncate">{s.title}</span>
                        </a>
                      </li>
                    );
                  })}
                </ul>

                <p className="mt-5 border-t border-gray-100 pt-5 text-[13px] text-gray-500">
                  Questions about these terms?{" "}
                  <Link
                    to="/contact"
                    className="font-medium text-[#e91e63] hover:underline"
                  >
                    Contact us.
                  </Link>
                </p>
              </nav>
            </div>
          </aside>

          {/* Policy Text Column */}
          <div className="lg:col-span-8">
            
            {/* 01 Acceptance of Terms */}
            <PolicySection id="acceptance" number="01" title="Acceptance of Terms">
              <p className={bodyClass}>
                Welcome to HIMAANIX. These Terms & Conditions ("Terms") govern your
                access to and use of the HIMAANIX website, mobile experience, and any
                related services (collectively, the "Services").
              </p>
              <p className={bodyClass}>
                By accessing or using the Services, creating an account, or placing an
                order, you agree to be bound by these Terms. If you do not agree,
                please discontinue use of the Services immediately.
              </p>
              <p className={bodyClass}>
                We may update these Terms from time to time. Material changes will be
                reflected in the 'Last Updated' date at the top of this page. Your
                continued use of the Services after any change constitutes acceptance
                of the revised Terms.
              </p>
            </PolicySection>

            {/* 02 Eligibility */}
            <PolicySection id="eligibility" number="02" title="Eligibility">
              <p className={bodyClass}>
                To use the Services, you must be at least 18 years of age, or the age
                of legal majority in your jurisdiction, and capable of entering into
                a binding contract.
              </p>
              <p className={bodyClass}>
                If you are using the Services on behalf of a business or organisation,
                you represent that you have the authority to bind that entity to
                these Terms.
              </p>
              <p className={bodyClass}>
                By using the Services, you confirm that all information you provide is
                accurate, current, and complete, and that you will keep it updated.
              </p>
            </PolicySection>

            {/* 03 Your Account */}
            <PolicySection id="account" number="03" title="Your Account">
              <p className={bodyClass}>
                To access certain features — such as saved addresses, order history, and
                wishlists — you may need to create an account. When you do:
              </p>

              <ul className="space-y-3">
                {accountRules.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-[15px] leading-[1.8] text-gray-600">
                    <span className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#e91e63]" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>

              <div className="rounded-xl border border-pink-100 bg-[#fff0f5] p-5 text-[14px] leading-[1.7] text-gray-700">
                <strong className="text-gray-900">Security tip:</strong> Use a strong, unique
                password and enable two-factor authentication where available. Never share
                your login credentials.
              </div>
            </PolicySection>

            {/* 04 Orders & Acceptance */}
            <PolicySection id="orders" number="04" title="Orders & Acceptance">
              <p className={bodyClass}>
                All orders placed through the Services are subject to acceptance by
                HIMAANIX. Once you place an order, you will receive an email confirming
                receipt — this is not an acceptance of your order, but a record of it.
              </p>
              <p className={bodyClass}>
                Acceptance occurs only when we dispatch the order and send you a shipping
                confirmation. Until then, we reserve the right to refuse or cancel any order
                for reasons including:
              </p>

              <ul className="space-y-3">
                {orderRefusalReasons.map((reason, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-[15px] leading-[1.8] text-gray-600">
                    <span className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#e91e63]" />
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>

              <p className={bodyClass}>
                Orders placed on weekends or public holidays are processed on the next
                business day. You'll receive a dispatch confirmation with tracking
                details once your parcel ships.
              </p>
            </PolicySection>

            {/* 05 Pricing & Payment */}
            <PolicySection id="pricing" number="05" title="Pricing & Payment">
              <p className={bodyClass}>
                All prices displayed on the Services are in Indian Rupees (INR) unless
                otherwise stated, and are inclusive of applicable taxes unless specified at
                checkout.
              </p>
              <p className={bodyClass}>
                Prices are subject to change without notice. The price applicable to your
                order is the price displayed at the time you complete checkout.
              </p>
              <p className={bodyClass}>
                We accept a range of payment methods including credit/debit cards, UPI, net
                banking, and Cash on Delivery (where available). All payments are
                processed through secure, PCI-DSS compliant gateways.
              </p>
              <p className={bodyClass}>
                In the event of a pricing error, we reserve the right to cancel the order and
                issue a full refund — you will be notified before any charge is made
                where possible.
              </p>
            </PolicySection>

            {/* 06 Shipping & Delivery */}
            <PolicySection id="shipping" number="06" title="Shipping & Delivery">
              <p className={bodyClass}>
                Shipping timelines, charges, and serviceable locations are set out in our{" "}
                <Link to="/shipping" className="font-medium text-[#e91e63] hover:underline">
                  Shipping & Delivery page
                </Link>
                , which forms part of these Terms.
              </p>
              <p className={bodyClass}>
                Once an order has been dispatched, risk of loss or damage passes to you.
                If your parcel arrives damaged, please contact us within 48 hours of delivery
                so we can resolve it promptly.
              </p>
              <p className={bodyClass}>
                Delivery timelines are estimates and may vary due to factors outside our
                control, including courier delays, weather, or public holidays.
              </p>
            </PolicySection>

            {/* 07 Returns, Refunds & Cancellations */}
            <PolicySection id="returns" number="07" title="Returns, Refunds & Cancellations">
              <p className={bodyClass}>
                Our{" "}
                <Link to="/returns" className="font-medium text-[#e91e63] hover:underline">
                  Returns & Refunds policy
                </Link>{" "}
                and{" "}
                <Link to="/refund-policy" className="font-medium text-[#e91e63] hover:underline">
                  Refund Policy
                </Link>{" "}
                form part of these Terms and set out your rights and obligations when
                returning or cancelling orders.
              </p>
              <p className={bodyClass}>
                By placing an order, you agree to be bound by the eligibility criteria,
                timelines, and procedures described in those policies.
              </p>
              <p className={bodyClass}>
                We reserve the right to refuse returns that do not meet the eligibility
                conditions, including items that have been worn, washed, or damaged after
                delivery.
              </p>
            </PolicySection>

            {/* 08 Intellectual Property */}
            <PolicySection id="ip" number="08" title="Intellectual Property">
              <p className={bodyClass}>
                All content on the Services — including but not limited to text, images,
                graphics, logos, product photography, design elements, code, and the HIMAANIX
                name — is owned by or licensed to HIMAANIX and protected by Indian and
                international intellectual property laws.
              </p>
              <p className={bodyClass}>
                You may not reproduce, distribute, modify, republish, sell, or exploit any
                part of the Services for commercial purposes without our prior written
                consent.
              </p>
              <p className={bodyClass}>
                You may share links to our products or pages for personal, non-commercial use.
                Any other use requires our express permission.
              </p>
            </PolicySection>

            {/* 09 Acceptable Use */}
            <PolicySection id="acceptable-use" number="09" title="Acceptable Use">
              <p className={bodyClass}>
                You agree not to use the Services in any way that is unlawful, harmful, or
                interferes with the experience of other users. Specifically, you must not:
              </p>

              <ul className="space-y-3">
                {prohibitedUses.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-[15px] leading-[1.8] text-gray-600">
                    <span className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#e91e63]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="rounded-xl border border-rose-200/80 bg-rose-50/60 p-5 text-[14px] leading-[1.7] text-rose-900">
                <strong>Consequences:</strong> Violations of acceptable use may result in
                immediate suspension or termination of your account, and where appropriate,
                legal action.
              </div>
            </PolicySection>

            {/* 10 User Content & Reviews */}
            <PolicySection id="user-content" number="10" title="User Content & Reviews">
              <p className={bodyClass}>
                You may be able to submit reviews, comments, photos, or other content
                ("User Content") through the Services. By submitting User Content, you grant
                HIMAANIX a non-exclusive, royalty-free, worldwide, perpetual licence to use,
                reproduce, and display it in connection with the Services.
              </p>
              <p className={bodyClass}>
                You represent that you own or have the right to share any User Content you
                submit, and that it does not violate any third-party rights or applicable laws.
              </p>
              <p className={bodyClass}>
                We reserve the right to remove any User Content that we deem inappropriate,
                misleading, or in violation of these Terms, without notice.
              </p>
            </PolicySection>

            {/* 11 Limitation of Liability */}
            <PolicySection id="liability" number="11" title="Limitation of Liability">
              <p className={bodyClass}>
                To the maximum extent permitted by law, HIMAANIX, its directors, employees,
                and partners shall not be liable for any indirect, incidental, special,
                consequential, or punitive damages arising out of or related to your use of
                the Services.
              </p>
              <p className={bodyClass}>
                Our total liability for any claim arising from your use of the Services shall
                not exceed the amount you paid for the product or service giving rise to the
                claim.
              </p>
              <p className={bodyClass}>
                Nothing in these Terms excludes or limits liability that cannot be excluded or
                limited under applicable law, including liability for fraud, death, or
                personal injury caused by our negligence.
              </p>
            </PolicySection>

            {/* 12 Indemnity */}
            <PolicySection id="indemnity" number="12" title="Indemnity">
              <p className={bodyClass}>
                You agree to indemnify, defend, and hold harmless HIMAANIX and its officers,
                directors, employees, and agents from any claims, liabilities, damages,
                losses, or expenses (including reasonable legal fees) arising from:
              </p>

              <ul className="space-y-3">
                {[
                  "Your breach of these Terms.",
                  "Your violation of any law or third-party right.",
                  "Any User Content you submit through the Services.",
                  "Your misuse of the Services or any products purchased through them.",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-[15px] leading-[1.8] text-gray-600">
                    <span className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#e91e63]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </PolicySection>

            {/* 13 Termination */}
            <PolicySection id="termination" number="13" title="Termination">
              <p className={bodyClass}>
                We may suspend or terminate your access to the Services at any time, with
                or without notice, if we believe you have violated these Terms or engaged in
                conduct that harms HIMAANIX or other users.
              </p>
              <p className={bodyClass}>
                You may stop using the Services at any time. If you wish to close your
                account, contact us at{" "}
                <a href="mailto:privacy@himaanix.com" className="font-medium text-[#e91e63] hover:underline">
                  privacy@himaanix.com
                </a>
                .
              </p>
              <p className={bodyClass}>
                Sections of these Terms that by their nature should survive termination —
                including Intellectual Property, Limitation of Liability, Indemnity, and
                Governing Law — will continue to apply.
              </p>
            </PolicySection>

            {/* 14 Governing Law & Disputes */}
            <PolicySection id="governing-law" number="14" title="Governing Law & Disputes">
              <p className={bodyClass}>
                These Terms are governed by and construed in accordance with the laws of
                India, without regard to its conflict of law provisions.
              </p>
              <p className={bodyClass}>
                Any dispute arising out of or relating to these Terms or the Services shall
                be subject to the exclusive jurisdiction of the courts of Mumbai,
                Maharashtra, India.
              </p>

              <div className="rounded-xl border border-pink-100 bg-[#fff0f5] p-5 text-[14px] leading-[1.7] text-gray-700">
                <strong className="text-gray-900">Amicable resolution:</strong> Before
                initiating any formal proceedings, please reach out to us at{" "}
                <a href="mailto:legal@himaanix.com" className="font-semibold text-[#e91e63] hover:underline">
                  legal@himaanix.com
                </a>{" "}
                — we'll always try to resolve matters fairly and quickly.
              </div>
            </PolicySection>

            {/* 15 Changes to These Terms */}
            <PolicySection id="changes" number="15" title="Changes to These Terms">
              <p className={bodyClass}>
                We may update these Terms from time to time to reflect changes in our
                practices, technology, legal requirements, or operational needs. When we make
                material changes, we will update the 'Last Updated' date at the top of this
                page.
              </p>
              <p className={bodyClass}>
                If the changes are significant, we may also notify you by email or by a
                prominent notice on the Services. Your continued use of the Services after
                any change constitutes acceptance of the revised Terms.
              </p>
            </PolicySection>

            {/* 16 Contact Us */}
            <PolicySection id="contact" number="16" title="Contact Us">
              <p className={bodyClass}>
                If you have questions about these Terms, or about a specific order, our
                team is here to help.
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                <a
                  href="mailto:himaanixtrading@gmail.com"
                  className="rounded-xl border border-gray-100 bg-gray-50 p-5 transition-colors duration-300 hover:border-pink-200 hover:bg-white"
                >
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-gray-400">
                    Email
                  </p>
                  <p className="mt-2 text-[15px] font-semibold text-gray-900 break-words">
                    himaanixtrading@gmail.com
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
                  <p className="mt-0.5 text-[13px] text-gray-500">
                    Mon–Sat, 10am–7pm IST
                  </p>
                </a>
              </div>

              <p className={bodyClass}>
                You can also reach us through our{" "}
                <Link to="/contact" className="font-medium text-[#e91e63] hover:underline">
                  Contact page
                </Link>
                . We aim to respond to all enquiries within 2 business days.
              </p>
            </PolicySection>

          </div>
        </div>
      </section>

      {/* ── CTA & Related Policies ── */}
      <section className="border-t border-gray-100 bg-gray-50 px-5 py-16 text-center sm:px-8 sm:py-20 lg:py-24">
        <p className={labelClass}>Legal Enquiries</p>

        <h2 className="mx-auto mt-4 max-w-xl font-serif text-[clamp(1.7rem,4vw,2.5rem)] font-normal leading-[1.2] text-gray-900">
          Have a question about these terms?
        </h2>

        <p className="mx-auto mt-4 max-w-lg text-[15px] leading-[1.8] text-gray-500">
          Our legal team reviews every enquiry personally. For order- or account-related
          questions, our customer support team responds fastest.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="mailto:himaanixtrading@gmail.com"
            className="inline-flex items-center gap-2.5 rounded-lg bg-[#e91e63] px-8 py-3.5 text-[12px] font-bold uppercase tracking-[0.14em] text-white transition-all duration-300 hover:bg-[#c41050] hover:shadow-[0_6px_20px_rgba(233,30,99,0.3)]"
          >
            Email Legal Team
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
              to="/privacy"
              className="rounded-full border border-gray-200 bg-white px-5 py-2 text-[13px] font-medium text-gray-700 transition-colors hover:border-[#e91e63] hover:text-[#e91e63]"
            >
              Privacy Policy
            </Link>
            <Link
              to="/refund-policy"
              className="rounded-full border border-gray-200 bg-white px-5 py-2 text-[13px] font-medium text-gray-700 transition-colors hover:border-[#e91e63] hover:text-[#e91e63]"
            >
              Refund Policy
            </Link>
            <Link
              to="/returns"
              className="rounded-full border border-gray-200 bg-white px-5 py-2 text-[13px] font-medium text-gray-700 transition-colors hover:border-[#e91e63] hover:text-[#e91e63]"
            >
              Returns Policy
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}