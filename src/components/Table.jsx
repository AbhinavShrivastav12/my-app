import React from "react";
import { FaEllipsisH } from "react-icons/fa";

const Table = () => {
  const rows = [
    {
      article: "1234567890",
      product: "This is a test product with fifty characters this!",
      inPrice: "900500",
      price: "1500800",
      unit: "kilometers/hour",
      stock: "2500600",
      description: "This is the description with fifty characters this",
    },
  ];

  return (
    <table className="product-table">
      <thead>
        <tr>
          <th></th> {/* For row arrow */}
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
          <th></th> {/* Ellipsis */}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={index}>
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
            <td>{row.article}</td>
            <td>{row.product}</td>
            <td>{row.inPrice}</td>
            <td>{row.price}</td>
            <td>{row.unit}</td>
            <td>{row.stock}</td>
            <td>{row.description}</td>
            <td className="actions">
              <FaEllipsisH className="action-icon" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
