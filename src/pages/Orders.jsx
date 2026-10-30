
import { useEffect, useState } from "react";

import {
  getOrders,
  updateOrder,
  deleteOrder
} from "../services/api";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const statuses = [
    "Placed",
    "Preparing",
    "Ready",
    "Delivered",
    "Cancelled"
  ];

  const loadOrders = async () => {
    try {
      const response = await getOrders();
      setOrders(response.data);
    } catch (error) {
      console.error("Unable to load orders:", error);
      alert("Unable to load orders. Check JSON Server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const changeStatus = async (id, status) => {
    try {
      const order = orders.find(
        (item) => String(item.id) === String(id)
      );

      if (!order) return;

      const response = await updateOrder(id, {
        ...order,
        status
      });

      setOrders((previousOrders) =>
        previousOrders.map((item) =>
          String(item.id) === String(id)
            ? response.data
            : item
        )
      );

      alert(`Order status updated to ${status}`);
    } catch (error) {
      console.error(error);
      alert("Unable to update order status.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this order?")) {
      return;
    }

    try {
      await deleteOrder(id);

      setOrders((previousOrders) =>
        previousOrders.filter(
          (item) => String(item.id) !== String(id)
        )
      );

      alert("Order deleted successfully!");
    } catch (error) {
      console.error(error);
      alert("Unable to delete order.");
    }
  };

  const getStatusClass = (status) => {
    return `status-badge status-${status?.toLowerCase()}`;
  };

  if (loading) {
    return (
      <div className="container">
        <h2>Loading orders...</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Customer Orders</h1>

      <p>Manage customer orders and update their preparation status.</p>

      <div className="dashboard">
        <div className="stat-card">
          <h2>{orders.length}</h2>
          <p>Total Orders</p>
        </div>

        <div className="stat-card">
          <h2>
            {orders.filter((o) => o.status === "Preparing").length}
          </h2>
          <p>Preparing</p>
        </div>

        <div className="stat-card">
          <h2>
            {orders.filter((o) => o.status === "Ready").length}
          </h2>
          <p>Ready</p>
        </div>

        <div className="stat-card">
          <h2>
            {orders.filter((o) => o.status === "Delivered").length}
          </h2>
          <p>Delivered</p>
        </div>
      </div>

      <h2>All Orders</h2>

      {orders.length === 0 ? (
        <div className="admin-card">
          <h3>No orders available</h3>
          <p>Customer orders will appear here after checkout.</p>
        </div>
      ) : (
        orders.map((order) => (
          <div className="order-card" key={order.id}>
            <div className="order-header">
              <h3>Order #{order.id}</h3>

              <span className={getStatusClass(order.status)}>
                {order.status || "Placed"}
              </span>
            </div>

            <p>
              <strong>Customer:</strong>{" "}
              {order.customerName || "Customer"}
            </p>

            <p>
              <strong>Order Date:</strong>{" "}
              {order.date
                ? new Date(order.date).toLocaleString("en-IN")
                : "Not available"}
            </p>

            <h4>Ordered Items</h4>

            {Array.isArray(order.items) &&
              order.items.map((item, index) => (
                <p key={item.id || index}>
                  {item.name} × {item.quantity} — ₹
                  {Number(item.price || 0) * Number(item.quantity || 1)}
                </p>
              ))}

            <h3>
              Total Amount: ₹
              {Number(order.total || 0).toLocaleString("en-IN")}
            </h3>

            <label>
              Update Order Status:
            </label>

            <select
              value={order.status || "Placed"}
              onChange={(e) =>
                changeStatus(order.id, e.target.value)
              }
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>

            <button
              onClick={() => handleDelete(order.id)}
            >
              Delete Order
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;
