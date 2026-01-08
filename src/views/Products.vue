<!-- views/Products.vue -->
<script setup>
import { onMounted } from 'vue';
import { useProducts } from '@/composables/useProducts';
import { usePriceFilter } from '@/composables/usePriceFilter';

const {
    products,
    loading,
    error,
    limitProduct,
    skipProduct,
    getProducts
} = useProducts()

const {
    minPrice,
    maxPrice,
    priceError,
    filteredPrice
} = usePriceFilter(products)

onMounted(() => {
    getProducts()
})
</script>

<template>
    <h1>Products</h1>
    <!-- Ganti value parameter reaktif -->
    <div class="flex-container">
        <div>
            <!-- filtering server side -->
            <h2>Ganti Parameter</h2>
            <span>Limit</span>
            <input type="number" v-model="limitProduct"></input>
            <br>
            <span>skip</span>
            <input type="number" v-model="skipProduct"></input>
            <br>
            <bliButton @click="getProducts()">Search</bliButton>
        </div>
        <div>
            <!-- filtering locally -->
            <h2>Tampilkan dengan Harga:</h2>
            <label for="minPrice">Harga Minimal ($)</label>
            <input id="minPrice" type="number" v-model.number="minPrice" min="0" placeholder="0">
            <span>-</span>
            <label for="maxPrice">Harga Maksimal ($)</label>
            <input id="maxPrice" type="number" v-model.number="maxPrice" :min="minPrice" placeholder="1000">
            <p v-if="priceError">{{ priceError }}</p>
        </div>
    </div>
    <hr>
    <div v-if="loading"> Loading... </div>
    <div v-else-if="error" class="error"> {{ error }}</div>
    <div v-else>
        <!-- Product list bukan hasil dari API langsung tapi hasil olahan computed filteredPrice -->
        <div v-for="product in filteredPrice" :key="product.id" class="product-card">
            <h3>{{ product.title }}</h3>
            <p>Price: {{ product.price }}</p>
            <p>Category: {{ product.category }}</p>
            <p>Id: {{ product.id }}</p>
            <hr>
        </div>
    </div>
</template>

<style scoped>
.flex-container {
    display: flex;
    gap: 20px;
}
</style>