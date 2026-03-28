import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import type { CartItem } from '../types'
import { getCartTotal, getStoredCart, saveCart } from '../cartUtils'

function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([])

  useEffect(() => {
    setCart(getStoredCart())
  }, [])

  const updateQuantity = (bookID: number, change: number) => {
    const updated = cart
      .map(item =>
        item.bookID === bookID
          ? { ...item, quantity: item.quantity + change }
          : item
      )
      .filter(item => item.quantity > 0)

    setCart(updated)
    saveCart(updated)
  }

  const total = getCartTotal(cart)

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col">
          <div className="p-4 bg-white shadow-sm rounded-3 mb-4">
            <h1 className="mb-1">Shopping Cart</h1>
            <p className="text-muted mb-0">Books stay in the cart during the browser session.</p>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <div className="card shadow-sm">
            <div className="card-body">
              {cart.length === 0 ? (
                <p>Your cart is empty.</p>
              ) : (
                <div className="table-responsive">
                  <table className="table table-striped align-middle">
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.map((item) => (
                        <tr key={item.bookID}>
                          <td>{item.title}</td>
                          <td>${item.price.toFixed(2)}</td>
                          <td>
                            <button
                              className="btn btn-sm btn-outline-secondary me-2"
                              onClick={() => updateQuantity(item.bookID, -1)}
                            >
                              -
                            </button>
                            {item.quantity}
                            <button
                              className="btn btn-sm btn-outline-secondary ms-2"
                              onClick={() => updateQuantity(item.bookID, 1)}
                            >
                              +
                            </button>
                          </td>
                          <td>${(item.price * item.quantity).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <div className="d-flex justify-content-between align-items-center mt-3">
                <h4 className="mb-0">Total: ${total.toFixed(2)}</h4>
                <div>
                  <Link className="btn btn-secondary me-2" to="/">
                    Continue Shopping
                  </Link>
                </div>
              </div>

              <div className="mt-3 alert alert-light border">
                <strong>Bootstrap features used beyond class examples:</strong> Accordion for the category filter and Badge for the cart item count.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage
