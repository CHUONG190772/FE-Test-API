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
    <form onSubmit={handle}>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
      />
      <button type="submit">Login</button>
    </form>
  );
}
