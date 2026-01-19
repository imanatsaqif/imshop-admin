<script setup>
import { ref, computed } from 'vue'

const totalProducts = ref(127)
const totalUsers = ref(12)
const revenue = ref(12450)

// Computed untuk formatted revenue
const formattedRevenue = computed(() => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  }).format(revenue.value)
})
</script>

<template>
  <div class="dashboard-container">
    <h1 class="dashboard-title">Dashboard Overview</h1>
    <div class="dashboard-grid">
      <div class="stat-card products">
        <div class="stat-content">
          <h3 class="stat-label">Total Products</h3>
          <p class="stat-value">{{ totalProducts }}</p>
        </div>
      </div>
      
      <div class="stat-card users">
        <div class="stat-content">
          <h3 class="stat-label">Total Users</h3>
          <p class="stat-value">{{ totalUsers }}</p>
        </div>
      </div>
      
      <div class="stat-card revenue">
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
  color: #2c3e50;
  margin-bottom: 2rem;
  font-weight: 600;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.stat-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1.25rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border: 1px solid #e9ecef;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
}

.stat-content {
  flex: 1;
}

.stat-label {
  color: #6c757d;
  font-size: 0.95rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.stat-value {
  color: #2c3e50;
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
}

/* Card-specific accents */
.stat-card.products {
  border-top: 4px solid #3498db;
}

.stat-card.users {
  border-top: 4px solid #9b59b6;
}

.stat-card.revenue {
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