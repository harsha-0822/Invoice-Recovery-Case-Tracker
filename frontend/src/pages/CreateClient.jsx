import React, { useState } from "react";
import { api } from "../api";

export default function CreateClient() {
  const [form, setForm] = useState({
    client_name: "",
    company_name: "",
    city: "",
    contact_person: "",
    phone: "",
    email: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/clients", form);
      alert("Client created successfully!");

      setForm({
        client_name: "",
        company_name: "",
        city: "",
        contact_person: "",
        phone: "",
        email: ""
      });

    } catch (err) {
      console.error(err);
      alert("Error creating client");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
      <h2>Create Client</h2>

      <form onSubmit={handleSubmit}>
        {Object.keys(form).map((field) => (
          <div key={field} style={{ marginBottom: "10px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
              {field.replace("_", " ").toUpperCase()}
            </label>
            <input
              type="text"
              name={field}
              value={form[field]}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px"
              }}
            />
          </div>
        ))}

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            background: "black",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
