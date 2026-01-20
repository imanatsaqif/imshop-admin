// src/composables/useProducts
import { ref, computed, watch } from "vue";
import { fetchProducts } from "@/services/productServices";

export function useProducts() {
  const products = ref([]);
  const total = ref(0);
  const page = ref(1);
  const perPage = ref(8);
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

  async function loadProducts() {
    try {
      loading.value = true;
      error.value = null;

      if (page.value < 1) page.value = 1;
      if (page.value > totalPages.value && totalPages.value > 0) {
        page.value = totalPages.value;
      }

      const result = await fetchProducts({
        limit: perPage.value,
        skip: (page.value - 1) * perPage.value,
      });
      products.value = result.items;
      total.value = result.total;
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  }

  return {
    products,
    total,
    totalPages,
    page,
    perPage,
    loading,
    error,
    loadProducts,
  };
}
