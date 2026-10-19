import React from "react";
import { Link } from "react-router-dom";
import {
    FileText,
    Scale,
    ShieldCheck,
    UserCheck,
    CreditCard,
    Package,
    AlertCircle,
    Clock,
    Mail,
    ArrowRight,
    Globe,
    Lock,
    Ban,
    RefreshCw,
    Gavel,
} from "lucide-react";

const LAST_UPDATED = "September 16, 2026";

const SECTIONS = [
    {
        id: "acceptance",
        number: "01",
        title: "Acceptance of Terms",
        body: [
            "Welcome to HIMAANIX. These Terms & Conditions (\"Terms\") govern your access to and use of the HIMAANIX website, mobile experience, and any related services (collectively, the \"Services\").",
            "By accessing or using the Services, creating an account, or placing an order, you agree to be bound by these Terms. If you do not agree, please discontinue use of the Services immediately.",
            "We may update these Terms from time to time. Material changes will be reflected in the 'Last Updated' date at the top of this page. Your continued use of the Services after any change constitutes acceptance of the revised Terms.",
        ],
    },
    {
        id: "eligibility",
        number: "02",
        title: "Eligibility",
        body: [
            "To use the Services, you must be at least 18 years of age, or the age of legal majority in your jurisdiction, and capable of entering into a binding contract.",
            "If you are using the Services on behalf of a business or organisation, you represent that you have the authority to bind that entity to these Terms.",
            "By using the Services, you confirm that all information you provide is accurate, current, and complete, and that you will keep it updated.",
        ],
    },
    {
        id: "accounts",
        number: "03",
        title: "Your Account",
        body: [
            "To access certain features — such as saved addresses, order history, and wishlists — you may need to create an account. When you do:",
        ],
        list: [
            "You are responsible for maintaining the confidentiality of your login credentials.",
            "You are responsible for all activity that occurs under your account.",
            "You must notify us immediately of any unauthorised use or security breach.",
            "We reserve the right to suspend or terminate accounts that violate these Terms.",
        ],
    },
    {
        id: "orders",
        number: "04",
        title: "Orders & Acceptance",
        body: [
            "All orders placed through the Services are subject to acceptance by HIMAANIX. Once you place an order, you will receive an email confirming receipt — this is not an acceptance of your order, but a record of it.",
            "Acceptance occurs only when we dispatch the order and send you a shipping confirmation. Until then, we reserve the right to refuse or cancel any order for reasons including:",
        ],
        list: [
            "Product unavailability or stock errors.",
            "Pricing or description errors on the website.",
            "Suspected fraud or unauthorised transactions.",
            "Failure to meet eligibility criteria in these Terms.",
        ],
    },
    {
        id: "pricing",
        number: "05",
        title: "Pricing & Payment",
        body: [
            "All prices displayed on the Services are in Indian Rupees (INR) unless otherwise stated, and are inclusive of applicable taxes unless specified at checkout.",
            "Prices are subject to change without notice. The price applicable to your order is the price displayed at the time you complete checkout.",
            "We accept a range of payment methods including credit/debit cards, UPI, net banking, and Cash on Delivery (where available). All payments are processed through secure, PCI-DSS compliant gateways.",
            "In the event of a pricing error, we reserve the right to cancel the order and issue a full refund — you will be notified before any charge is made where possible.",
        ],
    },
    {
        id: "shipping",
        number: "06",
        title: "Shipping & Delivery",
        body: [
            "Shipping timelines, charges, and serviceable locations are set out in our Shipping & Delivery page, which forms part of these Terms.",
            "Once an order has been dispatched, risk of loss or damage passes to you. If your parcel arrives damaged, please contact us within 48 hours of delivery so we can resolve it promptly.",
            "Delivery timelines are estimates and may vary due to factors outside our control, including courier delays, weather, or public holidays.",
        ],
    },
    {
        id: "returns",
        number: "07",
        title: "Returns, Refunds & Cancellations",
        body: [
            "Our Returns & Refunds policy and Refund Policy form part of these Terms and set out your rights and obligations when returning or cancelling orders.",
            "By placing an order, you agree to be bound by the eligibility criteria, timelines, and procedures described in those policies.",
            "We reserve the right to refuse returns that do not meet the eligibility conditions, including items that have been worn, washed, or damaged after delivery.",
        ],
    },
    {
        id: "ip",
        number: "08",
        title: "Intellectual Property",
        body: [
            "All content on the Services — including but not limited to text, images, graphics, logos, product photography, design elements, code, and the HIMAANIX name — is owned by or licensed to HIMAANIX and protected by Indian and international intellectual property laws.",
            "You may not reproduce, distribute, modify, republish, sell, or exploit any part of the Services for commercial purposes without our prior written consent.",
            "You may share links to our products or pages for personal, non-commercial use. Any other use requires our express permission.",
        ],
    },
    {
        id: "conduct",
        number: "09",
        title: "Acceptable Use",
        body: [
            "You agree not to use the Services in any way that is unlawful, harmful, or interferes with the experience of other users. Specifically, you must not:",
        ],
        list: [
            "Violate any applicable law or regulation.",
            "Post or transmit any harmful, abusive, or fraudulent content.",
            "Attempt to gain unauthorised access to our systems or accounts.",
            "Use automated tools to scrape, copy, or misuse the Services.",
            "Impersonate HIMAANIX, its team, or any other person.",
            "Interfere with the security, integrity, or performance of the Services.",
        ],
    },
    {
        id: "reviews",
        number: "10",
        title: "User Content & Reviews",
        body: [
            "You may be able to submit reviews, comments, photos, or other content (\"User Content\") through the Services. By submitting User Content, you grant HIMAANIX a non-exclusive, royalty-free, worldwide, perpetual licence to use, reproduce, and display it in connection with the Services.",
            "You represent that you own or have the right to share any User Content you submit, and that it does not violate any third-party rights or applicable laws.",
            "We reserve the right to remove any User Content that we deem inappropriate, misleading, or in violation of these Terms, without notice.",
        ],
    },
    {
        id: "liability",
        number: "11",
        title: "Limitation of Liability",
        body: [
            "To the maximum extent permitted by law, HIMAANIX, its directors, employees, and partners shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the Services.",
            "Our total liability for any claim arising from your use of the Services shall not exceed the amount you paid for the product or service giving rise to the claim.",
            "Nothing in these Terms excludes or limits liability that cannot be excluded or limited under applicable law, including liability for fraud, death, or personal injury caused by our negligence.",
        ],
    },
    {
        id: "indemnity",
        number: "12",
        title: "Indemnity",
        body: [
            "You agree to indemnify, defend, and hold harmless HIMAANIX and its officers, directors, employees, and agents from any claims, liabilities, damages, losses, or expenses (including reasonable legal fees) arising from:",
            "Your breach of these Terms.",
            "Your violation of any law or third-party right.",
            "Any User Content you submit through the Services.",
            "Your misuse of the Services or any products purchased through them.",
        ],
    },
    {
        id: "termination",
        number: "13",
        title: "Termination",
        body: [
            "We may suspend or terminate your access to the Services at any time, with or without notice, if we believe you have violated these Terms or engaged in conduct that harms HIMAANIX or other users.",
            "You may stop using the Services at any time. If you wish to close your account, contact us at privacy@himaanix.com.",
            "Sections of these Terms that by their nature should survive termination — including Intellectual Property, Limitation of Liability, Indemnity, and Governing Law — will continue to apply.",
        ],
    },
    {
        id: "governing-law",
        number: "14",
        title: "Governing Law & Disputes",
        body: [
            "These Terms are governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.",
            "Any dispute arising out of or relating to these Terms or the Services shall be subject to the exclusive jurisdiction of the courts of Mumbai, Maharashtra, India.",
            "Before pursuing formal legal action, we encourage you to contact us first — most concerns can be resolved quickly and amicably through our customer support team.",
        ],
    },
    {
        id: "changes",
        number: "15",
        title: "Changes to These Terms",
        body: [
            "We may update these Terms from time to time to reflect changes in our practices, technology, legal requirements, or operational needs. When we make material changes, we will update the 'Last Updated' date at the top of this page.",
            "If the changes are significant, we may also notify you by email or by a prominent notice on the Services. Your continued use of the Services after any change constitutes acceptance of the revised Terms.",
        ],
    },
    {
        id: "contact",
        number: "16",
        title: "Contact Us",
        body: [
            "If you have questions about these Terms, or about a specific order, our team is here to help.",
            "Email: himaanixtrading@gmail.com",
            "Phone: +91 98765 43210 (Mon–Sat, 10am–7pm IST)",
            "You can also reach us through our Contact page. We aim to respond to all enquiries within 2 business days.",
        ],
    },
];

