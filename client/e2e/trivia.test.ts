import { test, expect } from '@playwright/test'
import asLoggedInUser from './utils'

test.describe('game sequence', () => {
  const username = 'john.doe'

  test('visitor can login', async ({ page }) => {
    await page.goto('/')

    const loginButton = page.getByRole('button', { name: 'Login' })

    // Sanity check, login button is visible before visitor connects to the server
    // await expect(page.getByText('Logged in as')).toBeHidden()
    await expect(loginButton).toBeVisible()

    await loginButton.click()

    const usernameInput = page.getByPlaceholder('Type your username')

    await usernameInput.fill(username)
    await page.getByRole('button', { name: 'Login!' }).click()

    await expect(loginButton).toBeHidden()
    await expect(page.getByText('Logged in as')).toBeVisible()

    // Refresh the page to make sure that the user is still logged in
    await page.reload()
    await expect(page.getByText('Logged in as')).toBeVisible()
  })

  test('user can try to join a game', async ({ page }) => {
    await asLoggedInUser(page, username, async () => {
      await expect(page.getByTestId('game-lobby')).toBeVisible()

      await page.getByRole('button', { name: 'Join Game' }).click()
      await page.getByPlaceholder('Type game code here...').fill('12345')
      await page.getByRole('button', { name: 'Join' }).click()

      await expect(page.getByText('Game ID incorrect, or game already started')).toBeVisible()
    })
  })

  test('user can start a game', async ({ page }) => {
    await asLoggedInUser(page, username, async () => {
      await expect(page.getByTestId('game-lobby')).toBeVisible()

      await page.getByRole('button', { name: 'Create Game' }).click()
      await page.getByRole('button', { name: "I'm ready!" }).click()

      // Check that initial score is 0
      await expect(page.getByTestId('player-score')).toHaveText('0')

      await expect(page.getByText('What is the capital of France?')).toBeVisible()
      await expect(page.getByRole('button', { name: 'Paris' })).toBeVisible()
      await expect(page.getByRole('button', { name: 'Madrid' })).toBeVisible()
      await expect(page.getByRole('button', { name: 'Berlin' })).toBeVisible()
      await expect(page.getByRole('button', { name: 'London' })).toBeVisible()

      await page.getByRole('button', { name: 'Paris' }).click()

      // Check that score has increased
      await expect(page.getByTestId('player-score')).toHaveText('100')

      // Final scores are shown after the game ends:
      await expect(page.getByText(/final scores/i)).toBeVisible()

      // User should be sent back to lobby
      await page.getByRole('button', { name: 'Back' }).click()
      await expect(page.getByTestId('game-lobby')).toBeVisible()
    })
  })
})
