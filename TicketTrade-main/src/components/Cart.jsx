import React, { useContext, useState, useEffect } from "react";
import AppContext from "../Context/Context";
import axios from "axios";
import CheckoutPopup from "./CheckoutPopup";
import { Button } from 'react-bootstrap';

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useContext(AppContext);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartImage, setCartImage] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState(null);
  const [showExtraCharges, setShowExtraCharges] = useState(false); // NEW

  useEffect(() => {
    const fetchImagesAndUpdateCart = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/products");
        const backendProductIds = response.data.map((product) => product.id);

        const updatedCartItems = cart.filter((item) =>
          backendProductIds.includes(item.id)
        );

        const cartItemsWithImages = await Promise.all(
          updatedCartItems.map(async (item) => {
            try {
              const response = await axios.get(
                `http://localhost:8080/api/product/${item.id}/image`,
                { responseType: "blob" }
              );
              const imageFile = await converUrlToFile(response.data, response.data.imageName);
              setCartImage(imageFile);
              const imageUrl = URL.createObjectURL(response.data);
              return { ...item, imageUrl };
            } catch (error) {
              console.error("Error fetching image:", error);
              return { ...item, imageUrl: "placeholder-image-url" };
            }
          })
        );
        setCartItems(cartItemsWithImages);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    if (cart.length) {
      fetchImagesAndUpdateCart();
    }
  }, [cart]);

  useEffect(() => {
    const total = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotalPrice(total);
  }, [cartItems]);

  const converUrlToFile = async (blobData, fileName) => {
    return new File([blobData], fileName, { type: blobData.type });
  };

  const handleIncreaseQuantity = (itemId) => {
    const newCartItems = cartItems.map((item) => {
      if (item.id === itemId) {
        if (item.quantity < item.stockQuantity) {
          return { ...item, quantity: item.quantity + 1 };
        } else {
          alert("Cannot add more than available stock");
        }
      }
      return item;
    });
    setCartItems(newCartItems);
  };

  const handleDecreaseQuantity = (itemId) => {
    const newCartItems = cartItems.map((item) =>
      item.id === itemId
        ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
        : item
    );
    setCartItems(newCartItems);
  };

  const handleRemoveFromCart = (itemId) => {
    removeFromCart(itemId);
    const newCartItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(newCartItems);
  };

  const handleCheckout = async () => {
    try {
      for (const item of cartItems) {
        const { imageUrl, imageName, imageData, imageType, quantity, ...rest } = item;
        const updatedStockQuantity = item.stockQuantity - item.quantity;

        const updatedProductData = { ...rest, stockQuantity: updatedStockQuantity };

        const cartProduct = new FormData();
        cartProduct.append("imageFile", cartImage);
        cartProduct.append(
          "product",
          new Blob([JSON.stringify(updatedProductData)], { type: "application/json" })
        );

        await axios.put(`http://localhost:8080/api/products/${item.id}`, cartProduct, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }
      clearCart();
      setCartItems([]);
      setShowModal(false);
    } catch (error) {
      console.log("error during checkout", error);
    }
  };

  const validPromoCodes = {
    "SAVE10": 10,
    "WELCOME5": 5,
    "BIG20": 20
  };

  const handleApplyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (validPromoCodes[code]) {
      setDiscount(validPromoCodes[code]);
      setPromoMessage({ type: "success", text: `Promo applied: ${validPromoCodes[code]}% off!` });
    } else {
      setDiscount(0);
      setPromoMessage({ type: "error", text: "Invalid promo code." });
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="my-5 position-relative">
        <div className="row">
          {/* Shopping Cart */}
          <div className="col-md-8">
            <div className="card p-4 d-flex flex-column" style={{ height: "600px", width: "100%", overflow: "hidden", top: "50px" }}>
              <h4 className="mb-3">Shopping Cart ({cartItems.length} Items)</h4>
              {cartItems.length === 0 ? (
                <div className="d-flex justify-content-center align-items-center flex-grow-1" style={{ minHeight: "100%" }}>
                  <h5>Your cart is empty</h5>
                </div>
              ) : (
                <>
                  <div style={{ flexGrow: 1, overflowY: "auto", paddingRight: "10px", width: "100%" }}>
                    {cartItems.map((item) => (
                      <div key={item.id} className="row g-3 align-items-center mb-3 border-bottom pb-3">
                        <div className="col-md-2">
                          <img src={item.imageUrl} alt={item.name} className="img-fluid rounded" />
                        </div>
                        <div className="col-md-4">
                          <h6 className="mb-1">{item.name}</h6>
                          <p className="text-muted mb-1">{item.brand}</p>
                          <button className="btn btn-sm btn-danger mt-2" onClick={() => handleRemoveFromCart(item.id)}>
                            <i className="bi bi-trash3-fill"></i> Remove
                          </button>
                        </div>
                        <div className="col-md-3">
                          <div className="btn-group" role="group">
                            <button className="btn btn-outline-secondary" onClick={() => handleDecreaseQuantity(item.id)}>
                              <i className="bi bi-dash"></i>
                            </button>
                            <input
                              type="text"
                              readOnly
                              value={item.quantity}
                              className="form-control text-center"
                              style={{ maxWidth: "60px" }}
                            />
                            <button className="btn btn-outline-secondary" onClick={() => handleIncreaseQuantity(item.id)}>
                              <i className="bi bi-plus"></i>
                            </button>
                          </div>
                        </div>
                        <div className="col-md-3 text-end">
                          <p className="fw-bold mb-0">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 d-flex justify-content-between align-items-center">
                    <h5>Total: ${totalPrice.toFixed(2)}</h5>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="col-md-4">
            <div className="card p-4 d-flex flex-column" style={{ height: "620px", margin: "10px", top: "40px" }}>
              <h4 className="mb-3">Order Summary</h4>

              {(() => {
                const cgst = totalPrice * 0.0005;
                const sgst = totalPrice * 0.0005;
                const shipping = 2.0 * cartItems.length;
                const discountAmount = (totalPrice * discount) / 100;
                const finalTotal = totalPrice + cgst + sgst + shipping - discountAmount;

                return (
                  <>
                    <div className="text-end mb-2">
                      <button
                        className="btn btn-link p-0 text-primary"
                        style={{ textDecoration: "underline", fontSize: "14px" }}
                        onClick={() => setShowExtraCharges(true)}
                      >
                        View Extra Charges (CGST & SGST)
                      </button>
                    </div>

                    <div style={{ flexGrow: 1, overflowY: "auto" }}>
                      <ul className="list-group list-group-flush mb-3">
                        <li className="list-group-item d-flex justify-content-between mb-2">
                          <span>Items</span>
                          <strong>{cartItems.length}</strong>
                        </li>
                        <li className="list-group-item d-flex justify-content-between mb-2">
                          <span>Subtotal</span>
                          <strong>${totalPrice.toFixed(2)}</strong>
                        </li>
                        <li className="list-group-item d-flex justify-content-between mb-2">
                          <span>Shipping</span>
                          <strong>${shipping.toFixed(2)}</strong>
                        </li>
                        {discount > 0 && (
                          <li className="list-group-item d-flex justify-content-between mb-2">
                            <span>Discount ({discount}%)</span>
                            <strong className="text-success">-${discountAmount.toFixed(2)}</strong>
                          </li>
                        )}
                        <li className="list-group-item d-flex justify-content-between mb-3">
                          <span>Total Cost</span>
                          <strong>${finalTotal.toFixed(2)}</strong>
                        </li>
                      </ul>
                    </div>

                    <div className="mb-1">
                      <label htmlFor="promo" className="form-label">Promo Code</label>
                      <input
                        type="text"
                        className="form-control mb-2"
                        id="promo"
                        placeholder="Enter code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                      />
                      <button type="button" className="btn btn-danger w-100" onClick={handleApplyPromo}>Apply</button>
                      {promoMessage && (
                        <div className={`mt-2 text-center alert alert-${promoMessage.type === "success" ? "success" : "danger"}`}>
                          {promoMessage.text}
                        </div>
                      )}
                    </div>

                    <Button className="btn btn-primary w-100 mt-auto" onClick={() => setShowModal(true)}>
                      Checkout
                    </Button>
                  </>
                );
              })()}
            </div>
          </div>

          {/* Extra Charges Modal */}
          {showExtraCharges && (
            <div
              className="modal fade show"
              tabIndex="-1"
              role="dialog"
              style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
            >
              <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Extra Charges</h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setShowExtraCharges(false)}
                    ></button>
                  </div>
                  <div className="modal-body">
                    <p><strong>CGST (0.05%):</strong> ${(totalPrice * 0.0005).toFixed(2)}</p>
                    <p><strong>SGST (0.05%):</strong> ${(totalPrice * 0.0005).toFixed(2)}</p>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setShowExtraCharges(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Checkout Modal */}
          <CheckoutPopup
            show={showModal}
            handleClose={() => setShowModal(false)}
            cartItems={cartItems}
            totalPrice={totalPrice}
            handleCheckout={handleCheckout}
          />
        </div>
      </div>
    </div>
  );
};

export default Cart;
