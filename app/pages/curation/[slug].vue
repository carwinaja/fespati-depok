<template>
  <div>
    <TheNavbar />
    <main class="section">
      <div class="container cur">
        <h1 class="display">{{ curation!.title }}</h1>
        <p class="small count">{{ curation!.files.length }} dokumen</p>
        <p v-if="curation!.description" class="lead desc">{{ curation!.description }}</p>

        <p v-if="!curation!.files.length" class="small">Belum ada dokumen.</p>
        <div v-else class="docs">
          <a
            v-for="f in curation!.files"
            :key="f.id"
            :href="f.fileUrl"
            target="_blank"
            rel="noopener"
            class="doc card"
            :aria-label="`${f.title} (${fileLabel(f.mimeType)}, ${formatSize(f.size)}), buka di tab baru`"
          >
            <span class="doc-title">{{ f.title }}</span>
            <span class="doc-file">{{ f.fileName }}</span>
            <span class="doc-meta">{{ fileLabel(f.mimeType) }} · {{ formatSize(f.size) }}</span>
          </a>
        </div>
      </div>
    </main>
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
const slug = useRoute().params.slug as string
const { data: curation, error } = await useFetch(`/api/curations/${slug}`)
if (error.value) throwTemporarilyUnavailable(error.value.statusCode)
if (!curation.value) throw createError({ statusCode: 404, statusMessage: 'Curation tidak ditemukan', fatal: true })

useHead({
  title: `${curation.value.title} — FESPATI Depok`,
  meta: [{ name: 'description', content: curation.value.description || `Dokumen ${curation.value.title} FESPATI Depok` }],
})
</script>

<style scoped>
.cur { max-width: 1000px; padding-top: 5rem; }
.count { margin: .5rem 0 1.5rem; }
.desc { margin-bottom: 1.5rem; }
.docs { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
.doc {
  display: flex;
  flex-direction: column;
  gap: .4rem;
  padding: 1.1rem 1.25rem;
  text-decoration: none;
  color: inherit;
  transition: transform var(--transition), box-shadow var(--transition);
}
.doc:hover, .doc:focus-visible { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,.1); }
.doc-title { font-weight: 700; color: var(--color-brand); text-decoration: underline; line-height: 1.3; overflow-wrap: anywhere; }
.doc-file { font-size: .75rem; color: var(--color-ink-3); overflow-wrap: anywhere; }
.doc-meta { margin-top: auto; padding-top: .25rem; font-size: .6875rem; font-weight: 600; letter-spacing: .06em; color: var(--color-ink-3); }
@media (max-width: 900px) { .docs { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 560px) { .docs { grid-template-columns: 1fr; } }
</style>
