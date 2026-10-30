import axios from "axios";

const BASE_URL = "http://localhost:3000";

const api = axios.create({
  baseURL: BASE_URL
});

// RESTAURANTS

export const getRestaurants = () =>
  api.get("/restaurants");

export const getRestaurantById = (id) =>
  api.get(`/restaurants/${id}`);

export const addRestaurant = (data) =>
  api.post("/restaurants", data);

export const updateRestaurant = (id, data) =>
  api.put(`/restaurants/${id}`, data);

export const deleteRestaurant = (id) =>
  api.delete(`/restaurants/${id}`);

// FOODS

export const getFoods = () =>
  api.get("/foods");

export const getFoodById = (id) =>
  api.get(`/foods/${id}`);

export const addFood = (data) =>
  api.post("/foods", data);

export const updateFood = (id, data) =>
  api.put(`/foods/${id}`, data);

export const deleteFood = (id) =>
  api.delete(`/foods/${id}`);

// ORDERS

export const getOrders = () =>
  api.get("/orders");

export const getOrderById = (id) =>
  api.get(`/orders/${id}`);

export const createOrder = (data) =>
  api.post("/orders", data);

export const updateOrder = (id, data) =>
  api.put(`/orders/${id}`, data);

export const deleteOrder = (id) =>
  api.delete(`/orders/${id}`);