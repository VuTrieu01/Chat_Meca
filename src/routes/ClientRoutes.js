import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../features/user/Login";
import Home from "../features/home/Home";
import Register from "../features/user/Register";
import { useAuth } from "../context/AuthContext";

export default function ClientRoutes() {
  const { currentUser } = useAuth();
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children;
  };
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
