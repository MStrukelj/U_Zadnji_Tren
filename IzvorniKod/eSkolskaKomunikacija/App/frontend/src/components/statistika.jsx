import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';
import './statistika.css';

function Statistika({ onLogout }) {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();
    
    // States for different statistics
    const [sifNast, setSifNast] = useState(null);
    const [mostViewed, setMostViewed] = useState([]);
    const [mostDownloaded, setMostDownloaded] = useState([]);
    const [subjectMaterials, setSubjectMaterials] = useState([]);
    const [certificateStats, setCertificateStats] = useState([]);

    // New state for search functionality
    const [materialCode, setMaterialCode] = useState('');
    const [materialStats, setMaterialStats] = useState(null);
    const [jmbag, setJmbag] = useState('');
    const [studentCertStats, setStudentCertStats] = useState(null);

    const fetchSifNast = async (email) => {
        try {
            const response = await fetch(`https://backend-latest-in4o.onrender.com/api/nastavnik/${email}`, {
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error(`Pogreška pri dohvaćanju šifre nastavnika: ${response.statusText}`);
            }
            const sifNastData = await response.json();
            console.log(sifNastData)
            setSifNast(sifNastData);
        } catch (error) {
            console.error('Pogreška pri dohvaćanju šifre nastavnika:', error);
        }
    };


    useEffect(() => {
        const userStr = sessionStorage.getItem('user');
        if (!userStr) {
            navigate('/');
            return;
        }

        const user = JSON.parse(userStr);
        if (user.uloga1 !== 'N') {
            navigate('/home');
            return;
        }
        fetchSifNast(user.email);
    }, [navigate])

    useEffect(() => {
        if (sifNast) {
            const userStr = sessionStorage.getItem('user');
            const user = JSON.parse(userStr)
            console.log(sifNast)
            const updatedUser = { ...user, sifNast };
            sessionStorage.setItem('user', JSON.stringify(updatedUser));
            setUserData(updatedUser);
            fetchStatistics(user.sifNast); }
    }, [sifNast]);

    const fetchStatistics = async (teacherId) => {
        try {
          // Most viewed materials for teacher's subjects
          const viewedResponse = await fetch(
            `https://backend-latest-in4o.onrender.com/api/materijal/stats/mostviewed/${teacherId}`,
            {credentials: "include"});
          const viewedData = await viewedResponse.json();
          const formattedViewedData = viewedData.map(item => ({
                name: item.nazMaterijal,
                views: item.brPregleda
            }));
          setMostViewed(formattedViewedData);

          // Most downloaded materials for teacher's subjects
          const downloadedResponse = await fetch(
              `https://backend-latest-in4o.onrender.com/api/materijal/stats/mostdownloaded/${teacherId}`,
              {credentials: "include"});
          const downloadedData = await downloadedResponse.json();
          const formattedDownloadsData = downloadedData.map(item => ({
                name: item.nazmaterijal,
                downloads: item.brskidanja
            }));
          setMostDownloaded(formattedDownloadsData);


          // Subject materials count
          const subjectsResponse = await fetch(
            `https://backend-latest-in4o.onrender.com/api/materijal/stats/materijalpredmet/${teacherId}`,
            {
              credentials: "include",
            }
          );
          const subjectsData = await subjectsResponse.json();
            const formatedSubjectsData = subjectsData.map(item => ({
                subject: item.nazpred,
                count: item.ukupnoMaterijala
            }));
          setSubjectMaterials(formatedSubjectsData);

          // Certificate statistics
          const certResponse = await fetch(
            "https://backend-latest-in4o.onrender.com/api/potvrda/stats",
            {
              credentials: "include",
            }
          );
          const certData = await certResponse.json();
          const formatedCertData = certData.map(item => ({
                type: item.vrsta,
                downloads: item.ukupno
            }));
          setCertificateStats(formatedCertData);
        } catch (error) {
          console.error("Error fetching statistics:", error);
        }
    };

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/auth/logout', {
                method: 'POST',
                credentials: 'include'
            });
            
            if (response.ok) {
                sessionStorage.clear();
                if (typeof onLogout === 'function') {
                    onLogout();
                }
                navigate('/');
            }
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const handleMaterialSearch = async (e) => {
        e.preventDefault();
        const userStr = sessionStorage.getItem('user');
        const user = JSON.parse(userStr);
        try {
            const response = await fetch(`https://backend-latest-in4o.onrender.com/api/materijal/stats/${user.sifNast}/${materialCode}`, {
                credentials: 'include'
            });
            const data = await response.json();
            const formatedData = {
                name: data.nazmaterijal,
                views: data.brpregleda,
                downloads : data.brskidanja
            };
            setMaterialStats(formatedData);
        } catch (error) {
            console.error('Error fetching material stats:', error);
        }
    };

    const handleJmbagSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://backend-latest-in4o.onrender.com/api/potvrda/stats/${jmbag}`, {
                credentials: 'include'
            });
            const data = await response.json();
            const formatedCertData = data.map(item => ({
                type: item.vrsta,
                downloads: item.brskidanja
            }));
            setStudentCertStats(formatedCertData);
        } catch (error) {
            console.error('Error fetching student certificate stats:', error);
        }
    };

    return (
        <div className="container">
            <header className="header">
                <button className="menu-button" onClick={() => setSidebarVisible(!sidebarVisible)}>
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
                        <Link to="/predmeti" className="sidebar-button">PREDMETI</Link>
                        <Link to="/raspored" className="sidebar-button">KALENDAR</Link>
                        <Link to="/potvrde" className="sidebar-button">POTVRDE</Link>
                        <Link to="/chat" className="sidebar-button">CHAT</Link>
                        <Link to="/obavijestForm" className="sidebar-button">IZRADI OBAVIJEST</Link>
                        <Link to="/statistika" className="sidebar-button active">STATISTIKA</Link>
                        <button className="sidebar-button logout" onClick={handleLogout}>ODJAVA</button>
                    </aside>
                )}

            <div className="statistics-container">
                <h2>Statistika</h2>

                <div className="charts-grid">
                    {/* First section - Most viewed materials */}
                    <div className="chart-container">
                        <h3>Najgledaniji Materijali</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={mostViewed}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="views" fill="#4a3a8b" name="Broj pregleda" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Second section - Most downloaded materials */}
                    <div className="chart-container">
                        <h3>Najpreuzimaji Materijali</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={mostDownloaded}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="downloads" fill="#73a2cd" name="Broj preuzimanja" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Third section - Materials per subject */}
                    <div className="chart-container">
                        <h3>Materijali po Predmetima</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={subjectMaterials}
                                    dataKey="count"
                                    nameKey="subject"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    fill="#4a3a8b"
                                    label
                                />
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Fourth section - Material search */}
                    <div className="search-container">
                        <h3>Pretraži Materijal</h3>
                        <form onSubmit={handleMaterialSearch} className="search-form">
                            <input
                                type="text"
                                value={materialCode}
                                onChange={(e) => setMaterialCode(e.target.value)}
                                placeholder="Unesite kod materijala"
                            />
                            <button type="submit">Pretraži</button>
                        </form>
                        {materialStats && (
                            <div className="stats-result">
                                <h4>Material {materialStats.name}</h4>
                                <p>
                                    <span>Broj pregleda:</span>
                                    <span className="stats-number">{materialStats.views}</span>
                                </p>
                                <p>
                                    <span>Broj preuzimanja:</span>
                                    <span className="stats-number">{materialStats.downloads}</span>
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Fifth section - Certificate types */}
                    <div className="chart-container">
                        <h3>Statistika Potvrda</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={certificateStats}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="type" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="downloads" fill="#4a3a8b" name="Broj preuzimanja" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Sixth section - Student certificate search */}
                    <div className="search-container">
                        <h3>Pretraži Potvrde Studenta</h3>
                        <form onSubmit={handleJmbagSearch} className="search-form">
                            <input
                                type="text"
                                value={jmbag}
                                onChange={(e) => setJmbag(e.target.value)}
                                placeholder="Unesite JMBAG"
                            />
                            <button type="submit">Pretraži</button>
                        </form>
                        {studentCertStats && (
                            <div className="stats-result">
                                <h4>Potvrde:</h4>
                                {studentCertStats.map((cert, index) => (
                                    <p key={index}>
                                        <span>{cert.type}:</span>
                                        <span className="stats-number">{cert.downloads} preuzimanja</span>
                                    </p>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Statistika;