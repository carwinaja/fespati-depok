<template>
  <Teleport to="body">
    <Transition name="evm">
      <div v-if="event" class="evm-backdrop" @click.self="emit('close')">
        <div
          ref="dialog"
          class="evm"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="titleId"
          tabindex="-1"
          @keydown="onKey"
        >
          <button type="button" class="evm-close" aria-label="Tutup" @click="emit('close')">✕</button>

          <img v-if="event.image" :src="event.image" :alt="`Poster ${event.nama}`" class="evm-img" />

          <div class="evm-body">
            <span class="badge" :class="event.statusClass">{{ event.status }}</span>
            <h3 :id="titleId" class="evm-title">{{ event.nama }}</h3>

            <ul class="evm-meta">
              <li>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                {{ event.kategori }}
              </li>
              <li>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                {{ event.lokasi }}
              </li>
            </ul>

            <p v-if="event.desc" class="evm-desc">{{ event.desc }}</p>
            <p v-else class="evm-desc evm-empty">Belum ada deskripsi untuk kegiatan ini.</p>

            <div v-if="event.reg || event.pdf" class="evm-links">
              <a v-if="event.reg" :href="event.reg" target="_blank" rel="noopener" class="btn btn-primary">Daftar →</a>
              <a v-if="event.pdf" :href="event.pdf" target="_blank" rel="noopener" class="btn btn-outline">Unduh PDF</a>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const props = defineProps<{ event: Record<string, any> | null }>()
const emit = defineEmits<{ close: [] }>()

const titleId = `evm-title-${useId()}`
const dialog = ref<HTMLElement | null>(null)
let opener: HTMLElement | null = null

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') { e.stopPropagation(); emit('close'); return }
  if (e.key !== 'Tab' || !dialog.value) return
  const items = Array.from(dialog.value.querySelectorAll<HTMLElement>(FOCUSABLE))
  if (!items.length) return
  const first = items[0]
  const last = items[items.length - 1]
  if (e.shiftKey && (document.activeElement === first || document.activeElement === dialog.value)) { e.preventDefault(); last.focus() }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
}

// Kunci scroll halaman saat modal terbuka, kembalikan fokus ke kartu saat ditutup.
watch(() => props.event, async (ev) => {
  if (ev) {
    opener = document.activeElement as HTMLElement | null
    document.body.style.overflow = 'hidden'
    await nextTick()
    dialog.value?.focus()
  } else {
    document.body.style.overflow = ''
    opener?.focus()
    opener = null
  }
})
onBeforeUnmount(() => { document.body.style.overflow = '' })
</script>

<style scoped>
.evm-backdrop {
  position: fixed;
  inset: 0;
  z-index: 1100;
  display: grid;
  place-items: center;
  padding: 1rem;
  background: rgba(15, 25, 20, 0.6);
  backdrop-filter: blur(2px);
}

.evm {
  position: relative;
  width: 100%;
  max-width: 560px;
  max-height: calc(100dvh - 2rem);
  overflow-y: auto;
  overscroll-behavior: contain;
  background: var(--color-card);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
  outline: none;
}

.evm-close {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  z-index: 1;
  width: 36px;
  height: 36px;
  border: 0;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.55);
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
}
.evm-close:hover { background: rgba(0, 0, 0, 0.75); }

.evm-img { display: block; width: 100%; max-height: 55vh; object-fit: contain; background: var(--color-surface-2); }

.evm-body { padding: 1.5rem; display: grid; gap: 0.75rem; }
.evm-body .badge { justify-self: start; }
.evm-title { font-family: var(--font-display); font-size: 1.35rem; line-height: 1.3; color: var(--color-ink); margin: 0; }
.evm-meta { list-style: none; margin: 0; padding: 0; display: grid; gap: 0.4rem; font-size: 0.875rem; color: var(--color-ink-2); }
.evm-meta li { display: flex; gap: 0.5rem; align-items: flex-start; }
.evm-meta svg { color: var(--color-brand); flex-shrink: 0; margin-top: 0.2rem; }
.evm-desc { margin: 0; font-size: 0.9rem; line-height: 1.7; color: var(--color-ink-2); white-space: pre-line; overflow-wrap: anywhere; }
.evm-empty { color: var(--color-ink-3); font-style: italic; }
.evm-links { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.25rem; }

.badge-closed { background: #f0ede9; color: var(--color-ink-3); }

.evm-enter-active, .evm-leave-active { transition: opacity 200ms; }
.evm-enter-active .evm, .evm-leave-active .evm { transition: transform 200ms; }
.evm-enter-from, .evm-leave-to { opacity: 0; }
.evm-enter-from .evm, .evm-leave-to .evm { transform: translateY(16px) scale(0.98); }

@media (max-width: 600px) {
  .evm-backdrop { align-items: end; padding: 0; }
  .evm { max-width: none; max-height: 92dvh; border-radius: var(--radius-xl) var(--radius-xl) 0 0; }
  .evm-enter-from .evm, .evm-leave-to .evm { transform: translateY(100%); }
}
@media (prefers-reduced-motion: reduce) {
  .evm-enter-active, .evm-leave-active, .evm-enter-active .evm, .evm-leave-active .evm { transition: none; }
}
</style>
