import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Admin from "./pages/Admin";
import Customer from "./pages/Customer";
import Validate2FA from "./components/Validate2FA";
import ProtectedRoute from "./components/ProtectedRoute";
import Logout from "./components/Logout";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password/*" element={<ForgotPassword />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/validate2fa" element={<Validate2FA/>} />
        <Route
            path="/admin/*"
            element={
              <ProtectedRoute requiredRole="ADMIN">
                <Admin />
              </ProtectedRoute>
            }
          />
        <Route
            path="/customer/*"
            element={
              <ProtectedRoute requiredRole="CUSTOMER">
                <Customer />
              </ProtectedRoute>
            }
          />
      </Routes>
    </Router>
  );
};

export default App;
