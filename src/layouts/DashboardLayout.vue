<!-- DashboardLayout.vue -->
<script setup>
import { RouterView, RouterLink } from 'vue-router';
</script>

<template>
    <div class="sideBar"></div>
    <header>
        <nav>
            <!-- Navigation Bar -->
            <RouterLink v-for="route in [
                { name: 'home', label: 'Home' },
                { name: 'products', label: 'products' },
                { name: 'stats', label: 'stats' },
                { name: 'users', label: 'users' }
            ]" :key="route.name" :to="{ name: route.name }" class="text-text-secondary hover:text-primary transition"
                active-class="text-primary font-semibold">
                {{ route.label }}
            </RouterLink>
        </nav>
    </header>
    <RouterView />
</template>