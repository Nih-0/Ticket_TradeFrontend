import React, { useContext, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AppContext from "../Context/Context";

const BuyTickets = () => {
  const { data, addToCart, refreshData } = useContext(AppContext);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");  // internal state
  const fetchedOnce = useRef(false);

  useEffect(() => {
    if (!fetchedOnce.current) {
      refreshData();
      fetchedOnce.current = true;
    }
  }, [refreshData]);

  useEffect(() => {
    if (!data || data.length === 0 || products.length > 0) return;

    const fetchImagesForProducts = async () => {
      const updatedProducts = await Promise.all(
        data.map(async (product) => {
          try {
            const response = await axios.get(
              `http://localhost:8080/api/product/${product.id}/image`,
              { responseType: "blob" }
            );
            const blobUrl = URL.createObjectURL(response.data);
            return { ...product, imageUrl: blobUrl };
          } catch (error) {
            console.error("Error fetching image for product ID:", product.id, error);
            return {
              ...product,
              imageUrl: "https://via.placeholder.com/250?text=No+Image",
            };
          }
        })
      );
      setProducts(updatedProducts);
    };

    fetchImagesForProducts();

    return () => {
      products.forEach((prod) => {
        if (prod.imageUrl && prod.imageUrl.startsWith("blob:")) {
          URL.revokeObjectURL(prod.imageUrl);
        }
      });
    };
  }, [data, products.length]);

  // Filter products by category using includes for partial matching and case insensitive
  const filteredProducts = selectedCategory
    ? products.filter((product) =>
        product.category
          ?.toLowerCase()
          .includes(selectedCategory.toLowerCase())
      )
    : products;

  return (
    <>
      {/* Category Dropdown */}
      <div className="bg-gray-100 p-4" style={{ width: "100%", marginTop: "64px" }}>
        <h4 className="mb-3 text-center fw-semibold">Select Category</h4>
        <div className="text-center">
          <select
            className="form-select w-50 mx-auto"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}  // use internal state setter
          >
            <option value="">All</option>
            <option value="Event Tickets">Event Tickets</option>
            <option value="Bus Tickets">Bus Tickets</option>
            <option value="Train Tickets">Train Tickets</option>
            <option value="Movie Tickets">Movie Tickets</option>
          </select>
        </div>
      </div>

      {/* Ticket Grid */}
      <div
        className="grid bg-orange-500"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          padding: "20px",
        }}
      >
        {filteredProducts.length === 0 ? (
          <h2 className="text-center">No Products Available</h2>
        ) : (
          filteredProducts.map((product) => {
            const { id, brand, name, price, available, imageUrl } = product;
            return (
              <div
                className="card mb-3"
                style={{
                  width: "250px",
                  height: "380px",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  borderRadius: "10px",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "stretch",
                }}
                key={id}
              >
                <Link
                  to={`/product/${id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <img
                    src={imageUrl}
                    alt={name}
                    style={{
                      width: "100%",
                      height: "150px",
                      objectFit: "cover",
                      padding: "5px",
                      borderRadius: "10px",
                    }}
                  />
                  <div className="card-body" style={{ padding: "10px" }}>
                    <div>
                      <h5 className="card-title" style={{ fontSize: "1.2rem" }}>
                        {name.toUpperCase()}
                      </h5>
                      <i className="card-brand" style={{ fontSize: "0.8rem" }}>
                        {"~ " + brand}
                      </i>
                    </div>
                    <hr className="hr-line" style={{ margin: "10px 0" }} />
                    <div className="home-cart-price">
                      <h5
                        className="card-text"
                        style={{ fontWeight: "600", fontSize: "1.1rem" }}
                      >
                        <i className="bi bi-currency-rupee"></i>
                        {price}
                      </h5>
                    </div>
                    <button
                      className="btn-hover text-white"
                      style={{
                        margin: "10px 25px",
                        backgroundColor: "#f97316",
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        addToCart(product);
                      }}
                      disabled={!available}
                    >
                      {available ? "Add to Cart" : "Out of Stock"}
                    </button>
                  </div>
                </Link>
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default BuyTickets;
