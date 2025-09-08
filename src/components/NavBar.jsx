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

const NavBar = ({ activeItem, setActiveItem }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    <nav className="nav-bar">
      {/* Left Section: Hamburger + User */}
      <div className="left-section">
        <div className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="hamburger-icon"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </div>
        <div className="user-info">
          <div className="user">
            <picture>
              <img src="/User.jpg" alt="User" />
            </picture>
          </div>
          <div className="user-details">
            <h5>John Andre</h5>
            <p>Starfjord AS</p>
          </div>
        </div>
      </div>

      {/* Right Section: Language */}
      <div className="language-selector">
        <p>Norsk Bokmal</p>
        <div className="flag">
          <picture>
            <img src="/image.png" alt="Flag" />
          </picture>
        </div>
      </div>

      {/* Mobile Menu (contains sidebar items) */}
      {isMenuOpen && (
        <div className="mobile-menu">
          <ul>
            {menuItems.map((item) => (
              <li
                key={item.name}
                className={`${activeItem === item.name ? "active" : ""} ${
                  item.disabled ? "disabled" : ""
                }`}
                onClick={() => !item.disabled && setActiveItem(item.name)}
              >
                {activeItem === item.name && <span className="green-dot"></span>}
                {item.icon} {item.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
