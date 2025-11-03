import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { AuthProvider } from "../auth/AuthProvider";
import Login from "../auth/Login";
import Register from "../auth/Register";
import UsersPage from "../pages/UsersPage";
import CategoriesPage from "../pages/CategoriesPage";
import ProductsPage from "../pages/ProductsPage";
import CartPage from "../pages/CartPage";
import OrdersPage from "../pages/OrdersPage";

export default function Apps() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <nav
          style={{
            padding: 12,
            borderBottom: "1px solid #ddd",
            marginBottom: 12,
          }}
        >
          <Link style={{ marginRight: 12 }} to="/">
            Home
          </Link>
          <Link style={{ marginRight: 12 }} to="/users">
            Users
          </Link>
          <Link style={{ marginRight: 12 }} to="/categories">
            Categories
          </Link>
          <Link style={{ marginRight: 12 }} to="/products">
            Products
          </Link>
          <Link style={{ marginRight: 12 }} to="/cart">
            Cart
          </Link>
          <Link style={{ marginRight: 12 }} to="/orders">
            Orders
          </Link>
          <Link style={{ marginRight: 12 }} to="/login">
            Login
          </Link>
          <Link to="/register">Register</Link>
        </nav>

        <div style={{ padding: 16 }}>
          <Routes>
            <Route path="/" element={<div>API Test</div>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/orders" element={<OrdersPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
