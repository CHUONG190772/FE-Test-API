import React, { useState, useContext } from "react";
import { AuthContext } from "./AuthProvider";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);

  const handle = (e) => {
    e.preventDefault();
    login(username, password)
      .then(() => (window.location.href = "/"))
      .catch((err) => alert("Login failed"));
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handle}>
        <h2
          style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}
        >
          Welcome
        </h2>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
