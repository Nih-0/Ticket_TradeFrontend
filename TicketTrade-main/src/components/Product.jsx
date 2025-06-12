import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AppContext from "../Context/Context";
import axios from "../axios";

const Product = () => {
  const { id } = useParams();
  const { addToCart, removeFromCart, refreshData } = useContext(AppContext);
  const [product, setProduct] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();

  const fallbackImage =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
      `<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
         <rect width="400" height="300" fill="#ccc"/>
         <text x="200" y="150" font-size="20" text-anchor="middle" fill="#666" font-family="Arial" dy=".3em">No Image</text>
       </svg>`
    );

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/product/${id}/image`, {
          responseType: "blob",
        });
        const blobUrl = URL.createObjectURL(response.data);
        setImageUrl(blobUrl);
      } catch (error) {
        console.error("Error fetching product image:", error);
        setImageUrl(fallbackImage);
      }
    };

    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/products/${id}`);
        setProduct(response.data);
        await fetchImage();
      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct(null);
        setImageUrl(fallbackImage);
      }
    };

    fetchProduct();

    return () => {
      if (imageUrl && imageUrl.startsWith("blob:")) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [id]);

  const deleteProduct = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/products/${id}`);
      removeFromCart(id);
      alert("Product deleted successfully");
      refreshData();
      navigate("/");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product");
    }
  };

  const handleEditClick = () => {
    navigate(`/product/update/${id}`);
  };

  const handleAddToCart = () => {
    addToCart(product);
    alert("Product added to cart");
  };

  if (!product) {
    return (
      <h2 style={{ padding: "10rem", textAlign: "center" }}>
        Loading...
      </h2>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        maxWidth: "900px",
        margin: "2rem auto",
        gap: "2rem",
        alignItems: "flex-start",
      }}
    >
      {/* Image wrapper with margin to push image slightly down and left */}
      <div
        style={{
          width: "50%",
          paddingTop: "1.5rem", // pushes image down
          paddingLeft: "1rem",  // pushes image right but visually left inside flex container
          boxSizing: "border-box",
        }}
      >
        <img
          src={imageUrl}
          alt={product.name || "Product Image"}
          style={{
            width: "100%",
            height: "100vh",
            objectFit: "contain",
            // border: "1px solid #ccc",
            borderRadius: "20px",
            display: "block",
            margin: "-3rem auto", // centers the image vertically

          }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = fallbackImage;
          }}
        />
      </div>

      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "8rem",
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "1rem",
            }}
          >
            <span
              style={{
                fontSize: "1.2rem",
                fontWeight: "lighter",
                textTransform: "capitalize",
              }}
            >
              {product.category}
            </span>
            <p style={{ margin: 0, fontSize: "0.9rem", color: "#666" }}>
              Listed: <i>{new Date(product.releaseDate).toLocaleDateString()}</i>
            </p>
          </div>

          <h1
            style={{
              fontSize: "2rem",
              marginBottom: "0.5rem",
              textTransform: "capitalize",
              letterSpacing: "1px",
            }}
          >
            {product.name}
          </h1>
          <i
            style={{ marginBottom: "1.5rem", display: "block", color: "#444" }}
          >
            {product.brand}
          </i>

          <p
            style={{
              fontWeight: "bold",
              fontSize: "1rem",
              margin: "10px 0 5px",
            }}
          >
            PRODUCT DESCRIPTION:
          </p>
          <p style={{ marginBottom: "1rem", lineHeight: "1.4", color: "#333" }}>
            {product.description}
          </p>
        </div>

        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "1rem",
            }}
          >
            <span style={{ fontSize: "2rem", fontWeight: "bold" }}>
              ${product.price}
            </span>

            <button
              onClick={handleAddToCart}
              disabled={!product.available}
              style={{
                padding: "0.8rem 1.6rem",
                fontSize: "1rem",
                backgroundColor: product.available ? "#007bff" : "gray",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: product.available ? "pointer" : "not-allowed",
                marginLeft: "1rem",
              }}
            >
              {product.available ? "Add to cart" : "Out of Stock"}
            </button>
          </div>

          <h6 style={{ marginBottom: "1rem" }}>
            Stock Available:{" "}
            <span
              style={{
                color: product.quantity > 0 ? "green" : "red",
                fontWeight: "bold",
                marginLeft: "5px",
              }}
            >
              {product.quantity ?? 0}
            </span>
          </h6>

          <div style={{ display: "flex", gap: "1rem" }}>
            <button
              onClick={handleEditClick}
              style={{
                flex: 1,
                padding: "1rem",
                fontSize: "1rem",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Update
            </button>

            <button
              onClick={deleteProduct}
              style={{
                flex: 1,
                padding: "1rem",
                fontSize: "1rem",
                backgroundColor: "#dc3545",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
