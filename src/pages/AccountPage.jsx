import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MapPin, PackageCheck, Phone, UserRound } from "lucide-react";
import { getProfile } from "../api/authApi.js";
import { getMyOrders } from "../api/orderApi.js";
import { useAuth } from "../context/AuthContext.jsx";
import { getOrderNumber } from "../utils/orderNumber.js";

const money = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount || 0);

export default function AccountPage() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [ordersError, setOrdersError] = useState("");
  const [profile, setProfile] = useState(user);
  const [profileError, setProfileError] = useState("");

  useEffect(() => {
    setProfile(user);
    setProfileError("");
    if (!user) return undefined;

    let active = true;
    getProfile()
      .then(({ data }) => {
        if (!data?.success || !data.user) {
          throw new Error(data?.message || "Unable to load your profile.");
        }
        if (active) setProfile(data.user);
      })
      .catch((error) => {
        if (active) {
          setProfileError(
            error.response?.data?.message ||
              error.message ||
              "Unable to load your profile details."
          );
        }
      });

    return () => {
      active = false;
    };
  }, [user]);

  useEffect(() => {
    if (!user) return undefined;

    let active = true;
    setOrders([]);
    setOrdersError("");
    setLoadingOrders(true);
    getMyOrders({ limit: 20 })
      .then(({ data }) => {
        if (active) setOrders(data.orders || []);
      })
      .catch((error) => {
        if (active) {
          setOrdersError(
            error.response?.data?.message || "Unable to load your orders."
          );
        }
      })
      .finally(() => {
        if (active) setLoadingOrders(false);
      });

    return () => {
      active = false;
    };
  }, [user]);

  const handleLogout = () => {
    signOut();
    navigate("/", { replace: true });
  };

  return (
    <main className="mx-auto min-h-[60vh] max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-gray-200 pb-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-pink-600">
            Your account
          </span>
          <h1 className="mt-2 font-serif text-4xl text-slate-900">
            {profile ? `Welcome, ${profile.name}.` : "Your style space."}
          </h1>
          {profile && <p className="mt-2 text-sm text-gray-500">{profile.email}</p>}
        </div>
      </div>

      {user ? (
        <div className="mt-9 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)]">
          <section>
            <div className="mb-5 flex items-center gap-3">
              <UserRound className="text-pink-600" size={21} />
              <h2 className="font-serif text-2xl text-slate-900">Personal details</h2>
            </div>
            {profileError && (
              <p role="alert" className="mb-4 border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                {profileError}
              </p>
            )}
            <div className="divide-y divide-gray-100 border border-gray-200 bg-white px-5">
              <div className="py-4">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">
                  Full name
                </p>
                <p className="mt-1 text-sm font-medium text-slate-900">
                  {profile?.name || "Not provided"}
                </p>
              </div>
              <div className="py-4">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">
                  Email address
                </p>
                <p className="mt-1 break-all text-sm font-medium text-slate-900">
                  {profile?.email || "Not provided"}
                </p>
              </div>
              <div className="py-4">
                <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-gray-500">
                  <Phone size={13} /> Phone number
                </p>
                <p className="mt-1 text-sm font-medium text-slate-900">
                  {profile?.phone || "Not provided"}
                </p>
              </div>
              <div className="py-4">

              </div>
            </div>

            <div className="mb-5 mt-8 flex items-center gap-3">
              <MapPin className="text-pink-600" size={21} />
              <h2 className="font-serif text-2xl text-slate-900">Saved addresses</h2>
            </div>
            {profile?.addresses?.length ? (
              <div className="space-y-3">
                {profile.addresses.map((address, index) => (
                  <article
                    key={address._id || `${address.line1}-${index}`}
                    className="border border-gray-200 bg-white p-5"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-semibold text-slate-900">
                        {address.fullName || profile.name}
                      </p>
                      {address.isDefault && (
                        <span className="bg-pink-50 px-2 py-1 text-[9px] font-semibold uppercase tracking-wider text-pink-700">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-sm leading-6 text-gray-600">
                      {address.line1}
                      {address.line2 ? `, ${address.line2}` : ""}
                      {`, ${address.city}, ${address.state} ${address.postalCode}`}
                      {address.country ? `, ${address.country}` : ""}
                    </p>
                    {address.phone && (
                      <p className="mt-2 text-xs text-gray-500">
                        Phone: {address.phone}
                      </p>
                    )}
                  </article>
                ))}
              </div>
            ) : (
              <div className="border border-gray-200 bg-white p-5 text-sm text-gray-500">
                No saved addresses yet.
              </div>
            )}
          </section>

          <section>
          <div className="mb-5 flex items-center gap-3">
            <PackageCheck className="text-pink-600" size={21} />
            <h2 className="font-serif text-2xl text-slate-900">Your orders</h2>
          </div>
          {loadingOrders && (
            <p className="py-8 text-sm text-gray-500">Loading your orders…</p>
          )}
          {ordersError && (
            <p role="alert" className="border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {ordersError}
            </p>
          )}
          {!loadingOrders && !ordersError && orders.length === 0 && (
            <div className="border border-gray-200 bg-white p-8 text-center">
              <p className="text-sm text-gray-500">You haven’t placed any orders yet.</p>
              <Link to="/shop" className="primary-btn mt-5">
                START SHOPPING
              </Link>
            </div>
          )}
          {orders.length > 0 && (
            <div className="space-y-4">
              {orders.map((order) => (
                <article
                  key={order._id}
                  className="flex flex-wrap items-center justify-between gap-4 border border-gray-200 bg-white p-5"
                >
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Order #{getOrderNumber(order)}
                    </p>
                    <p className="mt-2 text-sm text-slate-800">
                      {order.items.length}{" "}
                      {order.items.length === 1 ? "item" : "items"} ·{" "}
                      {money(order.total)}
                    </p>
                    <p className="mt-1 text-xs capitalize text-gray-500">
                      Status: {order.status === "pending" ? "confirmed" : order.status}
                    </p>
                  </div>
                  <Link
                    to={`/orders/${order._id}/tracking`}
                    className="border border-slate-900 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-900 transition hover:bg-slate-900 hover:text-white"
                  >
                    Track order
                  </Link>
                </article>
              ))}
            </div>
          )}
          </section>
        </div>
      ) : (
        <div className="mt-9 border border-gray-200 bg-white p-8 text-center">
          <p className="text-sm text-gray-500">Sign in to view your order history.</p>
          <Link className="primary-btn mt-5" to="/login">SIGN IN</Link>
        </div>
      )}
    </main>
  );
}