<template>
  <footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <!-- Brand -->
        <div class="footer-brand">
          <div class="footer-logo">
            <img src="/fespati.png" alt="Logo FESPATI Depok" class="footer-logo-img" />
            <span>FESPATI Depok</span>
          </div>
          <p class="footer-desc">
            Federasi Panahan Tradisional Indonesia Kota Depok. Melestarikan dan memajukan olahraga panahan tradisional bersama komunitas.
          </p>
          <div class="footer-socials">
            <a href="https://www.instagram.com/fespati_depok/" target="_blank" rel="noopener" aria-label="Instagram FESPATI Depok" class="social-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
            <a href="https://www.youtube.com/@fespatidepok7943" target="_blank" rel="noopener" aria-label="YouTube FESPATI Depok" class="social-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.95C18.88 4 12 4 12 4s-6.88 0-8.59.47a2.78 2.78 0 0 0-1.95 1.95A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.5C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75,15.02 15.5,12 9.75,8.98 9.75,15.02"/>
              </svg>
            </a>
            <a href="https://wa.me/62818137716" target="_blank" rel="noopener" aria-label="WhatsApp FESPATI Depok" class="social-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- Links -->
        <div class="footer-col">
          <h4 class="footer-heading">Tentang</h4>
          <ul>
            <li><a href="#tentang">Profil FESPATI Depok</a></li>
            <li><a href="#tentang">Struktur Pengurus</a></li>
            <li><a href="#tentang">Alamat Sekretariat</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4 class="footer-heading">Komunitas</h4>
          <ul>
            <li><a href="#klub">Daftar Klub</a></li>
            <li><a href="#daftar">Cara Daftar Anggota</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4 class="footer-heading">Kegiatan</h4>
          <ul>
            <li><a href="#agenda">Agenda & Lomba</a></li>
            <li><a href="#galeri">Galeri Foto</a></li>
            <li><a href="#berita">Berita & Edukasi</a></li>
          </ul>
        </div>
      </div>

      <hr class="divider footer-divider" />
      <div class="footer-bottom">
        <p class="small">© 2026 FESPATI Depok. Seluruh hak dilindungi.</p>
        <p class="small">Federasi Panahan Tradisional Indonesia — Kota Depok</p>
      </div>
      <p class="small powered-by">
        Powered by
        <a href="https://otomatisin.web.id" target="_blank" rel="noopener noreferrer">Otomatisin</a>
      </p>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  background: var(--color-ink);
  color: var(--color-ink-3);
  padding-block: 3.5rem 2rem;
}

.footer-grid {
  display: grid;
  grid-template-columns: 1.8fr 1fr 1fr 1fr;
  gap: 3rem;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-white);
  font-weight: 700;
  font-size: 0.9375rem;
  letter-spacing: 0.02em;
  margin-bottom: 0.9rem;
}

.footer-logo-img {
  height: 32px;
  width: auto;
  object-fit: contain;
}

.footer-desc {
  font-size: 0.8125rem;
  line-height: 1.65;
  color: var(--color-ink-3);
  max-width: 26ch;
}

.footer-socials {
  display: flex;
  gap: 0.75rem;
  margin-top: 1.25rem;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: var(--radius-sm);
  background: rgba(255,255,255,0.07);
  color: var(--color-ink-3);
  transition: background var(--transition), color var(--transition);
}

.social-link:hover {
  background: var(--color-brand);
  color: white;
}

.footer-heading {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.5);
  margin-bottom: 1rem;
}

.footer-col ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.footer-col ul a {
  font-size: 0.8125rem;
  color: var(--color-ink-3);
  text-decoration: none;
  transition: color var(--transition);
}

.footer-col ul a:hover {
  color: var(--color-white);
}

.footer-divider {
  background: rgba(255,255,255,0.08);
  margin-block: 2.5rem 1.25rem;
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.footer-bottom .small {
  color: rgba(255,255,255,0.25);
  font-size: 0.75rem;
}

.powered-by {
  text-align: center;
  margin-top: 1rem;
  color: rgba(255,255,255,0.25);
  font-size: 0.75rem;
}

.powered-by a {
  color: rgba(255,255,255,0.5);
  text-decoration: none;
  font-weight: 600;
}

.powered-by a:hover {
  color: #fff;
  text-decoration: underline;
}

@media (max-width: 900px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
  .footer-brand {
    grid-column: 1 / -1;
  }
}

@media (max-width: 500px) {
  .footer-grid { grid-template-columns: 1fr; }
  .footer-bottom { flex-direction: column; text-align: center; }
}
</style>
