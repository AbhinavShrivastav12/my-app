import React, { useEffect, useState } from "react";
import { FaEllipsisH } from "react-icons/fa";

const Table = ({ refresh }) => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingCell, setEditingCell] = useState({ rowId: null, field: null });

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchInvoices();
  }, [API_URL, refresh]);

  const fetchInvoices = async () => {
    try {
      const res = await fetch(`${API_URL}/invoices`);
      if (!res.ok) throw new Error("Failed to fetch invoices");
      const data = await res.json();
      setRows(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError(err);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/invoices/${id}`, { method: "DELETE" });
      setRows(rows.filter((row) => row.id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleAutoSave = async (rowId, field, value) => {
    try {
      const rowToUpdate = rows.find((r) => r.id === rowId);
      const updatedRow = { ...rowToUpdate, [field]: value };

      await fetch(`${API_URL}/invoices/${rowId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedRow),
      });

      setRows((prevRows) =>
        prevRows.map((r) => (r.id === rowId ? updatedRow : r))
      );
    } catch (err) {
      console.error("Auto-save failed:", err);
    }
  };

  if (loading) return <p>Loading invoices...</p>;
  if (error) return <p>Error loading invoices: {error.message}</p>;

  return (
    <table className="product-table">
      <thead>
        <tr>
          <th></th>
          <th style={{ whiteSpace: "nowrap" }}>
            Article No.
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="16"
              viewBox="0 0 12 16"
              fill="none"
              stroke="#4da6ff"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ marginLeft: "4px", verticalAlign: "middle" }}
            >
              <line x1="6" y1="0" x2="6" y2="10"></line>
              <polyline points="1 7 6 12 11 7"></polyline>
            </svg>
          </th>
          <th style={{ whiteSpace: "nowrap" }}>
            Product/Service
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="16"
              viewBox="0 0 12 16"
              fill="none"
              stroke="#66cc66"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ marginLeft: "4px", verticalAlign: "middle" }}
            >
              <line x1="6" y1="0" x2="6" y2="10"></line>
              <polyline points="1 7 6 12 11 7"></polyline>
            </svg>
          </th>
          <th>In Price</th>
          <th>Price</th>
          <th>Unit</th>
          <th>In Stock</th>
          <th>Description</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.id}>
            <td className="arrow-cell">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="12"
                viewBox="0 0 40 12"
                fill="none"
                stroke="#3f3ff9"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="0" y1="6" x2="30" y2="6"></line>
                <polyline points="25 1 30 6 25 11"></polyline>
              </svg>
            </td>

            {["articleNo","productOrService","inPrice","price","unit","inStock","description"].map((field) => (
              <td
                key={field}
                onClick={() =>
                  setEditingCell({ rowId: row.id, field })
                }
                style={{fontSize : "small"}}
              >
                {editingCell.rowId === row.id && editingCell.field === field ? (
                  <input
                    type="text"
                    value={row[field]}
                    autoFocus
                    onChange={(e) =>
                      handleAutoSave(row.id, field, e.target.value)
                    }
                    onBlur={() => setEditingCell({ rowId: null, field: null })}
                  />
                ) : (
                  row[field]
                )}
              </td>
            ))}

            <td className="actions" style={{ position: "relative" }}>
              <FaEllipsisH className="action-icon" onClick={() => handleDelete(row.id)} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
