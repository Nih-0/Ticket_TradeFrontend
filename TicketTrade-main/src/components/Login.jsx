import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(
        "https://auth-backend-t6m6.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Server error");
    }
  };

  return (
    <div
      className="vh-100 d-flex flex-column flex-md-row"
      style={{ backgroundColor: "#f97316" }}
    >
      {/* Left side - Info */}
      <div
        className="d-none d-md-flex flex-column justify-content-center align-items-center text-white flex-grow-1"
        style={{
          padding: "2rem",
          textAlign: "center",
        }}
      >
        <h1 className="display-1 fw-bold text-black">TicketTrade</h1>
        <p className="blockquote text-white fw-semibold display-6">
          Where Unused Tickets Meet Eager Fans.
        </p>
      </div>

      {/* Right side - Login card */}
      <div
        className="d-flex align-items-center justify-content-center flex-grow-1"
        style={{ padding: "2rem" }}
      >
        <div
          className="card p-4 rounded-4 shadow"
          style={{
            width: "100%",
            maxWidth: "400px",
            backgroundColor: "rgba(255,255,255,0.9)",
            backdropFilter: "blur(10px)",
          }}
        >
          <h2 className="text-center mb-4 fw-bold">Login</h2>

          {error && (
            <div className="alert alert-danger text-center py-2" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label fw-semibold">
                Username
              </label>
              <input
                type="text"
                className="form-control p-2"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              className="btn text-white w-100 py-2 fw-semibold shadow-sm" style={{backgroundColor: "#f97316"}}
              
            >
              Login
            </button>
          </form>

          <p className="mt-3 text-center text-muted">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="fw-semibold text-decoration-none">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;