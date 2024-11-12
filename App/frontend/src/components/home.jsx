// Home.jsx
import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import './home.css';
import SkolaImg from '../assets/skola.jpg';

function Home() {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    
    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };
    
    return (
        <div className="container">
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
            
            <div className="main-content">
                {sidebarVisible && (
                    <aside className="sidebar">
                        <button className="sidebar-button active">NASLOVNICA</button>
                        <Link to="/predmeti" className="sidebar-button">PREDMETI</Link>
                        <Link to="/raspored" className="sidebar-button">KALENDAR</Link>
                        <Link to="/potvrde" className="sidebar-button">POTVRDE</Link>
                        <button className="sidebar-button">CHAT</button>
                    </aside>
                )}
                
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
        </div>
    );
}

export default Home;