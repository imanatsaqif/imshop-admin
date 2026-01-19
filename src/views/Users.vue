<!-- views/Users.vue -->
<script setup>
import { inject } from "vue";
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
const theme = inject("theme");
</script>

<template>
  <h1>Users Management</h1>

  <div class="theme-badge" :class="theme">Theme: {{ theme }}</div>

  <!-- Search Section -->
  <div class="search-section">
    <input
      @keyup.enter="searchUsers(searchQuery)"
      v-focus
      v-model="searchQuery"
      placeholder="Search users..."
    />
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

<style scoped>
.users-container {
  padding: 1.5rem;
}

h1 {
  color: var(--blu-color-neutral-text-high);
  margin-bottom: 1.5rem;
  font-weight: 600;
  font-size: 1.75rem;
}

.theme-badge {
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 1.5rem;
  border: 1px solid;
}

.theme-badge.light {
  background-color: color-mix(
    in srgb,
    var(--blu-color-primary-main) 10%,
    transparent
  );
  color: var(--blu-color-primary-main);
  border-color: color-mix(
    in srgb,
    var(--blu-color-primary-main) 30%,
    transparent
  );
}

.theme-badge.dark {
  background-color: color-mix(
    in srgb,
    var(--blu-color-primary-main) 20%,
    transparent
  );
  color: var(--blu-color-blue-40);
  border-color: color-mix(
    in srgb,
    var(--blu-color-primary-main) 40%,
    transparent
  );
}

/* Search Section */
.search-section {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  align-items: center;
}

.search-section input {
  flex: 1;
  max-width: 300px;
  padding: 0.75rem 1rem;
  border: 1px solid var(--blu-color-neutral-border-default);
  border-radius: 8px;
  background-color: var(--blu-color-neutral-background-low);
  color: var(--blu-color-neutral-text-high);
  font-size: 0.95rem;
  transition: border-color 0.2s ease;
}

.search-section input:focus {
  outline: none;
  border-color: var(--blu-color-primary-main);
  box-shadow: 0 0 0 3px
    color-mix(in srgb, var(--blu-color-primary-main) 20%, transparent);
}

.search-section button {
  padding: 0.75rem 1.25rem;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  font-size: 0.95rem;
  transition: all 0.2s ease;
}

.search-section button:first-of-type {
  background-color: var(--blu-color-primary-main);
  color: white;
}

.search-section button:first-of-type:hover {
  background-color: var(--blu-color-primary-hover);
}

.search-section button:last-of-type {
  background-color: transparent;
  color: var(--blu-color-neutral-text-med);
  border: 1px solid var(--blu-color-neutral-border-default);
}

.search-section button:last-of-type:hover {
  background-color: color-mix(
    in srgb,
    var(--blu-color-primary-main) 10%,
    transparent
  );
}

/* Loading & Error States */
.loading-state,
.error-state,
.empty-state {
  padding: 2rem;
  text-align: center;
  border-radius: 12px;
  margin: 1.5rem 0;
}

.loading-state {
  background-color: color-mix(
    in srgb,
    var(--blu-color-primary-main) 5%,
    transparent
  );
  color: var(--blu-color-primary-main);
}

.error-state {
  background-color: color-mix(in srgb, #ef4444 10%, transparent);
  color: #ef4444;
  border: 1px solid color-mix(in srgb, #ef4444 30%, transparent);
}

.empty-state {
  background-color: var(--blu-color-neutral-background-low);
  color: var(--blu-color-neutral-text-med);
  border: 1px solid var(--blu-color-neutral-border-default);
}

/* Users Table */
table {
  width: 100%;
  border-collapse: collapse;
  background-color: var(--blu-color-neutral-background-low);
  border: 1px solid var(--blu-color-neutral-border-default);
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 1.5rem;
}

thead {
  background-color: var(--blu-color-neutral-background-low);
}

th {
  padding: 1rem;
  text-align: left;
  color: var(--blu-color-neutral-text-high);
  font-weight: 600;
  font-size: 0.95rem;
  border-bottom: 1px solid var(--blu-color-neutral-border-default);
}

td {
  padding: 1rem;
  color: var(--blu-color-neutral-text-med);
  border-bottom: 1px solid var(--blu-color-neutral-border-default);
  font-size: 0.95rem;
}

tbody tr {
  transition: background-color 0.2s ease;
}

tbody tr:hover {
  background-color: color-mix(
    in srgb,
    var(--blu-color-primary-main) 5%,
    transparent
  );
}

tbody tr:last-child td {
  border-bottom: none;
}

/* Actions Column */
td:last-child {
  display: flex;
  gap: 0.5rem;
}

td:last-child button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

td:last-child button:first-child {
  background-color: color-mix(
    in srgb,
    var(--blu-color-primary-main) 10%,
    transparent
  );
  color: var(--blu-color-primary-main);
}

td:last-child button:first-child:hover {
  background-color: color-mix(
    in srgb,
    var(--blu-color-primary-main) 20%,
    transparent
  );
}

td:last-child button:last-child {
  background-color: color-mix(in srgb, #ef4444 10%, transparent);
  color: #ef4444;
}

td:last-child button:last-child:hover {
  background-color: color-mix(in srgb, #ef4444 20%, transparent);
}

/* Pagination Wrapper */
.pagination-wrapper {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--blu-color-neutral-border-default);
}

/* Responsive */
@media (max-width: 768px) {
  .search-section {
    flex-direction: column;
    align-items: stretch;
  }

  .search-section input {
    max-width: none;
  }

  .search-section button {
    width: 100%;
  }

  table {
    display: block;
    overflow-x: auto;
  }

  td:last-child {
    flex-direction: column;
    gap: 0.5rem;
  }

  td:last-child button {
    width: 100%;
  }
}
</style>
