import { Link } from "react-router-dom";

function RestaurantCard({ restaurant }) {

  return (
    <div className="restaurant-card">

      <img
        src={restaurant.image}
        alt={restaurant.name}
      />

      <h3>{restaurant.name}</h3>

      <p>{restaurant.address}</p>

      <p>{restaurant.description}</p>

      <Link to={`/restaurant/${restaurant.id}`}>
        <button>View Menu</button>
      </Link>

    </div>
  );
}

export default RestaurantCard;