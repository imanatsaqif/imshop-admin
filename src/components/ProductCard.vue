<!-- components/ProductCard.vue -->
<script setup>
const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["select"]);

function handleClick() {
  emit("select", props.product.id);
}
</script>

<template>
  <div class="product-card" @click="handleClick">
    <!-- Image -->
    <div class="image-wrapper">
      <img
        :src="product.thumbnail || product.image"
        :alt="product.title"
        loading="lazy"
      />
    </div>

    <!-- Content -->
    <div class="content">
      <h3 class="title">{{ product.title }}</h3>

      <p class="price">${{ product.price }}</p>

      <p class="category">{{ product.category }}</p>
    </div>

    <!-- Actions (non-clickable) -->
    <div class="actions" @click.stop>
      <slot name="actions" />
    </div>
  </div>
</template>

<style scoped>
.product-card {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--blu-color-neutral-border-default);
  border-radius: 12px;
  background: var(--blu-color-neutral-background-low);
  overflow: hidden;
  transition: 0.2s ease;
  cursor: pointer;
}

.product-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
}

/* === IMAGE === */
.image-wrapper {
  width: 100%;
  height: 180px;
  background: #fff; /* ⬅️ FIX: selalu putih */
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid var(--blu-color-neutral-border-default);
}

.image-wrapper img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain; /* ⬅️ penting utk transparent PNG */
}

/* === CONTENT === */
.content {
  padding: 0.9rem 1rem;
  flex: 1;
}

.title {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--blu-color-neutral-text-high);
  margin-bottom: 0.25rem;
}

.price {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--blu-color-primary-main);
  margin-bottom: 0.25rem;
}

.category {
  font-size: 0.75rem;
  color: var(--blu-color-neutral-text-med);
}

/* === ACTIONS === */
.actions {
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
  padding: 0.75rem 1rem;
  border-top: 1px solid var(--blu-color-neutral-border-default);
  background: var(--blu-color-neutral-background-low);
}

/* Responsive */
@media (max-width: 768px) {
  .image-wrapper {
    height: 150px;
  }
}
</style>
