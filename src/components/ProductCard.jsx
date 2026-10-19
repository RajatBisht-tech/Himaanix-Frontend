
import { Heart, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext.jsx";

const money = (amount) =>
    new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(Number(amount) || 0);

const hasAvailableStock = (value) => {
    const stock = Number(value);

    if (!Number.isFinite(stock)) return true;

    return stock > 0;
};

export default function ProductCard({ product }) {
    const { wishlist = [], toggleWishlist, addToCart } = useStore();

    const soldOut =
        Array.isArray(product.variants) &&
        product.variants.length > 0 &&
        !product.variants.some((variant) =>
            hasAvailableStock(variant?.stock)
        );

    const saved = wishlist.some(
        (item) => item._id === product._id
    );

    const discount = product.compareAtPrice
        ? Math.round(
            (1 - Number(product.price) / Number(product.compareAtPrice)) *
            100
        )
        : 0;

    const images = Array.isArray(product.images)
        ? product.images
        : [];

    const image = images[0];
    const hoverImage = images.find(
        (productImage, index) =>
            index > 0 && productImage && productImage !== image
    );

    return (
        <article className="group flex min-w-0 flex-col bg-white">
            {/* Product image: identical aspect ratio for every card */}
            <div className="relative w-full overflow-hidden bg-[#f7f5f3]">
                <Link
                    to={`/product/${product.slug}`}
                    aria-label={`View ${product.name}`}
                    className="group/image relative block aspect-[3/4] w-full overflow-hidden"
                >
                    {image ? (
                        <img
                            src={image}
                            alt={product.name || "Himaanix product"}
                            loading="lazy"
                            decoding="async"
                            className={`absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover/image:scale-[1.03] ${hoverImage
                                    ? "opacity-100 group-hover/image:opacity-0"
                                    : ""
                                }`}
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-sm text-gray-400">
                            Image unavailable
                        </div>
                    )}

                    {hoverImage && (
                        <img
                            src={hoverImage}
                            alt={`${product.name || "Product"} alternate view`}
                            loading="lazy"
                            decoding="async"
                            className="absolute inset-0 h-full w-full object-cover object-center opacity-0 transition duration-500 ease-out group-hover/image:scale-[1.03] group-hover/image:opacity-100"
                        />
                    )}
                </Link>

                {/* Rating */}
                <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1 bg-white/95 px-2 py-1 text-xs shadow-sm">
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
                                    ? `${(
                                        product.reviewCount / 1000
                                    ).toFixed(1)}k`
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
                    className={`absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full shadow-sm transition ${saved
                            ? "bg-slate-900 text-white"
                            : "bg-white/95 text-gray-800 hover:bg-white"
                        }`}
                >
                    <Heart
                        size={17}
                        fill={saved ? "currentColor" : "none"}
                    />
                </button>

                {/* Quick add to bag */}
                <button
                    type="button"
                    onClick={() => {
                        if (!soldOut) {
                            addToCart(product);
                        }
                    }}
                    disabled={soldOut}
                    className={`absolute bottom-0 left-0 right-0 z-10 translate-y-full bg-white/95 py-3 text-xs font-semibold uppercase tracking-wider text-gray-900 transition-transform duration-300 group-hover:translate-y-0 focus-visible:translate-y-0 ${soldOut
                            ? "cursor-not-allowed text-gray-500"
                            : "hover:bg-pink-50"
                        }`}
                >
                    {soldOut ? "Sold out" : "Add to bag +"}
                </button>
            </div>

            {/* Product details: consistent spacing */}
            <div className="flex flex-1 flex-col px-2 pb-4 pt-3 sm:px-3">
                <p className="truncate text-xs font-semibold text-gray-900 sm:text-sm">
                    {product.brand || "HIMAANIX"}
                </p>

                <Link
                    to={`/product/${product.slug}`}
                    title={product.name}
                    className="mt-1 line-clamp-2 min-h-10 text-xs leading-5 text-gray-700 transition-colors hover:text-pink-600 sm:text-sm"
                >
                    {product.name}
                </Link>

                {/* Price stays aligned across cards */}
                <div className="mt-2 flex min-h-6 flex-wrap items-center gap-x-2 gap-y-1">
                    <strong className="text-xs font-bold text-gray-900 sm:text-sm">
                        {money(product.price)}
                    </strong>

                    {product.compareAtPrice &&
                        Number(product.compareAtPrice) >
                        Number(product.price) && (
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
