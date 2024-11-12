import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import './home.css';
 
function Raspored() {
    const [sidebarVisible, setSidebarVisible] = useState(false);

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    return (
        <div className="container">
            {/* Header with menu button and school logo */}
            <header className="header">
                <button className="menu-button" onClick={toggleSidebar}>
                    ☰
                </button>
                <h1 className="logo">eŠkola</h1>
                <div className="user-container">
                    <div className="user-names">
                        <span className="user-field">Ime</span>
                        <span className="user-field">Prezime</span>
                    </div>
                    <span className="class-field">Class</span>
                </div>
            </header>

            {/* Needs missing materials to style properly! Working functionality*/}
            <div className="main-content">
                {sidebarVisible && (
                    <aside className="left-sidebar">
                        <Link to="/home" className="sidebar-button">NASLOVNICA</Link>
                        <Link to="/predmeti" className="sidebar-button">PREDMETI</Link>
                        <Link to="/raspored" className="sidebar-button active">KALENDAR</Link>
                        <Link to="/potvrde" className="sidebar-button">POTVRDE</Link>
                        <button className="sidebar-button">CHAT</button>
                    </aside>
                )}
            </div>
        </div>
    )
}

export default Raspored;