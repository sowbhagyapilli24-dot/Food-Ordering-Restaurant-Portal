import { useEffect, useState } from "react";

import {
  getFoods,
  getRestaurants,
  addFood,
  updateFood,
  deleteFood
} from "../services/api";

const initialForm = {
  name: "",
  category: "",
  price: "",
  restaurantId: "",
  available: true
};

function AdminFoods() {

  const [foods, setFoods] = useState([]);
  const [restaurants, setRestaurants] = useState([]);

  const [form, setForm] = useState(initialForm);
  const [editId, setEditId] = useState(null);

  const loadData = async () => {
    try {
      const [foodRes, restaurantRes] =
        await Promise.all([
          getFoods(),
          getRestaurants()
        ]);

      setFoods(foodRes.data);
      setRestaurants(restaurantRes.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleChange = (e) => {

    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (
      !form.name.trim() ||
      !form.category.trim() ||
      !form.restaurantId ||
      Number(form.price) <= 0
    ) {
      alert("Enter valid food details");
      return;
    }

    const data = {
      ...form,
      price: Number(form.price)
    };

    try {

      if (editId) {
        await updateFood(editId, data);
        alert("Food updated successfully");
      } else {
        await addFood(data);
        alert("Food added successfully");
      }

      setForm(initialForm);
      setEditId(null);
      loadData();

    } catch (error) {
      alert("Operation failed");
    }
  };

  const handleEdit = (food) => {

    setEditId(food.id);

    setForm({
      name: food.name,
      category: food.category,
      price: String(food.price),
      restaurantId: String(food.restaurantId),
      available: food.available
    });

  };

  const handleDelete = async (id) => {

    if (!window.confirm("Delete this food?")) return;

    try {
      await deleteFood(id);
      loadData();
    } catch (error) {
      alert("Delete failed");
    }
  };

  return (
    <div className="container">

      <h1>Admin - Food Management</h1>

      <form onSubmit={handleSubmit}>

        <input
          name="name"
          placeholder="Food Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          required
        />

        <input
          name="price"
          type="number"
          placeholder="Price"
          min="1"
          value={form.price}
          onChange={handleChange}
          required
        />

        <select
          name="restaurantId"
          value={form.restaurantId}
          onChange={handleChange}
          required
        >

          <option value="">Select Restaurant</option>

          {restaurants.map((restaurant) => (
            <option
              key={restaurant.id}
              value={restaurant.id}
            >
              {restaurant.name}
            </option>
          ))}

        </select>

        <label>
          <input
            type="checkbox"
            name="available"
            checked={form.available}
            onChange={handleChange}
          />
          Available
        </label>

        <button type="submit">
          {editId ? "Update Food" : "Add Food"}
        </button>

        {editId && (
          <button
            type="button"
            onClick={() => {
              setEditId(null);
              setForm(initialForm);
            }}
          >
            Cancel Edit
          </button>
        )}

      </form>

      <h2>Food List</h2>

      {foods.map((food) => (

        <div className="admin-card" key={food.id}>

          <h3>{food.name}</h3>

          <p>Category: {food.category}</p>

          <p>Price: ₹{food.price}</p>

          <p>
            Status: {food.available ? "Available" : "Unavailable"}
          </p>

          <button onClick={() => handleEdit(food)}>
            Edit
          </button>

          <button onClick={() => handleDelete(food.id)}>
            Delete
          </button>

        </div>

      ))}

    </div>
  );
}

export default AdminFoods;
