<!-- views/Products.vue -->
<script setup>
import { onMounted, nextTick, ref, inject } from "vue";
import { useProducts } from "@/composables/useProducts";
import { usePriceFilter } from "@/composables/usePriceFilter";

import ProductCard from "@/components/ProductCard.vue";
import PaginationControls from "@/components/PaginationControls.vue";

const { products, totalPages, page, perPage, loading, error, loadProducts } =
  useProducts();

const { minPrice, maxPrice, priceError, filteredPrice } =
  usePriceFilter(products);

async function handleChangePage(newPage) {
  if (newPage === page.value) return;
  page.value = newPage;
  await loadProducts();
  scrollToTop();
}

async function handleChangePerPage(newLimit) {
  if (newLimit === perPage.value) return;
  perPage.value = newLimit;
  page.value = 1;
  await loadProducts();
  scrollToTop();
}

function handleSelectProduct(id) {
  console.log("Selected product", id);
}

function editProduct(id) {
  console.log("Edit product", id);
}

function deleteProduct(id) {
  console.log("Delete product", id);
}

const minPriceInputRef = ref(null);
const productListRef = ref(null);

async function focusMinPriceInput() {
  await nextTick();
  minPriceInputRef.value?.focus();
}

async function scrollToTop() {
  await nextTick();
  productListRef.value?.scrollTo({ top: 0, behavior: "smooth" });
}

onMounted(async () => {
  await loadProducts();
  focusMinPriceInput();
});

const theme = inject("theme");
</script>

<template>
  <div class="page-container">
    <h1>Products</h1>

    <!-- Filters -->
    <div class="filter-section">
      <div class="filter-field">
        <label for="minPrice">Min ($)</label>
        <input
          id="minPrice"
          ref="minPriceInputRef"
          type="number"
          v-model.number="minPrice"
          min="0"
          placeholder="0"
        />
      </div>

      <span class="dash">-</span>

      <div class="filter-field">
        <label for="maxPrice">Max ($)</label>
        <input
          id="maxPrice"
          type="number"
          v-model.number="maxPrice"
          :min="minPrice"
          placeholder="1000"
        />
      </div>
    </div>

    <!-- States -->
    <div v-if="loading" class="state loading-state">
      <BliLoaderGeneral size="xl" />
    </div>

    <div v-else-if="error" class="state error-state">
      {{ error }}
    </div>

    <div v-else-if="priceError" class="state error-state">
      {{ priceError }}
    </div>

    <!-- Products -->
    <div v-else-if="filteredPrice.length > 0">
      <div ref="productListRef" class="products-grid">
        <ProductCard
          v-for="product in filteredPrice"
          :key="product.id"
          :product="product"
          @select="handleSelectProduct"
        >
          <template #actions>
            <button class="btn btn-soft" @click.stop="editProduct(product.id)">
              Edit
            </button>
            <button
              class="btn btn-danger"
              @click.stop="deleteProduct(product.id)"
            >
              Delete
            </button>
          </template>
        </ProductCard>
      </div>

      <!-- Pagination -->
      <PaginationControls
        :page="page"
        :total-pages="totalPages"
        :per-page="perPage"
        @change-page="handleChangePage"
        @change-per-page="handleChangePerPage"
      />
    </div>

    <!-- Empty -->
    <div v-else class="state empty-state">No products found.</div>
  </div>
</template>

<style scoped>
h1 {
  margin-bottom: 1.5rem;
  font-size: 1.75rem;
  font-weight: 600;
  color: var(--blu-color-neutral-text-high);
}

.page-container {
  padding: 1.5rem;
}

/* Filters */
.filter-section {
  display: flex;
  align-items: flex-end;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.filter-field {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.filter-field label {
  font-size: 0.75rem;
  color: var(--blu-color-neutral-text-med);
}

.filter-field input {
  width: 120px;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  border: 1px solid var(--blu-color-neutral-border-default);
  background: var(--blu-color-neutral-background-low);
  color: var(--blu-color-neutral-text-high);
}

.filter-field input:focus {
  outline: none;
  border-color: var(--blu-color-primary-main);
}

.dash {
  color: var(--blu-color-neutral-text-med);
}

/* Grid */
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

/* States */
.state {
  padding: 2rem;
  text-align: center;
  border-radius: 12px;
  margin: 1.5rem 0;
}

.loading-state {
  background: color-mix(in srgb, var(--blu-color-primary-main) 5%, transparent);
  color: var(--blu-color-primary-main);
}

.error-state {
  background: color-mix(in srgb, #ef4444 10%, transparent);
  color: #ef4444;
}

.empty-state {
  background: var(--blu-color-neutral-background-low);
  color: var(--blu-color-neutral-text-med);
}

/* Buttons (reuse Users.vue style) */
.btn {
  padding: 0.4rem 0.9rem;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 500;
  transition: 0.2s ease;
}

.btn-soft {
  background: color-mix(
    in srgb,
    var(--blu-color-primary-main) 10%,
    transparent
  );
  color: var(--blu-color-primary-main);
}

.btn-soft:hover {
  background: color-mix(
    in srgb,
    var(--blu-color-primary-main) 20%,
    transparent
  );
}

.btn-danger {
  background: color-mix(in srgb, #ef4444 10%, transparent);
  color: #ef4444;
}

.btn-danger:hover {
  background: color-mix(in srgb, #ef4444 20%, transparent);
}

/* Responsive */
@media (max-width: 768px) {
  .filter-section {
    flex-direction: column;
    align-items: flex-start;
  }

  .filter-field input {
    width: 100%;
  }
}
</style>
