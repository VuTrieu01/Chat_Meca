import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../features/user/Login";
import Home from "../features/home/Home";
import NotFound from "../components/NotFound";

export default function ClientRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
