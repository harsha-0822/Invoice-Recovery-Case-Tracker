import React, { useEffect, useState } from "react";
import { api } from "../api";

export default function CreateCase() {
  const [clients, setClients] = useState([]);
  const [form, setForm] = useState({
    client_id: "",
    invoice_number: "",
    invoice_amount: "",
    invoice_date: "",
    due_date: "",
    status: "New",
    last_follow_up_notes: ""
  });

  // Load clients for dropdown
  useEffect(() => {
    const fetchClients = async () => {
      const res = await api.get("/clients");
      setClients(res.data);
    };
    fetchClients();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/cases", form);
      alert("Case created successfully!");

      setForm({
        client_id: "",
        invoice_number: "",
        invoice_amount: "",
        invoice_date: "",
        due_date: "",
        status: "New",
        last_follow_up_notes: ""
      });
    } catch (err) {
      console.error(err);
      alert("Error creating case");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>Create Case</h2>

      <form onSubmit={handleSubmit}>
        
        {/* Client Dropdown */}
        <div style={{ marginBottom: "10px" }}>
          <label>Client</label>
          <select
            name="client_id"
            value={form.client_id}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc"
            }}
          >
            <option value="">Select Client</option>
            {clients.map((c) => (
              <option key={c.id} value={c.id}>
                {c.client_name}
              </option>
            ))}
          </select>
        </div>

        {/* Remaining Fields */}
        {[
          "invoice_number",
          "invoice_amount",
          "invoice_date",
          "due_date",
          "status",
          "last_follow_up_notes"
        ].map((field) => (
          <div key={field} style={{ marginBottom: "10px" }}>
            <label>{field.replaceAll("_", " ").toUpperCase()}</label>
            <input
              type={field.includes("date") ? "date" : "text"}
              name={field}
              value={form[field]}
              onChange={handleChange}
              required={field !== "last_follow_up_notes"}
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc"
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
