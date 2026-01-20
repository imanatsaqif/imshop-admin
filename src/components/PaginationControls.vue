<!-- components/PaginationControls.vue -->
<script setup>
import { watch } from "vue";

const props = defineProps({
  page: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
  perPage: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(["change-page", "change-per-page"]);

// --- Guards ---
function goToPage(p) {
  if (p === props.page) return;
  if (p < 1 || p > props.totalPages) return;
  emit("change-page", p);
}

function goPrev() {
  goToPage(props.page - 1);
}

function goNext() {
  goToPage(props.page + 1);
}

function updatePerPage(event) {
  const newVal = Number(event.target.value);
  if (newVal === props.perPage) return;
  emit("change-per-page", newVal);
}

// --- Sinkronisasi kalau parent koreksi page ---
watch(
  () => props.page,
  (newPage) => {
    // optional hook kalau nanti mau animasi / side effect
  },
);
</script>

<template>
  <div class="pagination">
    <!-- Prev / Next -->
    <div class="nav-buttons">
      <button :disabled="page <= 1" @click="goPrev">Prev</button>

      <span>Page {{ page }} of {{ totalPages }}</span>

      <button :disabled="page >= totalPages" @click="goNext">Next</button>
    </div>

    <!-- BLI Carousel Indicator -->
    <div v-if="totalPages > 1" class="indicator-wrapper">
      <BliCarouselIndicator
        :current="page"
        :total="totalPages"
        size="extra-small"
        :pause="true"
        @update:current="goToPage"
      />
    </div>

    <!-- Per Page -->
    <div class="per-page">
      <label>Per Page:</label>
      <input type="number" :value="perPage" min="1" @change="updatePerPage" />
    </div>
  </div>
</template>

<style scoped>
.pagination {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1.5rem;
  align-items: center;
}

.nav-buttons {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.nav-buttons button {
  padding: 0.4rem 0.9rem;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 500;
  background: var(--blu-color-primary-main);
  color: #fff;
}

.nav-buttons button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.indicator-wrapper {
  display: flex;
  justify-content: center;
}

.per-page {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.per-page input {
  width: 70px;
  padding: 0.4rem 0.6rem;
  border-radius: 6px;
  border: 1px solid var(--blu-color-neutral-border-default);
}
</style>
