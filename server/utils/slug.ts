export function slugify(input: string) {
  return (
    input
      .toLowerCase()
      .normalize('NFKD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 80) || 'artikel'
  )
}

/** Slug unik; tambahkan -2, -3, … bila bentrok. excludeId = artikel yang sedang diubah. */
export async function uniqueArticleSlug(base: string, excludeId?: string) {
  const root = slugify(base)
  let slug = root
  for (let i = 2; ; i++) {
    const hit = await prisma.article.findUnique({ where: { slug }, select: { id: true } })
    if (!hit || hit.id === excludeId) return slug
    slug = `${root}-${i}`
  }
}
