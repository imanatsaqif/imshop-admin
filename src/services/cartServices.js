// services/cartServices.js
import { api } from "./api";

// Get all carts
export async function getAllCarts({ limit, skip } = {}) {
  try {
    const { data } = await api.get("/carts", {
      params: { limit, skip },
    });
    return {
      items: data.carts,
      total: data.total,
      limit: data.limit,
      skip: data.skip,
    };
  } catch (error) {
    throw new Error(`Failed to fetch carts: ${error.message}`);
  }
}

// Get a single cart
export async function getCartById(id) {
  try {
    const { data } = await api.get(`/carts/${id}`);
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch cart with id ${id}: ${error.message}`);
  }
}

// Get carts by a user
export async function getCartsByUser(userId) {
  try {
    const { data } = await api.get(`/carts/user/${userId}`);
    return {
      items: data.carts,
      total: data.total,
      limit: data.limit,
      skip: data.skip,
    };
  } catch (error) {
    throw new Error(
      `Failed to fetch carts for user ${userId}: ${error.message}`,
    );
  }
}

// Add a new cart
export async function addCart(cartData) {
  try {
    const { data } = await api.post("/carts/add", cartData);
    return data;
  } catch (error) {
    throw new Error(`Failed to add cart: ${error.message}`);
  }
}

// Update a cart
export async function updateCart(id, cartData) {
  try {
    const { data } = await api.put(`/carts/${id}`, cartData);
    return data;
  } catch (error) {
    throw new Error(`Failed to update cart with id ${id}: ${error.message}`);
  }
}

// Delete a cart
export async function deleteCart(id) {
  try {
    const { data } = await api.delete(`/carts/${id}`);
    return data;
  } catch (error) {
    throw new Error(`Failed to delete cart with id ${id}: ${error.message}`);
  }
}
