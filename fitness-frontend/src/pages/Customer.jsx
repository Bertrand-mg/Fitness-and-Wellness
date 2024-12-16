import React from 'react'
import { Routes, Route } from "react-router-dom";
import Dashboard from "../components/Customer/Dashboard";
import Profile from "../components/Admin/Profile";
import Logout from "../components/Logout";
import Nav from "../components/Customer/Nav"; 
import AvailableProgram from '../components/Customer/AvailableProgram';
import MyProgram from '../components/Customer/MyProgram';

function Customer() {
  return (
    <>
      <Nav /> {/* Navigation bar */}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route path="/create-trainer" element={<CreateTrainer />} /> */}
        {/* <Route path="/all-users" element={<ManageTrainer />} /> */}
        {/* <Route path="/create-program" element={<CreateProgram />} /> */}
        <Route path="/available-programs" element={<AvailableProgram />} />
        <Route path="/my-programs" element={<MyProgram />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </>
  );
}

export default Customer
