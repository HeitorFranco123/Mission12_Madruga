import { Routes, Route } from 'react-router-dom'
import BookstorePage from './components/BookstorePage'
import CartPage from './components/CartPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<BookstorePage />} />
      <Route path="/cart" element={<CartPage />} />
    </Routes>
  )
}

export default App
