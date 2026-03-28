import { useEffect, useState } from 'react'
import type { Book, CartItem } from '../types'
import { fetchBooks, fetchCategories } from '../api'
import { addBookToCart, getBrowseState, getStoredCart, saveBrowseState } from '../cartUtils'
import BookRow from './BookRow'
import CategoryFilter from './CategoryFilter'
import CartSummary from './CartSummary'
import Pagination from './Pagination'

function BookstorePage() {
  const browseState = getBrowseState()
  const [books, setBooks] = useState<Book[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>(browseState.category)
  const [pageSize, setPageSize] = useState<number>(5)
  const [pageNum, setPageNum] = useState<number>(browseState.pageNum)
  const [totalNumBooks, setTotalNumBooks] = useState<number>(0)
  const [cart, setCart] = useState<CartItem[]>(getStoredCart())

  useEffect(() => {
    fetchCategories().then(setCategories)
  }, [])

  useEffect(() => {
    saveBrowseState(pageNum, selectedCategory)
    fetchBooks(selectedCategory, pageSize, pageNum).then((data) => {
      setBooks(data.books)
      setTotalNumBooks(data.totalNumBooks)
    })
  }, [selectedCategory, pageSize, pageNum])

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setPageNum(1)
  }

  const handleAddToCart = (book: Book) => {
    const updated = addBookToCart(book)
    setCart(updated)
  }

  return (
    <div className="container py-4">
      <div className="row mb-3">
        <div className="col">
          <div className="p-4 bg-white shadow-sm rounded-3">
            <h1 className="mb-1">Hilton Bookstore</h1>
            <p className="text-muted mb-0">Mission 12 bookstore with filtering, pagination, and shopping cart.</p>
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-lg-3">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategoryChange}
          />
        </div>

        <div className="col-lg-6">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3 className="mb-0">Books</h3>
            <div>
              <label className="me-2">Results per page:</label>
              <select
                className="form-select d-inline-block w-auto"
                value={pageSize}
                onChange={(e) => {
                  setPageSize(parseInt(e.target.value))
                  setPageNum(1)
                }}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
              </select>
            </div>
          </div>

          <div className="row g-3">
            {books.map((book) => (
              <div className="col-12" key={book.bookID}>
                <BookRow book={book} onAddToCart={handleAddToCart} />
              </div>
            ))}
          </div>

          <Pagination
            currentPage={pageNum}
            totalItems={totalNumBooks}
            pageSize={pageSize}
            onPageChange={setPageNum}
          />
        </div>

        <div className="col-lg-3">
          <CartSummary cart={cart} />
        </div>
      </div>
    </div>
  )
}

export default BookstorePage
