<template>
  <div class="ed">
    <div v-if="editor" class="tb" role="toolbar" aria-label="Format teks">
      <button v-for="b in buttons" :key="b.label" type="button" class="tbtn" :class="{ on: b.active?.() }" :title="b.title" @click="b.run()">{{ b.label }}</button>
      <label class="tbtn" :class="{ off: uploading }" title="Sisipkan gambar">
        {{ uploading ? '…' : '🖼' }}
        <input type="file" accept="image/webp,image/jpeg,image/png" hidden :disabled="uploading" @change="onImage" />
      </label>
    </div>
    <p v-if="error" class="alert-error" role="alert" style="margin:.5rem">{{ error }}</p>
    <EditorContent :editor="editor" class="content prose" />
  </div>
</template>

<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'

const props = defineProps<{ modelValue: string }>()
const emit = defineEmits<{ 'update:modelValue': [string] }>()

const uploading = ref(false)
const error = ref('')

const editor = useEditor({
  content: props.modelValue,
  extensions: [
    StarterKit.configure({ heading: { levels: [2, 3] }, link: { openOnClick: false, autolink: true } }),
    Image,
  ],
  editorProps: { attributes: { 'aria-label': 'Isi artikel' } },
  onUpdate: ({ editor }) => emit('update:modelValue', editor.isEmpty ? '' : editor.getHTML()),
})
onBeforeUnmount(() => editor.value?.destroy())

const e = () => editor.value!
const buttons = [
  { label: 'B', title: 'Tebal', run: () => e().chain().focus().toggleBold().run(), active: () => e().isActive('bold') },
  { label: 'I', title: 'Miring', run: () => e().chain().focus().toggleItalic().run(), active: () => e().isActive('italic') },
  { label: 'H2', title: 'Judul', run: () => e().chain().focus().toggleHeading({ level: 2 }).run(), active: () => e().isActive('heading', { level: 2 }) },
  { label: 'H3', title: 'Sub-judul', run: () => e().chain().focus().toggleHeading({ level: 3 }).run(), active: () => e().isActive('heading', { level: 3 }) },
  { label: '• List', title: 'Daftar poin', run: () => e().chain().focus().toggleBulletList().run(), active: () => e().isActive('bulletList') },
  { label: '1. List', title: 'Daftar angka', run: () => e().chain().focus().toggleOrderedList().run(), active: () => e().isActive('orderedList') },
  { label: '❝', title: 'Kutipan', run: () => e().chain().focus().toggleBlockquote().run(), active: () => e().isActive('blockquote') },
  {
    label: '🔗', title: 'Tautan', active: () => e().isActive('link'),
    run: () => {
      const prev = e().getAttributes('link').href || ''
      const url = window.prompt('URL tautan (kosongkan untuk menghapus)', prev)
      if (url === null) return
      if (url === '') e().chain().focus().unsetLink().run()
      else e().chain().focus().extendMarkRange('link').setLink({ href: url }).run()
    },
  },
]

async function onImage(ev: Event) {
  const input = ev.target as HTMLInputElement
  const file = input.files?.[0]
  input.value = ''
  if (!file) return
  error.value = ''
  uploading.value = true
  try {
    const url = await uploadImage(file)
    e().chain().focus().setImage({ src: url, alt: file.name.replace(/\.[^.]+$/, '') }).run()
  } catch (err: any) {
    error.value = err?.data?.statusMessage || 'Gagal mengunggah gambar'
  } finally {
    uploading.value = false
  }
}
</script>

<style scoped>
.ed { border: 1px solid var(--color-border); border-radius: var(--radius-sm); background: var(--color-surface); overflow: hidden; }
.tb { display: flex; flex-wrap: wrap; gap: .25rem; padding: .4rem; border-bottom: 1px solid var(--color-border-soft); background: var(--color-surface-2); }
.tbtn { border: 1px solid transparent; background: transparent; border-radius: 6px; padding: .25rem .55rem; font: inherit; font-size: .8125rem; cursor: pointer; color: var(--color-ink-2); }
.tbtn:hover { background: var(--color-surface); }
.tbtn.on { background: var(--color-brand-soft); color: var(--color-brand); border-color: var(--color-brand-light); }
.tbtn.off { opacity: .5; pointer-events: none; }
.content :deep(.tiptap) { min-height: 260px; padding: .9rem 1rem; outline: none; }
.content :deep(.tiptap:focus-visible) { outline: 2px solid var(--color-brand-light); outline-offset: -2px; }
.content :deep(.tiptap img) { max-width: 100%; height: auto; border-radius: var(--radius-sm); }
</style>
