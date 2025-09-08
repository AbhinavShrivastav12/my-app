import React, { useState } from 'react';
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';
import MainContent from './components/MainContent';
import './index.css';

function App() {
  const [activeItem, setActiveItem] = useState("Price List");

  return (
    <div className="app-layout">
      <NavBar />
      <div className="app-body">
        <SideBar activeItem={activeItem} setActiveItem={setActiveItem} />
        {/* Only show MainContent when Price List is selected */}
        {activeItem === "Price List" ? <MainContent /> : <div style={{ padding: "20px" }}>Select a menu item</div>}
      </div>
    </div>
  );
}

export default App;
