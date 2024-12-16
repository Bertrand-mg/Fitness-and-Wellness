import React, { useState } from "react";
import { sendResetLink } from "../services/api";
import { useNavigate } from "react-router-dom";
const SendLink = () => {
    const [email, setEmail] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
  
    const handleForgotPassword = async (e) => {
      e.preventDefault();
      setErrorMessage("");
      setSuccessMessage("");
      setLoading(true);
  
      try {
        const response = await sendResetLink({ email }); // Use the forgotPassword function
        setSuccessMessage(response.data); // Response contains "Reset link sent to email!"
        setEmail("");
      } catch (error) {
        setErrorMessage(
          error.response?.data || "Server Error. Failed to send reset link. Try again later."
        );
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <div style={styles.container}>
        <h2>Forgot Password</h2>
        <form onSubmit={handleForgotPassword} style={styles.form}>
          <label htmlFor="email" style={styles.label}>
            Email Address:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
  
        {successMessage && <p style={styles.successMessage}>{successMessage}</p>}
        {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>}
  
        <p>
          Remembered your password?{" "}
          <span
            style={styles.link}
            onClick={() => navigate("/login")} // Redirect to login page
          >
            Login here
          </span>
        </p>
      </div>
    );
};

const styles = {
    container: {
      maxWidth: "400px",
      margin: "auto",
      padding: "20px",
      textAlign: "center",
      fontFamily: "Arial, sans-serif",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
    },
    label: {
      textAlign: "left",
      fontWeight: "bold",
    },
    input: {
      padding: "10px",
      fontSize: "16px",
      borderRadius: "5px",
      border: "1px solid #ccc",
    },
    button: {
      padding: "10px",
      fontSize: "16px",
      borderRadius: "5px",
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      cursor: "pointer",
    },
    successMessage: {
      color: "green",
      marginTop: "10px",
    },
    errorMessage: {
      color: "red",
      marginTop: "10px",
    },
    link: {
      color: "#007bff",
      cursor: "pointer",
      textDecoration: "underline",
    },
  };

export default SendLink;
