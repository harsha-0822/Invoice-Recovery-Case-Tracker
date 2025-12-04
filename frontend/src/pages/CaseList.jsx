import React, { useEffect, useState } from "react";
import { api } from "../api";
import { useNavigate } from "react-router-dom";

export default function CaseList() {
  const [cases, setCases] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  
  const navigate = useNavigate();

  useEffect(() => {
    fetchCases();
  }, []);

  const fetchCases = async () => {
    const res = await api.get("/cases");
    setCases(res.data);
  };

  // Apply filter + sorting
  const filteredCases = cases
    .filter((c) => (statusFilter ? c.status === statusFilter : true))
    .sort((a, b) => {
      const dateA = new Date(a.due_date);
      const dateB = new Date(b.due_date);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

  return (
    <div style={{ padding: "20px" }}>
      <h2>Case List</h2>

      {/* Filters */}
      <div style={{ marginBottom: "15px", display: "flex", gap: "10px" }}>
        
        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{ padding: "8px", borderRadius: "4px" }}
        >
          <option value="">Filter by Status</option>
          <option value="New">New</option>
          <option value="In Follow-up">In Follow-up</option>
          <option value="Partially Paid">Partially Paid</option>
          <option value="Closed">Closed</option>
        </select>

        {/* Sort */}
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          style={{ padding: "8px", borderRadius: "4px" }}
        >
          <option value="asc">Sort: Due Date ↑</option>
          <option value="desc">Sort: Due Date ↓</option>
        </select>
      </div>

      {/* Table */}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          border: "1px solid #ccc"
        }}
      >
        <thead>
          <tr style={{ background: "#f0f0f0" }}>
            <th style={th}>Client</th>
            <th style={th}>Invoice No</th>
            <th style={th}>Amount</th>
            <th style={th}>Due Date</th>
            <th style={th}>Status</th>
          </tr>
        </thead>

        <tbody>
          {filteredCases.map((c) => (
            <tr
              key={c.id}
              onClick={() => navigate(`/case/${c.id}`)}
              style={{ cursor: "pointer" }}
            >
              <td style={td}>{c.client_name}</td>
              <td style={td}>{c.invoice_number}</td>
              <td style={td}>{c.invoice_amount}</td>
              <td style={td}>{c.due_date}</td>
              <td style={td}>{c.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const th = {
  padding: "10px",
  border: "1px solid #ccc",
  textAlign: "left"
};

const td = {
  padding: "10px",
  border: "1px solid #ccc"
};
