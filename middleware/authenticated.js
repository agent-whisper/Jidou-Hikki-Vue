export default async function (context) {
  try {
    await context.$axios.$get('/api/auth/session')
  } catch (err) {
    context.store.dispatch('profile/logout')
    context.redirect(`/login`)
  }
}
