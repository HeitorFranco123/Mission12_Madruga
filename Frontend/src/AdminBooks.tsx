import { useEffect, useState } from 'react'
import type { Book } from './types'

const BASE_URL = 'http://localhost:5000'

const emptyBook: Book = {
  bookID: 0,
  title: '',
  author: '',
  publisher: '',
  isbn: '',
  classification: '',
  category: '',
  pageCount: 0,
  price: 0,
}

function AdminBooks() {
  const [books, setBooks] = useState<Book[]>([])
  const [newBook, setNewBook] = useState<Book>(emptyBook)
  const [editingBook, setEditingBook] = useState<Book | null>(null)

  const fetchAllBooks = async () => {
    const response = await fetch(`${BASE_URL}/books?pageSize=1000&pageNum=1&sortBy=title`)
    const data = await response.json()
    setBooks(data.books ?? data.Books ?? [])
  }

  useEffect(() => {
    fetchAllBooks()
  }, [])

  const handleNewBookChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setNewBook({
      ...newBook,
      [name]: name === 'pageCount' || name === 'price' || name === 'bookID'
        ? Number(value)
        : value,
    })
  }

  const handleEditBookChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editingBook) return

    const { name, value } = e.target

    setEditingBook({
      ...editingBook,
      [name]: name === 'pageCount' || name === 'price' || name === 'bookID'
        ? Number(value)
        : value,
    })
  }

  const addBook = async () => {
    await fetch(`${BASE_URL}/books`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBook),
    })

    setNewBook(emptyBook)
    fetchAllBooks()
  }

  const updateBook = async () => {
    if (!editingBook) return

    await fetch(`${BASE_URL}/books/${editingBook.bookID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editingBook),
    })

    setEditingBook(null)
    fetchAllBooks()
  }

  const deleteBook = async (bookID: number) => {
    await fetch(`${BASE_URL}/books/${bookID}`, {
      method: 'DELETE',
    })

    fetchAllBooks()
  }

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Admin Books</h1>

      <div className="card p-4 mb-4">
        <h3 className="mb-3">Add New Book</h3>

        <input className="form-control mb-2" name="title" placeholder="Title" value={newBook.title} onChange={handleNewBookChange} />
        <input className="form-control mb-2" name="author" placeholder="Author" value={newBook.author} onChange={handleNewBookChange} />
        <input className="form-control mb-2" name="publisher" placeholder="Publisher" value={newBook.publisher} onChange={handleNewBookChange} />
        <input className="form-control mb-2" name="isbn" placeholder="ISBN" value={newBook.isbn} onChange={handleNewBookChange} />
        <input className="form-control mb-2" name="classification" placeholder="Classification" value={newBook.classification} onChange={handleNewBookChange} />
        <input className="form-control mb-2" name="category" placeholder="Category" value={newBook.category} onChange={handleNewBookChange} />
        <input className="form-control mb-2" name="pageCount" type="number" placeholder="Page Count" value={newBook.pageCount} onChange={handleNewBookChange} />
        <input className="form-control mb-3" name="price" type="number" step="0.01" placeholder="Price" value={newBook.price} onChange={handleNewBookChange} />

        <button className="btn btn-primary" onClick={addBook}>
          Add Book
        </button>
      </div>

      {editingBook && (
        <div className="card p-4 mb-4">
          <h3 className="mb-3">Edit Book</h3>

          <input className="form-control mb-2" name="title" placeholder="Title" value={editingBook.title} onChange={handleEditBookChange} />
          <input className="form-control mb-2" name="author" placeholder="Author" value={editingBook.author} onChange={handleEditBookChange} />
          <input className="form-control mb-2" name="publisher" placeholder="Publisher" value={editingBook.publisher} onChange={handleEditBookChange} />
          <input className="form-control mb-2" name="isbn" placeholder="ISBN" value={editingBook.isbn} onChange={handleEditBookChange} />
          <input className="form-control mb-2" name="classification" placeholder="Classification" value={editingBook.classification} onChange={handleEditBookChange} />
          <input className="form-control mb-2" name="category" placeholder="Category" value={editingBook.category} onChange={handleEditBookChange} />
          <input className="form-control mb-2" name="pageCount" type="number" placeholder="Page Count" value={editingBook.pageCount} onChange={handleEditBookChange} />
          <input className="form-control mb-3" name="price" type="number" step="0.01" placeholder="Price" value={editingBook.price} onChange={handleEditBookChange} />

          <div>
            <button className="btn btn-success me-2" onClick={updateBook}>
              Update Book
            </button>
            <button className="btn btn-secondary" onClick={() => setEditingBook(null)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="card p-4">
        <h3 className="mb-3">All Books</h3>

        <div className="table-responsive">
          <table className="table table-bordered table-striped align-middle">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Publisher</th>
                <th>ISBN</th>
                <th>Classification</th>
                <th>Category</th>
                <th>Pages</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.bookID}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.publisher}</td>
                  <td>{book.isbn}</td>
                  <td>{book.classification}</td>
                  <td>{book.category}</td>
                  <td>{book.pageCount}</td>
                  <td>${book.price.toFixed(2)}</td>
                  <td>
                    <button className="btn btn-warning btn-sm me-2" onClick={() => setEditingBook(book)}>
                      Edit
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => deleteBook(book.bookID)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminBooks
