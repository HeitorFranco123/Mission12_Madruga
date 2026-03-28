import type { Book } from './types'

const BASE_URL = 'http://localhost:5000'

export async function fetchBooks(category: string, pageSize: number, pageNum: number) {
  const response = await fetch(
    `${BASE_URL}/books?category=${encodeURIComponent(category)}&pageSize=${pageSize}&pageNum=${pageNum}&sortBy=title`
  )
  return response.json() as Promise<{ books: Book[]; totalNumBooks: number }>
}

export async function fetchCategories() {
  const response = await fetch(`${BASE_URL}/books/categories`)
  return response.json() as Promise<string[]>
}
