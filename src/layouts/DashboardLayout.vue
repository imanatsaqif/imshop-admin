<script setup>
import { ref, provide, onMounted, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const navRoutes = [
  { name: "home", label: "Home" },
  { name: "products", label: "Products" },
  { name: "marketing", label: "Marketing" },
  // { name: "stats", label: "Stats" },
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
}

const themeLabel = computed(() => {
  return theme.value === "light" ? "Dark Mode" : "Light Mode";
});

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
    <!-- Sticky Header -->
    <header class="sticky-header">
      <div class="header-content">
        <!-- Logo di Kiri -->
        <div class="logo-container">
          <router-link :to="{ name: 'home' }" class="logo-link">
            <img src="/imShop.webp" alt="imShop Logo" class="logo-image" />
          </router-link>
        </div>

        <!-- Navigation di Tengah -->
        <nav class="center-nav">
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
        </nav>

        <!-- Theme Switch di Kanan -->
        <div class="theme-switch-container">
          <span class="light-mode-title">Light</span>
          <BliSwitch
            :model-value="theme === 'dark'"
            @update:model-value="toggleTheme"
            size="m"
          />
          <span class="dark-mode-title">Dark</span>
        </div>
      </div>
    </header>

    <!-- Main Content dengan padding untuk kompensasi sticky header -->
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

/* Sticky Header */
.sticky-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: var(--blu-color-neutral-background-low);
  border-bottom: 1px solid var(--blu-color-neutral-border-default);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  height: 64px;
  max-width: 1400px;
  margin: 0 auto;
}

/* Logo Styles */
.logo-container {
  flex: 0 0 auto;
}

.logo-link {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.logo-image {
  height: 36px;
  width: auto;
  padding: 6px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.logo-image:hover {
  transform: scale(1.05);
}

/* Center Navigation */
.center-nav {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 32px;
}

.nav-item {
  padding: 8px 16px;
  color: var(--blu-color-neutral-text-med);
  text-decoration: none;
  border-radius: 6px;
  transition: all 0.3s ease;
  font-weight: 500;
  font-size: 0.95rem;
  position: relative;
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

.nav-item.active::after {
  content: "";
  position: absolute;
  bottom: -1px;
  left: 16px;
  right: 16px;
  height: 2px;
  background-color: var(--blu-color-primary-main);
  border-radius: 1px;
}

/* Theme Switch */
.theme-switch-container {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  gap: 8px;
}

.light-mode-title {
  font-size: 0.9rem;
  color: #f9f9fa;
}

.dark-mode-title {
  font-size: 0.9rem;
  color: #19222a;
}

/* Main Content */
.main-content {
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
}

/* Responsive */
@media (max-width: 1024px) {
  .center-nav {
    gap: 16px;
  }

  .nav-item {
    padding: 6px 12px;
    font-size: 0.9rem;
  }
}

@media (max-width: 768px) {
  .header-content {
    padding: 0 16px;
    height: 56px;
  }

  .center-nav {
    gap: 8px;
  }

  .nav-item {
    padding: 4px 8px;
    font-size: 0.85rem;
  }

  .logo-image {
    height: 32px;
    padding: 4px;
  }

  .main-content {
    padding: 16px;
    padding-top: calc(16px + 56px);
  }
}

@media (max-width: 640px) {
  .center-nav {
    display: none; /* Sembunyikan nav di mobile, bisa diganti dengan hamburger menu nanti */
  }

  .header-content {
    justify-content: space-between;
  }
}
</style>
