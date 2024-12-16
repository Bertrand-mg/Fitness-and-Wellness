import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { validate2FA } from "../services/api";
import  extractUserInfoFromToken  from "../utils/tokenUtils";

const Validate2FA = () => {
  const [twoFactorCode, setTwoFactorCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(email);

      const response = await validate2FA({ email, twoFactorCode });
      if (response.data.startsWith("eyJ")) {
        const token = response.data;
        localStorage.setItem("token", JSON.stringify(token));
        const { role, email } = extractUserInfoFromToken(token);

        if( role === "ADMIN"){
          navigate("/admin");
        }else if( role === "TRAINER"){
          navigate("/trainer");
        }else if(role === "CUSTOMER"){
          navigate("/customer");
        }else{
          navigate("/logout");
        }
      }else{
        setErrorMessage("Invalid 2FA code.");
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      setErrorMessage("Invalid 2FA code.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
      <h2>Validate Two-Factor Authentication</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>
            2FA Code:
            <input
              type="text"
              value={twoFactorCode}
              onChange={(e) => setTwoFactorCode(e.target.value)}
              required
              style={{ width: "100%", padding: "8px", margin: "5px 0" }}
            />
          </label>
        </div>
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
          Validate
        </button>
      </form>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
};

export default Validate2FA;
