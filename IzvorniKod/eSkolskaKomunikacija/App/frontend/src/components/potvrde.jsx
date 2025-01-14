import React, { useState, useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom';
/* import './home.css'; */
import './potvrde.css';
 
function Potvrde() {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Dohvaćanje podataka o korisniku iz sessionStorage
        const userStr = sessionStorage.getItem('user');
        if (!userStr) {
            navigate('/');
            return;
        }
        
        const user = JSON.parse(userStr);
        setUserData(user);
    }, [navigate]);

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/auth/logout', {
                method: 'POST',
                credentials: 'include'
            });
            
            if (response.ok) {
                onLogout(); // Pozivamo onLogout iz App komponente
                navigate('/');
            }
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <div className="container">
            {/* Header with menu button and "school logo" */}
            <header className="header">
                <button className="menu-button" onClick={toggleSidebar}>
                    ☰
                </button>
                <h1 className="logo">eŠkola</h1>
                <div className="user-container">
                    <div className="user-names">
                        <span className="user-field">{userData?.ime || "Ime"}</span>
                        <span className="user-field">{userData?.prezime || "Prezime"}</span>
                    </div>
                    <span className="class-field">{userData?.razred || "Razred"}</span>
                </div>
            </header>

            <div className="main-content">
                {sidebarVisible && (
                    <aside className="sidebar">
                        <Link to="/home" className="sidebar-button">NASLOVNICA</Link>
                        <Link to="/predmeti" className="sidebar-button">PREDMETI</Link>
                        <Link to="/raspored" className="sidebar-button">KALENDAR</Link>
                        <Link to="/potvrde" className="sidebar-button active">POTVRDE</Link>
                        <button className="sidebar-button">CHAT</button>
                        {['N', 'A', 'R'].includes(userData?.role) && (              //N(astavnik), A(dmin), R(avnatelj)
                            <>
                                <Link to="/obavijestForm" className="sidebar-button">IZRADI OBAVIJEST</Link>
                                <Link to="/statistika" className="sidebar-button">STATISTIKA</Link>
                            </>
                        )}
                        <button className="sidebar-button logout" onClick={handleLogout}>ODJAVA</button>
                    </aside>
                )}

                  {/* Potvrde Buttons */}
                  <div className="content-area">
                    <p>Odaberite potvrdu:</p>
                    <div className="buttons-container">
                        {/* Buttons for downloading PDFs */}
                        <a href="/downloads/potvrda1.pdf" download className="potvrda-button">
                            Potvrda 1
                        </a>
                        <a href="/downloads/potvrda2.pdf" download className="potvrda-button">
                            Potvrda 2
                        </a>
                        <a href="/downloads/potvrda3.pdf" download className="potvrda-button">
                            Potvrda 3
                        </a>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Potvrde;