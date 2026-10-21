
import { Heart, Star } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../context/StoreContext.jsx";

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

export default function ProductCard({ product }) {
    const { wishlist, toggleWishlist, addToCart } = useStore();
    const navigate = useNavigate();
    const soldOut =
        !product.gender &&
        product.variants?.length > 0 &&
        !product.variants.some((variant) => hasAvailableStock(variant));

    const saved = wishlist.some(
        (item) => item._id === product._id
    );

    const discount = product.compareAtPrice
        ? Math.round(
            (1 - product.price / product.compareAtPrice) * 100
        )
        : 0;

    const image = product.gender
        ? getShoeImageUrl(product.images?.[0])
        : product.images?.[0];
    const productPath =
        product.catalogType === "watch"
            ? `/watches/${product.gender}/${product.slug}`
            : product.gender === "men" || product.gender === "women"
                ? `/shoes/${product.gender}/${product.slug}`
                : `/product/${product.slug}`;
    const hoverImage = product.gender
        ? null
        : product.images?.find(
            (productImage, index) => index > 0 && productImage !== image
        );

    return (
        <article className="group min-w-0 bg-white">
            {/* Product image */}
            <div className="relative overflow-hidden bg-[#f7f7f7]">
                <Link
                    to={productPath}
                    className="group/image relative block aspect-[3/4] overflow-hidden"
                >
                    {image && (
                        <img
                            src={image}
                            alt={product.name}
                            loading="lazy"
                            decoding="async"
                            className={`absolute inset-0 h-full w-full object-cover transition duration-500 ease-out group-hover/image:scale-[1.04] ${
                                hoverImage
                                    ? "opacity-100 group-hover/image:opacity-0"
                                    : "opacity-100"
                            }`}
                        />
                    )}
                    {hoverImage && (
                        <img
                            src={hoverImage}
                            alt={`${product.name}, alternate view`}
                            loading="lazy"
                            decoding="async"
                            className="absolute inset-0 h-full w-full scale-[1.02] object-cover opacity-0 transition duration-500 ease-out group-hover/image:scale-100 group-hover/image:opacity-100"
                        />
                    )}
                </Link>

                {/* Rating badge */}
                <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-white/95 px-2 py-1 text-xs shadow-sm">
                    <span className="font-semibold text-gray-900">
                        {product.rating || "4.5"}
                    </span>
                    <Star
                        size={13}
                        fill="currentColor"
                        className="text-teal-600"
                    />
                    {product.reviewCount != null && (
                        <>
                            <span className="text-gray-400">|</span>
                            <span className="text-gray-600">
                                {product.reviewCount >= 1000
                                    ? `${(product.reviewCount / 1000).toFixed(1)}k`
                                    : product.reviewCount}
                            </span>
                        </>
                    )}
                </div>

                {/* Wishlist */}
                <button
                    type="button"
                    onClick={() => toggleWishlist(product)}
                    aria-label={
                        saved
                            ? "Remove from wishlist"
                            : "Add to wishlist"
                    }
                    aria-pressed={saved}
                    className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full transition ${saved
                            ? "bg-black text-white"
                            : "bg-white/95 text-gray-800 hover:bg-gray-100"
                        }`}
                >
                    <Heart
                        size={17}
                        fill={saved ? "currentColor" : "none"}
                    />
                </button>

                {/* Quick add */}
                <button
                    type="button"
                    onClick={() => {
                        if (product.gender) {
                            navigate(productPath);
                        } else if (!soldOut) {
                            addToCart(product);
                        }
                    }}
                    disabled={soldOut}
                    className={`absolute bottom-0 left-0 right-0 translate-y-full bg-white/95 py-3 text-xs font-semibold uppercase tracking-wider text-gray-900 transition-transform duration-300 group-hover:translate-y-0 focus:translate-y-0 ${
                        soldOut ? "cursor-not-allowed text-gray-500" : ""
                    }`}
                >
                    {soldOut
                        ? "Sold out"
                        : product.gender
                            ? "Choose size"
                            : "Add to bag +"}
                </button>
            </div>

            {/* Product details */}
            <div className="px-3 pb-4 pt-3">
                <p className="text-sm font-semibold text-gray-900">
                    {product.brand || "HIMAANIX"}
                </p>

                <Link
                    to={productPath}
                    className="mt-1 block text-sm leading-5 text-gray-700 hover:text-black"
                >
                    {product.name}
                </Link>

                <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1">
                    <strong className="text-sm font-bold text-gray-900">
                        {money(product.price)}
                    </strong>

                    {product.compareAtPrice && (
                        <>
                            <del className="text-xs text-gray-400">
                                {money(product.compareAtPrice)}
                            </del>

                            {discount > 0 && (
                                <span className="text-xs text-[#f06445]">
                                    ({discount}% OFF)
                                </span>
                            )}
                        </>
                    )}
                </div>
            </div>
        </article>
    );
}

function getShoeImageUrl(image) {
    if (!image) return image;

    try {
        const url = new URL(image);
        if (url.hostname.endsWith("cdn.shopify.com")) {
            url.searchParams.set("width", "640");
            url.searchParams.set("format", "webp");
            return url.toString();
        }
    } catch {
        return image;
    }

    return image;
}
