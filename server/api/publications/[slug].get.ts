export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  const pub = slug ? await getPublication(slug) : null
  if (!pub) {
    throw createError({ statusCode: 404, statusMessage: 'Publication not found' })
  }
  return pub
})
