import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getRestaurantById,
  getFoods
} from "../services/api";
import FoodCard from "../components/FoodCard";

function RestaurantDetails() {

  const { id } = useParams();

  const [restaurant, setRestaurant] = useState(null);
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [restaurantRes, foodRes] = await Promise.all([
          getRestaurantById(id),
          getFoods()
        ]);

        setRestaurant(restaurantRes.data);

        setFoods(
          foodRes.data.filter(
            (food) =>
              String(food.restaurantId) === String(id)
          )
        );
      } catch (error) {
        console.error(error);
      }
    };

    loadData();
  }, [id]);

  if (!restaurant) return <h2>Loading restaurant...</h2>;

  return (
    <div className="container">

      <h1>{restaurant.name}</h1>

      <p>{restaurant.address}</p>

      <h2>Restaurant Menu</h2>

      <div className="food-list">

        {foods.length === 0 ? (
          <p>No food items available.</p>
        ) : (
          foods.map((food) => (
            <FoodCard key={food.id} food={food} />
          ))
        )}

      </div>

    </div>
  );
}

export default RestaurantDetails;
