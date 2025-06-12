import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import logo from "../assets/Ticket.png";

const Navbar = ({ onSelectCategory }) => {
  const location = useLocation();
  const getInitialTheme = () => {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme ? storedTheme : "light-theme";
  };
  const [selectedCategory, setSelectedCategory] = useState("");
  const [theme, setTheme] = useState(getInitialTheme());
  const [input, setInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/products");
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = async (value) => {
    setInput(value);
    if (value.length >= 1) {
      setShowSearchResults(true);
      try {
        const response = await axios.get(
          `http://localhost:8080/api/products/search?keyword=${value}`
        );
        setSearchResults(response.data);
        setNoResults(response.data.length === 0);
      } catch (error) {
        console.error("Error searching:", error);
      }
    } else {
      setShowSearchResults(false);
      setSearchResults([]);
      setNoResults(false);
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    onSelectCategory(category);
  };

  const toggleTheme = () => {
    const newTheme = theme === "dark-theme" ? "light-theme" : "dark-theme";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const categories = [
    "Laptop",
    "Headphone",
    "Mobile",
    "Electronics",
    "Toys",
    "Fashion",
  ];

  // Conditionally render "Categories" dropdown only on specific routes
  const showCategoriesDropdown =
    location.pathname === "/buy-tickets" ||
    location.pathname === "/add-tickets";

  return (
    <header>
      <nav className="navbar navbar-expand-lg fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand fw-bold" href="/">
          <img src={logo} 
          alt="TicketTrade"
          style={{ height: "30px", width:"45px",marginRight: "10px", display: "inline-block", objectFit: "contain",}} />
            TicketTrade
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="ms-auto d-flex align-items-center">
              <ul className="navbar-nav mb-2 mb-lg-0 me-3">
                <li className="nav-item">
                  <a className="nav-link" href="/add-tickets">
                    List Tickets
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" href="/buy-tickets">
                    Buy Tickets
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/contact">
                    Contact Us
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/about">
                    About Us
                  </a>
                </li>
                 <li className="nav-item">
  <button
    className="btn nav-link"
    onClick={() => {
      localStorage.clear();
      window.location.href = "/login";
    }}
    title="Logout"
  >
    <i className="bi bi-box-arrow-right fs-5"></i>
  </button>
</li>

                {/* {showCategoriesDropdown && (
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="/"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Categories
                    </a>
                    <ul className="dropdown-menu">
                      {categories.map((category) => (
                        <li key={category}>
                          <button
                            className="dropdown-item"
                            onClick={() => handleCategorySelect(category)}
                          >
                            {category}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </li>
                )} */}
              </ul>

              <button
                className="btn btn-link text-dark me-2"
                onClick={toggleTheme}
              >
                {theme === "dark-theme" ? (
                  <i className="bi bi-moon-fill"></i>
                ) : (
                  <i className="bi bi-sun-fill"></i>
                )}
              </button>

              <a href="/cart" className="nav-link text-dark me-3">
                <i className="bi bi-cart"></i>
              </a>

              <div className="position-relative">
                <input
                  className="form-control"
                  type="search"
                  placeholder="Search"
                  value={input}
                  onChange={(e) => handleChange(e.target.value)}
                />
                {showSearchResults && (
                  <ul className="list-group position-absolute top-100 start-0 w-100 z-3">
                    {searchResults.length > 0
                      ? searchResults.map((result) => (
                          <li
                            key={result.id}
                            className="list-group-item"
                            style={{ zIndex: 999 }}
                          >
                            <a
                              href={`/product/${result.id}`}
                              className="search-result-link"
                            >
                              {result.name}
                            </a>
                          </li>
                        ))
                      : noResults && (
                          <li className="list-group-item">No Product found</li>
                        )}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

