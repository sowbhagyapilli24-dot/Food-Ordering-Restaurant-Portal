import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Navbar() {

  const { cart } = useCart();

  const cartCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <nav className="navbar">

      <Link to="/" className="brand">
        Foodie
      </Link>

      <div className="nav-links">

        <Link to="/">Home</Link>

        <Link to="/cart">
          Cart ({cartCount})
        </Link>

        <Link to="/orders">Orders</Link>

        <Link to="/dashboard">Dashboard</Link>

        <Link to="/admin/restaurants">
          Restaurants
        </Link>

        <Link to="/admin/foods">
          Manage Foods
        </Link>

      </div>

    </nav>
  );
}

export default Navbar;