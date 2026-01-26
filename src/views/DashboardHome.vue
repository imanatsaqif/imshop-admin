<!-- Dashboard Home -->
<script setup>
import { ref, computed, inject, onMounted, defineAsyncComponent } from "vue";
import { useProducts } from "@/composables/useProducts";
import { useUsers } from "@/composables/useUsers";
import { useCarts } from "@/composables/useCarts";

const theme = inject("theme");

const buttonColor = computed(() => {
  return theme.value === "dark" ? "inverted" : "common";
});

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

const {
  loadCarts,
  totalRevenue,
  totalProductsSold,
  averageCartValue,
  loading: cartsLoading,
  topProducts,
  error: cartsError,
  cartValueDistribution,
  productsPerCartDistribution,
} = useCarts();

onMounted(() => {
  perPage.value = 1;
  loadProducts();
  loadUsers();
  loadCarts();
});

// Computed untuk formatted revenue
const formattedRevenue = computed(() => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(totalRevenue.value);
});

const formattedAverageCartValue = computed(() => {
  const value = averageCartValue.value;
  if (isNaN(value) || value === 0) return "$0.00";

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
});

const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(value);
};

const showChart = ref(false);
const chartData1 = computed(() => {
  return productsPerCartDistribution.value;
});
const chartData2 = computed(() => {
  return cartValueDistribution.value;
});

function toggleChart() {
  showChart.value = !showChart.value;
}

// Tambah function untuk menentukan warna badge berdasarkan rank
const getRankColor = (index) => {
  const colors = ["blue", "yellow", "red", "magenta", "green"];
  return colors[index] || "gray";
};
</script>

<template>
  <div class="dashboard-container">
    <h1 class="dashboard-title">Dashboard Overview</h1>
    <div v-if="cartsError" class="dashboard-error alert-error">
      <p>{{ cartsError }}</p>
      <BliButton
        @click="loadCarts"
        prominence="secondary"
        size="small"
        :color="buttonColor"
      >
        Retry
      </BliButton>
    </div>

    <!-- Stats Grid -->
    <div class="dashboard-grid" v-if="!cartsError">
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
            <BliLoaderGeneral v-if="cartsLoading" size="m" />
            <p v-else class="stat-value">{{ formattedRevenue }}</p>
          </div>
        </div>
      </div>

      <div class="stat-card sales-card">
        <div class="stat-content">
          <h3 class="stat-label">Products Sold</h3>
          <div class="stat-body">
            <BliLoaderGeneral v-if="cartsLoading" size="m" />
            <p v-else class="stat-value">{{ totalProductsSold }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="stats-container">
      <BliButton
        @click="toggleChart"
        prominence="secondary"
        size="medium"
        :color="buttonColor"
      >
        {{ showChart ? "Hide Chart" : "Show Chart" }}
      </BliButton>

      <div v-if="showChart">
        <Suspense>
          <template #default>
            <div class="dashboard-grid">
              <SimpleChart
                :data="chartData1"
                title="Products Per Cart Distribution"
              />

              <SimpleChart :data="chartData2" title="Cart Value Distribution" />
            </div>
          </template>
          <template #fallback>
            <BliLoaderGeneral size="m" />
          </template>
        </Suspense>
      </div>
    </div>
    <div
      v-if="!cartsLoading && topProducts.length > 0"
      class="top-products-section"
    >
      <h2 class="section-title">Top Selling Products</h2>

      <!-- Table untuk top products -->
      <BliTable
        size="small"
        type="primary"
        class="products-table"
        :table-style="{
          'border-collapse': 'separate',
          'border-spacing': '0 8px',
        }"
      >
        <thead>
          <tr>
            <th style="width: 60px; text-align: center">Rank</th>
            <th>Product</th>
            <th style="text-align: center">Units Sold</th>
            <th style="text-align: right">Revenue</th>
            <th style="text-align: right">Price</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(product, index) in topProducts"
            :key="product.id"
            class="table-row"
          >
            <td style="text-align: center; vertical-align: middle">
              <!-- Ranking badge -->
              <BliBadge
                :color="getRankColor(index)"
                prominence="secondary"
                size="medium"
                class="rank-badge"
              >
                {{ index + 1 }}
              </BliBadge>
            </td>
            <td>
              <div class="product-cell">
                <img
                  :src="product.thumbnail"
                  :alt="product.title"
                  class="table-thumbnail"
                />
                <div class="product-details">
                  <div class="product-name">{{ product.title }}</div>
                  <div class="product-id">ID: {{ product.id }}</div>
                </div>
              </div>
            </td>
            <td style="text-align: center; vertical-align: middle">
              <div class="units-sold">
                <strong>{{ product.sold.toLocaleString() }}</strong>
                <div class="units-label">units</div>
              </div>
            </td>
            <td style="text-align: right; vertical-align: middle">
              <div class="revenue-amount">
                {{ formatCurrency(product.revenue) }}
              </div>
            </td>
            <td style="text-align: right; vertical-align: middle">
              <div class="price-amount">
                {{ formatCurrency(product.price) }}
                <div class="per-unit">per unit</div>
              </div>
            </td>
          </tr>
        </tbody>
      </BliTable>
    </div>
  </div>
