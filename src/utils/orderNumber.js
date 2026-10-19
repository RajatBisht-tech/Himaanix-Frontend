export const getOrderNumber = (order) => {
  if (order.orderNumber) return order.orderNumber;

  const id = String(order._id || order.orderId || "");
  const timestamp = order.createdAt ? new Date(order.createdAt) : new Date();
  const date = Number.isNaN(timestamp.getTime())
    ? ""
    : timestamp.toISOString().slice(0, 10).replace(/-/g, "");

  return id ? `HIM-${date}-${id.slice(-8).toUpperCase()}` : "Unavailable";
};
