import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import React, { useState } from "react";
import BuyTickets from "./components/BuyTickets";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import AddTicket from "./components/AddTicket";
import Product from "./components/Product";
import { AppProvider } from "./Context/Context";
import UpdateProduct from "./components/UpdateProduct";
import AboutUs from "./components/About";
import ContactUs from "./components/Contact";
import LoginPage from "./components/Login";
import HomePage from "./components/HomePage";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./components/Register";
import Footer from "./components/Footer";
import Chatbot from "./components/ChatBot";
import "./App.css";
import "./index.css";

function AppContent() {
  const location = useLocation();
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    console.log("Selected category:", category);
  };

  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Paths where Navbar and Footer should be hidden
  const noNavbarPaths = ["/login", "/register"];

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Navbar */}
      {!noNavbarPaths.includes(location.pathname) && (
        <Navbar onSelectCategory={handleCategorySelect} />
      )}

      <main className="flex-fill">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route
            path="/buy-tickets"
            element={
              <ProtectedRoute>
                <BuyTickets
                  addToCart={addToCart}
                  selectedCategory={selectedCategory}
                />
                
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-tickets"
            element={
              <ProtectedRoute>
                <AddTicket />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add_product"
            element={
              <ProtectedRoute>
                <AddTicket />
              </ProtectedRoute>
            }
          />
          <Route
            path="/product"
            element={
              <ProtectedRoute>
                <Product />
              </ProtectedRoute>
            }
          />
          <Route
            path="/product/:id"
            element={
              <ProtectedRoute>
                <Product />
              </ProtectedRoute>
            }
          />
          <Route
            path="/product/update/:id"
            element={
              <ProtectedRoute>
                <UpdateProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      {/* Footer */}
      {!noNavbarPaths.includes(location.pathname) && <Footer />}

      {/* Chatbot (always visible, or add conditions as needed) */}
      {/* <Chatbot /> */}
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;

