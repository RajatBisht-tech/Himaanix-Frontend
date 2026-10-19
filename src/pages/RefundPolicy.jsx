import React from "react";
import { Link } from "react-router-dom";
import {
    CreditCard,
    Wallet,
    Gift,
    Banknote,
    Clock,
    ShieldCheck,
    AlertCircle,
    CheckCircle2,
    XCircle,
    ArrowRight,
    FileText,
    RotateCcw,
} from "lucide-react";

const LAST_UPDATED = "September 16, 2026";

const REFUND_METHODS = [
    {
        icon: CreditCard,
        method: "Credit / Debit Card",
        time: "5–7 business days",
        note: "Refunded to the original card used at checkout.",
    },
    {
        icon: Wallet,
        method: "UPI / Net Banking",
        time: "3–5 business days",
        note: "Credited directly to the bank account or UPI ID used.",
    },
    {
        icon: Gift,
        method: "Store Credit",
        time: "Instant",
        note: "Issued as HIMAANIX credit. Never expires. Usable site-wide.",
    },
    {
        icon: Banknote,
        method: "Cash on Delivery (COD)",
        time: "5–7 business days",
        note: "Refunded via bank transfer to the account details you provide.",
    },
];

const SECTIONS = [
    {
        id: "overview",
        number: "01",
        title: "Overview",
        body: [
            "At HIMAANIX, we want you to shop with complete confidence. If a purchase doesn't work out, we offer a straightforward refund process designed to be fast, transparent, and free of hidden charges.",
            "This Refund Policy explains when refunds are issued, how they are calculated, which payment methods we support, and how long each refund takes to reach you.",
            "This policy should be read together with our Returns Policy, which covers eligibility, the return process, and timelines for sending items back.",
        ],
    },
    {
        id: "eligibility",
        number: "02",
        title: "Refund Eligibility",
        body: [
            "A refund is issued once a returned item has been received at our warehouse and passed a quality inspection. To qualify for a refund, the item must meet the following conditions:",
        ],
        list: [
            "The item is unworn, unwashed, and unaltered.",
            "All original tags are attached and intact.",
            "The item is returned in its original packaging.",
            "The return request was raised within 30 days of delivery.",
            "Proof of purchase (order number or invoice) is provided.",
        ],
    },
    {
        id: "exclusions",
        number: "03",
        title: "Non-Refundable Items",
        body: [
            "The following items are not eligible for refunds under any circumstance, in line with standard retail practice and hygiene regulations:",
        ],
        list: [
            "Intimate wear, innerwear, and swimwear.",
            "Personalized or custom-made items.",
            "Items marked 'Final Sale' at the time of purchase.",
            "Gift cards and store credit vouchers.",
            "Items damaged by misuse, improper care, or alteration.",
        ],
    },
    {
        id: "calculation",
        number: "04",
        title: "How Refunds Are Calculated",
        body: [
            "Refund amounts are calculated based on the actual amount paid for the returned item. The following principles apply:",
            "Full Refund — The full purchase price of the item is refunded when the entire order is returned and all eligibility conditions are met.",
            "Partial Refund — A partial refund may be issued if the item is returned without its original packaging, or if a promotional discount was applied at the time of purchase and the item no longer meets the threshold for that discount.",
            "Shipping Charges — Original shipping charges are refunded only if the return is due to a defect, damage, or an error on our part. For change-of-mind returns, shipping charges are non-refundable.",
            "Return Shipping — Return pickup is free within India. For international orders, return shipping costs are borne by the customer and are non-refundable.",
        ],
    },
    {
        id: "timeline",
        number: "05",
        title: "Refund Timelines",
        body: [
            "Once your returned item passes inspection (typically within 48 hours of receipt at our warehouse), your refund is initiated immediately. The time it takes to reach you depends on your payment method:",
        ],
    },
    {
        id: "process",
        number: "06",
        title: "Refund Process",
        body: [
            "The refund process follows a fixed sequence, and you will be notified by email and SMS at every step:",
            "1. Return Received — Your parcel arrives at our warehouse. You receive an acknowledgement within 24 hours.",
            "2. Quality Inspection — Our team inspects the item against the eligibility criteria. This takes up to 48 hours.",
            "3. Approval — If the item passes inspection, your refund is approved and initiated immediately.",
            "4. Processing — The refund is sent to your payment provider. Processing time depends on the method (see timelines above).",
            "5. Confirmation — You receive a final confirmation email once the refund has been successfully processed.",
        ],
    },
    {
        id: "exchanges",
        number: "07",
        title: "Exchanges",
        body: [
            "If you would prefer to exchange an item for a different size or colour rather than receive a refund, you may request an exchange subject to stock availability. Exchanges follow the same 30-day window as returns.",
            "If the exchange item is priced higher, you will be asked to pay the difference. If lower, the difference is refunded to your original payment method or issued as store credit — your choice.",
            "Exchanges are not available for items marked 'Final Sale' or for categories excluded from returns (see Section 03).",
        ],
    },
    {
        id: "failed",
        number: "08",
        title: "Failed or Delayed Refunds",
        body: [
            "In rare cases, a refund may be delayed due to bank processing times, incorrect payment details, or technical issues at the payment provider. If your refund has not arrived within the stated timeline:",
            "First, check your bank statement or UPI app — refunds sometimes appear with a slight delay or under an unfamiliar merchant name.",
            "If the refund is still missing after 10 business days, contact us at refunds@himaanix.com with your order number and refund reference.",
            "If you provided incorrect bank details for a COD refund, we will reach out to reconfirm. Refunds to incorrect accounts cannot be reversed by HIMAANIX and must be resolved with your bank.",
        ],
    },
    {
        id: "cancellations",
        number: "09",
        title: "Order Cancellations",
        body: [
            "You may cancel an order free of charge at any time before it is dispatched. Once dispatched, the order cannot be cancelled — but you may return it after delivery, following our Returns Policy.",
            "If an order is cancelled before dispatch, a full refund (including any shipping charges) is issued immediately to your original payment method.",
            "HIMAANIX reserves the right to cancel an order in the event of stock unavailability, pricing errors, or suspected fraudulent activity. In such cases, a full refund is issued without delay.",
        ],
    },
    {
        id: "changes",
        number: "10",
        title: "Changes to This Policy",
        body: [
            "We may update this Refund Policy from time to time to reflect changes in our practices, technology, legal requirements, or operational needs. When we make material changes, we will update the 'Last Updated' date at the top of this page.",
            "Your continued use of the HIMAANIX website after any changes constitutes acceptance of the updated policy. We encourage you to review this page periodically.",
        ],
    },
    {
        id: "contact",
        number: "11",
        title: "Contact Us",
        body: [
            "If you have questions about this Refund Policy, or about a specific refund, our team is here to help.",
            "Email: refunds@himaanix.com",
            "Phone: +91 98765 43210 (Mon–Sat, 10am–7pm IST)",
            "You can also reach us through our Contact page.",
        ],
    },
];

