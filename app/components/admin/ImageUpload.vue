<template>
  <div class="upl">
    <img v-if="modelValue" :src="modelValue" alt="Pratinjau" class="upl-prev" />
    <div v-else class="upl-prev upl-empty">Belum ada gambar</div>
    <div class="upl-actions">
      <label class="btn btn-outline btn-sm" :class="{ disabled: busy }">
        {{ busy ? 'Mengunggah…' : modelValue ? 'Ganti' : 'Pilih gambar' }}
        <input type="file" accept="image/webp,image/jpeg,image/png" hidden :disabled="busy" @change="onPick" />
      </label>
      <button v-if="modelValue" type="button" class="btn btn-ghost" @click="emit('update:modelValue', null)">Hapus</button>
    </div>
    <p v-if="error" class="alert-error" role="alert">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{ modelValue: string | null | undefined }>()
const emit = defineEmits<{ 'update:modelValue': [string | null] }>()

const busy = ref(false)
const error = ref('')

async function onPick(e: Event) {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  input.value = ''
  if (!file) return
  error.value = ''
  busy.value = true
  try {
    const fd = new FormData()
    fd.append('file', file)
    const { url } = await $fetch<{ url: string }>('/api/admin/upload', { method: 'POST', body: fd })
    emit('update:modelValue', url)
  } catch (err: any) {
    error.value = err?.data?.statusMessage || 'Gagal mengunggah'
  } finally {
    busy.value = false
  }
}
</script>

<style scoped>
.upl { display: flex; flex-wrap: wrap; align-items: center; gap: .75rem; }
.upl-prev { width: 88px; height: 88px; border-radius: var(--radius-md); object-fit: contain; background: var(--color-surface-2); border: 1px solid var(--color-border-soft); }
.upl-empty { display: grid; place-items: center; font-size: .7rem; color: var(--color-ink-3); text-align: center; padding: .25rem; }
.upl-actions { display: flex; align-items: center; gap: .5rem; }
.disabled { opacity: .55; pointer-events: none; }
.alert-error { width: 100%; margin: 0; }
</style>
