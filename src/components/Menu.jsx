import { Link } from "react-router-dom";
import data from "../data.json";
import { FaCartPlus, FaUser, FaSearch, FaPlus, FaMinus, FaWhatsapp } from "react-icons/fa";
import "./Menu.css";
import { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import React from "react";

function Nav() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const phoneNumber = "+2348137186223";
  const whatsappLink = 'https://wa.me/2348137186223?text=Hello%20there!';
  const [showQR, setShowQR] = React.useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleButtonClick = () =>{
    setShowQR(true);
  }

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleCartClick = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setModalOpen(true);
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleSubmit = () => {
    alert(`Added ${quantity} ${selectedProduct.name}(s) to cart!`);
    setModalOpen(false);
    setSelectedProduct(null);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedProduct(null);
  };

  const filteredProducts =
    selectedCategory === "all"
      ? data.products
      : data.products.filter(
          (product) => product.category === selectedCategory,
        );

  return (
    <div className="menu-all"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        padding: "20px 0",
        fontSize: "25px",
        //  backgroundColor: "rgb(16, 18, 23)"
      }}
    >
      <h2>Our Menu</h2>
      <nav className="menu-nav"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <ul
          style={{
            display: "flex",
            listStyle: "none",
            gap: "65px",
            justifyContent: "center",
          }}
        >
          <li>
            <button
              onClick={() => handleCategoryClick("all")}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: selectedCategory === "all" ? "#ff6b6b" : "#000",
                fontSize: "16px",
                fontWeight: selectedCategory === "all" ? "bold" : "normal",
              }}
            >
              All
            </button>
          </li>
          <li>
            <button
              onClick={() => handleCategoryClick("burger")}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: selectedCategory === "burger" ? "#ff6b6b" : "#000",
                fontSize: "16px",
                fontWeight: selectedCategory === "burger" ? "bold" : "normal",
              }}
            >
              Burger
            </button>
          </li>
          <li>
            <button
              onClick={() => handleCategoryClick("pizza")}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: selectedCategory === "pizza" ? "#ff6b6b" : "#000",
                fontSize: "16px",
                fontWeight: selectedCategory === "pizza" ? "bold" : "normal",
              }}
            >
              Pizza
            </button>
          </li>
          <li>
            <button
              onClick={() => handleCategoryClick("pasta")}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: selectedCategory === "pasta" ? "#ff6b6b" : "#000",
                fontSize: "16px",
                fontWeight: selectedCategory === "pasta" ? "bold" : "normal",
              }}
            >
              Pasta
            </button>
          </li>
          <li>
            <button
              onClick={() => handleCategoryClick("fries")}
              style={{
                background: "none",
                border: "none",
                borderRadius: selectedCategory === "fries" ? "none" : "",
                cursor: "pointer",
                color: selectedCategory === "fries" ? "#ff6b6b" : "#000",
                fontSize: "16px",
                fontWeight: selectedCategory === "fries" ? "bold" : "normal",
              }}
            >
              Fries
            </button>
          </li>
        </ul>
      </nav>
      <div className="box-all"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          gap: "10px",
          width: "80%",
          marginTop: "30px",
         
        }}
      >
        {filteredProducts.map((product) => (
          <div
            className="part11"
            key={product.id}
            style={{
              marginBottom: "20px",
            }}
          >
            <div className="part1-img">
            <div className="immage">
              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: "65%",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  alignItems: "center",
                  justifyContent: "center",
                  display: "block",      // Required for margin: auto to work
                   margin: " auto",
                   padding: "10px"
                }}
              />
              </div>
              <h3>{product.name}</h3>
              <p className="ppp" style={{ width: "25rem" }}>{product.desc}</p>
            </div>
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              <p className="pri">${product.price * quantity}</p>
              <FaCartPlus
                onClick={() => handleCartClick(product)}
                style={{
                  borderRadius: "50%",
                  fontSize: "40px",
                  backgroundColor: "rgb(30, 33, 46)",
                  padding: "6px",
                  color: "white",
                  cursor: "pointer",
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {modalOpen && selectedProduct && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
          onClick={closeModal}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "30px",
              borderRadius: "10px",
              maxWidth: "400px",
              width: "90%",
              maxHeight: "80vh",
              overflowY: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {!showQR && (
              <>
                <h2 style={{ marginBottom: "20px", textAlign: "center" }}>
                  {selectedProduct.name}
                </h2>

                <div style={{ marginBottom: "20px" }}>
                  <h3>Description:</h3>
                  <p style={{ lineHeight: "1.3",width: "18rem" }}>{selectedProduct.desc}</p>
                </div>

                <div style={{ marginBottom: "20px" }}>
                  <h3>Price: ${selectedProduct.price * quantity}</h3>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "20px",
                    marginBottom: "30px",
                  }}
                >
                  <button
                    onClick={handleDecrement}
                    style={{
                      backgroundColor: "#ff6b6b",
                      color: "white",
                      border: "none",
                      borderRadius: "50%",
                      width: "40px",
                      height: "40px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "18px",
                    }}
                  >
                    <FaMinus />
                  </button>

                  <span
                    style={{
                      fontSize: "24px",
                      fontWeight: "bold",
                      minWidth: "50px",
                      textAlign: "center",
                    }}
                  >
                    {quantity}
                  </span>

                  <button
                    onClick={handleIncrement}
                    style={{
                      backgroundColor: "#4CAF50",
                      color: "white",
                      border: "none",
                      borderRadius: "50%",
                      width: "40px",
                      height: "40px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "18px",
                    }}
                  >
                    <FaPlus />
                  </button>
                </div>
              </>
            )}

            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              {!showQR ? (
                <>
                  <button
                    onClick={handleSubmit}
                    style={{
                      backgroundColor: "#4CAF50",
                      color: "white",
                      border: "none",
                      padding: "12px 30px",
                      borderRadius: "5px",
                      cursor: "pointer",
                      fontSize: "16px",
                      fontWeight: "bold",
                      width: "100%",
                      marginBottom: "10px"
                    }}
                  >
                    Add to Cart (${(selectedProduct.price * quantity).toFixed(2)})
                  </button>
                  <button
                    onClick={handleButtonClick}
                    style={{
                      backgroundColor: "#007bff",
                      color: "white",
                      border: "none",
                      padding: "12px 30px",
                      borderRadius: "5px",
                      cursor: "pointer",
                      fontSize: "16px",
                      fontWeight: "bold",
                      width: "100%"
                    }}
                  >
                    chat on Whatsapp
                  </button>
                </>
              ) : (
                <div style={{
                  marginTop: "20px",
                  padding: "20px",
                  backgroundColor: "#f0f0f0",
                  borderRadius: "8px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "15px"
                }}>
                  <h3>{isMobile ? "Tap to Chat on WhatsApp" : "Scan to Chat on WhatsApp"}</h3>
                  {isMobile ? (
                    <a href={whatsappLink} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                      <FaWhatsapp size={100} color="#25D366" />
                    </a>
                  ) : (
                    <div style={{
                      backgroundColor: "white",
                      padding: "10px",
                      borderRadius: "5px",
                      display: "inline-block"
                    }}>
                      <QRCodeCanvas value={whatsappLink} size={200} level="H" includeMargin={true} />
                    </div>
                  )}
                  <p style={{ fontSize: "14px", margin: "10px 0 0 0" }}>
                    {isMobile ? "Tap the icon to open WhatsApp" : "Scan with your phone to chat on WhatsApp"}
                  </p>
                  <button
                    onClick={() => setShowQR(false)}
                    style={{
                      backgroundColor: "#ff6b6b",
                      color: "white",
                      border: "none",
                      padding: "8px 20px",
                      borderRadius: "5px",
                      cursor: "pointer",
                      fontSize: "14px",
                    }}
                  >
                    {isMobile ? "Close" : "Close QR Code"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Nav;
