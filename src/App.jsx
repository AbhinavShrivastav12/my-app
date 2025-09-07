import React from 'react';
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';
import MainContent from './components/MainContent';
import './index.css';

function App() {
  return (
    <div className="app-layout">
      <NavBar/>
      <div className="app-body">
        <SideBar/>
        <MainContent/>
      </div>
    </div>
  );
}

export default App;
