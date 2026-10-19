import { useState } from "react";
import { Link } from "react-router-dom";

// --- DATA ---

const contactMethods = [
  {
    title: "Email Us",
    detail: "himaanixtrading@gmail.com",
    subtext: "We reply within 24 hours",
    href: "mailto:himaanixtrading@gmail.com",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
  {
    title: "Call Us",
    detail: "+91 8958975608",
    subtext: "Mon–Sat, 10am – 7pm IST",
    href: "tel:+918958975608",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    title: "Visit Office",
    detail: "Delhi, New Delhi, India",
    subtext: "By appointment only",
    href: "#",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
];

const studioHours = [
  { day: "Monday – Friday", hours: "10:00 AM – 7:00 PM IST" },
  { day: "Saturday", hours: "11:00 AM – 5:00 PM IST" },
  { day: "Sunday", hours: "Closed" },
];

const faqs = [
  {
    q: "How long does shipping take?",
    a: "Standard delivery within India takes 3–5 business days. Express delivery to major metro cities takes 1–2 business days. International orders typically reach you within 7–14 business days.",
  },
  {
    q: "What is your return policy?",
    a: "We offer a 14-day hassle-free return and exchange window for domestic orders. Items must be unworn, unwashed, and in their original packaging with all tags attached.",
  },
  {
    q: "Do you ship internationally?",
    a: "Yes! We ship to over 40 countries worldwide. All customs duties and taxes are calculated directly at checkout so there are no unexpected fees on delivery.",
  },
  {
    q: "How can I track my order?",
    a: "Once your order leaves our studio, you will receive an automated tracking link via email and SMS. You can also view live order updates under your Account dashboard.",
  },
  {
    q: "Do you offer size guidance?",
    a: "Yes, every product page features a detailed size chart with garment dimensions. If you are unsure between two sizes, feel free to email or call us for personal fit advice.",
  },
];

const labelClass =
  "text-[11px] font-semibold uppercase tracking-[0.22em] text-[#e91e63]";

export default function Contact() {
  const [openFaq, setOpenFaq] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic for form submission
    setIsSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <main className="overflow-hidden bg-white text-gray-900">
      {/* ── Hero ── */}
      <section className="border-b border-gray-100 px-5 pb-14 pt-10 sm:px-8 sm:pb-16 sm:pt-12 lg:px-[5%]">
        <div className="mx-auto max-w-[1200px]">
          <p className={labelClass}>HIMAANIX / CONTACT</p>

          <h1 className="mt-5 max-w-3xl font-serif text-[clamp(2rem,4.5vw,3.25rem)] font-normal leading-[1.18] tracking-[-0.025em] text-gray-900">
            We'd love to hear from you
          </h1>

          <p className="mt-6 max-w-2xl text-[15px] leading-[1.85] text-gray-500 sm:text-base">
            Questions about an order, a piece, or a partnership? Our team is here
            to help — reach out through any channel below.
          </p>
        </div>
      </section>

      {/* ── Direct Contact Cards ── */}
      <section className="bg-gray-50 px-5 py-12 sm:px-8 lg:px-[5%] lg:py-16">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-5 sm:grid-cols-3 lg:gap-6">
          {contactMethods.map((method) => (
            <a
              key={method.title}
              href={method.href}
              className="group flex flex-col justify-between rounded-xl border border-gray-100 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-pink-200 hover:shadow-[0_8px_30px_rgba(233,30,99,0.08)]"
            >
              <div>
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-50 text-[#e91e63] transition-transform duration-300 group-hover:scale-110">
                  {method.icon}
                </span>

                <h3 className="mt-6 text-[13px] font-bold uppercase tracking-[0.16em] text-gray-400">
                  {method.title}
                </h3>

                <p className="mt-2 text-[16px] font-semibold text-gray-900 break-words">
                  {method.detail}
                </p>
              </div>

              <p className="mt-4 text-[13px] text-gray-500">{method.subtext}</p>
            </a>
          ))}
        </div>
      </section>

      {/* ── Form & Studio Info Section ── */}
      <section className="px-5 py-16 sm:px-8 lg:px-[5%] lg:py-24">
        <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-12 lg:gap-16">
          
          {/* Form Side */}
          <div className="lg:col-span-7">
            <p className={labelClass}>Send a Message</p>
            <h2 className="mt-3 font-serif text-[clamp(1.7rem,3.5vw,2.4rem)] font-normal leading-[1.2] text-gray-900">
              Tell us how we can help
            </h2>

            {isSubmitted ? (
              <div className="mt-8 rounded-xl border border-pink-200 bg-pink-50/50 p-8 text-center">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#e91e63] text-white">
                  ✓
                </span>
                <h3 className="mt-4 font-serif text-2xl font-normal text-gray-900">
                  Thank you for reaching out!
                </h3>
                <p className="mt-2 text-[14px] text-gray-600">
                  We've received your message and will get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-6 text-[12px] font-bold uppercase tracking-[0.14em] text-[#e91e63] hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div>
                  <label className="block text-[13px] font-medium text-gray-700">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Jane Doe"
                    className="mt-2 w-full rounded-lg border border-gray-200 bg-white px-4 py-3.5 text-[14px] text-gray-900 outline-none transition-colors focus:border-[#e91e63] focus:ring-1 focus:ring-[#e91e63]"
                  />
                </div>

                <div>
                  <label className="block text-[13px] font-medium text-gray-700">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="jane@example.com"
                    className="mt-2 w-full rounded-lg border border-gray-200 bg-white px-4 py-3.5 text-[14px] text-gray-900 outline-none transition-colors focus:border-[#e91e63] focus:ring-1 focus:ring-[#e91e63]"
                  />
                </div>

                <div>
                  <label className="block text-[13px] font-medium text-gray-700">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Order enquiry, sizing help, collaboration…"
                    className="mt-2 w-full rounded-lg border border-gray-200 bg-white px-4 py-3.5 text-[14px] text-gray-900 outline-none transition-colors focus:border-[#e91e63] focus:ring-1 focus:ring-[#e91e63]"
                  />
                </div>

                <div>
                  <label className="block text-[13px] font-medium text-gray-700">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message here…"
                    className="mt-2 w-full rounded-lg border border-gray-200 bg-white px-4 py-3.5 text-[14px] text-gray-900 outline-none transition-colors focus:border-[#e91e63] focus:ring-1 focus:ring-[#e91e63]"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-3 rounded-lg bg-[#e91e63] px-9 py-4 text-[12px] font-bold uppercase tracking-[0.16em] text-white transition-all duration-300 hover:bg-[#c41050] hover:shadow-[0_6px_20px_rgba(233,30,99,0.3)]"
                >
                  Send Message
                  <span className="text-sm">→</span>
                </button>
              </form>
            )}
          </div>

          {/* Sidebar: Studio Hours & Socials */}
          <div className="space-y-8 lg:col-span-5">
            {/* Studio Hours Card */}
            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-7 sm:p-8">
              <p className={labelClass}>Studio Hours</p>
              <h3 className="mt-3 font-serif text-2xl font-normal text-gray-900">
                When we're around
              </h3>

              <div className="mt-6 divide-y divide-gray-200/60">
                {studioHours.map((item) => (
                  <div
                    key={item.day}
                    className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0"
                  >
                    <span className="text-[14px] font-medium text-gray-700">
                      {item.day}
                    </span>
                    <span className="text-[13px] text-gray-500">{item.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Follow Along Card */}
            <div className="rounded-2xl border border-pink-100 bg-[#fff0f5] p-7 sm:p-8">
              <p className={labelClass}>Follow Along</p>
              <h3 className="mt-3 font-serif text-2xl font-normal text-gray-900">
                Stay in the loop
              </h3>
              <p className="mt-2 text-[14px] leading-[1.7] text-gray-600">
                New drops, styling notes, and behind-the-scenes — first.
              </p>

              {/* Social Links */}
              <div className="mt-6 flex items-center gap-4">
                {["Instagram", "Facebook", "Pinterest"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="rounded-lg border border-pink-200 bg-white px-4 py-2 text-[12px] font-semibold text-gray-800 transition-colors hover:border-[#e91e63] hover:text-[#e91e63]"
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── FAQ Section ── */}
      <section className="border-t border-gray-100 bg-gray-50 px-5 py-16 sm:px-8 lg:px-[5%] lg:py-24">
        <div className="mx-auto max-w-[800px]">
          <div className="text-center">
            <p className={labelClass}>FAQ</p>
            <h2 className="mt-3 font-serif text-[clamp(1.7rem,3.5vw,2.5rem)] font-normal leading-[1.22] text-gray-900">
              Frequently asked questions
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

          <p className="mt-8 text-center text-[14px] text-gray-500">
            Still need help?{" "}
            <a
              href="mailto:himaanixtrading@gmail.com"
              className="font-medium text-[#e91e63] hover:underline"
            >
              Reach out to our team.
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}