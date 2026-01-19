<!-- views/Products.vue -->
<script setup>
import { onMounted, nextTick, ref } from 'vue';
import { useProducts } from '@/composables/useProducts';
import { usePriceFilter } from '@/composables/usePriceFilter';

import ProductCard from '@/components/ProductCard.vue';
import PaginationControls from '@/components/PaginationControls.vue';

const {
  products,
  totalPages,
  page,
  perPage,
  loading,
  error,
  loadProducts,
} = useProducts()

const {
  minPrice,
  maxPrice,
  priceError,
  filteredPrice
} = usePriceFilter(products)

async function handleChangePage(newPage) {
  page.value = newPage
  await loadProducts()
  scrollToTop()
}

async function handleChangePerPage(newLimit) {
  perPage.value = newLimit
  page.value = 1
  await loadProducts()
  scrollToTop()
}

function handleSelectProduct(id) {
  console.log('Selected product', id)
}

function editProduct(id) {
  console.log('Edit product', id)
}

function deleteProduct(id) {
  console.log('Delete product', id)
}

const minPriceInputRef = ref(null)
const productListRef = ref(null)

async function focusMinPriceInput() {
  await nextTick()
  if (minPriceInputRef.value) {
    minPriceInputRef.value.focus()
    console.log('Auto focued minPrice input')
  }
}

async function scrollToTop() {
  await nextTick()
  if (productListRef.value) {
    productListRef.value.scrollTo({ top: 0, behavior: 'smooth' })
    console.log('Scrolled to top')
  }
}

onMounted(() => {
  loadProducts().then(() => {
    focusMinPriceInput()
  })
})
</script>

<template>
  <h1>Products</h1>
  <!-- Ganti value parameter reaktif -->
  <div>
    <label for="minPrice">Min ($)</label>
    <input
      id="minPrice"
      ref="minPriceInputRef"
      type="number"
      v-model.number="minPrice"
      min="0"
      placeholder="0"
    >
    <span>-</span>
    <label for="maxPrice">Max ($)</label>
    <input
      id="maxPrice"
      type="number"
      v-model.number="maxPrice"
      :min="minPrice"
      placeholder="1000"
    >
  </div>
  <hr>
  <div ref="productListRef" style="max-height: 500px; overflow-y: auto;">
    <div v-if="loading"> Loading...</div>
    <div v-else-if="error" class="error"> {{ error }}</div>
    <div v-else-if="priceError" class="error"> {{ priceError }}</div>
    <div v-else>
      <ProductCard
        v-for="product in filteredPrice"
        :key="product.id"
        :product="product"
        @select="handleSelectProduct"
      >
        <!-- Named slot: header -->
        <template #header>
          <h3 style="color: #2c3e50;">{{ product.title }}</h3>
        </template>
        
        <!-- Default slot: content (clickable) -->
        <div>
          <p><strong>Price:</strong> ${{ product.price }}</p>
          <p><strong>Category:</strong> {{ product.category }}</p>
          <p><em>Click anywhere here to select product</em></p>
        </div>
        
        <!-- Named slot: actions (non-clickable) -->
        <template #actions>
          <button @click="editProduct(product.id)" style="margin-right: 8px;">
            Edit
          </button>
          <button @click="deleteProduct(product.id)" style="background: #ff6b6b; color: white;">
            Delete
          </button> 
        </template>
      </ProductCard>

      <PaginationControls
        :page="page"
        :total-pages="totalPages"
        :per-page="perPage"
        @change-page="handleChangePage"
        @change-per-page="handleChangePerPage" />
    </div>
  </div>
</template>