import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './materijali.css';

function Materijali({ onLogout }) {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [materials, setMaterials] = useState([]);
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();
    const { subjectId } = useParams(); // Za preuzimanje subjectId iz URL-a

    // Za testiranje pri izradi kartica
    /* useEffect(() => {
        const fetchMaterials = async () => {
            const data = [
                { id: 1, name: "Naziv materijala"},
                { id: 2, name: "Naziv materijala"},
            ];
            setMaterials(data);
        };

        fetchMaterials();
    }, []); */

    useEffect(() => {
        const fetchMaterials = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/predmeti/${subjectId}/materijali`, {
                    credentials: 'include',
                });
                if (!response.ok) throw new Error(`Greška: ${response.statusText}`);
                const data = await response.json();
                setMaterials(data);
            } catch (error) {
                console.error("Greška prilikom dohvaćanja materijala:", error);
            }
        };

        fetchMaterials();
    }, [subjectId]);
    
    
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

    // Funkcija za preuzimanje materijala 
    const handleDownloadClick = (downloadUrl) => {
        // Kreira privremeni "a" element da pokrene preuzimanje
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.setAttribute('download', '');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
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
                        <span className="user-field">{userData?.ime || 'Ime'}</span>
                        <span className="user-field">{userData?.prezime || 'Prezime'}</span>
                    </div>
                    <span className="class-field">{userData?.razred || 'Razred'}</span>
                </div>
            </header>
            
            <div className="main-content">
                {sidebarVisible && (
                    <aside className="sidebar">
                        <Link to="/home" className="sidebar-button">NASLOVNICA</Link>
                        <Link to="/predmeti" className="sidebar-button active">PREDMETI</Link>
                        <Link to="/raspored" className="sidebar-button">KALENDAR</Link>
                        <Link to="/potvrde" className="sidebar-button">POTVRDE</Link>
                        <button className="sidebar-button">CHAT</button>
                        <button className="sidebar-button logout" onClick={handleLogout}>ODJAVA</button>
                    </aside>
                )}
                
                {/* Grid za materijale */}
                <div className="materials-container">
                    <div className="subject-header">Predmet</div>
                    <div className="materials-grid">
                        {materials.map(material => (
                            <div key={material.id} 
                            className="material-card"
                            onClick={() => handleDownloadClick(material.downloadUrl)}
                            style={{ cursor: 'pointer' }}
                            role="button">
                                <span className="material-icon">📚</span>
                                <span className="material-name">{material.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Materijali;