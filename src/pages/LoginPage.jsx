import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    ArrowRight,
    Eye,
    EyeOff,
    LockKeyhole,
    Mail,
} from "lucide-react";
import api from "../api/client.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function LoginPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { signIn } = useAuth();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;
        setError("");
        setForm((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");

        const email = form.email.trim().toLowerCase();
        const password = form.password;

        if (!email || !password) {
            setError("Please enter your email and password.");
            return;
        }

        // Basic email shape check (browser also validates type="email")
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        try {
            setLoading(true);

            const { data } = await api.post("/auth/login", {
                email,
                password,
            });

            if (!data?.success || !data?.token) {
                setError(data?.message || "Unable to sign in.");
                return;
            }

            if (!data.user) {
                setError("Signed in, but account details were not returned.");
                return;
            }

            signIn(data.token, data.user, rememberMe);
            navigate(location.state?.from || "/account", { replace: true });
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Sign in failed. Please check your credentials and try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-50 p-4 sm:p-6 lg:p-8">
            <div className="flex min-h-[640px] w-full max-w-[1400px] flex-col overflow-hidden border border-gray-200 bg-white shadow-sm md:h-[calc(100vh-4rem)] md:max-h-[880px] md:flex-row">
                {/* LEFT — image + welcome card */}
                <section className="relative hidden md:flex md:w-1/2 flex-col bg-[#f4eee5]">
                    <img
                        src="/Family.png"
                        alt="Himaanix family fashion collection"
                        loading="eager"
                        className="absolute inset-0 h-full w-full object-cover object-center"
                    />

                    {/* soft gradient so text card stays readable */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />

                    <div className="relative z-10 mt-auto px-8 pb-12 pt-10 lg:px-12 lg:pb-16">
                        <div className="max-w-md bg-[#f7f1ea]/95 p-6 shadow-sm backdrop-blur-sm lg:p-8">
                            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-700">
                                Himaanix
                            </p>
                            <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.3em] text-slate-500">
                                Welcome back
                            </p>

                            <h1 className="mt-5 font-serif text-4xl leading-[1.08] tracking-tight text-slate-900 lg:text-5xl">
                                Good style.
                                <br />
                                <em className="font-normal">Good to see you.</em>
                            </h1>

                            <p className="mt-5 max-w-sm text-sm leading-6 text-slate-700">
                                Your favourites, your wardrobe, your style.
                                <br />
                                Pick up right where you left off.
                            </p>

                            <div className="mt-8 h-px w-14 bg-slate-600" />
                        </div>
                    </div>
                </section>

                {/* RIGHT — form */}
                <section className="flex w-full items-center justify-center overflow-y-auto bg-white px-6 py-12 sm:px-10 md:w-1/2 lg:px-16">
                    <div className="my-auto w-full max-w-md">
                        {/* Mobile-only brand line */}
                        <div className="mb-8 md:hidden">
                            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-pink-600">
                                Himaanix
                            </p>
                        </div>

                        <div className="mb-9">
                            <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-slate-500">
                                Your account
                            </p>
                            <h2 className="mt-3 font-serif text-4xl text-slate-900">
                                Sign in
                            </h2>
                            <p className="mt-3 text-sm leading-6 text-gray-500">
                                Welcome back. Enter your details to continue.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
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
                                <div className="mb-2 flex items-center justify-between gap-3">
                                    <label
                                        htmlFor="password"
                                        className="block text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-900"
                                    >
                                        Password
                                    </label>
                                    <Link
                                        to="/forgot-password"
                                        className="text-xs text-gray-600 underline underline-offset-4 transition hover:text-slate-900"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>
                                <div className="relative">
                                    <LockKeyhole
                                        size={17}
                                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                    />
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        autoComplete="current-password"
                                        placeholder="Enter your password"
                                        value={form.password}
                                        onChange={handleChange}
                                        required
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

                            {/* Remember me */}
                            <label className="flex cursor-pointer items-center gap-2.5 text-xs text-gray-600">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(event) =>
                                        setRememberMe(event.target.checked)
                                    }
                                    className="h-4 w-4 accent-slate-900"
                                />
                                Keep me signed in on this device
                            </label>

                            {/* Error */}
                            {error && (
                                <div
                                    role="alert"
                                    className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                                >
                                    {error}
                                </div>
                            )}

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex h-12 w-full items-center justify-center gap-3 bg-slate-900 px-6 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition hover:bg-pink-600 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading ? "Signing in..." : "Sign in"}
                                {!loading && <ArrowRight size={16} />}
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="my-8 flex items-center gap-4">
                            <div className="h-px flex-1 bg-gray-200" />
                            <span className="text-[9px] uppercase tracking-wider text-gray-400">
                                New to Himaanix?
                            </span>
                            <div className="h-px flex-1 bg-gray-200" />
                        </div>

                        {/* Register */}
                        <Link
                            to="/register"
                            className="flex h-12 w-full items-center justify-center gap-3 border border-slate-900 px-6 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-900 transition hover:bg-slate-900 hover:text-white"
                        >
                            Create an account
                            <ArrowRight size={16} />
                        </Link>

                        {/* Legal */}
                        <p className="mt-8 text-center text-[11px] leading-6 text-gray-500">
                            By signing in, you agree to our{" "}
                            <Link
                                to="/Terms"
                                className="underline underline-offset-2 hover:text-slate-900"
                            >
                                Terms &amp; Conditions
                            </Link>{" "}
                            and{" "}
                            <Link
                                to="/privacy-policy"
                                className="underline underline-offset-2 hover:text-slate-900"
                            >
                                Privacy Policy
                            </Link>
                            .
                        </p>
                    </div>
                </section>
            </div>
        </main>
    );
}