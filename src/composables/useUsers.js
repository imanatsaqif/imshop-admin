// composables/useUsers.js
import { ref, computed, watch } from "vue";
import { fetchUsers, fetchUsersBySearch } from "@/services/userServices";

export function useUsers() {
  const users = ref([]);
  const total = ref(0);
  const page = ref(1);
  const perPage = ref(10);
  const loading = ref(false);
  const error = ref(null);

  const totalPages = computed(() => Math.ceil(total.value / perPage.value));

  const startTime = ref(null);
  // Loading Timer
  watch(loading, (isLoading, wasLoading) => {
    if (isLoading && !wasLoading) {
      startTime.value = Date.now();
    } else if (!isLoading && wasLoading && startTime.value !== null) {
      const duration = Date.now() - startTime.value;
      console.log(`Loading completed in ${duration}ms`);
      startTime.value = null;
    }
  });

  const searchMode = ref(false);
  const searchQuery = ref("");

  async function clearSearch() {
    searchMode.value = false;
    searchQuery.value = "";
    await loadUsers();
  }

  async function loadUsers() {
    try {
      loading.value = true;
      error.value = null;

      // Validation
      if (page.value < 1) page.value = 1;
      if (page.value > totalPages.value && totalPages.value > 0) {
        page.value = totalPages.value;
      }

      let result;
      if (searchMode.value && searchQuery.value) {
        // SEARCH MODE
        result = await fetchUsersBySearch({
          query: searchQuery.value,
          limit: perPage.value,
          skip: (page.value - 1) * perPage.value,
        });
      } else {
        // NORMAL MODE
        result = await fetchUsers({
          limit: perPage.value,
          skip: (page.value - 1) * perPage.value,
        });
      }

      users.value = result.items;
      total.value = result.total;
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  }

  async function searchUsers(query) {
    if (query) {
      searchMode.value = true;
      searchQuery.value = query;
      page.value = 1;
      await loadUsers();
    } else {
      clearSearch();
    }
  }

  return {
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
  };
}
