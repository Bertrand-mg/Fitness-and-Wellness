import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/api";
import  extractUserInfoFromToken  from "../utils/tokenUtils";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await login(formData);

      if (response.data.startsWith("eyJ")) {
        const token = response.data;
        const { role, email } = extractUserInfoFromToken(token);

        localStorage.setItem("token", JSON.stringify(token));

        if(role === "ADMIN"){
          navigate("/admin");
        }else if(role === "TRAINER"){
          navigate("/login");
        }else if(role === "CUSTOMER"){
          navigate("/customer");
        }else{
          navigate("/login");
        }

      } else if (response.data.includes("2FA code sent")) {
        navigate("/validate2fa", { state: { email: formData.email } });
      } else if (response.data.includes("Invalid credentials!")) {
        setErrorMessage("Login failed. Invalid credentials!");
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      setErrorMessage("Server Error login failed.");
    }finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: "8px", margin: "5px 0" }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: "8px", margin: "5px 0" }}
            />
          </label>
        </div>
        <Link to="/forgot-password" style={{ display: "block", marginBottom: "10px", color: "#007bff" }}>
          Forgot Password?
        </Link>
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <p>
        Don't have an account? <Link to="/signup">Sign up here</Link>
      </p>
    </div>
  );
};

export default Login;
