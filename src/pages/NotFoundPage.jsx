import { Link } from "react-router-dom";

export default function NotFoundPage() {
    return (
        <main className="flex min-h-[60vh] flex-col items-center justify-center px-5 py-20 text-center">
            <h1 className="font-serif text-4xl leading-tight text-slate-900 sm:text-5xl lg:text-7xl">
                Looks like this page took a detour.
            </h1>
            <Link className="primary-btn mt-6" to="/">
                BACK TO HOME
            </Link>
        </main>
    );
}