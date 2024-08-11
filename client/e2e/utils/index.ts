import type { Page } from '@playwright/test'

export default async function asLoggedInUser<T>(
  page: Page,
  username: string,
  callback: () => Promise<T>,
): Promise<T> {
  // if no page is open, go to the home page
  if (page.url() === 'about:blank') {
    await page.goto('/')
    await page.waitForURL('/')
  }

  await page.getByRole('button', { name: 'Login' }).click()
  await page.getByPlaceholder('Type your username').fill(username)
  await page.getByRole('button', { name: 'Login!' }).click()

  const callbackResult = await callback()

  return callbackResult
}
