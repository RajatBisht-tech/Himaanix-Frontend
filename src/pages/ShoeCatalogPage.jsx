import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ProductGrid from "../components/ProductGrid.jsx";
import { getShoes } from "../api/shoeApi.js";

const PAGE_SIZE = 16;

export default function ShoeCatalogPage({ gender }) {
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("newest");
  const [products, setProducts] = useState([]);
  const [nextPage, setNextPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");
  const [loadMoreError, setLoadMoreError] = useState("");
  const requestId = useRef(0);
  const loadMoreRef = useRef(null);
  const loadingMoreRef = useRef(false);

  useEffect(() => {
    const currentRequest = ++requestId.current;
    const loadShoes = async () => {
      setProducts([]);
      setLoading(true);
      setError("");
      setLoadMoreError("");
      setNextPage(1);
      setHasMore(false);
      setLoadingMore(false);
      loadingMoreRef.current = false;

      try {
        const { data } = await getShoes(gender, {
          page: 1,
          limit: PAGE_SIZE,
          sort,
          ...(category ? { category } : {}),
        });
        if (!data?.success || !Array.isArray(data.products)) {
          throw new Error("Invalid shoes response");
        }
        if (currentRequest !== requestId.current) return;

        setProducts(data.products);
        setNextPage(2);
        setHasMore(1 < (data.pagination?.totalPages || 1));
      } catch (requestError) {
        if (currentRequest === requestId.current) {
          setError(
            requestError.response?.data?.message ||
              requestError.message ||
              "Unable to load shoes."
          );
        }
      } finally {
        if (currentRequest === requestId.current) setLoading(false);
      }
    };

    void loadShoes();
    return () => {
      requestId.current += 1;
    };
  }, [gender, category, sort]);

  const loadMore = async () => {
    if (
      loadingMoreRef.current ||
      !hasMore ||
      loadMoreError
    ) {
      return;
    }

    const currentRequest = requestId.current;
    loadingMoreRef.current = true;
    setLoadingMore(true);
    setLoadMoreError("");
    try {
      const { data } = await getShoes(gender, {
        page: nextPage,
        limit: PAGE_SIZE,
        sort,
        ...(category ? { category } : {}),
      });
      if (!data?.success || !Array.isArray(data.products)) {
        throw new Error("Invalid shoes response");
      }
      if (currentRequest !== requestId.current) return;
      setProducts((current) => [...current, ...data.products]);
      setNextPage((page) => page + 1);
      setHasMore(nextPage < (data.pagination?.totalPages || nextPage));
    } catch (requestError) {
      if (currentRequest !== requestId.current) return;
      setLoadMoreError(
        requestError.response?.data?.message ||
          requestError.message ||
          "Unable to load more shoes."
      );
    } finally {
      if (currentRequest === requestId.current) {
        loadingMoreRef.current = false;
        setLoadingMore(false);
      }
    }
  };

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
        if (entry.isIntersecting) void loadMore();
      },
      { rootMargin: "400px 0px" }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, loading, loadingMore, loadMoreError, nextPage, gender, category, sort]);

  return (
    <main className="min-h-screen bg-white px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-[1600px]">
        <header className="mb-8 border-b border-stone-200 pb-7">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-stone-500">
            The Himaanix Footwear Edit
          </p>
          <h1 className="font-serif text-3xl text-slate-900 sm:text-4xl">
            {gender === "women" ? "Women’s shoes" : "Men’s shoes"}
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-stone-600">
            Find your next everyday favourite from our footwear collection.
          </p>
        </header>

        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs text-stone-600">
            {loading
              ? "Loading shoes..."
              : error
                ? "Shoes unavailable"
                : `Showing ${products.length} shoe${products.length === 1 ? "" : "s"}${hasMore ? " so far" : ""}`}
          </p>
          <div className="flex gap-3">
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              aria-label="Filter shoes by type"
              className="max-w-[180px] border border-stone-300 bg-white px-3 py-2 text-xs outline-none"
            >
              <option value="">All shoe types</option>
              {(gender === "women"
                ? ["Ballet Flats", "Boots", "Casual Shoes", "Flats", "Heels", "Loafers", "Other", "Running Shoes", "Sandals", "Slides", "Sneakers", "Sports Shoes", "Wedges", "Walking Shoes"]
                : ["Boots", "Casual Shoes", "Football Shoes", "Formal Shoes", "Loafers", "Other", "Running Shoes", "Sandals", "Slippers", "Slides", "Sneakers", "Sports Shoes", "Trekking Shoes", "Walking Shoes"]
              ).map((shoeCategory) => (
                <option key={shoeCategory} value={shoeCategory}>
                  {shoeCategory}
                </option>
              ))}
            </select>
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              aria-label="Sort shoes"
              className="border border-stone-300 bg-white px-3 py-2 text-xs outline-none"
            >
              <option value="newest">Newest</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
              <option value="name">Name</option>
            </select>
          </div>
        </div>

        {error ? (
          <p role="alert" className="py-12 text-center text-sm text-red-700">
            {error}
          </p>
        ) : (
          <ProductGrid products={products} loading={loading} />
        )}

        {loadingMore && (
          <p role="status" className="py-8 text-center text-sm text-stone-500">
            Loading more shoes...
          </p>
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

        {hasMore && !loading && !error && (
          <div ref={loadMoreRef} aria-hidden="true" className="h-px" />
        )}
      </div>
    </main>
  );
}
