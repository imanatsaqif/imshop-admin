<!-- DashboardLayout.vue -->
<script setup>
const navRoutes = [
    { name: 'home', label: 'Home' },
    { name: 'products', label: 'Products' },
    { name: 'stats', label: 'Stats' },
    { name: 'users', label: 'Users' }
]
</script>

<template>
    <div class="sideBar"></div>
    <header>
        <nav class="custom-nav">
            <!-- Navigation Bar -->
            <RouterLink
                v-for="route in navRoutes"
                :key="route.name"
                :to="{ name: route.name }"
                class="nav-item"
                active-class="active"
                exact-active-class="active">
                {{ route.label }}
            </RouterLink>
        </nav>
    </header>
    <RouterView />
</template>

<style scoped>
.custom-nav {
    display: flex;
    gap: 24px;
    padding: 16px;
    background: #f8fafc;
    border-radius: 12px;
    margin-bottom: 20px;
}

.nav-item {
    padding: 8px 16px;
    color: #64748b;
    text-decoration: none;
    border-radius: 6px;
    transition: all 0.3s ease;
    font-weight: 500;
}

.nav-item:hover {
    color: #3b82f6;
    background: #eff6ff;
}

.nav-item.active {
    color: #1d4ed8;
    background: #dbeafe;
    font-weight: 600;
}
</style>