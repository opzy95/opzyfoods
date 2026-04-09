import { useContext, useState, useEffect } from "react";
import { CartContext } from "./CartContext";
import { FaPlus, FaMinus, FaTrash, FaTimes, FaWhatsapp, FaQrcode } from "react-icons/fa";
import QRCode from "qrcode";
import "./Cart.css";

function Cart({ onClose }) {
  const { cart, updateQuantity, removeFromCart, clearCart } = useContext(CartContext);
  const [showQR, setShowQR] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const phoneNumber = "2348137186223";

  const buildWhatsAppUrl = () => {
    const itemsList = cart
      .map((item) => `• ${item.name} x${item.quantity} — $${(item.price * item.quantity).toFixed(2)}`)
      .join("%0A");
    const message = `Hello! I'd like to place an order:%0A%0A${itemsList}%0A%0A*Total: $${total.toFixed(2)}*`;
    return `https://wa.me/${phoneNumber}?text=${message}`;
  };

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Generate QR code when modal opens
  useEffect(() => {
    if (showQR) {
      QRCode.toDataURL(buildWhatsAppUrl(), { width: 220, margin: 2 })
        .then(setQrDataUrl)
        .catch(console.error);
    }
  }, [showQR, cart]);

  const handlePlaceOrder = () => {
    if (isMobile) {
      window.open(buildWhatsAppUrl(), "_blank");
    } else {
      setShowQR(true);
    }
  };

  return (
    <>
      <div className="cart-backdrop" onClick={onClose} />

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
              {/* ✅ Shows QR icon on desktop, WhatsApp icon on mobile */}
              <button className="cart-whatsapp-btn" onClick={handlePlaceOrder}>
                {isMobile ? <FaWhatsapp /> : <FaQrcode />}
                Place Order
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ✅ QR Code Modal — desktop only */}
      {showQR && (
        <>
          <div className="qr-backdrop" onClick={() => setShowQR(false)} />
          <div className="qr-modal">
            <button className="qr-close" onClick={() => setShowQR(false)}><FaTimes /></button>
            <FaWhatsapp className="qr-wa-icon" />
            <h3>Scan to Order on WhatsApp</h3>
            <p>Open your phone camera and scan the QR code below</p>
            {qrDataUrl && <img src={qrDataUrl} alt="WhatsApp QR Code" className="qr-image" />}
            <span className="qr-hint">Points directly to our WhatsApp chat</span>
          </div>
        </>
      )}
    </>
  );
}

export default Cart;