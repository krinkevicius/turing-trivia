import { SERVER_DELAY_MS } from '@server/consts'

export default async function delay(ms: number = SERVER_DELAY_MS) {
  await new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}
