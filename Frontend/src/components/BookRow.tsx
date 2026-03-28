import type { Book } from '../types'

interface BookRowProps {
  book: Book
  onAddToCart: (book: Book) => void
}

function BookRow({ book, onAddToCart }: BookRowProps) {
  return (
    <div className="card shadow-sm h-100 book-card border-0">
      <div className="card-body">
        <h5 className="card-title">{book.title}</h5>
        <p className="mb-1"><strong>Author:</strong> {book.author}</p>
        <p className="mb-1"><strong>Publisher:</strong> {book.publisher}</p>
        <p className="mb-1"><strong>Category:</strong> {book.category}</p>
        <p className="mb-1"><strong>Classification:</strong> {book.classification}</p>
        <p className="mb-1"><strong>Pages:</strong> {book.pageCount}</p>
        <p className="mb-3"><strong>Price:</strong> ${book.price.toFixed(2)}</p>
        <button className="btn btn-primary" onClick={() => onAddToCart(book)}>
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default BookRow
