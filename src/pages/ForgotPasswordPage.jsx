import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, Mail, CheckCircle2 } from "lucide-react";
import api from "../api/client.js";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        setSuccess(false);

        if (!email.trim()) {
            setError("Please enter your email address.");
            return;
        }

        try {
            setLoading(true);

            const { data } = await api.post("/auth/forgot-password", {
                email: email.trim().toLowerCase(),
            });

            if (!data?.success) {
                throw new Error(data?.message || "Unable to send reset link.");
            }

            setSuccess(true);
        } catch (err) {
            setError(
                err.response?.data?.message ||
                err.message ||
                "Something went wrong. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-50 p-4 sm:p-6 lg:p-8">
            <div className="flex w-full max-w-[1600px] min-h-[600px] flex-col overflow-hidden border border-gray-200 bg-white shadow-sm md:h-[calc(100vh-4rem)] md:max-h-[900px] md:flex-row">

                {/* LEFT: Fashion image + welcome */}
                <section className="relative hidden flex-col bg-[#f4eee5] md:flex md:w-1/2">
                    <img
                        src="/Family.png"
                        alt="HIMAANIX family fashion collection"
                        loading="eager"
                        className="absolute inset-0 h-full w-full object-cover object-center"
                    />

                    <div className="relative z-10 mt-auto px-8 pb-12 pt-10 lg:px-12 lg:pb-16">
                        <div className="max-w-md bg-[#f4eee5]/95 p-6 shadow-sm backdrop-blur-sm lg:p-8">
                            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-slate-700">
                                HIMAANIX
                            </p>

                            <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.3em] text-slate-500">
                                Account recovery
                            </p>

                            <h1 className="mt-5 font-serif text-4xl leading-[1.08] tracking-tight text-slate-900 lg:text-5xl">
                                No worries.
                                <br />
                                <em className="font-normal">We’ve got you.</em>
                            </h1>

                            <p className="mt-5 max-w-sm text-sm leading-6 text-slate-700">
                                Enter your email and we’ll send you a link
                                <br />
                                to reset your password securely.
                            </p>

                            <div className="mt-8 h-px w-14 bg-slate-600" />
                        </div>
                    </div>
                </section>

                {/* RIGHT: Forgot password form */}
                <section className="flex w-full items-center justify-center overflow-y-auto bg-white px-6 py-10 sm:px-10 md:w-1/2 lg:px-16">
                    <div className="my-auto w-full max-w-md">

                        {/* Mobile logo */}
                        <Link
                            to="/"
                            className="mb-8 block text-center font-serif text-2xl tracking-[0.25em] text-slate-900 md:hidden"
                        >
                            HIMAANIX
                        </Link>

                        {/* Heading */}
                        <div className="mb-9 mt-4 md:mt-0">
                            <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-slate-500">
                                Your account
                            </p>

                            <h2 className="mt-3 font-serif text-4xl text-slate-900">
                                Forgot password
                            </h2>

                            <p className="mt-3 text-sm leading-6 text-gray-500">
                                {success
                                    ? "Check your inbox for the reset link."
                                    : "Enter the email linked to your account and we’ll send you a reset link."}
                            </p>
                        </div>

                        {/* Success state */}
                        {success ? (
                            <div className="space-y-6">
                                <div
                                    role="status"
                                    className="flex items-start gap-3 border border-green-200 bg-green-50 px-4 py-4 text-sm text-green-800"
                                >
                                    <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
                                    <div>
                                        <p className="font-medium">Reset link sent</p>
                                        <p className="mt-1 text-green-700">
                                            If an account exists for{" "}
                                            <span className="font-medium">{email}</span>,
                                            you’ll receive an email shortly with instructions.
                                        </p>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => {
                                        setSuccess(false);
                                        setEmail("");
                                    }}
                                    className="flex h-12 w-full items-center justify-center gap-3 border border-slate-900 px-5 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-900 transition hover:bg-slate-900 hover:text-white"
                                >
                                    Try another email
                                </button>

                                <Link
                                    to="/login"
                                    className="flex h-12 w-full items-center justify-center gap-3 bg-slate-900 px-5 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition hover:bg-slate-800"
                                >
                                    <ArrowLeft size={16} />
                                    Back to sign in
                                </Link>
                            </div>
                        ) : (
                            <>
                                {error && (
                                    <div
                                        role="alert"
                                        className="mb-5 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                                    >
                                        {error}
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Email */}
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-900"
                                        >
                                            Email address
                                        </label>
                                        <div className="relative">
                                            <Mail
                                                size={17}
                                                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                            />
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                autoComplete="email"
                                                placeholder="you@example.com"
                                                value={email}
                                                onChange={(e) => {
                                                    setEmail(e.target.value);
                                                    setError("");
                                                }}
                                                required
                                                className="h-12 w-full border border-gray-300 bg-white pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-gray-400 focus:border-slate-900"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="flex h-12 w-full items-center justify-center gap-3 bg-slate-900 px-5 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        {loading ? "Sending link..." : "Send reset link"}
                                        {!loading && <ArrowRight size={16} />}
                                    </button>
                                </form>

                                {/* Divider */}
                                <div className="my-8 flex items-center gap-4">
                                    <div className="h-px flex-1 bg-gray-200" />
                                    <span className="text-[9px] uppercase tracking-wider text-gray-400">
                                        Remember your password?
                                    </span>
                                    <div className="h-px flex-1 bg-gray-200" />
                                </div>

                                <Link
                                    to="/login"
                                    className="flex h-12 w-full items-center justify-center gap-3 border border-slate-900 px-5 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-900 transition hover:bg-slate-900 hover:text-white"
                                >
                                    <ArrowLeft size={16} />
                                    Back to sign in
                                </Link>
                            </>
                        )}

                        {/* Legal */}
                        <p className="mt-8 text-center text-[11px] leading-6 text-gray-500">
                            Need help?{" "}
                            <Link
                                to="/contact"
                                className="underline underline-offset-2 hover:text-slate-900"
                            >
                                Contact support
                            </Link>
                        </p>
                    </div>
                </section>
            </div>
        </main>
    );
}