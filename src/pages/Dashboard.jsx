
import { useEffect, useState } from "react";

import {
  getRestaurants,
  getFoods,
  getOrders
} from "../services/api";

function Dashboard() {
  const [restaurants, setRestaurants] = useState([]);
  const [foods, setFoods] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [r, f, o] = await Promise.all([
          getRestaurants(),
          getFoods(),
          getOrders()
        ]);

        setRestaurants(r.data);
        setFoods(f.data);
        setOrders(o.data);
      } catch (error) {
        console.error("Dashboard loading error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const revenue = orders
    .filter((order) => order.status !== "Cancelled")
    .reduce(
      (sum, order) => sum + (Number(order.total) || 0),
      0
    );

  const getCount = (status) =>
    orders.filter((order) => order.status === status).length;

  const recentOrders = [...orders].reverse().slice(0, 5);

  if (loading) {
    return (
      <div className="container">
        <h2>Loading dashboard...</h2>
      </div>
    );
  }

  return (
    <div className="container">

      <h1>Admin Dashboard</h1>
      <p>Welcome to your Foodie restaurant management dashboard.</p>

      {/* MAIN STATISTICS */}
      <div className="dashboard">

        <div className="stat-card">
          <h2>{restaurants.length}</h2>
          <p>Total Restaurants</p>
        </div>

        <div className="stat-card">
          <h2>{foods.length}</h2>
          <p>Total Food Items</p>
        </div>

        <div className="stat-card">
          <h2>{orders.length}</h2>
          <p>Total Orders</p>
        </div>

        <div className="stat-card">
          <h2>₹{revenue.toLocaleString("en-IN")}</h2>
          <p>Order Revenue</p>
        </div>

      </div>

      {/* ORDER SUMMARY */}
      <h2>Order Summary</h2>

      <div className="dashboard">

        <div className="stat-card">
          <h2>{getCount("Placed")}</h2>
          <p>Placed Orders</p>
        </div>

        <div className="stat-card">
          <h2>{getCount("Preparing")}</h2>
          <p>Preparing Orders</p>
        </div>

        <div className="stat-card">
          <h2>{getCount("Ready")}</h2>
          <p>Ready Orders</p>
        </div>

        <div className="stat-card">
          <h2>{getCount("Delivered")}</h2>
          <p>Delivered Orders</p>
        </div>

        <div className="stat-card">
          <h2>{getCount("Cancelled")}</h2>
          <p>Cancelled Orders</p>
        </div>

      </div>

      {/* RECENT ORDERS */}
      <h2>Recent Orders</h2>

      {recentOrders.length === 0 ? (
        <div className="admin-card">
          <p>No orders have been placed yet.</p>
        </div>
      ) : (
        recentOrders.map((order) => (
          <div className="order-card" key={order.id}>

            <h3>Order #{order.id}</h3>

            <p>
              Customer: {order.customerName || "Customer"}
            </p>

            <p>
              Amount: ₹{Number(order.total || 0).toLocaleString("en-IN")}
            </p>

            <p>
              Status: <strong>{order.status || "Unknown"}</strong>
            </p>

          </div>
        ))
      )}

    </div>
  );
}

export default Dashboard;
