<!-- components/ClickOutsideDemo.vue -->
<script setup>
import { ref } from "vue";

const isOpen = ref(false);

function toggleDropdown() {
  isOpen.value = !isOpen.value;
}

function closeDropdown() {
  isOpen.value = false;
}
</script>

<template>
  <button @click="toggleDropdown">Toggle Dropdown</button>
  <div v-if="isOpen" v-click-outside="closeDropdown" class="dropdown">
    Dropdown Content
  </div>
</template>
