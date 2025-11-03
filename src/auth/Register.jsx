import React, { useState } from "react";
import { authService } from "../services/authService";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [msg, setMsg] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      await authService.register(form);
      setMsg("Đăng ký thành công. Bạn có thể đăng nhập.");
      setTimeout(() => navigate("/login"), 1000);
    } catch (err) {
      console.error(err);
      setMsg("Đăng ký thất bại.");
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: "0 auto" }}>
      <h2>Đăng ký</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 8 }}>
          <input
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            style={{ width: "100%", padding: 8 }}
            required
          />
        </div>
        <div style={{ marginBottom: 8 }}>
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            style={{ width: "100%", padding: 8 }}
            required
          />
        </div>
        <div style={{ marginBottom: 8 }}>
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            style={{ width: "100%", padding: 8 }}
            required
          />
        </div>
        <div>
          <button type="submit" style={{ padding: "8px 12px" }}>
            Register
          </button>
        </div>
        {msg && <p style={{ marginTop: 8 }}>{msg}</p>}
      </form>
    </div>
  );
}
