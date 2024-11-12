// Predmeti.jsx
import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import './predmeti.css';

function Predmeti() {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [subjects, setSubjects] = useState([]);

    
    useEffect(() => {       
        const fetchSubjects = async () => {
            // Placeholder backend data (supposed to be supplied from backend)
            const data = [
                { 
                    id: 1, 
                    name: "Predmet", 
                    iconUrl: "/path-to-icon.svg"  // Needs replacement
                },
                { 
                    id: 2, 
                    name: "Predmet", 
                    iconUrl: "/path-to-icon.svg" 
                },
                // ... 
            ];
            setSubjects(data);
        };

        fetchSubjects();
    }, []);

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
                <div className="left-sidebar">
                    <button className="nav-button active">NASLOVNICA</button>
                    <button className="nav-button">KALENDAR</button>
                    <button className="nav-button">POTVRDE</button>
                    <button className="nav-button">CHAT</button>
                </div>

                {sidebarVisible && (
                    <aside className="sidebar">
                        <Link to="/" className="sidebar-button">NASLOVNICA</Link>
                        <Link to="/raspored" className="sidebar-button">KALENDAR</Link>
                        <Link to="/potvrde" className="sidebar-button">POTVRDE</Link>
                        <button className="sidebar-button">CHAT</button>
                    </aside>
                )}

                <div className="subjects-container">
                    <div className="subjects-grid">
                        {subjects.map(subject => (
                            <div key={subject.id} className="subject-card">
                                <div className="subject-icon-space">
                                    {subject.iconUrl && (
                                        <img 
                                            src={subject.iconUrl} 
                                            alt={subject.name} 
                                            className="subject-icon"
                                        />
                                    )}
                                </div>
                                <div className="subject-name">
                                    <p>{subject.name}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Predmeti;