</template>

<style scoped>
.dashboard-container {
  padding: 1.5rem;
  font-family: var(--blu-font-family-body);
}

.dashboard-title {
  color: var(--blu-color-neutral-text-high);
  margin-bottom: 1.5rem;
  font-weight: 600;
  font-size: 1.75rem;
}

.dashboard-error {
  background-color: var(--blu-color-neutral-background-low);
  border: 1px solid var(--blu-color-neutral-border-default);
  color: var(--blu-color-neutral-text-med);
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem; /* Tambah gap untuk spacing */
}

.dashboard-error p {
  margin: 0;
  flex: 1;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}

.stat-card {
  background-color: var(--blu-color-neutral-background-low);
  border-radius: 12px;
  padding: 1.5rem;
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
  width: 100%;
}

.stat-label {
  color: var(--blu-color-neutral-text-med);
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.stat-body {
  min-height: 2.5rem;
  display: flex;
  align-items: center;
}

.stat-value {
  color: var(--blu-color-neutral-text-high);
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
  line-height: 1;
}

.stat-card.product-card {
  border-top: 4px solid #3498db;
}

.stat-card.user-card {
  border-top: 4px solid #9b59b6;
}

.stat-card.revenue-card {
  border-top: 4px solid #2ecc71;
}

.stat-card.sales-card {
  border-top: 4px solid #f1c40f;
}

.stats-container {
  margin-bottom: 2.5rem;
  padding: 1.5rem;
  background-color: var(--blu-color-neutral-background-low);
  border-radius: 12px;
  border: 1px solid var(--blu-color-neutral-border-default);
}

.top-products-section {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid var(--blu-color-neutral-border-default);
}

.section-title {
  color: var(--blu-color-neutral-text-high);
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
}

.products-table {
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
}

.products-table thead th {
  color: var(--blu-color-neutral-text-med);
  font-weight: 600;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.products-table tbody tr {
  transition: all 0.2s ease;
}

.products-table tbody tr:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.products-table tbody td {
  vertical-align: middle;
}

/* Rank badge styling */
.rank-badge {
  min-width: 36px;
  justify-content: center;
  font-weight: 700;
  font-size: 0.875rem;
}

/* Product cell styling */
.product-cell {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.table-thumbnail {
  width: 50px;
  height: 50px;
  object-fit: cover;
  padding: 2px;
  border-radius: 6px;
  background-color: #ffffff;
  flex-shrink: 0;
}

.product-details {
  flex: 1;
}

.product-name {
  color: var(--blu-color-neutral-text-high);
  font-weight: 600;
  font-size: 0.9375rem;
  margin-bottom: 0.25rem;
  line-height: 1.3;
}

.product-id {
  color: var(--blu-color-neutral-text-low);
  font-size: 0.8125rem;
}

/* Units sold styling */
.units-sold {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.units-sold strong {
  color: var(--blu-color-neutral-text-high);
  font-size: 1.125rem;
  font-weight: 700;
}

.units-label {
  color: var(--blu-color-neutral-text-med);
  font-size: 0.75rem;
  margin-top: 0.25rem;
}

/* Revenue amount styling */
.revenue-amount {
  color: var(--blu-color-primary-main);
  font-weight: 700;
  font-size: 1rem;
}

/* Price amount styling */
.price-amount {
  color: var(--blu-color-neutral-text-high);
  font-size: 0.9375rem;
  font-weight: 500;
}

.per-unit {
  color: var(--blu-color-neutral-text-med);
  font-size: 0.75rem;
  margin-top: 0.25rem;
}

@media (max-width: 768px) {
  .dashboard-container {
    padding: 1rem;
  }

  .dashboard-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .stat-card {
    padding: 1.25rem;
  }

  .stat-value {
    font-size: 1.75rem;
  }

  .stats-container {
    padding: 1rem;
    margin-bottom: 2rem;
  }

  .section-title {
    font-size: 1.25rem;
  }

  .products-table thead th,
  .products-table tbody td {
    padding: 0.75rem 1rem;
  }

  .table-thumbnail {
    width: 40px;
    height: 40px;
  }

  .product-name {
    font-size: 0.875rem;
  }

  .units-sold strong {
    font-size: 1rem;
  }

  .revenue-amount {
    font-size: 0.875rem;
  }
}

@media (max-width: 480px) {
  .dashboard-title {
    font-size: 1.5rem;
  }

  .stat-value {
    font-size: 1.5rem;
  }
}

@media (max-width: 640px) {
  .products-table thead th:nth-child(4),
  .products-table tbody td:nth-child(4),
  .products-table thead th:nth-child(5),
  .products-table tbody td:nth-child(5) {
    display: none;
  }

  .product-cell {
    gap: 0.75rem;
  }
}
</style>
