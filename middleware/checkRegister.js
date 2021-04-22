export default async function({ redirect, app }) {
  if (await app.$user()) {
    redirect('/')
  }
}
