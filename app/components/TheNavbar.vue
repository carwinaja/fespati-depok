<template>
  <div class="nav-wrapper">
    <!-- Backdrop overlay on mobile when menu is open -->
    <Transition name="fade">
      <div v-if="mobileOpen" class="nav-overlay" @click="mobileOpen = false"></div>
    </Transition>

    <nav class="site-nav navbar" :class="{ 'scrolled': isScrolled, 'menu-open': mobileOpen }">
      <div class="container nav-inner">
        <!-- Logo -->
        <NuxtLink to="/" class="logo" aria-label="FESPATI Depok" @click="mobileOpen = false">
          <img src="/fespati.png" alt="Logo FESPATI Depok" class="logo-img" />
          <div class="logo-text">
            <span class="logo-name">FESPATI</span>
            <span class="logo-sub">Depok</span>
          </div>
        </NuxtLink>

        <!-- Nav Links (Desktop & Mobile Drawer) -->
        <div class="nav-links" :class="{ 'open': mobileOpen }">
          <a v-for="item in navItems" :key="item.href" :href="item.href" class="nav-link" @click="mobileOpen = false">
            {{ item.label }}
          </a>
        </div>

        <!-- Mobile Toggle Button -->
        <button
          class="mobile-toggle"
          :class="{ 'active': mobileOpen }"
          :aria-expanded="mobileOpen"
          aria-label="Toggle navigasi"
          @click="mobileOpen = !mobileOpen"
        >
          <span class="toggle-bar"></span>
          <span class="toggle-bar"></span>
          <span class="toggle-bar"></span>
        </button>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'

const mobileOpen = ref(false)
const isScrolled = ref(false)

const navItems = [
  { label: 'Galeri', href: '#galeri' },
  { label: 'Agenda', href: '#agenda' },
  { label: 'Klub & Anggota', href: '#klub' },
  { label: 'Tentang Kami', href: '#tentang' },
  { label: 'Berita', href: '#berita' },
]

function onScroll() {
  isScrolled.value = window.scrollY > 20
}

watch(mobileOpen, (val) => {
  if (typeof document !== 'undefined') {
    document.body.style.overflow = val ? 'hidden' : ''
  }
})

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  if (typeof document !== 'undefined') {
    document.body.style.overflow = ''
  }
})
</script>

<style scoped>
/* Backdrop Overlay */
.nav-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  z-index: 998;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 250ms ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Wrapper tidak boleh membatasi area sticky */
.nav-wrapper {
  display: contents;
}

/* Sticky Navbar Header */
.site-nav {
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 64px;
  background: rgba(250, 248, 245, 0.92);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--color-border-soft);
  transition: background-color 200ms, border-color 200ms, box-shadow 200ms;
  z-index: 1000;
}

.site-nav.scrolled {
  background: rgba(255, 255, 255, 0.96);
  border-bottom-color: var(--color-border);
  box-shadow: 0 4px 20px rgba(0,0,0,0.06);
}

.nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  gap: 1.5rem;
}

/* Logo */
.logo {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  text-decoration: none;
  flex-shrink: 0;
  z-index: 1001;
}

.logo-img {
  height: 38px;
  width: auto;
  object-fit: contain;
}

.logo-text {
  display: flex;
  flex-direction: column;
  line-height: 1;
}

.logo-name {
  font-size: 1rem;
  font-weight: 800;
  color: var(--color-brand);
  letter-spacing: 0.04em;
}

.logo-sub {
  font-size: 0.6875rem;
  color: var(--color-ink-3);
  font-weight: 500;
  letter-spacing: 0.02em;
}

/* Nav Links - Desktop */
.nav-links {
  display: flex;
  align-items: center;
  gap: 1.75rem;
  flex: 1;
}

.nav-link {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-ink-2);
  text-decoration: none;
  transition: color var(--transition);
  white-space: nowrap;
}

.nav-link:hover {
  color: var(--color-brand);
}

/* Mobile Toggle Button */
.mobile-toggle {
  display: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 0;
  gap: 5px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  cursor: pointer;
  z-index: 1001;
  transition: background-color 200ms, border-color 200ms;
}

.mobile-toggle:hover,
.mobile-toggle:focus {
  border-color: var(--color-brand);
  background: var(--color-brand-soft);
}

.toggle-bar {
  width: 20px;
  height: 2px;
  background-color: var(--color-ink);
  border-radius: 2px;
  display: block;
  transition: transform 250ms ease, opacity 200ms ease;
  transform-origin: center;
}

.mobile-toggle.active .toggle-bar:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.mobile-toggle.active .toggle-bar:nth-child(2) {
  opacity: 0;
}

.mobile-toggle.active .toggle-bar:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

/* Mobile Responsive Adjustments */
@media (max-width: 768px) {
  .mobile-toggle {
    display: flex;
  }

  .nav-links {
    position: fixed;
    top: 64px;
    left: 0;
    right: 0;
    width: 100%;
    max-height: calc(100vh - 64px);
    background: #FFFFFF;
    flex-direction: column;
    align-items: stretch;
    gap: 0;
    padding: 1.25rem 1.5rem 2rem 1.5rem;
    border-bottom: 1px solid var(--color-border);
    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.12);
    overflow-y: auto;
    z-index: 999;
    
    /* Animation & visibility state */
    opacity: 0;
    visibility: hidden;
    transform: translateY(-12px);
    pointer-events: none;
    transition: opacity 250ms ease, transform 250ms ease, visibility 250ms ease;
  }

  .nav-links.open {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
    pointer-events: auto;
  }

  .nav-link {
    font-size: 1.05rem;
    font-weight: 600;
    padding: 1rem 0;
    width: 100%;
    border-bottom: 1px solid var(--color-border-soft);
    color: var(--color-ink);
  }

  .nav-link:last-of-type {
    border-bottom: none;
  }
}
</style>
