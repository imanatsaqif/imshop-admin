<script setup>
import { ref, computed, inject } from "vue";

// 🔥 INJECT theme dari DashboardLayout
const theme = inject("theme");

// Stat data
const totalProducts = ref(127);
const totalUsers = ref(12);
const revenue = ref(12450);

// Computed untuk formatted revenue
const formattedRevenue = computed(() => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(revenue.value);
});
</script>

<template>
  <div class="dashboard-container">
    <h1 class="dashboard-title">Dashboard Overview</h1>

    <!-- Simple theme indicator -->
    <div class="theme-indicator">
      Current theme: <strong>{{ theme }}</strong> (via provide/inject)
    </div>

    <!-- Stats Grid -->
    <div class="dashboard-grid">
      <div class="stat-card product-card">
        <div class="stat-content">
          <h3 class="stat-label">Total Products</h3>
          <p class="stat-value">{{ totalProducts }}</p>
        </div>
      </div>

      <div class="stat-card user-card">
        <div class="stat-content">
          <h3 class="stat-label">Total Users</h3>
          <p class="stat-value">{{ totalUsers }}</p>
        </div>
      </div>

      <div class="stat-card revenue-card">
        <div class="stat-content">
          <h3 class="stat-label">Total Revenue</h3>
          <p class="stat-value">{{ formattedRevenue }}</p>
        </div>
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
