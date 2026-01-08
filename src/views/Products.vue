<!-- views/Products.vue -->
<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useProducts } from '@/composables/useProducts';

const {
    products,
    loading,
    error,
    limitProduct,
    skipProduct,
    fetchProducts
} = useProducts()

const minPrice = ref(0)
const maxPrice = ref(1000)

// computed filter harga local
const filteredPrice = computed(() => {
    console.log('computed')

    // pastikan products ada isinya
    if (!products.value.length) return []

    // pastikan min dan max adalah angka, default min 0, max infinity
    const min = Number(minPrice.value) || 0
    const max = Number(maxPrice.value) || Infinity

    return products.value.filter(product => {
        return product.price >= min && product.price <= max
    })
})

//validator input harga
watch([minPrice, maxPrice], ([min, max]) => {
    if (min > max) {
        error.value = "Maksimal tidak boleh lebih dari minimal"
    } else {
        error.value = null
    }
})


onMounted(() => {
    fetchProducts()
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
            <bliButton @click="fetchProducts()">Search</bliButton>
        </div>
        <div>
            <!-- filtering locally -->
            <h2>Tampilkan dengan Harga:</h2>
            <label for="minPrice">Harga Minimal ($)</label>
            <input id="minPrice" type="number" v-model.number="minPrice" min="0" placeholder="0">
            <span>-</span>
            <label for="maxPrice">Harga Maksimal ($)</label>
            <input id="maxPrice" type="number" v-model.number="maxPrice" :min="minPrice" placeholder="1000">
            <p v-if="error">{{ error }}</p>
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