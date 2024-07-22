import * as crypto from 'crypto'

export default function generateRandomId(size: number = 8): string {
  return crypto.randomBytes(size).toString('hex')
}
