import React from "react";
export default function Button({ children, onClick, type = "button", style }) {
  return (
    <button
      type={type}
      onClick={onClick}
      style={{ padding: "6px 10px", ...style }}
    >
      {children}
    </button>
  );
}
