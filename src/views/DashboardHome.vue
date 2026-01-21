<script setup>
import { ref, computed, inject, onMounted, defineAsyncComponent } from "vue";
import { useProducts } from "@/composables/useProducts";
import { useUsers } from "@/composables/useUsers";

const theme = inject("theme");

const SimpleChart = defineAsyncComponent(
  () => import("@/components/SimpleChart.vue"),
);

const {
  total: totalProducts,
  perPage,
  loading: productsLoading,
  loadProducts,
} = useProducts();

const { total: totalUsers, loading: usersLoading, loadUsers } = useUsers();

onMounted(() => {
  perPage.value = 1;
  loadProducts();
  loadUsers();
});

// Stat data
const revenue = ref(12450);

// Computed untuk formatted revenue
const formattedRevenue = computed(() => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(revenue.value);
});

const showChart = ref(false);
const chartData = ref([
  { name: "Product A", value: 100 },
  { name: "Product B", value: 200 },
  { name: "Product C", value: 150 },
]);

function toggleChart() {
  showChart.value = !showChart.value;
}
</script>

<template>
  <div class="dashboard-container">
    <h1 class="dashboard-title">Dashboard Overview</h1>

    <!-- Stats Grid -->
    <div class="dashboard-grid">
      <div class="stat-card product-card">
        <div class="stat-content">
          <h3 class="stat-label">Total Products</h3>

          <div class="stat-body">
            <BliLoaderGeneral v-if="productsLoading" size="m" />
            <p v-else class="stat-value">{{ totalProducts }}</p>
          </div>
        </div>
      </div>

      <div class="stat-card user-card">
        <div class="stat-content">
          <h3 class="stat-label">Total Users</h3>

          <div class="stat-body">
            <BliLoaderGeneral v-if="usersLoading" size="m" />
            <p v-else class="stat-value">{{ totalUsers }}</p>
          </div>
        </div>
      </div>

      <div class="stat-card revenue-card">
        <div class="stat-content">
          <h3 class="stat-label">Total Revenue</h3>

          <div class="stat-body">
            <p class="stat-value">{{ formattedRevenue }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="stats-container">
      <button @click="toggleChart" class="btn">
        {{ showChart ? "Hide Chart" : "Show Chart" }}
      </button>
      <div v-if="showChart">
        <Suspense>
          <template #default>
            <SimpleChart :data="chartData" />
          </template>
          <template #fallback>
            <BliLoaderGeneral size="m" />
          </template>
        </Suspense>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard-container {
  padding: 1.5rem;
}

.dashboard-title {
  color: var(--blu-color-neutral-text-high);
  margin-bottom: 1rem;
  font-weight: 600;
}

.theme-indicator {
  padding: 0.75rem 1rem;
  background-color: var(--blu-color-neutral-background-low);
  border: 1px solid var(--blu-color-neutral-border-default);
  border-radius: 8px;
  margin-bottom: 1.5rem;
  color: var(--blu-color-neutral-text-med);
  font-size: 0.9rem;
}

.theme-indicator strong {
  color: var(--blu-color-primary-main);
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.stat-card {
  background-color: var(--blu-color-neutral-background-low);
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1.25rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  border: 1px solid var(--blu-color-neutral-border-default);
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
}

.stat-content {
  flex: 1;
}

.stat-body {
  min-height: 2.5rem;
  display: flex;
  align-items: center;
}

.stat-label {
  color: var(--blu-color-neutral-text-med);
  font-size: 0.95rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.stat-value {
  color: var(--blu-color-neutral-text-high);
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
}

/* Card-specific accents - PRESERVING ORIGINAL STYLE */
.stat-card.product-card {
  border-top: 4px solid #3498db;
}

.stat-card.user-card {
  border-top: 4px solid #9b59b6;
}

.stat-card.revenue-card {
  border-top: 4px solid #2ecc71;
}

/* Responsive */
@media (max-width: 768px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
  }

  .stat-card {
    padding: 1.25rem;
  }

  .stat-value {
    font-size: 1.75rem;
  }
}
</style>
