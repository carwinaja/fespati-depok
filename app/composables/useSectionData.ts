import type { H3Event } from 'h3'

/**
 * Ambil data publik untuk halaman yang di-cache ISR.
 * Jika pengambilan GAGAL, lempar error 503 (tanpa cache) alih-alih merender section kosong:
 * halaman kosong yang di-cache ISR akan tampil ke semua pengunjung sampai kedaluwarsa.
 * Pada ISR Vercel, revalidasi yang gagal membuat versi lama tetap disajikan.
 */
export async function useSectionData<T = any[]>(url: string) {
  // Harus diambil SEBELUM await: konteks Nuxt hilang setelahnya di fungsi async biasa.
  const event = import.meta.server ? useRequestEvent() : undefined
  const { data, error } = await useFetch<T>(url)
  if (error.value) throwTemporarilyUnavailable(error.value.statusCode, event)
  return data
}

/** 404 asli tetap 404; selain itu dianggap gangguan sementara (503) dan tidak boleh ter-cache. */
export function throwTemporarilyUnavailable(upstreamStatus?: number, event: H3Event | undefined = import.meta.server ? useRequestEvent() : undefined): never {
  if (upstreamStatus === 404) {
    throw createError({ statusCode: 404, statusMessage: 'Tidak ditemukan', fatal: true })
  }
  if (event) setResponseHeader(event, 'cache-control', 'no-store')
  throw createError({ statusCode: 503, statusMessage: 'Data sementara tidak tersedia, coba lagi sebentar lagi', fatal: true })
}
