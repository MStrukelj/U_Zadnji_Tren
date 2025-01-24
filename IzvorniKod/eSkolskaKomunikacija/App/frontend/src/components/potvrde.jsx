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
            const response = await fetch('https://backend-latest-in4o.onrender.com/api/auth/logout', {
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
    const handleDownload =async (event,vrsta) => {
        event.preventDefault();
        const email = userData?.email;
        if (!email) {
            console.error('User email not found!');
            return;
        }

        try {
            const response = await fetch(`https://backend-latest-in4o.onrender.com/api/potvrda/${vrsta}/${email}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/pdf',
                },
            });

            if (response.ok) {
                const blob = await response.blob();
                const pdfUrl = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = pdfUrl;
                link.target = '_blank';
                link.download = `potvrda_${vrsta}_${email}.pdf`; // Set the file name
                link.click();
            } else {
                console.error('Error generating PDF');
            }
        } catch (error) {
            console.error('Download error:', error);
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
                        {['N', 'A', 'S', 'R'].includes(userData?.uloga1) && (
                            <>
                                <Link to="/predmeti" className="sidebar-button">PREDMETI</Link>
                            </>
                        )}
                        <Link to="/raspored" className="sidebar-button">KALENDAR</Link>
                        <Link to="/potvrde" className="sidebar-button active">POTVRDE</Link>
                        <Link to="/chat" className="sidebar-button">CHAT</Link>
                        {['N', 'A', 'R', 'US'].includes(userData?.uloga1) && (              //N(astavnik), A(dmin), R(avnatelj), US(Ucenicka sluzba)
                            <>
                                <Link to="/obavijestForm" className="sidebar-button">IZRADI OBAVIJEST</Link>
                            </>
                        )}
                        {['N', 'A', 'R'].includes(userData?.uloga1) && (
                            <>
                                <Link to="/statistika" className="sidebar-button">STATISTIKA</Link>
                            </>
                        )}
                        {['A', 'R'].includes(userData?.uloga1) && (
                            <>
                                <Link to="/upravljajKorisnicima" className="sidebar-button">UPRAVLJANJE KORISNICIMA</Link>
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
                          <button className="potvrda-button" onClick={(event) => handleDownload(event,"S")}>
                              Potvrda o statusu učenika
                          </button>
                          <button className="potvrda-button" onClick={(event) => handleDownload(event,'V')}>
                              Potvrda o volontiranju
                          </button>
                          <button className="potvrda-button" onClick={(event) => handleDownload(event,'I')}>
                              Potvrda o izostanku
                          </button>
                      </div>
                  </div>
            </div>

        </div>
    )
}

export default Potvrde;