
import { useEffect, useState } from "react";
import {
  getRestaurants,
  getFoods
} from "../services/api";

import RestaurantCard from "../components/RestaurantCard";
import FoodCard from "../components/FoodCard";

function Home() {
  const [restaurants, setRestaurants] = useState([]);
  const [foods, setFoods] = useState([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const [restaurantRes, foodRes] = await Promise.all([
          getRestaurants(),
          getFoods()
        ]);

        setRestaurants(restaurantRes.data);
        setFoods(foodRes.data);
      } catch {
        setError("Unable to load data. Please check JSON Server.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const categories = [
    ...new Set(foods.map((food) => food.category))
  ];

  const filteredFoods = foods.filter((food) => {
    const matchesSearch = food.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "" || food.category === category;

    return matchesSearch && matchesCategory && food.available;
  });

  if (loading) {
    return (
      <div className="home-message">
        <div className="loader"></div>
        <h3>Preparing something delicious...</h3>
      </div>
    );
  }

  if (error) {
    return (
      <div className="home-message error-message">
        <h3>Oops! Something went wrong.</h3>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="foodie-home">

      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-content">
          <span className="hero-tag">
            ✨ GOOD FOOD, GOOD MOOD
          </span>

          <h1>
            Delicious food,
            <br />
            <span>delivered to you.</span>
          </h1>

          <p>
            Discover amazing restaurants and enjoy your
            favourite meals, freshly prepared and delivered
            right to your doorstep.
          </p>

          <div className="hero-search">
            <span>🔍</span>

            <input
              type="text"
              placeholder="Search pizza, biryani, burgers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {search && (
              <button onClick={() => setSearch("")}>
                Clear
              </button>
            )}
          </div>

          <div className="hero-highlights">
            <span>🍕 Fresh food</span>
            <span>⭐ Great choices</span>
            <span>❤️ Made with love</span>
          </div>
        </div>

        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=900"
            alt="Freshly prepared delicious pizza"
          />
          <div className="hero-image-label">
            <span>🍕</span>
            <div>
              <strong>Made fresh</strong>
              <small>Just for you!</small>
            </div>
          </div>
        </div>
      </section>

      {/* RESTAURANTS */}
      <section className="home-section">
        <div className="section-heading">
          <div>
            <span className="section-eyebrow">EXPLORE PLACES</span>
            <h2>Popular Restaurants</h2>
            <p>Discover your next favourite restaurant.</p>
          </div>

          <span className="section-count">
            {restaurants.length} Restaurants
          </span>
        </div>

        <div className="restaurant-list">
          {restaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
            />
          ))}
        </div>
      </section>

      {/* FOOD CATEGORIES */}
      <section className="home-section">
        <div className="section-heading">
          <div>
            <span className="section-eyebrow">FIND YOUR FAVOURITE</span>
            <h2>What are you craving?</h2>
            <p>Choose a category to explore delicious food.</p>
          </div>
        </div>

        <div className="category-list">
          <button
            className={`category-button ${category === "" ? "active" : ""}`}
            onClick={() => setCategory("")}
          >
            🍽️ All Foods
          </button>

          {categories.map((cat) => (
            <button
              key={cat}
              className={`category-button ${category === cat ? "active" : ""}`}
              onClick={() => setCategory(cat)}
            >
              {cat === "Pizza" ? "🍕" :
               cat === "Biryani" ? "🍛" :
               cat === "Burger" ? "🍔" : "🥘"}
              {" "}{cat}
            </button>
          ))}
        </div>
      </section>

      {/* FOOD MENU */}
      <section className="home-section food-section">
        <div className="section-heading">
          <div>
            <span className="section-eyebrow">MADE FOR YOU</span>
            <h2>Explore Delicious Foods</h2>
            <p>Fresh flavours, amazing meals and more.</p>
          </div>

          <span className="section-count">
            {filteredFoods.length} Items
          </span>
        </div>

        <div className="food-list">
          {filteredFoods.length === 0 ? (
            <div className="empty-foods">
              <span>🍽️</span>
              <h3>No food items found</h3>
              <p>Try another search or select a different category.</p>
              <button
                onClick={() => {
                  setSearch("");
                  setCategory("");
                }}
              >
                View All Foods
              </button>
            </div>
          ) : (
            filteredFoods.map((food) => (
              <FoodCard
                key={food.id}
                food={food}
              />
            ))
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="foodie-footer">
        <h2>Foodie<span>.</span></h2>
        <p>Good food. Great moments. Delivered with love. ❤️</p>
        <small>© 2026 Foodie. All rights reserved.</small>
      </footer>

    </div>
  );
}

export default Home;
