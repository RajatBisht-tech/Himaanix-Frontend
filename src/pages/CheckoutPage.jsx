import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  LockKeyhole,
  PackageCheck,
  ShieldCheck,
} from "lucide-react";
import { createOrder } from "../api/orderApi.js";
import { useAuth } from "../context/AuthContext.jsx";
import { useStore } from "../context/StoreContext.jsx";
import { getOrderNumber } from "../utils/orderNumber.js";

const money = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

const fieldClass =
  "h-12 w-full border border-gray-300 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-gray-400 focus:border-slate-900";
const labelClass =
  "mb-2 block text-xs font-semibold tracking-wide text-slate-700";

const hasAvailableStock = (value, required = 1) => {
  const stock = Number(value);
  if (!Number.isFinite(stock)) return true;
  return stock >= required;
};

const findVariant = (product, size, color) =>
  product.variants?.find(
    (variant) =>
      (variant.size === size ||
        (size && variant.size.startsWith(`${size}/`))) &&
      (!color || variant.color === color)
  );

const getDefaultVariantIndex = ({ product, quantity }) => {
  const variants = product.variants || [];
  const storedVariant = findVariant(
    product,
    product.selectedSize,
    product.selectedColor
  );

  if (storedVariant && hasAvailableStock(storedVariant.stock, quantity)) {
    return variants.indexOf(storedVariant);
  }

  const availableIndex = variants.findIndex((variant) =>
    hasAvailableStock(variant.stock, quantity)
  );
  if (availableIndex >= 0) return availableIndex;

  return variants.findIndex((variant) => hasAvailableStock(variant.stock));
};

const getSelectedVariantIndex = (item, selectedVariants) => {
  const selectedIndex = selectedVariants[item.key];
  if (selectedIndex !== undefined) return selectedIndex;

  const defaultIndex = getDefaultVariantIndex(item);
  return defaultIndex >= 0 ? String(defaultIndex) : "";
};

