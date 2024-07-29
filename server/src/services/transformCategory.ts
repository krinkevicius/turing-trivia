import { CATEGORIES } from '@server/consts'

export default function transformCategory(categoryKey: string): string {
  return CATEGORIES[Object.keys(CATEGORIES).find(key => key.includes(categoryKey))!] || 'Random'
}
