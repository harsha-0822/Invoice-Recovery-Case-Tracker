import React, { useEffect, useState } from "react";
import { api } from "../api";
import { useParams } from "react-router-dom";

export default function CaseDetail() {
  const { id } = useParams();
  const [caseData, setCaseData] = useState(null);
  const [status, setStatus] = useState("");
  const [notes, setNotes] = useState("");

  // Load case details
  useEffect(() => {
    const fetchCase = async () => {
      const res = await api.get(`/cases/${id}`);
      setCaseData(res.data);
      setStatus(res.data.status);
      setNotes(res.data.last_follow_up_notes || "");
    };
    fetchCase();
  }, [id]);

  const handleUpdate = async () => {
    try {
      await api.patch(`/cases/${id}`, {
        status: status,
        last_follow_up_notes: notes
      });

      alert("Case updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Error updating case");
    }
  };

  if (!caseData) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>Case Details</h2>

      <div style={box}>
        <p><strong>Client:</strong> {caseData.client_name}</p>
        <p><strong>Invoice Number:</strong> {caseData.invoice_number}</p>
        <p><strong>Amount:</strong> ₹{caseData.invoice_amount}</p>
        <p><strong>Invoice Date:</strong> {caseData.invoice_date}</p>
        <p><strong>Due Date:</strong> {caseData.due_date}</p>
      </div>

      {/* Update Status */}
      <div style={{ marginTop: "20px" }}>
        <label><strong>Status</strong></label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={input}
        >
          <option value="New">New</option>
          <option value="In Follow-up">In Follow-up</option>
          <option value="Partially Paid">Partially Paid</option>
          <option value="Closed">Closed</option>
        </select>
      </div>

      {/* Update Notes */}
      <div style={{ marginTop: "20px" }}>
        <label><strong>Last Follow-up Notes</strong></label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          style={{ ...input, height: "100px" }}
        />
      </div>

      <button
        onClick={handleUpdate}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          background: "black",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer"
        }}
      >
        Update
      </button>
    </div>
  );
}

const box = {
  padding: "15px",
  background: "#f9f9f9",
  border: "1px solid #ddd",
  borderRadius: "6px"
};

const input = {
  width: "100%",
  padding: "10px",
  borderRadius: "4px",
  border: "1px solid #ccc"
};
