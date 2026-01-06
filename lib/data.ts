import { Item } from './types'

// Simulasi database dalam memory
let items: Item[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor' },
]

let nextId = 4

export function getAllItems(): Item[] {
  return items
}

export function getItemById(id: number): Item | undefined {
  return items.find((item) => item.id === id)
}

export function createItem(item: Omit<Item, 'id'>): Item {
  const newItem: Item = { ...item, id: nextId++ }
  items.push(newItem)
  return newItem
}

export function updateItem(id: number, item: Omit<Item, 'id'>): Item | null {
  const index = items.findIndex((i) => i.id === id)
  if (index === -1) return null

  items[index] = { ...item, id }
  return items[index]
}

export function deleteItem(id: number): boolean {
  const index = items.findIndex((i) => i.id === id)
  if (index === -1) return false

  items.splice(index, 1)
  return true
}
