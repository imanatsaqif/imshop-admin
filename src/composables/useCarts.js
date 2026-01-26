// composables/useCarts.js
import { ref, computed, watch } from "vue";
import { getAllCarts } from "@/services/cartServices";

export function useCarts() {
  const carts = ref([]);
  const total = ref(0);
  const page = ref(1);
  const perPage = ref(10);
  const loading = ref(false);
  const error = ref(null);

  const totalPages = computed(() => Math.ceil(total.value / perPage.value));

  const totalRevenue = computed(() => {
    return carts.value.reduce((acc, cart) => acc + (cart.total || 0), 0);
  });

  const totalProductsSold = computed(() => {
    return carts.value.reduce((acc, cart) => {
      const cartTotal =
        cart.products?.reduce(
          (sum, product) => sum + (product.quantity || 0),
          0,
        ) || 0;
      return acc + cartTotal;
    }, 0);
  });

  const averageCartValue = computed(() => {
    if (carts.value.length === 0) return 0;
    return totalRevenue.value / carts.value.length;
  });

  const topProducts = computed(() => {
    const productMap = {};

    carts.value.forEach((cart) => {
      if (cart.products && Array.isArray(cart.products)) {
        cart.products.forEach((product) => {
          if (!productMap[product.id]) {
            productMap[product.id] = {
              id: product.id,
              title: product.title,
              price: product.price,
              thumbnail: product.thumbnail,
              sold: 0,
              revenue: 0,
            };
          }
          productMap[product.id].sold += product.quantity;
          productMap[product.id].revenue += product.total;
        });
      }
    });

    // Return top 5 sorted by quantity sold
    return Object.values(productMap)
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 5);
  });

  const cartValueDistribution = computed(() => {
    const distribution = {
      "Low (<$1k)": 0,
      "Medium ($1k-$5k)": 0,
      "High (>$5k)": 0,
    };

    carts.value.forEach((cart) => {
      if (cart.total < 1000) distribution["Low (<$1k)"]++;
      else if (cart.total <= 5000) distribution["Medium ($1k-$5k)"]++;
      else distribution["High (>$5k)"]++;
    });

    return Object.entries(distribution).map(([name, value]) => ({
      name,
      value,
    }));
  });

  const productsPerCartDistribution = computed(() => {
    const distribution = {
      "1-5 items": 0,
      "6-10 items": 0,
      "11+ items": 0,
    };

    carts.value.forEach((cart) => {
      const quantity = cart.totalQuantity;
      if (quantity <= 5) distribution["1-5 items"]++;
      else if (quantity <= 10) distribution["6-10 items"]++;
      else distribution["11+ items"]++;
    });

    return Object.entries(distribution).map(([name, value]) => ({
      name,
      value,
    }));
  });

  const startTime = ref(null);
  // Loading Timer
  watch(loading, (isLoading, wasLoading) => {
    if (isLoading && !wasLoading) {
      startTime.value = Date.now();
    } else if (!isLoading && wasLoading && startTime.value !== null) {
      const duration = Date.now() - startTime.value;
      console.log(`Carts loading completed in ${duration}ms`);
      startTime.value = null;
    }
  });

  async function loadCarts() {
    try {
      loading.value = true;
      error.value = null;

      const result = await getAllCarts({
        limit: 100,
        skip: 0,
      });

      carts.value = result.items;
      total.value = result.total;
    } catch (err) {
      error.value = `Failed to load cart data: ${err.message}`;
      console.error("Cart loading error:", err);
    } finally {
      loading.value = false;
    }
  }

  return {
    carts,
    total,
    totalPages,
    page,
    perPage,
    loading,
    error,
    loadCarts,
    totalRevenue,
    totalProductsSold,
    averageCartValue,
    topProducts,
    cartValueDistribution,
    productsPerCartDistribution,
  };
}
