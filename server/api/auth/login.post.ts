import bcrypt from 'bcryptjs'
import { z } from 'zod'

const body = z.object({ email: z.string().email(), password: z.string().min(1) })

// Rate limit sederhana per IP (in-memory): 8 percobaan gagal / 10 menit
const attempts = new Map<string, { count: number; reset: number }>()
const MAX = 8
const WINDOW = 10 * 60 * 1000

// Hash dummy supaya waktu respons sama baik email ada maupun tidak
const DUMMY = bcrypt.hashSync('dummy-password', 12)

export default defineEventHandler(async (event) => {
  const ip = getRequestIP(event, { xForwardedFor: true }) || 'unknown'
  const now = Date.now()
  const rec = attempts.get(ip)
  if (rec && rec.reset > now && rec.count >= MAX) {
    throw createError({ statusCode: 429, statusMessage: 'Terlalu banyak percobaan, coba lagi nanti' })
  }

  const parsed = body.safeParse(await readBody(event))
  if (!parsed.success) {
    throw createError({ statusCode: 400, statusMessage: 'Email atau password tidak valid' })
  }
  const { email, password } = parsed.data

  const admin = await prisma.admin.findUnique({ where: { email: email.toLowerCase() } })
  const ok = await bcrypt.compare(password, admin?.password ?? DUMMY)
  if (!admin || !ok || !admin.isActive) {
    const cur = rec && rec.reset > now ? rec : { count: 0, reset: now + WINDOW }
    cur.count++
    attempts.set(ip, cur)
    throw createError({ statusCode: 401, statusMessage: 'Email atau password salah' })
  }

  attempts.delete(ip)
  await setUserSession(event, {
    user: { id: admin.id, name: admin.name, email: admin.email, role: admin.role },
  })
  return { ok: true }
})
