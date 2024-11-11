// src/components/Home.jsx
import React, { useState } from 'react';
import './home.css';
import SkolaImg from '../assets/skola.jpg';

function Home() {
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
                <div className="header-buttons">
                    <button className="header-button">Prijava</button>
                    <button className="header-button">Registracija</button>
                </div>
            </header>

            {/* Sidebar (dropdown menu) */}
            {sidebarVisible && (
                <aside className="sidebar">
                    <button className="sidebar-button">PREDMETI</button>
                    <button className="sidebar-button">KALENDAR</button>
                    <button className="sidebar-button">POTVRDE</button>
                    <button className="sidebar-button">CHAT</button>
                </aside>
            )}

            {/* Main Content */}
            <main className="content">
                <section className="info-section">
                    <img className="info-image" alt="Škola" src={SkolaImg}/>
                    <h2 className="info-title">NEŠTO O NAMA</h2>
                    <p className="info-text">
                        Diplomski studij. Diplomski studij organizira se kroz tri studijska programa,
                        traje dvije godine, a izvode se po sustavu preduvjeta. Doktorski studij. Fakultet
                        je nositelj doktorskog studija iz područja tehničkih znanosti, znanstvenog polja
                        elektrotehnike i znanstvenog polja računarstva.
                    </p>
                </section>
            </main>
        </div>
    );
}

export default Home;
