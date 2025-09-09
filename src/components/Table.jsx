import React, { useEffect, useState } from "react";
import { FaEllipsisH } from "react-icons/fa";

const Table = ({ refresh }) => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeMenu, setActiveMenu] = useState(null); // open 3-dot menu row
  const [editRow, setEditRow] = useState(null); // row being edited

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
      setActiveMenu(null);
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleEdit = (row) => {
    setEditRow(row);
    setActiveMenu(null);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));

    try {
      const res = await fetch(`${API_URL}/invoices/${editRow.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to update product");

      alert("Product updated successfully!");
      setEditRow(null);
      fetchInvoices(); // refresh table
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  if (loading) return <p>Loading invoices...</p>;
  if (error) return <p>Error loading invoices: {error.message}</p>;

  return (
    <>
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
              <td>{row.articleNo}</td>
              <td>{row.productOrService}</td>
              <td>{row.inPrice}</td>
              <td>{row.price}</td>
              <td>{row.unit}</td>
              <td>{row.inStock}</td>
              <td>{row.description}</td>
              <td className="actions" style={{ position: "relative" }}>
                <FaEllipsisH
                  className="action-icon"
                  onClick={() =>
                    setActiveMenu(activeMenu === row.id ? null : row.id)
                  }
                />
                {activeMenu === row.id && (
                  <div className="row-popup">
                    <button className="popup-btn" onClick={() => handleEdit(row)}>
                      Edit
                    </button>
                    <button
                      className="popup-btn delete"
                      onClick={() => handleDelete(row.id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal Form */}
      {editRow && (
        <div className="modal">
          <form className="modal-form" onSubmit={handleUpdate}>
            <h3>Edit Product</h3>
            <input
              name="articleNo"
              defaultValue={editRow.articleNo}
              placeholder="Article No."
              required
            />
            <input
              name="productOrService"
              defaultValue={editRow.productOrService}
              placeholder="Product/Service"
              required
            />
            <input
              name="inPrice"
              defaultValue={editRow.inPrice}
              placeholder="In Price"
              required
            />
            <input
              name="price"
              defaultValue={editRow.price}
              placeholder="Price"
              required
            />
            <input
              name="unit"
              defaultValue={editRow.unit}
              placeholder="Unit"
              required
            />
            <input
              name="inStock"
              defaultValue={editRow.inStock}
              placeholder="In Stock"
              required
            />
            <input
              name="description"
              defaultValue={editRow.description}
              placeholder="Description"
              required
            />
            <div className="modal-buttons">
              <button type="submit" className="btn">
                Save Changes
              </button>
              <button
                type="button"
                className="btn"
                onClick={() => setEditRow(null)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Table;
