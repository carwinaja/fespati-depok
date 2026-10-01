import { Prisma } from '@prisma/client'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')!
  const data = await readValidatedBody(event, memberBody.parse)
  try {
    return await prisma.member.update({ where: { id }, data })
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2002') throw createError({ statusCode: 409, statusMessage: 'No. anggota sudah dipakai' })
      if (e.code === 'P2025') throw createError({ statusCode: 404, statusMessage: 'Anggota tidak ditemukan' })
    }
    throw e
  }
})
