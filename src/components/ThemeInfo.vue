<script setup>
import { ref, inject, computed } from "vue";

const theme = inject("theme");
const toggleTheme = inject("toggleTheme");

// Computed untuk demo reaktivitas
const themeDescription = computed(() => {
  return theme.value === "light" ? "Light mode aktif" : "Dark mode aktif";
});

const toggleCount = ref(0);

function handleToggle() {
  toggleTheme();
  toggleCount.value++;
}
</script>

<template>
  <div class="theme-info-card">
    <h3>Theme Info (via Provide/Inject)</h3>

    <div class="info-grid">
      <div class="info-item">
        <label>Current Theme:</label>
        <span class="theme-value">{{ theme }}</span>
      </div>

      <div class="info-item">
        <label>Description:</label>
        <span>{{ themeDescription }}</span>
      </div>

      <div class="info-item">
        <label>Toggle Count:</label>
        <span>{{ toggleCount }}</span>
      </div>

      <div class="info-item">
        <label>Injection Method:</label>
        <code>inject('theme')</code>
      </div>
    </div>

    <div class="action-buttons">
      <button @click="handleToggle" class="btn-primary">
        Toggle Theme (Child Component)
      </button>

      <button @click="toggleCount = 0" class="btn-secondary">
        Reset Counter
      </button>
    </div>

    <div class="injection-demo">
      <p>
        <small
          >This component is 3 levels deep from DashboardLayout, but can access
          theme directly via inject()</small
        >
      </p>
    </div>
  </div>
</template>

<style scoped>
.theme-info-card {
  padding: 20px;
  background-color: var(--blu-color-neutral-background-low);
  border: 1px solid var(--blu-color-neutral-border-default);
  border-radius: 12px;
  margin: 20px 0;
  transition: all 0.3s ease;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin: 20px 0;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.info-item label {
  font-size: 0.875rem;
  color: var(--blu-color-neutral-text-med);
  font-weight: 500;
}

.theme-value {
  font-weight: bold;
  font-size: 1.1rem;
  color: var(--blu-color-primary-main);
}

.action-buttons {
  display: flex;
  gap: 12px;
  margin-top: 20px;
}

.btn-primary {
  padding: 10px 20px;
  background-color: var(--blu-color-primary-main);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s ease;
}

.btn-primary:hover {
  background-color: var(--blu-color-primary-hover);
}

.btn-secondary {
  padding: 10px 20px;
  background-color: transparent;
  color: var(--blu-color-neutral-text-med);
  border: 1px solid var(--blu-color-neutral-border-default);
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background-color: var(--blu-color-neutral-background-high);
}

.injection-demo {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px dashed var(--blu-color-neutral-border-default);
}

.injection-demo small {
  color: var(--blu-color-neutral-text-low);
  font-style: italic;
}
</style>
