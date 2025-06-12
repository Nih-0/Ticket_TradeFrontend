import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await axios.post(
        "https://auth-backend-t6m6.onrender.com/api/auth/register",
        formData
      );
      setMessage("Registration successful!");
      // Optional: redirect to login after success
      // navigate("/login");
    } catch (err) {
      console.error(err);
      setMessage(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    }
  };

  return (
    <div
      className="vh-100 d-flex"
      style={{ backgroundColor: "#f97316", width: "100%" }}
    >
      {/* Left side - Info */}
      <div
        className="d-none d-md-flex flex-column justify-content-center align-items-center text-white"
        style={{
          backgroundColor: "#f97316",
          width: "60%",
          paddingLeft: "5rem",
          paddingRight: "2rem",
          textAlign: "center",
        }}
      >
        <h1 className="display-1 fw-bold text-black">TicketTrade</h1>
        <p className="blockquote text-white fw-semibold display-6 ">
          Where Unused Tickets Meet Eager Fans.
        </p>
      </div>

      {/* Right side - Register card */}
      <div
        className="d-flex align-items-center justify-content-center flex-grow-1"
        style={{ width: "100%", maxWidth: "400px", margin: "auto", padding: "2rem" }}
      >
        <div
          className="card p-4 rounded-4 shadow"
          style={{
            width: "100%",
            backgroundColor: "rgba(255,255,255,0.9)",
            backdropFilter: "blur(10px)",
          }}
        >
          <h2 className="text-center mb-4 fw-bold">Register</h2>

          {message && (
            <div className="alert alert-info text-center py-2" role="alert">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-semibold">
                Email address
              </label>
              <input
                type="email"
                className="form-control p-2"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="username" className="form-label fw-semibold">
                Username
              </label>
              <input
                type="text"
                className="form-control p-2"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                placeholder="Enter your username"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="form-label fw-semibold">
                Password
              </label>
              <input
                type="password"
                className="form-control p-2"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              className="btn text-white w-100 py-2 fw-semibold shadow-sm"
              style={{ backgroundColor: "#f97316", color: "white" }}
            >
              Register
            </button>
          </form>

          <p className="mt-3 text-center text-muted">
            Already have an account?{" "}
            <Link to="/login" className="fw-semibold text-decoration-none">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
