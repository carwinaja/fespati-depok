import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

const email = process.env.SEED_ADMIN_EMAIL
const password = process.env.SEED_ADMIN_PASSWORD
const name = process.env.SEED_ADMIN_NAME || 'Super Admin'

if (!email || !password) {
  console.error('Set SEED_ADMIN_EMAIL dan SEED_ADMIN_PASSWORD terlebih dahulu.')
  process.exit(1)
}
if (password.length < 8) {
  console.error('Password minimal 8 karakter.')
  process.exit(1)
}

const hash = await bcrypt.hash(password, 12)
const admin = await prisma.admin.upsert({
  where: { email },
  update: { password: hash, role: 'SUPER_ADMIN', isActive: true },
  create: { email, name, password: hash, role: 'SUPER_ADMIN' },
})
console.log(`Super admin siap: ${admin.email}`)
await prisma.$disconnect()
