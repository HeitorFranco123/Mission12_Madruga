import { Routes, Route } from 'react-router-dom'
import BookstorePage from './components/BookstorePage'
import CartPage from './components/CartPage'
import AdminBooks from './AdminBooks'

function App() {
  return (
    <Routes>
      <Route path="/" element={<BookstorePage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/adminbooks" element={<AdminBooks />} />
    </Routes>
  )
}

export default App
