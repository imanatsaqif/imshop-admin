<script setup>
import { ref, provide, onMounted } from "vue";

const navRoutes = [
  { name: "home", label: "Home" },
  { name: "products", label: "Products" },
  { name: "stats", label: "Stats" },
  { name: "users", label: "Users" },
];

const theme = ref("light");

function applyTheme(newTheme) {
  theme.value = newTheme;
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("imshop-theme", newTheme);
}

function toggleTheme() {
  const newTheme = theme.value === "light" ? "dark" : "light";
  applyTheme(newTheme);
  console.log("Theme switched to:", newTheme);
}

onMounted(() => {
  const savedTheme = localStorage.getItem("imshop-theme");
  if (savedTheme) {
    applyTheme(savedTheme);
  }
});

provide("theme", theme);
provide("toggleTheme", toggleTheme);
</script>

<template>
  <div class="dashboard-layout">
    <header>
      <nav class="custom-nav">
        <!-- Navigation Bar -->
        <RouterLink
          v-for="route in navRoutes"
          :key="route.name"
          :to="{ name: route.name }"
          class="nav-item"
          active-class="active"
          exact-active-class="active"
        >
          {{ route.label }}
        </RouterLink>

        <!-- Theme Toggle Button -->
        <button @click="toggleTheme" class="theme-toggle">
          {{ theme === "light" ? "Dark Mode" : "Light Mode" }}
        </button>
      </nav>
    </header>

    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.dashboard-layout {
  min-height: 100vh;
  background-color: var(--blu-color-neutral-background-default);
  transition: background-color 0.3s ease;
}

.custom-nav {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 16px 24px;
  /* PERUBAHAN PENTING: pakai background-low, bukan background-high */
  background-color: var(--blu-color-neutral-background-low);
  border-bottom: 1px solid var(--blu-color-neutral-border-default);
  transition: all 0.3s ease;
}

.nav-item {
  padding: 8px 16px;
  color: var(--blu-color-neutral-text-med);
  text-decoration: none;
  border-radius: 6px;
  transition: all 0.3s ease;
  font-weight: 500;
}

.nav-item:hover {
  color: var(--blu-color-primary-main);
  background-color: color-mix(
    in srgb,
    var(--blu-color-primary-main) 10%,
    transparent
  );
}

.nav-item.active {
  color: var(--blu-color-primary-main);
  background-color: color-mix(
    in srgb,
    var(--blu-color-primary-main) 15%,
    transparent
  );
  font-weight: 600;
}

.theme-toggle {
  margin-left: auto;
  padding: 8px 16px;
  background-color: var(--blu-color-primary-main);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s ease;
}

.theme-toggle:hover {
  background-color: var(--blu-color-primary-hover);
}

.main-content {
  padding: 24px;
}
</style>
