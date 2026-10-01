// Zona waktu dikunci agar hasil SSR dan browser identik (tanpa hydration mismatch).
const TZ = 'Asia/Jakarta'

export const formatDate = (iso: string | Date, opts: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' }) =>
  new Date(iso).toLocaleDateString('id-ID', { timeZone: TZ, ...opts })

export const formatTime = (iso: string | Date) =>
  new Date(iso).toLocaleTimeString('id-ID', { timeZone: TZ, hour: '2-digit', minute: '2-digit' }).replace(':', '.') + ' WIB'

export const youtubeId = (url?: string | null) => url?.match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([\w-]{6,})/)?.[1] ?? null
