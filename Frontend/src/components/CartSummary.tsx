import { Link } from 'react-router-dom'
import type { CartItem } from '../types'
import { getCartItemCount, getCartTotal } from '../cartUtils'

interface CartSummaryProps {
  cart: CartItem[]
}

function CartSummary({ cart }: CartSummaryProps) {
  const itemCount = getCartItemCount(cart)
  const total = getCartTotal(cart)

  return (
    <div className="card shadow-sm sticky-summary">
      <div className="card-body">
        <h4>
          Cart <span className="badge bg-primary">{itemCount}</span>
        </h4>
        <p className="mb-1"><strong>Total Items:</strong> {itemCount}</p>
        <p className="mb-3"><strong>Total:</strong> ${total.toFixed(2)}</p>
        <Link className="btn btn-success w-100" to="/cart">
          View Cart
        </Link>
      </div>
    </div>
  )
}

export default CartSummary
