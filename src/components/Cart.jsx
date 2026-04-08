import { useContext } from "react";
import { CartContext } from "./CartContext";
import { FaPlus, FaMinus, FaTrash, FaTimes, FaWhatsapp } from "react-icons/fa";
import "./Cart.css";

function Cart({ onClose }) {
  const { cart, updateQuantity, removeFromCart, clearCart } = useContext(CartContext);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleWhatsAppOrder = () => {
  const phoneNumber = "2348137186223";
  
  // 1. Create the list of items
  const itemsList = cart
    .map((item) => `• ${item.name} x${item.quantity} — $${(item.price * item.quantity).toFixed(2)}`)
    .join("%0A"); // %0A is a "new line" in a URL

  // 2. Create the full message
  const message = `Hello! I'd like to place an order:%0A%0A${itemsList}%0A%0A*Total: $${total.toFixed(2)}*`;

  // 3. Open WhatsApp
  window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
};

  return (
    <>
      {/* Backdrop */}
      <div className="cart-backdrop" onClick={onClose} />

      {/* Modal */}
      <div className="cart-modal">

        {/* Header */}
        <div className="cart-header">
          <h2 className="cart-title">
            Your Cart <span className="cart-count">({cart.reduce((t, i) => t + i.quantity, 0)} items)</span>
          </h2>
          <button className="cart-close" onClick={onClose}><FaTimes /></button>
        </div>

        {/* Items */}
        <div className="cart-items">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <span className="cart-empty-icon">🛒</span>
              <p>Your cart is empty</p>
            </div>
          ) : (
            cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name} className="cart-item-img" />
                <div className="cart-item-info">
                  <p className="cart-item-name">{item.name}</p>
                  <p className="cart-item-price">${(item.price * item.quantity).toFixed(2)}</p>
                  <div className="cart-item-controls">
                    <button className="ctrl-btn minus" onClick={() => updateQuantity(item.id, -1)}><FaMinus /></button>
                    <span className="ctrl-qty">{item.quantity}</span>
                    <button className="ctrl-btn plus" onClick={() => updateQuantity(item.id, 1)}><FaPlus /></button>
                  </div>
                </div>
                <button className="cart-item-remove" onClick={() => removeFromCart(item.id)}><FaTrash /></button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>Total</span>
              <span className="cart-total-price">${total.toFixed(2)}</span>
            </div>
            <div className="cart-actions">
              <button className="cart-clear-btn" onClick={clearCart}>
                <FaTrash /> Clear Cart
              </button>
              <button className="cart-whatsapp-btn" onClick={handleWhatsAppOrder}>
                <FaWhatsapp /> Place Order
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Cart;