// src/composables/useInstagramFeed.js
import { ref, computed, watch } from "vue";
import { fetchInstagramMedia } from "@/services/instagramService";

export function useInstagramFeed() {
  const posts = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const startTime = ref(null);

  watch(loading, (isLoading, wasLoading) => {
    if (isLoading && !wasLoading) {
      startTime.value = Date.now();
    } else if (!isLoading && wasLoading && startTime.value !== null) {
      const duration = Date.now() - startTime.value;
      console.log(`Instagram feed loaded in ${duration}ms`);
      startTime.value = null;
    }
  });

  async function loadInstagramFeed() {
    try {
      loading.value = true;
      error.value = null;

      // 1. Ambil credentials dari .env.local
      const token = import.meta.env.VITE_INSTAGRAM_TOKEN;
      const userId = import.meta.env.VITE_INSTAGRAM_USER_ID;

      // 2. Validasi
      if (!token || !userId) {
        throw new Error(
          "Instagram token atau User ID tidak ditemukan. Periksa file .env Anda.",
        );
      }

      // 3. Panggil Service
      const result = await fetchInstagramMedia(userId, token);
      posts.value = result.data;
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  }

  // Return API untuk komponen
  return {
    posts,
    loading,
    error,
    loadInstagramFeed,
  };
}