const hasAvailableSelectedVariant = (item, selectedVariants) => {
  const index = getSelectedVariantIndex(item, selectedVariants);
  const variant = item.product.variants?.[Number(index)];
  return Boolean(variant && hasAvailableStock(variant.stock, item.quantity));
};

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const { cart, cartTotal, clearCart } = useStore();
  const [selectedVariants, setSelectedVariants] = useState({});
  const [address, setAddress] = useState({
    fullName: user?.name || "",
    phone: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [placedOrderId, setPlacedOrderId] = useState("");
  const [placedOrderNumber, setPlacedOrderNumber] = useState("");

  const shippingFee = cartTotal >= 1999 ? 0 : 99;
  const orderTotal = cartTotal + shippingFee;
  const itemsMissingAvailableVariant = cart.filter(
    (item) =>
      item.product.variants?.length > 0 &&
      !hasAvailableSelectedVariant(item, selectedVariants)
  );
  const allVariantsOutOfStock = (product) =>
    product.variants?.length > 0 &&
    !product.variants.some((variant) => hasAvailableStock(variant.stock));

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAddress((current) => ({ ...current, [name]: value }));
    setError("");
  };

  const handleVariantChange = (key, size) => {
    setSelectedVariants((current) => ({ ...current, [key]: size }));
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!user || !token) {
      navigate("/login", { state: { from: "/checkout" } });
      return;
    }
    if (!event.currentTarget.checkValidity()) {
      event.currentTarget.reportValidity();
      return;
    }
    if (!cart.length) {
      setError("Your bag is empty.");
      return;
    }
    const itemMissingVariant = itemsMissingAvailableVariant[0];
    if (itemMissingVariant) {
      setError(
        `Select an available size for ${itemMissingVariant.product.name}.`
      );
      return;
    }

    try {
      setLoading(true);
      const { data } = await createOrder({
        items: cart.map(({ key, product, quantity }) => {
          const selectedIndex = getSelectedVariantIndex(
            { key, product, quantity },
            selectedVariants
          );
          const selectedVariant =
            product.variants?.[Number(selectedIndex)];
          return {
            product: product._id,
            size: selectedVariant?.size || "",
            color: selectedVariant?.color || product.selectedColor || "",
            quantity,
          };
        }),
        shippingAddress: address,
        subtotal: cartTotal,
        discount: 0,
        shippingFee,
        total: orderTotal,
        paymentMethod: "cod",
      });

      if (!data?.success || !data?.order?._id) {
        throw new Error(data?.message || "We couldn't place your order.");
      }

      clearCart();
      setPlacedOrderId(data.order._id);
      setPlacedOrderNumber(getOrderNumber(data.order));
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          requestError.message ||
          "We couldn't place your order. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (placedOrderId) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl border border-gray-200 bg-white px-6 py-14 text-center shadow-sm">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-emerald-50 text-emerald-600">
            <Check size={28} />
          </span>
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
            Order confirmed
          </p>
          <h1 className="mt-3 font-serif text-3xl text-slate-900">
            Thank you, {user?.name?.split(" ")[0] || "your order is in"}.
          </h1>
          <p className="mt-3 text-sm leading-6 text-gray-500">
            Your order number is{" "}
            <span className="font-semibold text-slate-900">
              {placedOrderNumber}
            </span>.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link to={`/orders/${placedOrderId}/tracking`} className="primary-btn">
              TRACK ORDER
            </Link>
            <Link to="/shop" className="border border-slate-900 px-5 py-3 text-xs font-bold tracking-wide text-slate-900 hover:bg-gray-50">
              CONTINUE SHOPPING
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (!cart.length) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl border border-gray-200 bg-white px-6 py-14 text-center shadow-sm">
          <PackageCheck className="mx-auto text-pink-600" size={34} />
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-pink-600">
            Checkout
          </p>
          <h1 className="mt-3 font-serif text-3xl text-slate-900">
            Your bag is empty
          </h1>
          <p className="mt-3 text-sm leading-6 text-gray-500">
            Add something you love and it will be waiting here.
          </p>
          <Link to="/shop" className="primary-btn mt-7">
            CONTINUE SHOPPING
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-9 sm:px-6 sm:py-12 lg:px-8">
      <Link
        to="/cart"
        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-600 transition hover:text-pink-600"
      >
        <ArrowLeft size={15} />
        Back to bag
      </Link>

      <div className="mb-8 mt-6 flex flex-wrap items-end justify-between gap-4 border-b border-gray-200 pb-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-pink-600">
            Almost yours
          </p>
          <h1 className="mt-2 font-serif text-4xl text-slate-900">
            Checkout
          </h1>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <LockKeyhole size={15} />
          Secure checkout
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_390px]">
          <div className="space-y-6">
            <section className="border border-gray-200 bg-white p-5 sm:p-7">
              <div className="mb-6 flex items-start gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                  1
                </span>
                <div>
                  <h2 className="font-serif text-2xl text-slate-900">
                    Delivery address
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Where should we deliver your order?
                  </p>
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="sm:col-span-2">
                  <span className={labelClass}>Full name</span>
                  <input
                    className={fieldClass}
                    name="fullName"
                    autoComplete="name"
                    value={address.fullName}
                    onChange={handleChange}
                    required
                    maxLength={100}
                  />
                </label>
                <label>
                  <span className={labelClass}>Mobile number</span>
                  <input
                    className={fieldClass}
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    placeholder="+91 98765 43210"
                    value={address.phone}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label>
                  <span className={labelClass}>Postal code</span>
                  <input
                    className={fieldClass}
                    name="postalCode"
                    autoComplete="postal-code"
                    inputMode="numeric"
                    placeholder="PIN code"
                    value={address.postalCode}
                    onChange={handleChange}
                    required
                    maxLength={12}
                  />
                </label>
                <label className="sm:col-span-2">
                  <span className={labelClass}>Address</span>
                  <input
                    className={fieldClass}
                    name="line1"
                    autoComplete="address-line1"
                    placeholder="House number, street, area"
                    value={address.line1}
                    onChange={handleChange}
                    required
                    maxLength={180}
                  />
                </label>
                <label className="sm:col-span-2">
                  <span className={labelClass}>
                    Apartment, suite, landmark{" "}
                    <span className="font-normal text-gray-400">(optional)</span>
                  </span>
                  <input
                    className={fieldClass}
                    name="line2"
                    autoComplete="address-line2"
                    placeholder="Apartment, floor, landmark"
                    value={address.line2}
                    onChange={handleChange}
                    maxLength={180}
                  />
                </label>
                <label>
                  <span className={labelClass}>City</span>
                  <input
                    className={fieldClass}
                    name="city"
                    autoComplete="address-level2"
                    value={address.city}
                    onChange={handleChange}
                    required
                    maxLength={80}
                  />
                </label>
                <label>
                  <span className={labelClass}>State</span>
                  <input
                    className={fieldClass}
                    name="state"
                    autoComplete="address-level1"
                    value={address.state}
                    onChange={handleChange}
                    required
                    maxLength={80}
                  />
                </label>
                <label>
                  <span className={labelClass}>Country</span>
                  <input
                    className={`${fieldClass} bg-gray-50`}
                    name="country"
                    value={address.country}
                    readOnly
                  />
                </label>
              </div>
            </section>

            <section className="border border-gray-200 bg-white p-5 sm:p-7">
              <div className="mb-5 flex items-start gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                  2
                </span>
                <div>
                  <h2 className="font-serif text-2xl text-slate-900">
                    Payment method
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Choose how you would like to pay.
                  </p>
                </div>
              </div>
              <label className="flex cursor-pointer items-start gap-3 border border-pink-200 bg-pink-50/50 p-4">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked
                  readOnly
                  className="mt-1 accent-pink-600"
                />
                <span className="flex-1">
                  <span className="block text-sm font-semibold text-slate-900">
                    Cash on delivery
                  </span>
                  <span className="mt-1 block text-xs leading-5 text-gray-500">
                    Pay when your order arrives.
                  </span>
                </span>
                <Check className="text-pink-600" size={18} />
              </label>
              <p className="mt-4 flex items-start gap-2 text-xs leading-5 text-gray-500">
                <ShieldCheck className="mt-0.5 shrink-0 text-emerald-600" size={16} />
                Your payment details are not collected on this page.
              </p>
            </section>

            {error && (
              <div
                role="alert"
                className="border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700"
              >
                {error}
                {/stock|unavailable/i.test(error) && (
                  <>
                    {" "}
                    <Link
                      to="/cart"
                      className="font-semibold underline underline-offset-2"
                    >
                      Review your bag
                    </Link>
                    .
                  </>
                )}
              </div>
            )}

          </div>

          <aside className="border border-gray-200 bg-white p-5 sm:p-7 lg:sticky lg:top-24">
            <h2 className="font-serif text-2xl text-slate-900">Your order</h2>
            <p className="mt-1 text-xs text-gray-500">
              {cart.length} {cart.length === 1 ? "item" : "items"}
            </p>

            <div className="mt-6 max-h-72 space-y-4 overflow-y-auto">
              {cart.map(({ key, product, quantity }) => (
                <div key={key} className="flex gap-3">
                  <div className="relative h-20 w-16 shrink-0 bg-gray-100">
                    {product.images?.[0] ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="grid h-full place-items-center text-gray-400">
                        <PackageCheck size={18} />
                      </div>
                    )}
                    <span className="absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center rounded-full bg-slate-700 px-1 text-[10px] text-white">
                      {quantity}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 text-sm font-medium text-slate-800">
                      {product.name}
                    </p>
                    <p className="mt-2 text-xs text-gray-500">
                      Qty: {quantity}
                    </p>
                    {product.variants?.length > 0 && (
                      <label className="mt-2 block">
                        <span className="sr-only">
                          Size and color for {product.name}
                        </span>
                        <select
                          value={getSelectedVariantIndex(
                            { key, product, quantity },
                            selectedVariants
                          )}
                          onChange={(event) =>
                            handleVariantChange(key, event.target.value)
                          }
                          aria-label={`Select size and color for ${product.name}`}
                          className="h-8 max-w-full border border-gray-300 bg-white px-2 text-xs text-slate-700 outline-none focus:border-slate-900"
                        >
                          <option value="">
                            {allVariantsOutOfStock(product)
                              ? "Sold out"
                              : "Select size / color"}
                          </option>
                          {product.variants.map((variant, index) => (
                            <option
                              key={`${variant.size}-${variant.color}-${index}`}
                              value={String(index)}
                              disabled={!hasAvailableStock(variant.stock, quantity)}
                            >
                              {[variant.size, variant.color]
                                .filter(Boolean)
                                .join(" · ")}
                              {!hasAvailableStock(variant.stock, quantity)
                                ? " · Out of stock"
                                : ""}
                            </option>
                          ))}
                        </select>
                        {!hasAvailableSelectedVariant(
                          { key, product, quantity },
                          selectedVariants
                        ) && (
                          <span className="mt-1 block text-xs leading-4 text-red-600">
                            {allVariantsOutOfStock(product)
                              ? "Sold out. Remove this item from your bag."
                              : `Not enough stock for qty ${quantity}. Reduce the quantity or choose another option.`}
                          </span>
                        )}
                      </label>
                    )}
                  </div>
                  <span className="whitespace-nowrap text-sm font-semibold text-slate-900">
                    {money(product.price * quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-3 border-t border-gray-200 pt-5 text-sm">
              {itemsMissingAvailableVariant.length > 0 && (
                <div
                  role="alert"
                  className="border border-red-200 bg-red-50 px-3 py-2 text-xs leading-5 text-red-700"
                >
                  {itemsMissingAvailableVariant.length === 1
                    ? "This item is sold out or has insufficient stock."
                    : `${itemsMissingAvailableVariant.length} items are sold out or have insufficient stock.`}{" "}
                  <Link
                    to="/cart"
                    className="font-semibold underline underline-offset-2"
                  >
                    Review your bag
                  </Link>
                  .
                </div>
              )}
              <p className="flex justify-between gap-4 text-gray-600">
                <span>Subtotal</span>
                <span className="font-medium text-slate-900">{money(cartTotal)}</span>
              </p>
              <p className="flex justify-between gap-4 text-gray-600">
                <span>Delivery</span>
                <span className="font-medium text-slate-900">
                  {shippingFee ? money(shippingFee) : "FREE"}
                </span>
              </p>
              {shippingFee > 0 && (
                <p className="text-xs text-gray-500">
                  Free delivery on orders above ₹1,999.
                </p>
              )}
              <div className="flex justify-between gap-4 border-t border-gray-200 pt-4 text-base font-bold text-slate-900">
                <span>Total</span>
                <span>{money(orderTotal)}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || itemsMissingAvailableVariant.length > 0}
              className="mt-6 flex h-12 w-full items-center justify-center gap-2 bg-slate-900 px-5 text-xs font-bold uppercase tracking-[0.16em] text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Placing order..." : "Place order"}
            </button>
            <p className="mt-4 text-center text-[11px] leading-5 text-gray-500">
              By placing your order, you agree to our{" "}
              <Link to="/terms" className="underline underline-offset-2">
                Terms &amp; Conditions
              </Link>
              .
            </p>
          </aside>
        </div>
      </form>
    </main>
  );
}
