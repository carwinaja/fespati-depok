<template>
  <section class="hero" aria-roledescription="carousel" aria-label="Sorotan FESPATI Depok">
    <div
      class="hero-frame"
      @mouseenter="paused = true"
      @mouseleave="paused = false"
      @focusin="paused = true"
      @focusout="paused = false"
      @touchstart.passive="onTouchStart"
      @touchend.passive="onTouchEnd"
    >
      <div class="hero-track" :style="{ transform: `translateX(-${index * 100}%)` }">
        <div
          v-for="(s, i) in list"
          :key="s.id"
          class="hero-slide"
          role="group"
          aria-roledescription="slide"
          :aria-label="`${i + 1} dari ${list.length}`"
          :aria-hidden="i !== index"
        >
          <component :is="s.linkUrl ? (isExternal(s.linkUrl) ? 'a' : NuxtLink) : 'div'" v-bind="linkAttrs(s.linkUrl)" :tabindex="i === index ? undefined : -1" class="hero-link">
            <img
              :src="s.imageUrl"
              :alt="s.alt"
              class="hero-img"
              width="1080"
              height="402"
              :fetchpriority="i === 0 ? 'high' : undefined"
              :loading="i === 0 ? 'eager' : 'lazy'"
              draggable="false"
            />
          </component>
        </div>
      </div>

      <template v-if="list.length > 1">
        <button type="button" class="hero-nav prev" aria-label="Slide sebelumnya" @click="go(index - 1)">‹</button>
        <button type="button" class="hero-nav next" aria-label="Slide berikutnya" @click="go(index + 1)">›</button>
        <div class="hero-dots">
          <button
            v-for="(s, i) in list"
            :key="s.id"
            type="button"
            class="dot"
            :class="{ on: i === index }"
            :aria-label="`Ke slide ${i + 1}`"
            :aria-current="i === index"
            @click="go(i)"
          ></button>
        </div>
      </template>
    </div>
  </section>
</template>

<script setup lang="ts">
import { NuxtLink } from '#components'

const FALLBACK = [{ id: 'default', imageUrl: '/hero-fespati.jpg', alt: 'FESPATI Kota Depok', linkUrl: null as string | null }]
const INTERVAL = 6000

// Jika gagal diambil, tetap tampilkan gambar bawaan (hero tidak boleh membuat halaman ISR gagal).
const { data } = await useFetch<typeof FALLBACK>('/api/hero')
const list = computed(() => (data.value?.length ? data.value : FALLBACK))

const index = ref(0)
const paused = ref(false)
let timer: ReturnType<typeof setInterval> | undefined

const isExternal = (u: string) => /^https?:\/\//.test(u)
const linkAttrs = (u: string | null) =>
  !u ? {} : isExternal(u) ? { href: u, target: '_blank', rel: 'noopener noreferrer' } : { to: u }

function go(i: number) {
  const n = list.value.length
  index.value = ((i % n) + n) % n
}

let startX = 0
const onTouchStart = (e: TouchEvent) => { startX = e.touches[0].clientX; paused.value = true }
function onTouchEnd(e: TouchEvent) {
  const dx = e.changedTouches[0].clientX - startX
  if (Math.abs(dx) > 40) go(index.value + (dx < 0 ? 1 : -1))
  paused.value = false
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  timer = setInterval(() => {
    if (!paused.value && !document.hidden && list.value.length > 1) go(index.value + 1)
  }, INTERVAL)
})
onBeforeUnmount(() => clearInterval(timer))
</script>

<style scoped>
.hero { display: flex; justify-content: center; width: 100%; }

.hero-frame {
  position: relative;
  width: 100%;
  max-width: 1080px;
  aspect-ratio: 1080 / 402;
  overflow: hidden;
}

.hero-track { display: flex; height: 100%; transition: transform 500ms cubic-bezier(0.4, 0, 0.2, 1); }
.hero-slide { flex: 0 0 100%; height: 100%; }
.hero-link { display: block; width: 100%; height: 100%; }
.hero-img { display: block; width: 100%; height: 100%; object-fit: cover; user-select: none; }

.hero-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border: 0;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.4);
  color: #fff;
  font-size: 1.6rem;
  line-height: 1;
  cursor: pointer;
  display: none;
  place-items: center;
  transition: background 200ms;
}
.hero-nav:hover, .hero-nav:focus-visible { background: rgba(0, 0, 0, 0.65); }
.hero-nav.prev { left: 0.75rem; }
.hero-nav.next { right: 0.75rem; }
@media (hover: hover) and (min-width: 768px) { .hero-nav { display: grid; } }

.hero-dots { position: absolute; bottom: 0.6rem; left: 0; right: 0; display: flex; justify-content: center; gap: 0.4rem; }
.dot {
  width: 9px; height: 9px; padding: 0; border: 0; border-radius: 50%;
  background: rgba(255, 255, 255, 0.6); box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.25);
  cursor: pointer; transition: width 200ms, background 200ms;
}
.dot.on { width: 22px; border-radius: 9999px; background: #fff; }

@media (prefers-reduced-motion: reduce) { .hero-track { transition: none; } }
</style>
