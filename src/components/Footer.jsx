import { useState } from "react";
import { Link } from "react-router-dom";
import {
    Instagram,
    Facebook,
    Youtube,
    CheckCircle2,
    ArrowRight,
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
        <div className="min-w-0">
            <h3 className="mb-5 text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-500">
                {title}
            </h3>

            <ul className="space-y-3">
                {links.map((item) => (
                    <li key={item.label}>
                        <Link
                            to={item.href}
                            className="text-sm text-slate-600 transition-colors hover:text-pink-600"
                        >
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default function Footer() {
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = (event) => {
        event.preventDefault();

        if (!email.trim()) return;

        // Connect this handler to your newsletter API to save subscriptions.
        setSubscribed(true);
        setEmail("");
    };

    return (
        <footer className="w-full border-t border-gray-100 bg-white text-slate-900">
            {/* Newsletter */}
            <section className="border-b border-gray-100 px-5 py-12 sm:px-8 sm:py-14 lg:px-12">
                <div className="mx-auto w-full max-w-4xl text-center">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-pink-600">
                        A little something for your inbox
                    </p>

                    <h2 className="mt-3 font-serif text-3xl tracking-[0.12em] sm:text-4xl">
                        THE HIMAANIX EDIT
                    </h2>

                    <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-gray-500">
                        Discover new collections, exclusive offers and inspiration
                        for your everyday style.
                    </p>

                    <form
                        onSubmit={handleSubscribe}
                        className="mx-auto mt-6 flex max-w-xl flex-col gap-3 sm:flex-row"
                    >
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(event) => {
                                setEmail(event.target.value);
                                setSubscribed(false);
                            }}
                            placeholder="Enter your email address"
                            aria-label="Email address"
                            className="h-12 min-w-0 flex-1 border border-gray-300 bg-white px-4 text-sm outline-none transition focus:border-slate-900"
                        />

                        <button
                            type="submit"
                            className="inline-flex h-12 items-center justify-center gap-2 bg-slate-900 px-8 text-[10px] font-bold uppercase tracking-[0.18em] text-white transition hover:bg-pink-600"
                        >
                            {subscribed ? (
                                <>
                                    <CheckCircle2 size={16} />
                                    Subscribed
                                </>
                            ) : (
                                <>
                                    Subscribe
                                    <ArrowRight size={14} />
                                </>
                            )}
                        </button>
                    </form>

                    {subscribed && (
                        <p role="status" className="mt-3 text-sm text-green-700">
                            Thank you for subscribing to Himaanix.
                        </p>
                    )}
                </div>
            </section>

            {/* Footer columns — wider */}
            <section className="mx-auto grid w-full max-w-[1600px] grid-cols-2 gap-x-8 gap-y-10 px-6 py-12 sm:px-10 md:grid-cols-3 lg:grid-cols-[minmax(0,2.2fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] lg:gap-x-14 lg:px-12 lg:py-14 xl:px-16">
                {/* Brand and company information */}
                <div className="col-span-2 min-w-0 md:col-span-3 lg:col-span-1">
                    <Link
                        to="/"
                        aria-label="Himaanix home"
                        className="inline-flex items-center gap-3"
                    >
                        <img
                            src="/logo.png"
                            alt="Himaanix logo"
                            className="h-16 w-25 shrink-0 object-contain"
                        />

                        <span className="flex flex-col">
                            <span className="font-serif text-xl tracking-[0.2em] text-slate-900">
                                HIMAANIX
                            </span>
                            <span className="mt-1 text-[8px] uppercase tracking-[0.2em] text-gray-500">
                                Fashion for every you
                            </span>
                        </span>
                    </Link>

                    <p className="mt-5 max-w-md text-sm leading-6 text-gray-600">
                        Fashion that speaks before you do. Editorial pieces crafted
                        for the modern wardrobe — considered, tactile and timeless.
                    </p>

                    <div className="mt-7 space-y-5 text-xs leading-5 text-gray-600">
                        <div>
                            <h4 className="mb-2 font-semibold text-slate-900">
                                Himaanix Trading Private Limited
                            </h4>

                            <p className="font-medium text-slate-800">
                                Delhi Registration
                            </p>
                            <p>GSTIN: 07AAICH8742H1ZA</p>
                            <p>
                                Registered Office: 1295 First Floor, Pan Mandi,
                                Sadar Bazar, Delhi — 110006
                            </p>
                        </div>

                        <div>
                            <p className="font-medium text-slate-800">
                                Rajasthan Registration
                            </p>
                            <p>GSTIN: 08AAICH8742H1Z8</p>
                            <p>
                                Registered Office: F-105 Vijay Laxmi Tower,
                                Central Spine, Vidhyadhar Nagar, Jaipur,
                                Rajasthan — 302039
                            </p>
                        </div>

                        <div className="space-y-2 break-words">
                            <p>CIN: U47711DC2026PTC473946</p>

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
                                    className="hover:text-pink-600"
                                >
                                    himaanixtrading@gmail.com
                                </a>
                            </p>

                            <p>
                                Grievance Officer Mobile:{" "}
                                <a
                                    href="tel:+919650300157"
                                    className="hover:text-pink-600"
                                >
                                    +91 9650300157
                                </a>
                            </p>

                            <p>
                                Contact &amp; Support Mobile:{" "}
                                <a
                                    href="tel:+918958975608"
                                    className="hover:text-pink-600"
                                >
                                    +91 8958975608
                                </a>
                            </p>

                            <p>
                                Contact &amp; Support Email:{" "}
                                <a
                                    href="mailto:himaanixtrading@gmail.com"
                                    className="hover:text-pink-600"
                                >
                                    himaanixtrading@gmail.com
                                </a>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Legal */}
                <FooterLinks title="Legal" links={legalLinks} />

                {/* Company */}
                <FooterLinks title="Company" links={companyLinks} />

                {/* Shop and social links */}
                <div className="min-w-0">
                    <FooterLinks title="Shop" links={shopLinks} />

                    <div className="mt-7">
                        <h3 className="mb-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-500">
                            Follow Us
                        </h3>

                        <div className="flex items-center gap-4">
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="Instagram"
                                className="text-slate-600 transition hover:text-pink-600"
                            >
                                <Instagram size={19} strokeWidth={1.6} />
                            </a>

                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="Facebook"
                                className="text-slate-600 transition hover:text-pink-600"
                            >
                                <Facebook size={19} strokeWidth={1.6} />
                            </a>

                            <a
                                href="https://youtube.com"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="YouTube"
                                className="text-slate-600 transition hover:text-pink-600"
                            >
                                <Youtube size={20} strokeWidth={1.6} />
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Copyright */}
            <div className="border-t border-gray-200 px-6 py-5 sm:px-10 lg:px-12 xl:px-16">
                <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-2 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between">
                    <p>
                        © {new Date().getFullYear()} Himaanix Trading Private Limited.
                        All rights reserved.
                    </p>

                    <p>Made with care in India</p>
                </div>
            </div>
        </footer>
    );
}