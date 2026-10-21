import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Heart, ShoppingBag, X } from "lucide-react";
import { getProductBySlug } from "../api/productApi.js";
import { getShoeBySlug } from "../api/shoeApi.js";
import { getWatchBySlug } from "../api/watchApi.js";
import { products as demoProducts } from "../data/products.js";
import { useStore } from "../context/StoreContext.jsx";
import "./ProductPage.css";

const money = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount || 0);

const hasAvailableStock = (variant) => {
  if (variant?.isAvailable === false) return false;
  if (variant?.isAvailable === true) return true;
  const stock = Number(variant?.stock);
  if (!Number.isFinite(stock)) return true;
  return stock > 0;
};

export default function ProductPage() {
  const { slug, gender, watchGender } = useParams();
  const catalogGender = watchGender || gender;
  const navigate = useNavigate();
  const { addToCart, wishlist, toggleWishlist } = useStore();
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState("");
  const [activeImage, setActiveImage] = useState("");
  const [zoomPosition, setZoomPosition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const loadProduct = async () => {
      setLoading(true);
      setError("");
      setProduct(null);
      setSelectedVariant("");

      try {
        const { data } = watchGender
          ? await getWatchBySlug(watchGender, slug)
          : gender
            ? await getShoeBySlug(gender, slug)
            : await getProductBySlug(slug);
        if (!data?.success || !data.product) {
          throw new Error(data?.message || "Product not found");
        }
        if (active) setProduct(data.product);
      } catch (requestError) {
        const demoProduct = catalogGender
          ? null
          : demoProducts.find((item) => item.slug === slug);
        if (active && demoProduct) {
          setProduct(demoProduct);
        } else if (active) {
          setError(
            requestError.response?.data?.message ||
              requestError.message ||
              "Product not found."
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    loadProduct();
    return () => {
      active = false;
    };
  }, [gender, watchGender, catalogGender, slug]);

  useEffect(() => {
    const images = product?.images?.filter(Boolean) || [];
    setActiveImage(images[0] || "");

    const availableVariant = product?.variants?.find(
      (variant) => hasAvailableStock(variant)
    );
    setSelectedVariant(availableVariant ? variantKey(availableVariant) : "");
  }, [product]);

  if (loading) {
    return (
      <main className="mx-auto flex min-h-[55vh] max-w-6xl items-center justify-center px-4">
        <p className="text-sm text-gray-500">Loading product…</p>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="mx-auto min-h-[55vh] max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="font-serif text-3xl text-slate-900">
          {error || "Product not found"}
        </h1>
        <Link
          to="/shop"
          className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-pink-600"
        >
          <ArrowLeft size={16} />
          Back to shop
        </Link>
      </main>
    );
  }

  const saved = wishlist.some((item) => item._id === product._id);
  const variants = product.variants || [];
  const hasVariants = variants.length > 0;
  const selected = variants.find(
    (variant) => variantKey(variant) === selectedVariant
  );
  const availableVariants = variants.filter((variant) => hasAvailableStock(variant));
  const images = product.images?.filter(Boolean) || [];
  const discount = product.compareAtPrice > product.price
    ? Math.round(
        ((product.compareAtPrice - product.price) / product.compareAtPrice) *
          100
      )
    : 0;
  const brand =
    typeof product.brand === "string"
      ? product.brand
      : product.category?.name || "HIMAANIX";
  const categoryName =
    typeof product.category === "string"
      ? product.category
      : product.category?.name;
  const specifications = Object.entries(product.specifications || {}).filter(
    ([name, value]) =>
      !/^(gender|productType|sourceProductId|publishedAt|updatedAt|createdAt)$/i.test(
        name
      ) &&
      (typeof value === "string" ||
        typeof value === "number" ||
        typeof value === "boolean")
  );

  const updateZoomPosition = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    setZoomPosition({
      x: Math.min(83, Math.max(17, ((event.clientX - bounds.left) / bounds.width) * 100)),
      y: Math.min(83, Math.max(17, ((event.clientY - bounds.top) / bounds.height) * 100)),
    });
  };

  const handleAddToBag = () => {
    if (hasVariants && !selected) return;
    addToCart({
      ...product,
      selectedSize: selected?.size || "",
      selectedColor: selected?.color || "",
    });
    navigate("/cart");
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8 lg:py-10">
      <nav
        aria-label="Breadcrumb"
        className="mb-6 flex flex-wrap items-center gap-2 text-xs text-gray-500"
      >
        <Link to="/" className="hover:text-slate-900">Home</Link>
        <span aria-hidden="true">/</span>
        <Link
          to={
            watchGender
              ? `/watches/${watchGender}`
              : gender
                ? `/shoes/${gender}`
              : `/shop${categoryName ? `?category=${encodeURIComponent(categoryName)}` : ""}`
          }
          className="hover:text-slate-900"
        >
          {categoryName || "Shop"}
        </Link>
        <span aria-hidden="true">/</span>
        <span className="max-w-xs truncate text-slate-700">{product.name}</span>
      </nav>

      <div className="product-view-layout">
        <section
          aria-label="Product images"
          className="product-view-gallery"
        >
          {images.length > 1 && (
            <div className="product-view-thumbnails">
              {images.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  onClick={() => {
                    setActiveImage(image);
                    setZoomPosition(null);
                  }}
                  aria-label={`View product image ${index + 1}`}
                  aria-pressed={activeImage === image}
                  className={`product-view-thumbnail ${
                    activeImage === image
                      ? "border-slate-900"
                      : "border-gray-200 hover:border-gray-400"
                  }`}
                >
                  <img
                    src={image}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          <div
            className={`product-view-hero${zoomPosition ? " is-zoomed" : ""}`}
            role="button"
            tabIndex={0}
            aria-label="Product image. Hover or tap to zoom."
            onPointerEnter={(event) => {
              if (event.pointerType === "mouse") updateZoomPosition(event);
            }}
            onPointerMove={(event) => {
              if (event.pointerType === "mouse" || zoomPosition) {
                updateZoomPosition(event);
              }
            }}
            onPointerLeave={(event) => {
              if (event.pointerType === "mouse") setZoomPosition(null);
            }}
            onPointerDown={(event) => {
              if (event.pointerType === "touch") {
                if (zoomPosition) {
                  setZoomPosition(null);
                } else {
                  updateZoomPosition(event);
                }
              }
            }}
            onKeyDown={(event) => {
              if (event.key === "Escape") setZoomPosition(null);
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                setZoomPosition((position) =>
                  position ? null : { x: 50, y: 50 }
                );
              }
            }}
          >
            {activeImage ? (
              <img
                src={activeImage}
                alt={product.name}
              />
            ) : (
              <div className="product-view-image-placeholder">
                Product image unavailable
              </div>
            )}
            {zoomPosition && activeImage && (
              <>
                <div
                  className="product-view-zoom-lens"
                  style={{
                    left: `${zoomPosition.x}%`,
                    top: `${zoomPosition.y}%`,
                  }}
                  aria-hidden="true"
                />
                <div
                  className="product-view-zoom-panel"
                  role="img"
                  aria-label={`Zoomed view of ${product.name}`}
                  style={{
                    backgroundImage: `url("${activeImage}")`,
                    backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                  }}
                >
                  <button
                    type="button"
                    className="product-view-zoom-close"
                    aria-label="Close product image zoom"
                    onClick={(event) => {
                      event.stopPropagation();
                      setZoomPosition(null);
                    }}
                    onPointerDown={(event) => event.stopPropagation()}
                  >
                    <X size={18} />
                  </button>
                </div>
              </>
            )}
            {!zoomPosition && (
              <span className="product-view-zoom-hint" aria-hidden="true">
                Hover to zoom
              </span>
            )}
            {discount > 0 && (
              <span className="absolute left-3 top-3 bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-pink-700 shadow-sm">
                {discount}% off
              </span>
            )}
          </div>
        </section>

        <section className="product-view-information">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
            {brand}
          </p>
          <h1 className="mt-2 font-serif text-3xl leading-snug text-slate-900 sm:text-4xl">
            {product.name}
          </h1>

          <div className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-gray-200 pb-5">
            <span className="text-2xl font-semibold text-slate-900">
              {money(product.price)}
            </span>
            {discount > 0 && (
              <>
                <del className="text-sm text-gray-500">
                  {money(product.compareAtPrice)}
                </del>
                <span className="text-sm font-semibold text-pink-700">
                  ({discount}% off)
                </span>
              </>
            )}
            <span className="basis-full text-xs text-gray-500">
              Inclusive of all taxes
            </span>
          </div>

          {product.description && (
            <div className="mt-6">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-900">
                Product details
              </h2>
              <p className="mt-2 max-h-48 overflow-y-auto whitespace-pre-line text-sm leading-6 text-gray-600">
                {product.description}
              </p>
            </div>
          )}

          {specifications.length > 0 && (
            <div className="mt-6">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-900">
                Specifications
              </h2>
              <dl className="mt-3 divide-y divide-gray-100 border-y border-gray-100">
                {specifications.map(([name, value]) => (
                  <div
                    key={name}
                    className="grid grid-cols-2 gap-4 py-2 text-sm"
                  >
                    <dt className="capitalize text-gray-500">
                      {name.replace(/([A-Z])/g, " $1")}
                    </dt>
                    <dd className="text-right text-slate-800">
                      {String(value)}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          {hasVariants ? (
            <div className="mt-7">
              <div className="mb-3 flex items-center justify-between gap-3">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-900">
                  Select size / colour
                </h2>
                {availableVariants.length > 0 && (
                  <span className="text-xs text-gray-500">
                    {availableVariants.length} available option
                    {availableVariants.length === 1 ? "" : "s"}
                  </span>
                )}
              </div>
              {availableVariants.length ? (
                <select
                  value={selectedVariant}
                  onChange={(event) => setSelectedVariant(event.target.value)}
                  aria-label="Select product size and colour"
                  className="h-12 w-full border border-gray-300 bg-white px-3 text-sm text-slate-900 outline-none focus:border-slate-900"
                >
                  {availableVariants.map((variant) => (
                    <option
                      key={variantKey(variant)}
                      value={variantKey(variant)}
                    >
                      {[variant.size, variant.color].filter(Boolean).join(" · ")}
                      {variant.stock != null
                        ? ` · ${variant.stock} available`
                        : variant.isAvailable
                          ? " · Available"
                          : " · Out of stock"}
                    </option>
                  ))}
                </select>
              ) : (
                <p className="border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                  This product is currently out of stock.
                </p>
              )}
            </div>
          ) : (
            <p className="mt-7 text-sm text-emerald-700">In stock</p>
          )}

          <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto]">
            <button
              type="button"
              className="primary-btn product-add inline-flex min-h-12 items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-50"
              onClick={handleAddToBag}
              disabled={hasVariants && !selected}
            >
              <ShoppingBag size={17} />
              {hasVariants && !selected ? "OUT OF STOCK" : "ADD TO BAG"}
            </button>
            <button
              type="button"
              className="save-product inline-flex min-h-12 items-center justify-center gap-2 border border-gray-300 px-5 text-xs font-semibold uppercase tracking-wider text-slate-900 transition hover:border-slate-900"
              onClick={() => toggleWishlist(product)}
              aria-pressed={saved}
            >
              <Heart size={17} fill={saved ? "currentColor" : "none"} />
              <span className="hidden sm:inline">
                {saved ? "Saved" : "Wishlist"}
              </span>
            </button>
          </div>

          <div className="mt-7 border-t border-gray-200 pt-5 text-sm text-gray-600">
            <h2 className="font-semibold text-slate-900">Delivery & support</h2>
            <ul className="mt-3 space-y-2">
              <li>Easy returns on eligible items</li>
              <li>Secure payment options</li>
              <li>Support whenever you need it</li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}

function variantKey(variant) {
  return `${variant.size || ""}-${variant.color || ""}`;
}
