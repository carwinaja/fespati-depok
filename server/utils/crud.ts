import type { H3Event } from 'h3'

/** Terjemahkan error Prisma umum jadi respons HTTP yang jelas. */
export function prismaHttpError(e: any, notFound: string): never {
  if (e?.code === 'P2025') throw createError({ statusCode: 404, statusMessage: notFound })
  if (e?.code === 'P2003') throw createError({ statusCode: 400, statusMessage: 'Data terkait tidak ditemukan' })
  throw e
}
export const idParam = (event: H3Event) => getRouterParam(event, 'id')!
