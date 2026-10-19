
import ProductCard from "./ProductCard.jsx";

export default function ProductGrid({
    products = [],
    loading = false,
    loadingCount = 8,
    loadingLabel = "Loading products",
}) {
    const gridClass =
        "grid grid-cols-2 items-stretch gap-x-3 gap-y-8 sm:grid-cols-3 sm:gap-x-5 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-7";

    if (loading) {
        return (
            <div aria-busy="true" aria-label={loadingLabel}>
                <div className={gridClass}>
                    {Array.from(
                        { length: loadingCount },
                        (_, index) => (
                            <div
                                key={index}
                                aria-hidden="true"
                                className="min-w-0"
                            >
                                <div className="aspect-[3/4] w-full animate-pulse bg-gray-100" />

                                <div className="space-y-3 px-2 pb-4 pt-3 sm:px-3">
                                    <div className="h-3 w-1/3 animate-pulse bg-gray-100" />
                                    <div className="h-4 w-4/5 animate-pulse bg-gray-100" />
                                    <div className="h-3 w-1/2 animate-pulse bg-gray-100" />
                                </div>
                            </div>
                        )
                    )}
                </div>

                <div
                    role="status"
                    aria-live="polite"
                    className="mx-auto mt-6 w-fit border border-gray-200 px-6 py-3 text-sm text-slate-900"
                >
                    {loadingLabel}...
                </div>
            </div>
        );
    }

    if (!products.length) {
        return (
            <div className="flex min-h-64 flex-col items-center justify-center text-center">
                <h3 className="font-serif text-2xl text-gray-900">
                    No products found
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                    Try another category or search term.
                </p>
            </div>
        );
    }

    return (
        <div className={gridClass}>
            {products.map((product) => (
                <ProductCard
                    key={product._id || product.slug}
                    product={product}
                />
            ))}
        </div>
    );
}
