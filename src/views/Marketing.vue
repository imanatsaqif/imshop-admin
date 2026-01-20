<script setup>
import { onMounted, inject } from "vue";
import { useInstagramFeed } from "@/composables/useInstagramFeed";

const { posts, loading, error, loadInstagramFeed } = useInstagramFeed();
const theme = inject("theme");

// Auto-fetch saat halaman dimuat
onMounted(() => {
  loadInstagramFeed();
});

// Utility untuk format tanggal
function formatDate(timestamp) {
  return new Date(timestamp).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
</script>

<template>
  <div class="marketing-page">
    <!-- Page Header -->
    <div class="page-header">
      <h1>Marketing & Instagram Feed</h1>
      <p class="page-subtitle">
        Monitor dan tampilkan postingan terbaru dari Instagram tim marketing.
      </p>
    </div>

    <!-- Controls & Stats -->
    <div class="controls-stats-row">
      <button
        @click="loadInstagramFeed"
        :disabled="loading"
        class="btn btn-primary"
      >
        {{ loading ? "Memuat..." : "Muat Ulang Feed" }}
      </button>
      <div class="stat-summary" v-if="!loading && !error">
        <span class="stat-label">Total Posting</span>
        <span class="stat-value">{{ posts.length }}</span>
      </div>
    </div>

    <!-- State: Loading -->
    <div v-if="loading" class="state loading-state">
      <BliLoaderGeneral size="xl" />
      <p>Memuat feed Instagram...</p>
    </div>

    <!-- State: Error -->
    <div v-else-if="error" class="state error-state">
      <p>{{ error }}</p>
      <button @click="loadInstagramFeed" class="btn btn-outline">
        Coba Lagi
      </button>
    </div>

    <!-- State: Empty -->
    <div v-else-if="!posts.length" class="state empty-state">
      <p>Tidak ada postingan untuk ditampilkan.</p>
    </div>

    <!-- State: Success - Feed Grid -->
    <div v-else class="feed-grid">
      <div v-for="post in posts" :key="post.id" class="post-card">
        <!-- Media Container -->
        <div class="media-container">
          <img
            v-if="
              post.media_type === 'IMAGE' ||
              post.media_type === 'CAROUSEL_ALBUM'
            "
            :src="post.media_url"
            :alt="post.caption || 'Instagram post'"
            loading="lazy"
          />
          <video v-else-if="post.media_type === 'VIDEO'" controls>
            <source :src="post.media_url" type="video/mp4" />
            Browser Anda tidak mendukung tag video.
          </video>
        </div>

        <!-- Content & Metadata -->
        <div class="post-content">
          <p class="post-caption">{{ post.caption || "Tanpa caption" }}</p>
          <div class="post-meta">
            <a :href="post.permalink" target="_blank" class="post-link">
              Buka di Instagram
            </a>
            <span class="post-date">{{ formatDate(post.timestamp) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Konsisten dengan layout halaman lain */
.marketing-page {
  padding: 1.5rem;
}

/* Header */
.page-header {
  margin-bottom: 1.5rem;
}

.page-header h1 {
  margin-bottom: 0.5rem;
  font-size: 1.75rem;
  font-weight: 600;
  color: var(--blu-color-neutral-text-high);
}

.page-subtitle {
  color: var(--blu-color-neutral-text-med);
  margin-bottom: 1rem;
}

/* Theme Badge (Copy dari Products/Users) */
.theme-badge {
  display: inline-block;
  padding: 0.4rem 0.9rem;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 500;
  border: 1px solid var(--blu-color-neutral-border-default);
}

.theme-badge.light {
  background: color-mix(
    in srgb,
    var(--blu-color-primary-main) 10%,
    transparent
  );
  color: var(--blu-color-primary-main);
}

.theme-badge.dark {
  background: color-mix(
    in srgb,
    var(--blu-color-primary-main) 20%,
    transparent
  );
  color: var(--blu-color-blue-40);
}

/* Baris Kontrol & Statistik */
.controls-stats-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--blu-color-neutral-border-default);
}

.stat-summary {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.stat-label {
  font-size: 0.75rem;
  color: var(--blu-color-neutral-text-med);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--blu-color-neutral-text-high);
}

/* States (Copy dan adaptasi dari Products/Users) */
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

/* Grid & Cards (Inspirasi dari Products.vue dan Home.vue) */
.feed-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.post-card {
  background-color: var(--blu-color-neutral-background-low);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--blu-color-neutral-border-default);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  display: flex;
  flex-direction: column;
}

.post-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
}

/* Media Area */
.media-container {
  width: 100%;
  height: 240px;
  overflow: hidden;
  background-color: var(--blu-color-neutral-background-default);
}

.media-container img,
.media-container video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Content Area */
.post-content {
  padding: 1.25rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.post-caption {
  color: var(--blu-color-neutral-text-high);
  font-size: 0.9rem;
  line-height: 1.4;
  margin-bottom: 1rem;
  flex-grow: 1;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.post-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
  padding-top: 0.75rem;
  border-top: 1px solid var(--blu-color-neutral-border-default);
}

.post-link {
  color: var(--blu-color-primary-main);
  text-decoration: none;
  font-weight: 500;
}

.post-link:hover {
  text-decoration: underline;
}

.post-date {
  color: var(--blu-color-neutral-text-med);
}

/* Button Styles (Copy dari Users.vue untuk konsistensi) */
.btn {
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 500;
  transition: 0.2s ease;
}

.btn-primary {
  background: var(--blu-color-primary-main);
  color: #fff;
}

.btn-primary:hover {
  background: var(--blu-color-primary-hover);
}

.btn-primary:disabled {
  background: var(--blu-color-neutral-border-default);
  cursor: not-allowed;
}

.btn-outline {
  background: transparent;
  border: 1px solid var(--blu-color-neutral-border-default);
  color: var(--blu-color-neutral-text-med);
}

.btn-outline:hover {
  background: color-mix(
    in srgb,
    var(--blu-color-primary-main) 10%,
    transparent
  );
}
</style>
