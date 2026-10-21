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
        setForm((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");

        if (!form.email.trim() || !form.password) {
            setError("Please enter your email and password.");
            return;
        }

        try {
            setLoading(true);
            const { data } = await api.post("/auth/login", {
                email: form.email.trim().toLowerCase(),
                password: form.password,
            });

            if (!data?.success || !data?.token) {
                setError(data?.message || "Unable to sign in.");
                return;
            }

            if (!data.user) {
                setError("Signed in, but the account details were not returned.");
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
        /* Changed to flex-center to hold the card perfectly in the middle of the screen */
        <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">

            {/* 
              The Main Wrapper:
              - md:h-[calc(100vh-4rem)]: Forces it to fit the screen minus the padding on desktop
              - md:max-h-[900px]: Stops it from looking stretched on giant monitors
              - flex flex-col md:flex-row: Creates the split screen
            */}
            <div className="w-full max-w-[1600px] min-h-[600px] md:h-[calc(100vh-4rem)] md:max-h-[900px] flex flex-col md:flex-row overflow-hidden border border-gray-200 bg-white shadow-sm">

                {/* LEFT: Fashion image and welcome content */}
                <section className="relative hidden md:flex md:w-1/2 flex-col bg-[#f4eee5]">
                    <img
                        src="/Family.png"
                        alt="HIMAANIX family fashion collection"
                        loading="eager"
                        className="absolute inset-0 h-full w-full object-cover object-center"
                    />

                    {/* Welcome text */}
                    <div className="relative z-10 mt-auto px-8 pb-12 pt-10 lg:px-12 lg:pb-16">
                        <div className="max-w-md bg-[#f4eee5]/95 p-6 lg:p-8 backdrop-blur-sm shadow-sm">
                            <h1 className="text-[10px] font-medium uppercase tracking-[0.3em] text-slate-700">
                                HIMAANIX
                            </h1>

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

                {/* RIGHT: Login form */}
                {/* Added overflow-y-auto so if the user is on a tiny laptop, the form scrolls, not the whole page */}
                <section className="flex w-full md:w-1/2 items-center justify-center bg-white px-6 py-12 sm:px-10 lg:px-16 overflow-y-auto">
                    <div className="w-full max-w-md my-auto">
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
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
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
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-slate-900"
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
                            <label className="flex cursor-pointer items-center gap-2 text-xs text-gray-600">
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

                            {/* Error message */}
                            {error && (
                                <div
                                    role="alert"
                                    className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                                >
                                    {error}
                                </div>
                            )}

                            {/* Sign in */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex h-12 w-full items-center justify-center gap-3 bg-slate-900 px-6 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading ? "Signing in..." : "Sign in"}
                                {!loading && <ArrowRight size={16} />}
                            </button>
                        </form>

                        {/* Create account divider */}
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

                        {/* Legal text */}
                        <p className="mt-8 text-center text-[11px] leading-6 text-gray-500">
                            By signing in, you agree to our{" "}
                            <Link
                                to="/terms"
                                className="underline underline-offset-2 hover:text-slate-900"
                            >
                                Terms &amp; Conditions
                            </Link>{" "}
                            and{" "}
                            <Link
                                to="/privacy"
                                className="underline underline-offset-2 hover:text-slate-900"
                            >
                                Privacy Policy
                            </Link>.
                        </p>
                    </div>
                </section>
            </div>
        </main>
    );
}