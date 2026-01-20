<!-- views/Users.vue -->
<script setup>
import { inject } from "vue";
import PaginationControls from "@/components/PaginationControls.vue";
import { useUsers } from "@/composables/useUsers";

const {
  users,
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

const theme = inject("theme");

function handleChangePage(newPage) {
  if (newPage === page.value) return;
  page.value = newPage;
  loadUsers();
}

function handleChangePerPage(newPerPage) {
  if (newPerPage === perPage.value) return;
  perPage.value = newPerPage;
  page.value = 1;
  loadUsers();
}

loadUsers();
</script>

<template>
  <div class="page-container">
    <h1>Users Management</h1>

    <div class="search-section">
      <input
        @keyup.enter="searchUsers(searchQuery)"
        v-focus
        v-model="searchQuery"
        placeholder="Search users..."
      />
      <button class="btn btn-primary" @click="searchUsers(searchQuery)">
        Search
      </button>
      <button v-if="searchMode" class="btn btn-outline" @click="clearSearch">
        Clear
      </button>
    </div>

    <div v-if="loading" class="state loading-state">
      <BliLoaderGeneral size="xl" />
    </div>
    <div v-else-if="error" class="state error-state">{{ error }}</div>

    <div v-else-if="users.length > 0">
      <table class="table">
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
            <td class="actions">
              <button class="btn btn-soft" @click="editUser(user.id)">
                Edit
              </button>
              <button class="btn btn-danger" @click="deleteUser(user.id)">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- Pagination -->
      <PaginationControls
        :page="page"
        :total-pages="totalPages"
        :per-page="perPage"
        @change-page="handleChangePage"
        @change-per-page="handleChangePerPage"
      />
    </div>

    <div v-else class="state empty-state">No users found.</div>
  </div>
</template>

<style scoped>
h1 {
  margin-bottom: 1.5rem;
  font-size: 1.75rem;
  font-weight: 600;
  color: var(--blu-color-neutral-text-high);
}

.page-container {
  padding: 1.5rem;
}

/* Search */
.search-section {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.search-section input {
  flex: 1;
  max-width: 280px;
  padding: 0.6rem 0.9rem;
  border-radius: 8px;
  border: 1px solid var(--blu-color-neutral-border-default);
  background: var(--blu-color-neutral-background-low);
  color: var(--blu-color-neutral-text-high);
}

.search-section input:focus {
  outline: none;
  border-color: var(--blu-color-primary-main);
}

/* States */
.state {
  padding: 2rem;
  text-align: center;
  border-radius: 12px;
  margin: 1.5rem 0;
}

.loading-state {
  background: color-mix(in srgb, var(--blu-color-primary-main) 5%, transparent);
  color: var(--blu-color-primary-main);
}

.error-state {
  background: color-mix(in srgb, #ef4444 10%, transparent);
  color: #ef4444;
}

.empty-state {
  background: var(--blu-color-neutral-background-low);
  color: var(--blu-color-neutral-text-med);
}

/* Table */
.table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid var(--blu-color-neutral-border-default);
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 1.5rem;
  background: var(--blu-color-neutral-background-low);
  text-align: center;
}

.table th,
.table td {
  padding: 0.9rem;
  border-bottom: 1px solid var(--blu-color-neutral-border-default);
  font-size: 0.95rem;
  vertical-align: middle;
}

.table th {
  font-weight: 600;
  color: var(--blu-color-neutral-text-high);
}

.table td {
  color: var(--blu-color-neutral-text-med);
}

.table tbody tr:hover {
  background: color-mix(in srgb, var(--blu-color-primary-main) 5%, transparent);
}

.table tbody tr:last-child td {
  border-bottom: none;
}

/* Actions */
.actions {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
}

/* Buttons (utility) */
.btn {
  padding: 0.4rem 0.9rem;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 500;
  transition: 0.2s ease;
}

.btn-primary {
  background: var(--blu-color-primary-main);
  color: #fff;
}

.btn-primary:hover {
  background: var(--blu-color-primary-hover);
}

.btn-outline {
  background: transparent;
  border: 1px solid var(--blu-color-neutral-border-default);
  color: var(--blu-color-neutral-text-med);
}

.btn-outline:hover {
  background: color-mix(
    in srgb,
    var(--blu-color-primary-main) 10%,
    transparent
  );
}

.btn-soft {
  background: color-mix(
    in srgb,
    var(--blu-color-primary-main) 10%,
    transparent
  );
  color: var(--blu-color-primary-main);
}

.btn-soft:hover {
  background: color-mix(
    in srgb,
    var(--blu-color-primary-main) 20%,
    transparent
  );
}

.btn-danger {
  background: color-mix(in srgb, #ef4444 10%, transparent);
  color: #ef4444;
}

.btn-danger:hover {
  background: color-mix(in srgb, #ef4444 20%, transparent);
}

/* Responsive */
@media (max-width: 768px) {
  .search-section {
    flex-direction: column;
  }

  .search-section input {
    max-width: none;
  }

  .table {
    display: block;
    overflow-x: auto;
  }

  .actions {
    flex-direction: column;
  }

  .btn {
    width: 100%;
  }
}
</style>
