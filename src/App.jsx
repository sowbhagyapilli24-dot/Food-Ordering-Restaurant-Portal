import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import { CartProvider } from "./context/CartContext";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import RestaurantDetails from "./pages/RestaurantDetails";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import AdminFoods from "./pages/AdminFoods";
import AdminRestaurants from "./pages/AdminRestaurants";
import Dashboard from "./pages/Dashboard";

function App() {

  return (

    <CartProvider>

      <BrowserRouter>

        <Navbar />

        <Routes>

          <Route path="/" element={<Home />} />

          <Route
            path="/restaurant/:id"
            element={<RestaurantDetails />}
          />

          <Route path="/cart" element={<Cart />} />

          <Route path="/orders" element={<Orders />} />

          <Route
            path="/admin/foods"
            element={<AdminFoods />}
          />

          <Route
            path="/admin/restaurants"
            element={<AdminRestaurants />}
          />

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

        </Routes>

      </BrowserRouter>

    </CartProvider>

  );
}

export default App;
