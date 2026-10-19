
import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal } from "lucide-react";

import api from "../api/client.js";
import ProductGrid from "../components/ProductGrid.jsx";

const PRODUCTS_PER_BATCH = 21;

const sizes = [
    "36", "38", "40", "42", "44",
    "46", "48", "50",
];

const womenSizes = [
    "XS", "S", "M", "L", "XL", "XXL", "XXXL", "ONESIZE",
];

const menSizes = [
    "36", "38", "40", "42", "44",
    "46", "48", "50",
];

const kidsSizes = [
    "3-4Y", "4-5Y", "5-6Y", "7-8Y",
    "9-10Y", "11-12Y", "13-14Y", "15-16Y",
];

const colourSwatches = {
    beige: "#d6c2aa",
    black: "#171717",
    blue: "#3b82f6",
    brown: "#8b5e3c",
    burgundy: "#7f1d3f",
    camel: "#c49a6c",
    cream: "#f5f0e6",
    fuchsia: "#c026d3",
    green: "#15803d",
    grey: "#6b7280",
    indigo: "#4f46e5",
    "indigo blue": "#4338ca",
    lilac: "#c4b5fd",
    maroon: "#7f1d1d",
    multicolor: "linear-gradient(135deg, #e80071, #f59e0b, #2563eb, #16a34a)",
    "navy blue": "#1e3a5f",
    "off white": "#f8f7f2",
    olive: "#65723b",
    orange: "#f97316",
    pink: "#ec4899",
    peach: "#fdba9a",
    purple: "#7c3aed",
    red: "#dc2626",
    rust: "#b45309",
    teal: "#0f766e",
    "turquoise blue": "#0891b2",
    wine: "#722f37",
    white: "#ffffff",
    yellow: "#eab308",
};

const namedColours = [
    ["multicolor", /\bmulti[- ]colou?r\b/i],
    ["navy blue", /\bnavy(?: blue)?\b/i],
    ["off white", /\boff[- ]white\b/i],
    ["turquoise blue", /\bturquoise blue\b/i],
    ["beige", /\bbeige\b/i],
    ["black", /\bblack\b/i],
    ["blue", /\bblue\b/i],
    ["brown", /\bbrown\b/i],
    ["burgundy", /\bburgundy\b/i],
    ["cream", /\bcream\b/i],
    ["fuchsia", /\bfuchsia\b/i],
    ["green", /\bgreen\b/i],
    ["grey", /\b(?:grey|gray)\b/i],
    ["indigo blue", /\bindigo blue\b/i],
    ["indigo", /\bindigo\b/i],
    ["lilac", /\blilac\b/i],
    ["maroon", /\bmaroon\b/i],
    ["olive", /\bolive\b/i],
    ["orange", /\borange\b/i],
    ["peach", /\bpeach\b/i],
    ["pink", /\bpink\b/i],
    ["purple", /\bpurple\b/i],
    ["red", /\bred\b/i],
    ["rust", /\brust\b/i],
    ["teal", /\bteal\b/i],
    ["wine", /\bwine\b/i],
    ["white", /\bwhite\b/i],
    ["yellow", /\byellow\b/i],
];

const getProductColours = (product) => {
    const colours = [
        ...(product.variants || []).map((variant) => variant.color),
        product.color,
        ...(Array.isArray(product.colours) ? product.colours : []),
    ].filter((colour) => typeof colour === "string" && colour.trim());

    for (const tag of product.tags || []) {
        const normalizedTag = tag.trim().toLowerCase();
        const matchingColour = namedColours.find(
            ([name]) => name === normalizedTag
        );
        if (matchingColour) colours.push(matchingColour[0]);
    }

    const nameColourMatches = namedColours
        .map(([name, pattern]) => ({ name, index: product.name?.search(pattern) ?? -1 }))
        .filter(({ index }) => index >= 0)
        .sort((a, b) => a.index - b.index);
    if (nameColourMatches.length > 0) {
        colours.push(nameColourMatches[0].name);
    }

    return colours;
};

const money = (amount) =>
    new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(amount || 0);

