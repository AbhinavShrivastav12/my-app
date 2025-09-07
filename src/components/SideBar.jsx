import React, { useState } from "react";
import {
  FaFileInvoice,
  FaUsers,
  FaBuilding,
  FaBook,
  FaTags,
  FaListUl,
  FaFileInvoiceDollar,
  FaGift,
  FaBoxes,
  FaUserFriends,
  FaExchangeAlt,
  FaSignOutAlt,
} from "react-icons/fa";

const SideBar = () => {
  const [activeItem, setActiveItem] = useState("Price List");

  const menuItems = [
    { name: "Invoices", icon: <FaFileInvoice /> },
    { name: "Customers", icon: <FaUsers /> }, 
    { name: "My Business", icon: <FaBuilding /> },
    { name: "Invoice Journal", icon: <FaBook /> },
    { name: "Price List", icon: <FaTags /> },
    { name: "Multiple Invoicing", icon: <FaListUl /> },
    { name: "Unpaid Invoices", icon: <FaFileInvoiceDollar /> },
    { name: "Offer", icon: <FaGift /> },
    { name: "Inventory Control", icon: <FaBoxes />, disabled: true },
    { name: "Member Invoicing", icon: <FaUserFriends />, disabled: true },
    { name: "Import/Export", icon: <FaExchangeAlt /> },
    { name: "Log out", icon: <FaSignOutAlt /> },
  ];

  return (
    <aside className="sidebar">
      <h3 className="menu-title">Menu</h3>
      <ul>
        {menuItems.map((item) => (
          <li
            key={item.name}
            className={`${activeItem === item.name ? "active" : ""} ${item.disabled ? "disabled" : ""}`}
            onClick={() => !item.disabled && setActiveItem(item.name)}
          >
            {activeItem === item.name && <span className="green-dot"></span>}
            {item.icon} {item.name}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default SideBar;
