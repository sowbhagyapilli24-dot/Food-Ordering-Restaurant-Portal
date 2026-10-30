import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { createOrder } from "../services/api";

function Cart() {

  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    total
  } = useCart();

  const navigate = useNavigate();

  const handleOrder = async () => {

    if (cart.length === 0) {
      alert("Your cart is empty");
      return;
    }

    try {
      const order = {
        items: cart,
        total: total,
        status: "Placed",
        date: new Date().toISOString()
      };

      await createOrder(order);

      clearCart();

      alert("Order placed successfully!");

      navigate("/orders");

    } catch (error) {
      alert("Unable to place order");
      console.error(error);
    }
  };

  return (
    <div className="container">

      <h1>My Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (

        <>
          {cart.map((item) => (

            <div className="cart-item" key={item.id}>

              <h3>{item.name}</h3>

              <p>Price: ₹{item.price}</p>

              <button
                onClick={() => decreaseQuantity(item.id)}
              >
                -
              </button>

              <span> {item.quantity} </span>

              <button
                onClick={() => increaseQuantity(item.id)}
              >
                +
              </button>

              <p>
                Subtotal: ₹{item.price * item.quantity}
              </p>

              <button
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>

            </div>

          ))}

          <h2>Total: ₹{total}</h2>

          <button onClick={handleOrder}>
            Place Order
          </button>
        </>

      )}

    </div>
  );
}

export default Cart;