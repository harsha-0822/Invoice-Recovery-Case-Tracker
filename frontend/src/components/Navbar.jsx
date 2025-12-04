import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav
      style={{
        background: "black",
        padding: "12px 20px",
        display: "flex",
        gap: "20px"
      }}
    >
      <Link style={link} to="/">Cases</Link>
      <Link style={link} to="/create-client">Create Client</Link>
      <Link style={link} to="/create-case">Create Case</Link>
    </nav>
  );
}

const link = {
  color: "white",
  textDecoration: "none",
  fontSize: "16px"
};
