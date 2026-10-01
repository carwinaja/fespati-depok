import sanitizeHtml from 'sanitize-html'

/** Bersihkan HTML dari editor: hanya tag/atribut aman, gambar hanya dari /media/uploads/. */
export function sanitizeArticleHtml(html: string) {
  return sanitizeHtml(html, {
    allowedTags: ['p', 'br', 'h2', 'h3', 'strong', 'em', 'u', 's', 'ul', 'ol', 'li', 'blockquote', 'a', 'img', 'hr', 'code', 'pre'],
    allowedAttributes: { a: ['href', 'target', 'rel'], img: ['src', 'alt'] },
    allowedSchemes: ['http', 'https', 'mailto'],
    allowedSchemesByTag: { img: ['http', 'https'] },
    allowProtocolRelative: false,
    transformTags: {
      a: (tag, attribs) => ({ tagName: 'a', attribs: { ...attribs, target: '_blank', rel: 'noopener noreferrer nofollow' } }),
    },
    exclusiveFilter: (f) => f.tag === 'img' && !/^\/media\/uploads\/[\w./-]+$/.test(f.attribs.src || ''),
  })
}