export default function RefundPolicy() {
    return (
        <div>
            {/* Hero */}
            <section className="bg-[#EFE6DD] py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="hx-eyebrow mb-3">HIMAANIX / LEGAL</div>
                    <h1 className="font-serif text-5xl md:text-6xl leading-tight max-w-3xl">
                        Refund Policy
                    </h1>
                    <p className="mt-5 text-[#5C524C] max-w-xl leading-relaxed">
                        How we handle refunds — clearly, fairly, and without hidden
                        charges.
                    </p>
                    <div className="mt-6 inline-flex items-center gap-2 text-xs text-[#91857D]">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Last updated: {LAST_UPDATED}</span>
                    </div>
                </div>
            </section>

            {/* Intro highlights */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 md:-mt-14 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                        {
                            icon: ShieldCheck,
                            label: "Transparent",
                            sub: "No hidden charges, ever",
                        },
                        {
                            icon: RotateCcw,
                            label: "Free Returns",
                            sub: "Within India, always",
                        },
                        {
                            icon: CreditCard,
                            label: "Fast Refunds",
                            sub: "As quick as 3 business days",
                        },
                    ].map((c) => (
                        <div
                            key={c.label}
                            className="bg-[#FDFBF7] border border-[#2B1B17]/10 p-6"
                        >
                            <c.icon className="w-5 h-5 text-[#C89D66] mb-4" />
                            <div className="hx-eyebrow mb-2">{c.label}</div>
                            <div className="text-sm text-[#5C524C]">{c.sub}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Main content */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Sticky TOC */}
                    <aside className="lg:col-span-3">
                        <div className="lg:sticky lg:top-24">
                            <div className="hx-eyebrow mb-4">Contents</div>
                            <nav className="space-y-2.5">
                                {SECTIONS.map((s) => (
                                    <a
                                        key={s.id}
                                        href={`#${s.id}`}
                                        className="block text-sm text-[#5C524C] hover:text-[#1A1110] transition-colors leading-snug"
                                    >
                                        <span className="text-[#C89D66] mr-2">{s.number}</span>
                                        {s.title}
                                    </a>
                                ))}
                            </nav>

                            <div className="mt-8 pt-8 border-t border-[#2B1B17]/10">
                                <div className="text-xs text-[#91857D] leading-relaxed">
                                    Need help with a refund?{" "}
                                    <Link to="/contact" className="underline text-[#1A1110]">
                                        Contact us
                                    </Link>
                                    .
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Sections */}
                    <div className="lg:col-span-9 max-w-3xl">
                        {SECTIONS.map((s) => (
                            <div
                                key={s.id}
                                id={s.id}
                                className="scroll-mt-24 pb-12 mb-12 border-b border-[#2B1B17]/10 last:border-b-0 last:mb-0 last:pb-0"
                            >
                                <div className="flex items-baseline gap-4 mb-4">
                                    <span className="font-serif text-2xl text-[#C89D66]">
                                        {s.number}
                                    </span>
                                    <h2 className="font-serif text-3xl md:text-4xl text-[#1A1110]">
                                        {s.title}
                                    </h2>
                                </div>

                                <div className="space-y-4 text-[#5C524C] leading-relaxed">
                                    {s.body.map((p, i) => (
                                        <p key={i}>{p}</p>
                                    ))}

                                    {s.list && (
                                        <ul className="space-y-3 pt-2">
                                            {s.list.map((item) => (
                                                <li
                                                    key={item}
                                                    className="flex items-start gap-3 text-sm"
                                                >
                                                    <CheckCircle2 className="w-4 h-4 text-[#5C7A4F] shrink-0 mt-0.5" />
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>

                                {/* Section 05: Refund timelines table */}
                                {s.id === "timeline" && (
                                    <div className="mt-6 bg-[#FDFBF7] border border-[#2B1B17]/10 overflow-hidden">
                                        {REFUND_METHODS.map((r) => (
                                            <div
                                                key={r.method}
                                                className="p-5 md:p-6 flex items-start gap-4 border-b border-[#2B1B17]/10 last:border-b-0"
                                            >
                                                <r.icon className="w-5 h-5 text-[#C89D66] shrink-0 mt-0.5" />
                                                <div className="flex-1">
                                                    <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                                                        <span className="text-sm text-[#1A1110] font-medium">
                                                            {r.method}
                                                        </span>
                                                        <span className="hx-eyebrow text-[#91857D]">
                                                            {r.time}
                                                        </span>
                                                    </div>
                                                    <p className="text-xs text-[#91857D] leading-relaxed">
                                                        {r.note}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Section 03: exclusions — accent panel */}
                                {s.id === "exclusions" && (
                                    <div className="mt-6 bg-[#FDFBF7] border border-[#A85D48]/30 p-5 flex items-start gap-4">
                                        <AlertCircle className="w-5 h-5 text-[#A85D48] shrink-0 mt-0.5" />
                                        <p className="text-sm text-[#5C524C] leading-relaxed">
                                            <span className="text-[#1A1110] font-medium">
                                                Please note:
                                            </span>{" "}
                                            Items excluded from refunds are also excluded from
                                            exchanges. If you're unsure whether an item is eligible,
                                            contact us before placing your order.
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Footer CTA */}
                        <div className="mt-8 bg-[#1A1110] text-[#FDFBF7] p-8 md:p-10">
                            <div className="hx-eyebrow mb-3 text-[#C89D66]">
                                Need a Refund Status?
                            </div>
                            <h3 className="font-serif text-2xl md:text-3xl mb-4 leading-tight">
                                Our refunds team is one email away.
                            </h3>
                            <p className="text-sm text-[#FDFBF7]/70 leading-relaxed mb-6 max-w-lg">
                                Share your order number and we'll look into it right away.
                                Most refund queries are resolved within 24 hours.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <a
                                    href="mailto:refunds@himaanix.com"
                                    className="inline-flex items-center justify-center gap-2 bg-[#FDFBF7] text-[#1A1110] px-8 py-4 text-xs uppercase tracking-[0.28em] hover:bg-[#EFE6DD] transition-colors"
                                >
                                    <FileText className="w-4 h-4" /> Email Refunds Team
                                </a>
                                <Link
                                    to="/contact"
                                    className="inline-flex items-center justify-center gap-2 border border-[#FDFBF7]/40 px-8 py-4 text-xs uppercase tracking-[0.28em] hover:bg-[#FDFBF7]/10 transition-colors"
                                >
                                    Contact Us <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>

                        {/* Related links */}
                        <div className="mt-10 pt-8 border-t border-[#2B1B17]/10">
                            <div className="hx-eyebrow mb-4">Related Policies</div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <Link
                                    to="/returns"
                                    className="flex items-center justify-between border border-[#2B1B17]/10 p-5 text-sm text-[#1A1110] hover:border-[#1A1110] transition-colors group"
                                >
                                    <span>Returns Policy</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <Link
                                    to="/shipping"
                                    className="flex items-center justify-between border border-[#2B1B17]/10 p-5 text-sm text-[#1A1110] hover:border-[#1A1110] transition-colors group"
                                >
                                    <span>Shipping & Delivery</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}