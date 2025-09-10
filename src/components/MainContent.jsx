import React, { useState } from "react";
import Table from "./Table";
import { FaSearch, FaPlus, FaPrint, FaCogs } from "react-icons/fa";

const MainContent = () => {
  const [showForm, setShowForm] = useState(false);
  const [refreshTable, setRefreshTable] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));

    try {
      const res = await fetch(`${API_URL}/invoices`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to add product");

      alert("Product added successfully!");
      setShowForm(false);
      setRefreshTable((prev) => !prev);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <main className="main-content">
     <div className="top-controls">
  <div className="search-wrapper">
    <div className="search-group">
      <input type="text" placeholder="Search Article No..." />
      <FaSearch className="icon" />
    </div>
    <div className="search-group">
      <input type="text" placeholder="Search Product..." />
      <FaSearch className="icon" />
    </div>
  </div>

  <div className="icon-buttons">
    <button className="btn new-product" onClick={() => setShowForm(true)}>
      <span>New Product</span>
       <FaPlus  style={{color: "#66cc66"}}/>
    </button>
    <button className="btn">
      <span>Print List</span>
       <FaPrint />
    </button>
    <button className="btn">
      <span>Advanced mode</span>
       <FaCogs />
    </button>
  </div>
</div>


      {/* Modal Form */}
      {showForm && (
        <div className="modal">
          <form className="modal-form" onSubmit={handleSubmit}>
            <h3>Add New Product</h3>
            <input name="articleNo" placeholder="Article No." required />
            <input name="productOrService" placeholder="Product/Service" required />
            <input name="inPrice" placeholder="In Price" required />
            <input name="price" placeholder="Price" required />
            <input name="unit" placeholder="Unit" required />
            <input name="inStock" placeholder="In Stock" required />
            <input name="description" placeholder="Description" required />
            <div className="modal-buttons">
              <button type="submit" className="btn">Add Product</button>
              <button type="button" className="btn" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Table */}
      <Table refresh={refreshTable} />
    </main>
  );
};

export default MainContent;
