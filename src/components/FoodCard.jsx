import { useCart } from "../context/CartContext";

function FoodCard({ food }) {

  const { addToCart } = useCart();

  return (
    <div className="food-card">

      <h3>{food.name}</h3>

      <p>Category: {food.category}</p>

      <h4>₹{food.price}</h4>

      {food.available ? (
        <button onClick={() => addToCart(food)}>
          Add To Cart
        </button>
      ) : (
        <p className="unavailable">Currently Unavailable</p>
      )}

    </div>
  );
}

export default FoodCard;