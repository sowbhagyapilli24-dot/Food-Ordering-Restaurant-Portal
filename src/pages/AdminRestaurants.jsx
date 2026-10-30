import { useEffect, useState } from "react";

import {
  getRestaurants,
  addRestaurant,
  updateRestaurant,
  deleteRestaurant
} from "../services/api";

const emptyForm = {
  name: "",
  address: "",
  image: "",
  description: ""
};

function AdminRestaurants() {

  const [restaurants, setRestaurants] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);

  const loadRestaurants = async () => {
    try {
      const response = await getRestaurants();
      setRestaurants(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadRestaurants();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!form.name.trim() || !form.address.trim()) {
      alert("Name and address are required");
      return;
    }

    try {

      if (editId) {
        await updateRestaurant(editId, form);
        alert("Restaurant updated");
      } else {
        await addRestaurant(form);
        alert("Restaurant added");
      }

      setForm(emptyForm);
      setEditId(null);
      loadRestaurants();

    } catch (error) {
      alert("Operation failed");
    }
  };

  const handleEdit = (restaurant) => {

    setEditId(restaurant.id);

    setForm({
      name: restaurant.name,
      address: restaurant.address,
      image: restaurant.image || "",
      description: restaurant.description || ""
    });
  };

  const handleDelete = async (id) => {

    if (!window.confirm("Delete restaurant?")) return;

    try {
      await deleteRestaurant(id);
      loadRestaurants();
    } catch (error) {
      alert("Delete failed");
    }
  };

  return (
    <div className="container">

      <h1>Restaurant Management</h1>

      <form onSubmit={handleSubmit}>

        <input
          name="name"
          placeholder="Restaurant Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          required
        />

        <input
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />

        <button type="submit">
          {editId ? "Update Restaurant" : "Add Restaurant"}
        </button>

        {editId && (
          <button
            type="button"
            onClick={() => {
              setEditId(null);
              setForm(emptyForm);
            }}
          >
            Cancel
          </button>
        )}

      </form>

      <h2>Restaurant List</h2>

      {restaurants.map((restaurant) => (

        <div className="admin-card" key={restaurant.id}>

          <h3>{restaurant.name}</h3>

          <p>{restaurant.address}</p>

          <button onClick={() => handleEdit(restaurant)}>
            Edit
          </button>

          <button onClick={() => handleDelete(restaurant.id)}>
            Delete
          </button>

        </div>

      ))}

    </div>
  );
}

export default AdminRestaurants;
