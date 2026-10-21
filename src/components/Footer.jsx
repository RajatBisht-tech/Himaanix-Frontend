import { useState } from "react";
import { Link } from "react-router-dom";
import {
    Instagram,
    Facebook,
    Youtube,
    CheckCircle2,
} from "lucide-react";

const legalLinks = [
    { label: "Contact Us", href: "/contact" },
    { label: "Shipping & Delivery", href: "/shipping" },
    { label: "Return Policy", href: "/returns" },
    { label: "Refund Policy", href: "/refund-policy" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/Terms" },
];

const companyLinks = [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Sustainability", href: "/sustainability" },
    { label: "Blog", href: "/blog" },
];

const shopLinks = [
    { label: "Women", href: "/shop?category=Women" },
    { label: "Men", href: "/shop?category=Men" },
    { label: "Kids", href: "/shop?category=Kids" },
    { label: "New Arrivals", href: "/shop?category=New%20Arrivals" },
    { label: "Collections", href: "/shop" },
];

function FooterLinks({ title, links }) {
    return (
        <div className="flex flex-col items-start gap-3">
            <h3 className="mb-2 text-xs font-medium uppercase tracking-[0.28em] text-gray-500">
                {title}
            </h3>

            {links.map((item) => (
                <Link
                    key={item.label}
                    to={item.href}
                    className="text-sm text-gray-600 transition-opacity hover:opacity-60"
                >
                    {item.label}
                </Link>
            ))}
        </div>
    );
}

export default function Footer() {
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = (event) => {
        event.preventDefault();

        if (!email.trim()) return;

        setSubscribed(true);
        setEmail("");
    };

    return (
        <footer className="w-full bg-white text-slate-900">
            {/* Newsletter */}
            <section className="border-t border-gray-100 bg-white px-5 py-8 text-center sm:py-10">
                <div className="mx-auto max-w-3xl">
                    <p className="text-xs font-medium uppercase tracking-[0.28em] text-gray-500">
                        Keep me updated
                    </p>

                    <h2 className="mt-3 text-3xl font-normal tracking-[0.14em] text-slate-900 sm:text-4xl">
                        NEWSLETTER
                    </h2>

                    <p className="mt-3 text-sm leading-6 text-gray-600 sm:text-base">
                        Get exclusive offers, latest collections, and style tips
                        straight to your inbox.
                    </p>

                    <form
                        onSubmit={handleSubscribe}
                        className="mx-auto mt-5 flex w-full max-w-[630px] flex-col gap-3 sm:flex-row"
                    >
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(event) => {
                                setEmail(event.target.value);
                                setSubscribed(false);
                            }}
                            placeholder="E-mail"
                            aria-label="Email address"
                            className="h-[50px] min-w-0 flex-1 border border-gray-300 bg-white px-4 text-sm text-slate-900 outline-none placeholder:text-gray-400 focus:border-slate-900"
                        />

                        {/* Fix #1 Merge A: unified with dark CTA style */}
                        <button
                            type="submit"
                            className="flex h-[50px] items-center justify-center gap-2 bg-slate-900 px-8 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-pink-600 sm:min-w-[220px]"
                        >
                            {subscribed ? (
                                <>
                                    <CheckCircle2 size={16} />
                                    SUBSCRIBED
                                </>
                            ) : (
                                "SUBSCRIBE"
                            )}
                        </button>
                    </form>

                    {subscribed && (
                        <p
                            role="status"
                            className="mt-3 text-sm text-gray-600"
                        >
                            Thank you for subscribing to Himaanix.
                        </p>
                    )}
                </div>
            </section>

            {/* Company information and navigation */}
            <section className="mx-auto grid max-w-[1450px] grid-cols-1 gap-8 px-6 py-8 sm:px-10 md:grid-cols-2 lg:grid-cols-5 lg:gap-12 lg:px-12 lg:py-10">
                {/* Company details */}
                <div className="lg:col-span-2">
                    <Link
                        to="/"
                        className="inline-block font-serif text-2xl tracking-[0.28em] text-slate-900"
                    >
                        HIMAANIX
                    </Link>

                    <p className="mt-4 max-w-md text-sm leading-6 text-gray-600">
                        Fashion that speaks before you do. Editorial pieces
                        crafted for the modern wardrobe — considered, tactile,
                        timeless.
                    </p>

                    <div className="mt-6">
                        {/* Fix #4: removed uppercase, converted to title case */}
                        <p className="text-xs font-medium tracking-[0.25em] text-gray-500">
                            Himaanix Trading Private Limited
                        </p>

                        <div className="mt-4 space-y-4 text-xs leading-5 text-gray-600">
                            <div>
                                <h3 className="mb-1 font-semibold text-slate-900">
                                    Delhi Registration
                                </h3>

                                <p className="normal-case">
                                    <span className="font-semibold">
                                        GSTIN:
                                    </span>{" "}
                                    <span aria-label="GSTIN number 07AAICH8742H1ZA">
                                        07AAICH8742H1ZA
                                    </span>
                                </p>

                                <p>
                                    Registered Office: 1295 First Floor, Pan
                                    Mandi, Sadar Bazar, Delhi — 110006
                                </p>
                            </div>

                            <div>
                                <h3 className="mb-1 font-semibold text-slate-900">
                                    Rajasthan Registration
                                </h3>

                                <p className="normal-case">
                                    <span className="font-semibold">
                                        GSTIN:
                                    </span>{" "}
                                    <span aria-label="GSTIN number 08AAICH8742H1Z8">
                                        08AAICH8742H1Z8
                                    </span>
                                </p>

                                <p>
                                    Registered Office: F-105 Vijay Laxmi Tower,
                                    Central Spine, Vidhyadhar Nagar, Jaipur,
                                    Rajasthan — 302039
                                </p>
                            </div>

                            <div className="space-y-1 break-words">
                                <p className="normal-case">
                                    CIN: U47711DC2026PTC473946
                                </p>

                                <p>
                                    Grievance Officer:{" "}
                                    <span className="font-medium text-slate-900">
                                        Premjeet
                                    </span>
                                </p>

                                <p>
                                    Grievance Officer Email:{" "}
                                    <a
                                        href="mailto:himaanixtrading@gmail.com"
                                        className="hover:underline"
                                    >
                                        himaanixtrading@gmail.com
                                    </a>
                                </p>

                                <p>
                                    Grievance Officer Mobile:{" "}
                                    <a
                                        href="tel:+919650300157"
                                        className="hover:underline"
                                    >
                                        +91 9650300157
                                    </a>
                                </p>

                                <p>
                                    Contact &amp; Support Mobile:{" "}
                                    <a
                                        href="tel:+918958975608"
                                        className="hover:underline"
                                    >
                                        +91 8958975608
                                    </a>
                                </p>

                                <p>
                                    Contact &amp; Support Email:{" "}
                                    <a
                                        href="mailto:himaanixtrading@gmail.com"
                                        className="hover:underline"
                                    >
                                        himaanixtrading@gmail.com
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Legal links */}
                <FooterLinks title="Legal" links={legalLinks} />

                {/* Company links */}
                <FooterLinks title="Company" links={companyLinks} />

                {/* Shop links and social media */}
                <div className="flex flex-col items-start gap-3">
                    <h3 className="mb-2 text-xs font-medium uppercase tracking-[0.28em] text-gray-500">
                        Shop
                    </h3>

                    {shopLinks.map((item) => (
                        <Link
                            key={item.label}
                            to={item.href}
                            className="text-sm text-gray-600 transition-opacity hover:opacity-60"
                        >
                            {item.label}
                        </Link>
                    ))}

                    <div className="mt-3 flex items-center gap-4 text-gray-600">
                        <a
                            href="https://instagram.com"
                            aria-label="Instagram"
                            className="transition-opacity hover:opacity-60"
                        >
                            <Instagram size={18} />
                        </a>

                        <a
                            href="https://facebook.com"
                            aria-label="Facebook"
                            className="transition-opacity hover:opacity-60"
                        >
                            <Facebook size={18} />
                        </a>

                        <a
                            href="https://youtube.com"
                            aria-label="YouTube"
                            className="transition-opacity hover:opacity-60"
                        >
                            <Youtube size={18} />
                        </a>
                    </div>
                </div>
            </section>

            {/* Copyright */}
            <div className="border-t border-gray-200 bg-white px-6 py-5 sm:px-10">
                <div className="mx-auto flex max-w-[1450px] flex-col items-start justify-between gap-2 text-xs text-gray-500 sm:flex-row sm:items-center">
                    <span>
                        © {new Date().getFullYear()} Himaanix Trading Private
                        Limited. All rights reserved.
                    </span>

                    <span>Made with care in India</span>
                </div>
            </div>
        </footer>
    );
}