import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Eye,
    EyeOff,
    ArrowRight,
    CheckCircle2,
    Mail,
    UserRound,
    LockKeyhole,
} from "lucide-react";
import api from "../api/client.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function RegisterPage() {
    const navigate = useNavigate();
    const { signIn } = useAuth();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;

        setForm((previous) => ({
            ...previous,
            [name]: value,
        }));

        setError("");
        setSuccess("");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        setSuccess("");

        const name = form.name.trim();
        const email = form.email.trim().toLowerCase();
        const { password, confirmPassword } = form;

        if (name.length < 2) {
            setError("Please enter your full name.");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        if (password.length < 8) {
            setError("Password must be at least 8 characters.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            setLoading(true);

            const { data } = await api.post("/auth/register", {
                name,
                email,
                password,
            });

            if (!data?.success || !data?.token) {
                throw new Error(data?.message || "Registration failed.");
            }

            if (!data.user) {
                throw new Error("Account details were not returned.");
            }

            signIn(data.token, data.user, true);
            setSuccess("Your account has been created successfully.");
            navigate("/account", { replace: true });
        } catch (err) {
            setError(
                err.response?.data?.message ||
                err.message ||
                "Unable to create your account. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-50 p-4 sm:p-6 lg:p-8">
            <div className="flex min-h-[640px] w-full max-w-[1400px] flex-col overflow-hidden border border-gray-200 bg-white shadow-sm md:h-[calc(100vh-4rem)] md:max-h-[880px] md:flex-row">
                {/* LEFT — image + welcome card (register copy) */}
                <section className="relative hidden flex-col bg-[#f4eee5] md:flex md:w-1/2">
                    <img
                        src="/Family.png"
                        alt="Himaanix family fashion collection"
                        loading="eager"
                        className="absolute inset-0 h-full w-full object-cover object-center"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />

                    <div className="relative z-10 mt-auto px-8 pb-12 pt-10 lg:px-12 lg:pb-16">
                        <div className="max-w-md bg-[#f7f1ea]/95 p-6 shadow-sm backdrop-blur-sm lg:p-8">
                            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-700">
                                Himaanix
                            </p>
                            <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.3em] text-slate-500">
                                Join the edit
                            </p>

                            <h1 className="mt-5 font-serif text-4xl leading-[1.08] tracking-tight text-slate-900 lg:text-5xl">
                                Find your style.
                                <br />
                                <em className="font-normal">Own your story.</em>
                            </h1>

                            <p className="mt-5 max-w-sm text-sm leading-6 text-slate-700">
                                Create your account and discover standout pieces
                                <br />
                                and everyday favourites made for you.
                            </p>

                            <div className="mt-8 h-px w-14 bg-slate-600" />
                        </div>
                    </div>
                </section>

                {/* RIGHT — registration form */}
                <section className="flex w-full items-center justify-center overflow-y-auto bg-white px-6 py-10 sm:px-10 md:w-1/2 lg:px-16">
                    <div className="my-auto w-full max-w-md">
                        {/* Mobile brand */}
                        <div className="mb-8 md:hidden">
                            <p className="text-center text-[10px] font-semibold uppercase tracking-[0.3em] text-pink-600">
                                Himaanix
                            </p>
                        </div>

                        <div className="mb-7">
                            <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-slate-500">
                                Your account
                            </p>

                            <h2 className="mt-3 font-serif text-4xl text-slate-900">
                                Join Himaanix
                            </h2>

                            <p className="mt-3 text-sm leading-6 text-gray-500">
                                Create your account and discover your next
                                favourite look.
                            </p>
                        </div>

                        {error && (
                            <div
                                role="alert"
                                className="mb-5 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                            >
                                {error}
                            </div>
                        )}

                        {success && (
                            <div
                                role="status"
                                className="mb-5 flex items-center gap-2 border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
                            >
                                <CheckCircle2 size={17} />
                                {success}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                            {/* Full name */}
                            <div>
                                <label
                                    htmlFor="name"
                                    className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-900"
                                >
                                    Full name
                                </label>
                                <div className="relative">
                                    <UserRound
                                        size={17}
                                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                    />
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        autoComplete="name"
                                        placeholder="Enter your full name"
                                        value={form.name}
                                        onChange={handleChange}
                                        required
                                        minLength={2}
                                        maxLength={100}
                                        className="h-12 w-full border border-gray-300 bg-white pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-gray-400 focus:border-slate-900"
                                    />
                                </div>
                            </div>

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
                                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                    />
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        inputMode="email"
                                        placeholder="you@example.com"
                                        value={form.email}
                                        onChange={handleChange}
                                        required
                                        className="h-12 w-full border border-gray-300 bg-white pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-gray-400 focus:border-slate-900"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label
                                    htmlFor="password"
                                    className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-900"
                                >
                                    Password
                                </label>
                                <div className="relative">
                                    <LockKeyhole
                                        size={17}
                                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                    />
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        autoComplete="new-password"
                                        placeholder="At least 8 characters"
                                        value={form.password}
                                        onChange={handleChange}
                                        required
                                        minLength={8}
                                        className="h-12 w-full border border-gray-300 bg-white pl-11 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-gray-400 focus:border-slate-900"
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword((previous) => !previous)
                                        }
                                        aria-label={
                                            showPassword
                                                ? "Hide password"
                                                : "Show password"
                                        }
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-slate-900"
                                    >
                                        {showPassword ? (
                                            <EyeOff size={17} />
                                        ) : (
                                            <Eye size={17} />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Confirm password */}
                            <div>
                                <label
                                    htmlFor="confirmPassword"
                                    className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-900"
                                >
                                    Confirm password
                                </label>
                                <div className="relative">
                                    <LockKeyhole
                                        size={17}
                                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                    />
                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type={
                                            showConfirmPassword ? "text" : "password"
                                        }
                                        autoComplete="new-password"
                                        placeholder="Re-enter your password"
                                        value={form.confirmPassword}
                                        onChange={handleChange}
                                        required
                                        className="h-12 w-full border border-gray-300 bg-white pl-11 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-gray-400 focus:border-slate-900"
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowConfirmPassword(
                                                (previous) => !previous
                                            )
                                        }
                                        aria-label={
                                            showConfirmPassword
                                                ? "Hide confirm password"
                                                : "Show confirm password"
                                        }
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-slate-900"
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOff size={17} />
                                        ) : (
                                            <Eye size={17} />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Terms */}
                            <p className="text-xs leading-5 text-gray-500">
                                By creating an account, you agree to our{" "}
                                <Link
                                    to="/Terms"
                                    className="underline underline-offset-4 hover:text-slate-900"
                                >
                                    Terms &amp; Conditions
                                </Link>{" "}
                                and{" "}
                                <Link
                                    to="/privacy-policy"
                                    className="underline underline-offset-4 hover:text-slate-900"
                                >
                                    Privacy Policy
                                </Link>
                                .
                            </p>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex h-12 w-full items-center justify-center gap-3 bg-slate-900 px-5 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition hover:bg-pink-600 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading ? "Creating account..." : "Create account"}
                                {!loading && <ArrowRight size={16} />}
                            </button>
                        </form>

                        {/* Sign-in link */}
                        <div className="my-7 flex items-center gap-4">
                            <div className="h-px flex-1 bg-gray-200" />
                            <span className="text-[9px] uppercase tracking-wider text-gray-400">
                                Already a member?
                            </span>
                            <div className="h-px flex-1 bg-gray-200" />
                        </div>

                        <Link
                            to="/login"
                            className="mb-4 flex h-12 w-full items-center justify-center gap-3 border border-slate-900 px-5 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-900 transition hover:bg-slate-900 hover:text-white"
                        >
                            Sign in
                            <ArrowRight size={16} />
                        </Link>
                    </div>
                </section>
            </div>
        </main>
    );
}