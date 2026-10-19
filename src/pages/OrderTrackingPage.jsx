import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  Circle,
  PackageCheck,
  Truck,
} from "lucide-react";
import { getOrderTracking } from "../api/orderApi.js";
import { getOrderNumber } from "../utils/orderNumber.js";

const steps = [
  { status: "confirmed", label: "Confirmed" },
  { status: "packed", label: "Packed" },
  { status: "shipped", label: "Shipped" },
  { status: "delivered", label: "Delivered" },
];

const formatDateTime = (value) =>
  new Intl.DateTimeFormat("en-IN", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));

const money = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount || 0);

export default function OrderTrackingPage() {
  const { id } = useParams();
  const [tracking, setTracking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const loadTracking = async () => {
      setLoading(true);
      setError("");
      try {
        const { data } = await getOrderTracking(id);
        if (!data?.success || !data?.tracking) {
          throw new Error(data?.message || "Unable to load order tracking.");
        }
        if (active) setTracking(data.tracking);
      } catch (requestError) {
        if (active) {
          setError(
            requestError.response?.data?.message ||
              requestError.message ||
              "Unable to load order tracking."
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    loadTracking();
    return () => {
      active = false;
    };
  }, [id]);

  if (loading) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-16 text-center text-sm text-gray-500 sm:px-6">
        Loading order tracking…
      </main>
    );
  }

  if (error) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <div role="alert" className="border border-red-200 bg-red-50 p-5 text-sm text-red-700">
          {error}
        </div>
        <Link
          to="/account"
          className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-pink-600"
        >
          <ArrowLeft size={16} />
          Back to my profile
        </Link>
      </main>
    );
  }

  const historyByStatus = new Map(
    tracking.history.map((event) => [event.status, event])
  );
  const cancelled = tracking.status === "cancelled";
  const deliveredEvent = historyByStatus.get("delivered");
  const currentIndex = steps.findIndex(
    (step) => step.status ===
      (tracking.status === "pending"
        ? "confirmed"
        : tracking.status === "processing"
          ? "packed"
          : tracking.status)
  );

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <Link
        to="/account"
        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-600 hover:text-pink-600"
      >
        <ArrowLeft size={15} />
        My profile
      </Link>

      <div className="mb-8 mt-6 flex flex-wrap items-end justify-between gap-4 border-b border-gray-200 pb-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-pink-600">
            Order tracking
          </p>
          <h1 className="mt-2 font-serif text-4xl text-slate-900">
            Track your order
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Order #{getOrderNumber(tracking)} · Placed{" "}
            {formatDateTime(tracking.createdAt)}
          </p>
        </div>
        <span className="inline-flex items-center gap-2 border border-gray-200 px-3 py-2 text-xs font-semibold capitalize text-slate-700">
          <PackageCheck size={16} className="text-pink-600" />
          {tracking.status === "pending"
            ? "Confirmed"
            : tracking.status === "processing"
              ? "Packed"
              : tracking.status}
        </span>
      </div>

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_330px]">
        <section className="border border-gray-200 bg-white p-5 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">
                {deliveredEvent ? "Delivered" : "Estimated delivery"}
              </p>
              <p className="mt-2 font-serif text-2xl text-slate-900">
                {deliveredEvent?.timestamp
                  ? formatDateTime(deliveredEvent.timestamp)
                  : formatDateTime(tracking.estimatedDelivery)}
              </p>
            </div>
            <span className="grid h-12 w-12 place-items-center rounded-full bg-pink-50 text-pink-600">
              <Truck size={22} />
            </span>
          </div>

          {cancelled ? (
            <div className="mt-7 border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              This order has been cancelled.
            </div>
          ) : (
            <ol className="mt-7">
              {steps.map((step, index) => {
                const event = historyByStatus.get(step.status);
                const complete = index <= currentIndex;
                const upcoming = !complete;
                return (
                  <li key={step.status} className="relative flex min-h-[86px] gap-4">
                    {index < steps.length - 1 && (
                      <span
                        aria-hidden="true"
                        className={`absolute left-[15px] top-9 h-[calc(100%-12px)] w-px ${
                          index < currentIndex ? "bg-emerald-500" : "bg-gray-200"
                        }`}
                      />
                    )}
                    <span
                      className={`relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full border ${
                        complete
                          ? "border-emerald-600 bg-emerald-600 text-white"
                          : "border-gray-300 bg-white text-gray-400"
                      }`}
                    >
                      {complete ? <Check size={16} /> : <Circle size={13} />}
                    </span>
                    <div className="min-w-0 flex-1 border-b border-gray-100 pb-5">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p
                          className={`text-sm font-semibold ${
                            complete ? "text-slate-900" : "text-gray-400"
                          }`}
                        >
                          {step.label}
                        </p>
                        {event?.timestamp && (
                          <time
                            dateTime={new Date(event.timestamp).toISOString()}
                            className="text-xs text-gray-500"
                          >
                            {formatDateTime(event.timestamp)}
                          </time>
                        )}
                      </div>
                      <p className="mt-1 text-xs text-gray-500">
                        {event
                          ? step.status === "confirmed"
                            ? "Your order has been confirmed."
                            : `Your order has been ${step.label.toLowerCase()}.`
                          : upcoming
                            ? "We’ll update this as your order progresses."
                            : "Update pending."}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          )}
          <p className="mt-3 text-[11px] leading-5 text-gray-500">
            Tracking updates appear here as your order status is updated.
          </p>
        </section>

        <aside className="border border-gray-200 bg-white p-5 sm:p-6">
          <h2 className="font-serif text-xl text-slate-900">Items in this order</h2>
          <div className="mt-5 space-y-4">
            {tracking.items.map((item, index) => (
              <div
                key={`${item.product || item.sku || item.name}-${index}`}
                className="flex gap-3"
              >
                <div className="h-16 w-12 shrink-0 bg-gray-100">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-2 text-xs font-medium text-slate-800">
                    {item.name}
                  </p>
                  <p className="mt-1 text-[11px] text-gray-500">
                    Qty: {item.quantity}
                    {item.size ? ` · ${item.size}` : ""}
                  </p>
                </div>
                <p className="whitespace-nowrap text-xs font-semibold text-slate-800">
                  {money(item.lineTotal)}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-5 border-t border-gray-200 pt-4">
            <div className="flex justify-between text-sm font-semibold text-slate-900">
              <span>Total</span>
              <span>{money(tracking.total)}</span>
            </div>
          </div>
          <div className="mt-5 border-t border-gray-100 pt-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Delivering to
            </p>
            <p className="mt-2 text-sm font-medium text-slate-800">
              {tracking.shippingAddress.fullName}
            </p>
            <p className="mt-1 text-xs leading-5 text-gray-500">
              {tracking.shippingAddress.line1}
              {tracking.shippingAddress.line2
                ? `, ${tracking.shippingAddress.line2}`
                : ""}
              {`, ${tracking.shippingAddress.city}, ${tracking.shippingAddress.state} ${tracking.shippingAddress.postalCode}`}
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}
