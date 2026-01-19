// services/userServices.js
import { api } from "./api";

export async function fetchUsers({ limit, skip }) {
  try {
    const { data } = await api.get("/users", {
      params: { limit, skip },
    });
    return {
      items: data.users,
      total: data.total,
      limit: data.limit,
      skip: data.skip,
    };
  } catch (err) {
    throw new Error(`Failed to fetch users: ${err.message}`);
  }
}

export async function fetchUsersBySearch({ query, limit, skip }) {
  try {
    const { data } = await api.get(`/users/search`, {
      params: { q: query, limit, skip },
    });
    return {
      items: data.users,
      total: data.total,
      limit: data.limit,
      skip: data.skip,
    };
  } catch (err) {
    throw new Error(`Failed to search user: ${err.message}`);
  }
}