export default function Terms() {
    return (
        <div>
            {/* Hero */}
            <section className="bg-[#EFE6DD] py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="hx-eyebrow mb-3">HIMAANIX / LEGAL</div>
                    <h1 className="font-serif text-5xl md:text-6xl leading-tight max-w-3xl">
                        Terms & Conditions
                    </h1>
                    <p className="mt-5 text-[#5C524C] max-w-xl leading-relaxed">
                        The rules that govern your use of HIMAANIX — written in plain
                        language, without the legal maze.
                    </p>
                    <div className="mt-6 inline-flex items-center gap-2 text-xs text-[#91857D]">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Last updated: {LAST_UPDATED}</span>
                    </div>
                </div>
            </section>

            {/* Intro highlights */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 md:-mt-14 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        {
                            icon: FileText,
                            label: "Plain Language",
                            sub: "No legal maze",
                        },
                        {
                            icon: ShieldCheck,
                            label: "Fair Terms",
                            sub: "Balanced rights",
                        },
                        {
                            icon: Scale,
                            label: "Indian Law",
                            sub: "Mumbai jurisdiction",
                        },
                        {
                            icon: UserCheck,
                            label: "Your Rights",
                            sub: "Clear and honoured",
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
                                    Questions about these terms?{" "}
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
                                                    <span className="w-1 h-1 rounded-full bg-[#C89D66] shrink-0 mt-2" />
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>

                                {/* Section 03: Accounts — lock accent */}
                                {s.id === "accounts" && (
                                    <div className="mt-6 bg-[#FDFBF7] border border-[#2B1B17]/10 p-6 flex items-start gap-4">
                                        <Lock className="w-5 h-5 text-[#C89D66] shrink-0 mt-0.5" />
                                        <p className="text-sm text-[#5C524C] leading-relaxed">
                                            <span className="text-[#1A1110] font-medium">
                                                Security tip:
                                            </span>{" "}
                                            Use a strong, unique password and enable two-factor
                                            authentication where available. Never share your login
                                            credentials.
                                        </p>
                                    </div>
                                )}

                                {/* Section 04: Orders — package accent */}
                                {s.id === "orders" && (
                                    <div className="mt-6 bg-[#FDFBF7] border border-[#2B1B17]/10 p-6 flex items-start gap-4">
                                        <Package className="w-5 h-5 text-[#C89D66] shrink-0 mt-0.5" />
                                        <p className="text-sm text-[#5C524C] leading-relaxed">
                                            Orders placed on weekends or public holidays are processed
                                            on the next business day. You'll receive a dispatch
                                            confirmation with tracking details once your parcel ships.
                                        </p>
                                    </div>
                                )}

                                {/* Section 09: Acceptable Use — ban accent */}
                                {s.id === "conduct" && (
                                    <div className="mt-6 bg-[#FDFBF7] border border-[#A85D48]/30 p-6 flex items-start gap-4">
                                        <Ban className="w-5 h-5 text-[#A85D48] shrink-0 mt-0.5" />
                                        <p className="text-sm text-[#5C524C] leading-relaxed">
                                            <span className="text-[#1A1110] font-medium">
                                                Consequences:
                                            </span>{" "}
                                            Violations of acceptable use may result in immediate
                                            suspension or termination of your account, and where
                                            appropriate, legal action.
                                        </p>
                                    </div>
                                )}

                                {/* Section 14: Governing Law — gavel accent */}
                                {s.id === "governing-law" && (
                                    <div className="mt-6 bg-[#FDFBF7] border border-[#2B1B17]/10 p-6 flex items-start gap-4">
                                        <Gavel className="w-5 h-5 text-[#C89D66] shrink-0 mt-0.5" />
                                        <p className="text-sm text-[#5C524C] leading-relaxed">
                                            <span className="text-[#1A1110] font-medium">
                                                Amicable resolution:
                                            </span>{" "}
                                            Before initiating any formal proceedings, please reach out
                                            to us at{" "}
                                            <a
                                                href="mailto:legal@himaanix.com"
                                                className="underline text-[#1A1110]"
                                            >
                                                legal@himaanix.com
                                            </a>{" "}
                                            — we'll always try to resolve matters fairly and quickly.
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Footer CTA */}
                        <div className="mt-8 bg-[#1A1110] text-[#FDFBF7] p-8 md:p-10">
                            <div className="hx-eyebrow mb-3 text-[#C89D66]">
                                Legal Enquiries
                            </div>
                            <h3 className="font-serif text-2xl md:text-3xl mb-4 leading-tight">
                                Have a question about these terms?
                            </h3>
                            <p className="text-sm text-[#FDFBF7]/70 leading-relaxed mb-6 max-w-lg">
                                Our legal team reviews every enquiry personally. For order- or
                                account-related questions, our customer support team responds
                                fastest.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <a
                                    href="mailto:legal@himaanix.com"
                                    className="inline-flex items-center justify-center gap-2 bg-[#FDFBF7] text-[#1A1110] px-8 py-4 text-xs uppercase tracking-[0.28em] hover:bg-[#EFE6DD] transition-colors"
                                >
                                    <Mail className="w-4 h-4" /> Email Legal Team
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
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <Link
                                    to="/privacy-policy"
                                    className="flex items-center justify-between border border-[#2B1B17]/10 p-5 text-sm text-[#1A1110] hover:border-[#1A1110] transition-colors group"
                                >
                                    <span>Privacy Policy</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <Link
                                    to="/refund-policy"
                                    className="flex items-center justify-between border border-[#2B1B17]/10 p-5 text-sm text-[#1A1110] hover:border-[#1A1110] transition-colors group"
                                >
                                    <span>Refund Policy</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <Link
                                    to="/returns"
                                    className="flex items-center justify-between border border-[#2B1B17]/10 p-5 text-sm text-[#1A1110] hover:border-[#1A1110] transition-colors group"
                                >
                                    <span>Returns Policy</span>
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