/** Normalisasi nomor WhatsApp ke format internasional tanpa '+', mis. 0812… → 62812… */
export function normalizePhone(v: string) {
  const d = v.replace(/\D/g, '')
  if (d.startsWith('0')) return '62' + d.slice(1)
  if (d.startsWith('8')) return '62' + d
  return d
}
