<!-- views/Users.vue -->
<script setup>
import PaginationControls from "@/components/PaginationControls.vue";
import { useUsers } from "@/composables/useUsers";

const {
  users,
  total,
  totalPages,
  page,
  perPage,
  loading,
  error,
  loadUsers,
  searchMode,
  searchQuery,
  searchUsers,
  clearSearch,
} = useUsers();

function handleChangePage(newPage) {
  page.value = newPage;
  loadUsers();
}

function handleChangePerPage(newPerPage) {
  perPage.value = newPerPage;
  loadUsers();
}

function editUser(userId) {
  console.log("Edit user:", userId);
}

function deleteUser(userId) {
  console.log("Delete user:", userId);
}

loadUsers();
</script>

<template>
  <h1>Users Management</h1>

  <!-- Search Section -->
  <div>
    <input v-model="searchQuery" placeholder="Search users..." />
    <button @click="searchUsers(searchQuery)">Search</button>
    <button v-if="searchMode" @click="clearSearch">Clear</button>
  </div>

  <!-- Users Table -->
  <div v-if="loading">Loading users...</div>
  <div v-else-if="error" class="error">{{ error }}</div>
  <div v-else-if="users.length > 0">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.firstName }} {{ user.lastName }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.role }}</td>
          <td>
            <button @click="editUser(user.id)">Edit</button>
            <button @click="deleteUser(user.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-else>
    <p>No users found.</p>
  </div>

  <!-- Pagination -->
  <PaginationControls
    :page="page"
    :total-pages="totalPages"
    :per-page="perPage"
    @change-page="handleChangePage"
    @change-per-page="handleChangePerPage"
  />
</template>