const hasAvailableStock = (value) => {
    const stock = Number(value);
    if (!Number.isFinite(stock)) return true;
    return stock > 0;
};

export default function ShopPage() {
    const [params] = useSearchParams();

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState("");

    const [sort, setSort] = useState("newest");
    const [search, setSearch] = useState(params.get("search") || "");
    const [category, setCategory] = useState(
        params.get("category") || "All"
    );
    const [nextPage, setNextPage] = useState(2);
    const [hasMore, setHasMore] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [loadMoreError, setLoadMoreError] = useState("");
    const loadMoreRef = useRef(null);
    const loadMoreInProgress = useRef(false);
    const requestIdRef = useRef(0);

    const [selectedSizes, setSelectedSizes] = useState([]);
    const [selectedColours, setSelectedColours] = useState([]);
    const [maxPrice, setMaxPrice] = useState(40000);
    const [showAllColours, setShowAllColours] = useState(false);
    const [filtersOpen, setFiltersOpen] = useState(false);

    const sizeOptions =
        category.toLowerCase() === "women"
            ? womenSizes
            : category.toLowerCase() === "men"
              ? menSizes
              : category.toLowerCase() === "kids"
                ? kidsSizes
              : sizes;

    useEffect(() => {
        setCategory(params.get("category") || "All");
        setSearch(params.get("search") || "");
        setSelectedSizes([]);
        setSelectedColours([]);
    }, [params]);

    useEffect(() => {
        const requestId = ++requestIdRef.current;
        const loadFirstBatch = async () => {
            setItems([]);
            setLoading(true);
            setLoadError("");
            setLoadMoreError("");
            setLoadingMore(false);
            setNextPage(2);
            setHasMore(false);
            loadMoreInProgress.current = false;

            try {
                const { data } = await api.get("/products", {
                    params: {
                        page: 1,
                        limit: PRODUCTS_PER_BATCH,
                        sort,
                        maxPrice,
                        ...(search ? { search } : {}),
                        ...(category !== "All" ? { category } : {}),
                    },
                });

                if (
                    !data.success ||
                    !Array.isArray(data.products) ||
                    !Number.isInteger(data.pagination?.totalPages)
                ) {
                    throw new Error("Invalid products response");
                }

                if (requestId !== requestIdRef.current) return;
                setItems(data.products);
                setHasMore(1 < data.pagination.totalPages);
            } catch (error) {
                if (requestId === requestIdRef.current) {
                    setItems([]);
                    setLoadError(
                        error.response?.data?.message ||
                            error.message ||
                            "Unable to load products. Please try again."
                    );
                }
            } finally {
                if (requestId === requestIdRef.current) setLoading(false);
            }
        };

        loadFirstBatch();

        return () => {
            if (requestId === requestIdRef.current) requestIdRef.current += 1;
        };
    }, [search, category, sort, maxPrice]);

    useEffect(() => {
        const sentinel = loadMoreRef.current;
        if (
            !sentinel ||
            !hasMore ||
            loading ||
            loadingMore ||
            loadMoreError ||
            typeof IntersectionObserver === "undefined"
        ) {
            return undefined;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting || loadMoreInProgress.current) return;

                const requestId = requestIdRef.current;
                const page = nextPage;
                loadMoreInProgress.current = true;
                setLoadingMore(true);
                setLoadMoreError("");

                api.get("/products", {
                    params: {
                        page,
                        limit: PRODUCTS_PER_BATCH,
                        sort,
                        maxPrice,
                        ...(search ? { search } : {}),
                        ...(category !== "All" ? { category } : {}),
                    },
                })
                    .then(({ data }) => {
                        if (requestId !== requestIdRef.current) return;
                        if (
                            !data.success ||
                            !Array.isArray(data.products) ||
                            !Number.isInteger(data.pagination?.totalPages)
                        ) {
                            throw new Error("Invalid products response");
                        }

                        setItems((currentItems) => [
                            ...currentItems,
                            ...data.products.filter(
                                (product) =>
                                    !currentItems.some(
                                        (item) =>
                                            (item._id || item.slug) ===
                                            (product._id || product.slug)
                                    )
                            ),
                        ]);
                        setNextPage(page + 1);
                        setHasMore(page < data.pagination.totalPages);
                    })
                    .catch((error) => {
                        if (requestId === requestIdRef.current) {
                            setLoadMoreError(
                                error.response?.data?.message ||
                                    error.message ||
                                    "Unable to load more products. Please try again."
                            );
                        }
                    })
                    .finally(() => {
                        if (requestId === requestIdRef.current) {
                            loadMoreInProgress.current = false;
                            setLoadingMore(false);
                        }
                    });
            },
            { rootMargin: "400px 0px" }
        );

        observer.observe(sentinel);
        return () => observer.disconnect();
    }, [
        hasMore,
        loading,
        loadingMore,
        loadMoreError,
        nextPage,
        sort,
        maxPrice,
        search,
        category,
    ]);

    const toggleValue = (value, values, setter) => {
        setter(values.includes(value) ? [] : [value]);
    };

    const availableColours = useMemo(() => {
        const colourNames = items.flatMap(getProductColours);

        return [
            ...new Map(
                colourNames
                    .filter((colour) => typeof colour === "string" && colour.trim())
                    .map((colour) => [colour.trim().toLowerCase(), colour.trim()])
            ).values(),
        ].sort((a, b) => a.localeCompare(b));
    }, [items]);

    const shown = useMemo(() => {
        let list = [...items];

        list = list.filter(
            (product) => Number(product.price || 0) <= maxPrice
        );

        if (selectedSizes.length > 0) {
            list = list.filter((product) => {
                const variantSizes = (product.variants || [])
                    .filter((variant) => hasAvailableStock(variant?.stock))
                    .flatMap((variant) =>
                        [
                            String(variant.size || "").trim().toUpperCase(),
                            ...String(variant.size || "")
                                .toUpperCase()
                                .split(/[^A-Z0-9]+/)
                                .filter(Boolean),
                        ]
                    );
                const legacySizes = Array.isArray(product.sizes)
                    ? product.sizes.map((size) => String(size).toUpperCase())
                    : [];
                return selectedSizes.some((size) =>
                    [...variantSizes, ...legacySizes].includes(size)
                );
            });
        }

        if (selectedColours.length > 0) {
            list = list.filter((product) => {
                const variantColours = (product.variants || [])
                    .filter((variant) => hasAvailableStock(variant?.stock))
                    .map((variant) => variant.color);
                const productColours = [
                    ...variantColours,
                    ...getProductColours(product),
                ]
                    .filter(Boolean)
                    .map((colour) => colour.toLowerCase());

                return selectedColours.some((colour) =>
                    productColours.includes(colour.toLowerCase())
                );
            });
        }

        // Sorting.
        if (sort === "low") {
            list.sort((a, b) => a.price - b.price);
        } else if (sort === "high") {
            list.sort((a, b) => b.price - a.price);
        } else if (sort === "name") {
            list.sort((a, b) =>
                (a.name || "").localeCompare(b.name || "")
            );
        } else if (sort === "newest") {
            list.sort(
                (a, b) =>
                    new Date(b.createdAt || 0) -
                    new Date(a.createdAt || 0)
            );
        } else if (sort === "featured") {
            list.sort(
                (a, b) =>
                Number(Boolean(b.isFeatured)) -
                    Number(Boolean(a.isFeatured)) ||
                new Date(b.createdAt || 0) -
                    new Date(a.createdAt || 0)
            );
        }

        return list;
    }, [
        items,
        selectedSizes,
        selectedColours,
        maxPrice,
        sort,
    ]);

    const clearFilters = () => {
        setSelectedSizes([]);
        setSelectedColours([]);
        setMaxPrice(40000);
        setSort("newest");
        setCategory("All");
    };

    return (
        <main className="min-h-screen bg-white px-4 py-8 sm:px-6 lg:px-10">
            <div className="mx-auto max-w-[1600px]">
                {/* Page heading */}
                <header className="mb-8 border-b border-stone-200 pb-7">
                    <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-stone-500">
                        The Himaanix Store
                    </p>

                    <h1 className="font-serif text-3xl text-slate-900 sm:text-4xl">
                        {category === "All"
                            ? "Fashion, your way."
                            : category}
                    </h1>

                    <p className="mt-3 max-w-xl text-sm leading-6 text-stone-600">
                        Discover considered styles, everyday favourites,
                        and standout pieces for every moment.
                    </p>
                </header>

                {/* Toolbar */}
                <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                    <p className="text-xs text-stone-600">
                        {loading
                            ? "Loading pieces..."
                            : loadError
                              ? "Products unavailable"
                              : `Showing ${shown.length} piece${shown.length === 1 ? "" : "s"}${hasMore ? " so far" : ""}`}
                    </p>

                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => setFiltersOpen(!filtersOpen)}
                            className="flex items-center gap-2 border border-stone-300 px-3 py-2 text-xs uppercase tracking-wider lg:hidden"
                        >
                            <SlidersHorizontal size={15} />
                            Filters
                        </button>

                        <select
                            value={category}
                            onChange={(event) => {
                                setCategory(event.target.value)
                                setSelectedSizes([]);
                                setSelectedColours([]);
                            }}
                            aria-label="Filter by category"
                            className="max-w-[145px] border border-stone-300 bg-transparent px-3 py-2 text-xs outline-none"
                        >
                            <option value="All">All categories</option>
                            <option value="Women">Women</option>
                            <option value="Men">Men</option>
                            <option value="Kids">Kids</option>
                            <option value="Indianwear">Indianwear</option>
                            <option value="Westernwear">Westernwear</option>
                            <option value="Dresses">Dresses</option>
                            <option value="Footwear">Footwear</option>
                            <option value="Bags">Bags</option>
                            <option value="Jewellery">Jewellery</option>
                            <option value="Accessories">Accessories</option>
                        </select>

                        <select
                            value={sort}
                            onChange={(event) => setSort(event.target.value)}
                            aria-label="Sort products"
                            className="border border-stone-300 bg-transparent px-3 py-2 text-xs uppercase tracking-wider outline-none"
                        >
                            <option value="newest">Newest</option>
                            <option value="featured">Featured</option>
                            <option value="low">Price: Low to High</option>
                            <option value="high">Price: High to Low</option>
                            <option value="name">Name: A to Z</option>
                        </select>
                    </div>
                </div>

                {/* Sidebar and products */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-[190px_minmax(0,1fr)] xl:grid-cols-[220px_minmax(0,1fr)]">
                    <aside
                        className={`${filtersOpen ? "block" : "hidden"
                            } space-y-8 lg:block`}
                    >
                        {/* Size filter */}
                        <section>
                            <h2 className="mb-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-stone-500">
                                Size
                            </h2>

                            <div className="flex flex-wrap gap-2">
                                {sizeOptions.map((size) => (
                                    <button
                                        key={size}
                                        type="button"
                                        aria-pressed={selectedSizes.includes(size)}
                                        onClick={() =>
                                            toggleValue(
                                                size,
                                                selectedSizes,
                                                setSelectedSizes
                                            )
                                        }
                                        className={`min-w-10 border px-3 py-2 text-xs transition ${selectedSizes.includes(size)
                                                ? "border-slate-900 bg-slate-900 text-white"
                                                : "border-stone-300 text-slate-900 hover:border-slate-900"
                                            }`}
                                    >
                                        {size === "ONESIZE" ? "One Size" : size}
                                    </button>
                                ))}
                            </div>
                        </section>

                        {/* Colour filter */}
                        <section>
                            <h2 className="mb-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-stone-500">
                                Colour
                            </h2>

                            <div className="grid grid-cols-2 gap-x-3 gap-y-4">
                                {availableColours
                                    .slice(
                                        0,
                                                        showAllColours ? availableColours.length : 6
                                    )
                                                    .map((colourName) => (
                                        <button
                                                            key={colourName}
                                            type="button"
                                            aria-pressed={selectedColours.includes(
                                                                colourName
                                            )}
                                            onClick={() =>
                                                toggleValue(
                                                                    colourName,
                                                    selectedColours,
                                                    setSelectedColours
                                                )
                                            }
                                            className="flex min-w-0 items-center gap-2 text-left text-xs"
                                        >
                                            <span
                                                className={`h-5 w-5 shrink-0 rounded-full border ${selectedColours.includes(
                                                    colourName
                                                )
                                                        ? "border-black ring-2 ring-stone-400 ring-offset-2"
                                                        : "border-stone-300"
                                                    }`}
                                                style={{
                                                    background:
                                                        colourSwatches[
                                                            colourName.toLowerCase()
                                                        ] || "#d1d5db",
                                                }}
                                            />

                                            <span className="truncate">
                                                {colourName}
                                            </span>
                                        </button>
                                    ))}
                            </div>

                            {availableColours.length > 6 && (
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowAllColours(!showAllColours)
                                    }
                                    className="mt-5 border-b border-black pb-1 text-[10px] uppercase tracking-[0.2em]"
                                >
                                    {showAllColours ? "Show less" : "Show more"}
                                </button>
                            )}
                        </section>

                        {/* Price filter */}
                        <section>
                            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                                <h2 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-stone-500">
                                    Max price
                                </h2>

                                <span className="text-xs font-medium">
                                    {money(maxPrice)}
                                </span>
                            </div>

                            <input
                                type="range"
                                min="500"
                                max="40000"
                                step="500"
                                value={maxPrice}
                                onChange={(event) =>
                                    setMaxPrice(Number(event.target.value))
                                }
                                aria-label="Maximum price"
                                className="w-full cursor-pointer accent-slate-900"
                            />

                            <div className="mt-1 flex justify-between text-[10px] text-stone-500">
                                <span>₹500</span>
                                <span>₹40,000</span>
                            </div>
                        </section>

                        <button
                            type="button"
                            onClick={clearFilters}
                            className="border-b border-stone-400 pb-1 text-xs text-stone-600 hover:text-black"
                        >
                            Clear all filters
                        </button>
                    </aside>

                    {/* Product grid */}
                    <section className="min-w-0">
                        {loading ? (
                            <ProductGrid
                                loading
                                loadingCount={PRODUCTS_PER_BATCH}
                            />
                        ) : loadError ? (
                            <p
                                role="alert"
                                className="border border-red-200 bg-red-50 p-5 text-sm text-red-700"
                            >
                                {loadError}
                            </p>
                        ) : shown.length > 0 ? (
                            <ProductGrid products={shown} />
                        ) : hasMore ? (
                            <div className="flex min-h-64 items-center justify-center text-sm text-stone-500">
                                Looking for matching pieces...
                            </div>
                        ) : (
                            <div className="flex min-h-72 flex-col items-center justify-center px-4 text-center">
                                <h2 className="font-serif text-2xl text-slate-900">
                                    No pieces found
                                </h2>

                                <p className="mt-3 text-sm text-stone-500">
                                    Try adjusting your filters or search for
                                    something else.
                                </p>

                                <button
                                    type="button"
                                    onClick={clearFilters}
                                    className="mt-6 border border-slate-900 px-6 py-3 text-xs uppercase tracking-widest transition hover:bg-slate-900 hover:text-white"
                                >
                                    Clear filters
                                </button>
                            </div>
                        )}
                        {loadingMore && (
                            <ProductGrid
                                loading
                                loadingCount={PRODUCTS_PER_BATCH}
                                loadingLabel="Loading more products"
                            />
                        )}
                        {loadMoreError && (
                            <div
                                role="alert"
                                className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm text-red-700"
                            >
                                <span>{loadMoreError}</span>
                                <button
                                    type="button"
                                    onClick={() => setLoadMoreError("")}
                                    className="border border-red-300 px-3 py-2 text-xs uppercase tracking-wider hover:bg-red-50"
                                >
                                    Try again
                                </button>
                            </div>
                        )}
                        {hasMore && (
                            <div
                                ref={loadMoreRef}
                                aria-hidden="true"
                                className="h-px"
                            />
                        )}
                    </section>
                </div>
            </div>
        </main>
    );
}
