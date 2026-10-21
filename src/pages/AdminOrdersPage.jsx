import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Package,
  RefreshCw,
  Search,
  CheckCircle2,
  Clock,
  XCircle,
  ShieldCheck,
  TrendingUp,
  CreditCard,
  ShoppingBag,
  ExternalLink,
} from "lucide-react";

const money = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount || 0);

const formatDate = (dateStr) => {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [metrics, setMetrics] = useState({
    totalOrders: 0,
    paidOrders: 0,
    totalVolume: 0,
    paidVolume: 0,
    gatewayOrders: 0,
  });
  const [loading, setLoading] = useState(true);
  const [filterSource, setFilterSource] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [lastRefreshed, setLastRefreshed] = useState(new Date());

  const fetchOrders = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
      const baseUrl = apiUrl.replace(/\/+$/, "");
      const res = await fetch(`${baseUrl}/v1/payin/orders`);
      const data = await res.json();
      if (data?.status === "success") {
        setOrders(data.orders || []);
        if (data.metrics) setMetrics(data.metrics);
        setLastRefreshed(new Date());
      }
    } catch (err) {
      console.error("Failed to fetch admin orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(fetchOrders, 4000);
    return () => clearInterval(interval);
  }, [autoRefresh]);

  const filteredOrders = orders.filter((order) => {
    if (filterSource !== "all" && order.orderSource !== filterSource) return false;
    if (filterStatus !== "all" && order.paymentStatus !== filterStatus) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      const matchOrder =
        order.orderNumber?.toLowerCase().includes(q) ||
        order.orderId?.toLowerCase().includes(q) ||
        order.transactionId?.toLowerCase().includes(q) ||
        order.payuBankRefNum?.toLowerCase().includes(q) ||
        order.customer?.name?.toLowerCase().includes(q) ||
        order.customer?.email?.toLowerCase().includes(q) ||
        order.customer?.phone?.includes(q);
      if (!matchOrder) return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-pink-100 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-pink-700">
                MoR Storefront Console
              </span>
              <span className="flex items-center gap-1.5 text-xs text-slate-500">
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                Live Feed
              </span>
            </div>
            <h1 className="mt-1 font-serif text-3xl font-bold text-slate-900">
              Himaanix Orders & MoR Gateway Monitor
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Live orders synthesized from SuryaPe gateway transactions and direct store checkouts.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition ${
                autoRefresh
                  ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                  : "border-slate-300 bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              Auto-Refresh: {autoRefresh ? "ON (4s)" : "OFF"}
            </button>

            <button
              onClick={fetchOrders}
              className="flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition"
            >
              <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
              Refresh
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">Total Volume</span>
              <span className="rounded-md bg-blue-50 p-1.5 text-blue-600">
                <TrendingUp size={16} />
              </span>
            </div>
            <p className="mt-2 text-2xl font-bold text-slate-900">{money(metrics.totalVolume)}</p>
            <p className="mt-1 text-xs text-slate-500">{metrics.totalOrders} total orders recorded</p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">Verified Paid</span>
              <span className="rounded-md bg-emerald-50 p-1.5 text-emerald-600">
                <CheckCircle2 size={16} />
              </span>
            </div>
            <p className="mt-2 text-2xl font-bold text-emerald-600">{money(metrics.paidVolume)}</p>
            <p className="mt-1 text-xs text-slate-500">{metrics.paidOrders} orders completed</p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">MoR Gateway Orders</span>
              <span className="rounded-md bg-purple-50 p-1.5 text-purple-600">
                <CreditCard size={16} />
              </span>
            </div>
            <p className="mt-2 text-2xl font-bold text-purple-700">{metrics.gatewayOrders}</p>
            <p className="mt-1 text-xs text-slate-500">Synthesized via SuryaPe</p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">Active PG Engine</span>
              <span className="rounded-md bg-pink-50 p-1.5 text-pink-600">
                <ShieldCheck size={16} />
              </span>
            </div>
            <p className="mt-2 text-lg font-bold text-slate-900">PayU S2S Intent</p>
            <p className="mt-1 text-xs font-mono text-emerald-600 font-semibold">Key: SthJ2I (Active)</p>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
          <div className="relative min-w-[240px] flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by Order ID, UTR, Customer Name, Phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 py-1.5 pl-9 pr-3 text-xs outline-none focus:border-slate-400 focus:bg-white transition"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={filterSource}
              onChange={(e) => setFilterSource(e.target.value)}
              className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 outline-none"
            >
              <option value="all">All Sources</option>
              <option value="gateway">⚡ MoR Gateway Only</option>
              <option value="storefront">🛍️ Storefront Only</option>
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 outline-none"
            >
              <option value="all">All Statuses</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </div>

        {/* Orders Table */}
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-200 bg-slate-50/75 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="py-3 px-4">Order / ID</th>
                  <th className="py-3 px-4">Source</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Synthesized Items</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Payment Status</th>
                  <th className="py-3 px-4">PG Reference / UTR</th>
                  <th className="py-3 px-4">Created Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-slate-400">
                      <Package size={32} className="mx-auto mb-2 opacity-50" />
                      <p className="font-medium">No orders matching the current filter.</p>
                      <p className="text-[11px] text-slate-400">
                        When transactions arrive via SuryaPe, they will appear here automatically.
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => {
                    const isPaid = order.paymentStatus === "paid";
                    const isPending = order.paymentStatus === "pending";
                    const isGateway = order.orderSource === "gateway";

                    return (
                      <tr key={order._id || order.orderId} className="hover:bg-slate-50/75 transition">
                        <td className="py-3.5 px-4 font-mono font-medium text-slate-900">
                          <div>{order.orderNumber || order.orderId}</div>
                          {order.transactionId && (
                            <div className="text-[10px] text-slate-400">Txn: {order.transactionId}</div>
                          )}
                        </td>

                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                              isGateway
                                ? "bg-purple-50 text-purple-700 border border-purple-200"
                                : "bg-blue-50 text-blue-700 border border-blue-200"
                            }`}
                          >
                            {isGateway ? "⚡ MoR Gateway" : "🛍️ Storefront"}
                          </span>
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-slate-900">
                            {order.customer?.name || order.shippingAddress?.fullName || "Guest"}
                          </div>
                          <div className="text-[10px] text-slate-400">
                            {order.customer?.email || order.shippingAddress?.phone}
                          </div>
                        </td>

                        <td className="py-3.5 px-4 max-w-[220px]">
                          {order.items && order.items.length > 0 ? (
                            <div className="truncate text-slate-600">
                              {order.items.map((it) => `${it.quantity}x ${it.name}`).join(", ")}
                            </div>
                          ) : (
                            <span className="text-slate-400">No items</span>
                          )}
                        </td>

                        <td className="py-3.5 px-4 font-semibold text-slate-900 tabular-nums">
                          {money(order.total || order.subtotal)}
                        </td>

                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                              isPaid
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : isPending
                                ? "bg-amber-50 text-amber-700 border border-amber-200"
                                : "bg-red-50 text-red-700 border border-red-200"
                            }`}
                          >
                            {isPaid && <CheckCircle2 size={12} />}
                            {isPending && <Clock size={12} />}
                            {!isPaid && !isPending && <XCircle size={12} />}
                            {order.paymentStatus?.toUpperCase()}
                          </span>
                        </td>

                        <td className="py-3.5 px-4 font-mono text-[11px]">
                          {order.payuBankRefNum ? (
                            <span className="font-bold text-emerald-700">UTR: {order.payuBankRefNum}</span>
                          ) : order.payuPaymentId ? (
                            <span className="text-slate-600">ID: {order.payuPaymentId}</span>
                          ) : (
                            <span className="text-slate-400">-</span>
                          )}
                        </td>

                        <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                          {formatDate(order.createdAt)}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-4 text-center text-xs text-slate-400">
          Last refreshed: {lastRefreshed.toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata" })}
        </div>
      </div>
    </div>
  );
}
