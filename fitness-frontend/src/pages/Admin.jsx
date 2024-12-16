import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../components/Admin/Dashboard";
import Profile from "../components/Admin/Profile";
import Logout from "../components/Logout"; 
import Nav from "../components/Admin/Nav"; 
import CreateTrainer from "../components/Admin/CreateTainer"
import ManageTrainer from "../components/Admin/ManageTrainer";
import CreateProgram from "../components/Admin/CreateProgram";
import ManageProgram from "../components/Admin/ManageProgram";

const Admin = () => {
  return (
    <>
      <Nav /> {/* Navigation bar */}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-trainer" element={<CreateTrainer />} />
        <Route path="/all-users" element={<ManageTrainer />} />
        <Route path="/create-program" element={<CreateProgram />} />
        <Route path="/all-programs" element={<ManageProgram />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </>
  );
};

export default Admin;
