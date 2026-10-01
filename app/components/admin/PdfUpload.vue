<template>
  <div class="pdf">
    <a v-if="modelValue" :href="modelValue" target="_blank" rel="noopener" class="btn btn-ghost">Lihat PDF</a>
    <span v-else class="small">Belum ada file</span>
    <label class="btn btn-outline btn-sm" :class="{ disabled: busy }">
      {{ busy ? 'Mengunggah…' : modelValue ? 'Ganti PDF' : 'Unggah PDF' }}
      <input type="file" accept="application/pdf" hidden :disabled="busy" @change="onPick" />
    </label>
    <button v-if="modelValue" type="button" class="btn btn-ghost" @click="emit('update:modelValue', null)">Hapus</button>
    <p v-if="error" class="alert-error" role="alert" style="width:100%;margin:0">{{ error }}</p>
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
  error.value = ''; busy.value = true
  try {
    const fd = new FormData()
    fd.append('file', file)
    const { url } = await $fetch<{ url: string }>('/api/admin/upload', { method: 'POST', body: fd })
    emit('update:modelValue', url)
  } catch (err: any) { error.value = err?.data?.statusMessage || 'Gagal mengunggah' } finally { busy.value = false }
}
</script>

<style scoped>
.pdf { display: flex; flex-wrap: wrap; align-items: center; gap: .6rem; }
.disabled { opacity: .55; pointer-events: none; }
</style>
