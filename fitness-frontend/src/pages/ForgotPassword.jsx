import React from "react";
import { Routes, Route } from "react-router-dom";
import SendLink from "../components/SendLink";
import ResetPassword from "../components/ResetPassword";

const ForgotPassword = () => {
  return (
    <Routes>
      <Route path="/" element={<SendLink />} />
      <Route path="/reset-password/*" element={<ResetPassword />} />
    </Routes>
  );
};

export default ForgotPassword;
