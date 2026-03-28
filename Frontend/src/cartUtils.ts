import type { Book, CartItem } from './types'

const CART_KEY = 'mission12_cart'
const PAGE_KEY = 'mission12_last_page'
const CATEGORY_KEY = 'mission12_last_category'

export function getStoredCart(): CartItem[] {
  const raw = sessionStorage.getItem(CART_KEY)
  return raw ? JSON.parse(raw) : []
}

export function saveCart(cart: CartItem[]) {
  sessionStorage.setItem(CART_KEY, JSON.stringify(cart))
}

export function addBookToCart(book: Book): CartItem[] {
  const currentCart = getStoredCart()
  const existing = currentCart.find(x => x.bookID === book.bookID)

  let updatedCart: CartItem[]

  if (existing) {
    updatedCart = currentCart.map(x =>
      x.bookID === book.bookID ? { ...x, quantity: x.quantity + 1 } : x
    )
  } else {
    updatedCart = [...currentCart, { ...book, quantity: 1 }]
  }

  saveCart(updatedCart)
  return updatedCart
}

export function getCartItemCount(cart: CartItem[]) {
  return cart.reduce((sum, item) => sum + item.quantity, 0)
}

export function getCartTotal(cart: CartItem[]) {
  return cart.reduce((sum, item) => sum + item.quantity * item.price, 0)
}

export function saveBrowseState(pageNum: number, category: string) {
  sessionStorage.setItem(PAGE_KEY, pageNum.toString())
  sessionStorage.setItem(CATEGORY_KEY, category)
}

export function getBrowseState() {
  const page = sessionStorage.getItem(PAGE_KEY)
  const category = sessionStorage.getItem(CATEGORY_KEY)

  return {
    pageNum: page ? parseInt(page) : 1,
    category: category ?? 'All'
  }
}
