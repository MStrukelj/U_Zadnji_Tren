import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './materijali.css';

function Materijali({ onLogout }) {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [materials, setMaterials] = useState([]);
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
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
            // Reset error state
            setError(null);
            
            // Check if subjectId is available
            if (!subjectId) {
                setError('ID predmeta nije dostupan');
                return;
            }

            try {
                const response = await fetch(`http://backend-latest-in4o.onrender.com/api/predmeti/${subjectId}/materijali`, {
                    credentials: 'include',
                });
                if (!response.ok) throw new Error(`Greška: ${response.statusText}`);
                const data = await response.json();
                setMaterials(data);
            } catch (error) {
                console.error("Greška prilikom dohvaćanja materijala:", error);
                setError('Nije moguće dohvatiti materijale. Molimo pokušajte kasnije.');
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
                // Clear session storage
                sessionStorage.clear();
                
                // Call onLogout if it exists
                if (typeof onLogout === 'function') {
                    onLogout();
                }
                
                // Navigate to login page
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

    // Upload materijala
    const handleUploadClick = async (event) => {
        const file = event.target.files[0];
        if (!file) {
            alert("Molimo odaberite datoteku.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            if (!subjectId) {
                alert("ID predmeta nije dostupan.");
                return;
            }

            const response = await fetch(`http://backend-latest-in4o.onrender.com/api/predmeti/${subjectId}/materijali/upload`, {
                method: "POST",
                body: formData,
                credentials: "include",
            });

            if (response.ok) {
                const result = await response.json();
                alert("Datoteka uspješno učitana!");
                setMaterials((prevMaterials) => [...prevMaterials, result]);
            } else {
                throw new Error(`Greška: ${response.statusText}`);
            }
        } catch (error) {
            console.error("Greška prilikom učitavanja datoteke:", error);
            alert("Nije moguće učitati datoteku. Molimo pokušajte kasnije.");
        }
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
                        {['N', 'A', 'R'].includes(userData?.uloga1) && (              //N(astavnik), A(dmin), R(avnatelj)
                            <>
                                <Link to="/obavijestForm" className="sidebar-button">IZRADI OBAVIJEST</Link>
                                <Link to="/statistika" className="sidebar-button">STATISTIKA</Link>
                            </>
                        )}                      
                        <button className="sidebar-button logout" onClick={handleLogout}>ODJAVA</button>
                    </aside>
                )}
                
                {/* Grid za materijale */}
                <div className="materials-container">
                    <div className="subject-header">Predmet</div>
                    {error ? (
                        <div className="error-message" style={{ textAlign: 'center', color: 'red', margin: '20px' }}>
                            {error}
                        </div>
                    ) : (
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
                    )}

                    {/* Upload Button */}
                    <div className="upload-container">
                        <label htmlFor="file-upload" className="upload-button">
                            Dodaj datoteku
                        </label>
                        <input
                            id="file-upload"
                            type="file"
                            onChange={handleUploadClick}
                            style={{ display: 'none' }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Materijali;
