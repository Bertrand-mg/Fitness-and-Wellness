import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { resetPassword } from "../services/api";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const token = searchParams.get("token"); // Get token from query params

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await resetPassword(token, newPassword); // Send JSON payload
      setMessage(response.message || "Password reset successfully.");
    } catch (error) {
      setMessage(error.response?.data?.message || "Server Error resetting password.");
    }
  };
  

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <label>
          New Password:
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Reset Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPassword;
