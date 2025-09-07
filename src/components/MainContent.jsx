import React from "react";
import Table from "./Table";
import { FaSearch, FaPlus, FaPrint, FaCogs } from "react-icons/fa";

const MainContent = () => {
  return (
    <main className="main-content">
      <div className="top-controls">
        <div className="search-group">
          <input type="text" placeholder="Search Article No..." />
          <FaSearch className="icon" />
        </div>
        <div className="search-group">
          <input type="text" placeholder="Search Product..." />
          <FaSearch className="icon" />
        </div>

        <button className="btn new-product">
          <FaPlus /> New Product
        </button>
        <button className="btn">
          <FaPrint /> Print List
        </button>
        <button className="btn">
          <FaCogs /> Advanced mode
        </button>
      </div>

      <Table />
    </main>
  );
};

export default MainContent;
