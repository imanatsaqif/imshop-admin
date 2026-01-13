<!-- components/ProductCard.vue -->
<template>
  <div class="product-card">
    <!-- Header slot -->
    <div class="header">
      <slot name="header">
        <h3>{{ product.title }}</h3>
      </slot>
    </div>
    
    <!-- Content slot (default) -->
    <div class="content" @click="handleClick">
      <slot>
        <p>Price: {{ product.price }}</p>
        <p>{{ product.category }}</p>
      </slot>
    </div>
    
    <!-- Actions slot (non-clickable area) -->
    <div class="actions">
      <slot name="actions">
        <!-- Fallback: empty -->
      </slot>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['select'])

function handleClick() {
  emit('select', props.product.id)
}
</script>

<style scoped>
.product-card {
  border: 1px solid #ddd;
  padding: 16px;
  margin: 8px;
  border-radius: 8px;
}

.content {
  cursor: pointer;
  padding: 8px 0;
}

.actions {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #eee;
}
</style>