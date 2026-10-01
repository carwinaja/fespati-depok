import { z } from 'zod'
import { Prisma } from '@prisma/client'

const body = memberBody.extend({ clubId: z.string().min(1) })

export default defineEventHandler(async (event) => {
  const data = await readValidatedBody(event, body.parse)
  try {
    return await prisma.member.create({ data })
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2002') throw createError({ statusCode: 409, statusMessage: 'No. anggota sudah dipakai' })
      if (e.code === 'P2003') throw createError({ statusCode: 404, statusMessage: 'Klub tidak ditemukan' })
    }
    throw e
  }
})
