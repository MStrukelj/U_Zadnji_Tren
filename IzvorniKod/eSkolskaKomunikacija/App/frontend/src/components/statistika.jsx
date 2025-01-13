import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './statistika.css';

function Statistika({ onLogout }) {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();
    
    // States for different statistics
    const [mostViewed, setMostViewed] = useState([]);
    const [mostDownloaded, setMostDownloaded] = useState([]);
    const [subjectMaterials, setSubjectMaterials] = useState([]);
    const [certificateStats, setCertificateStats] = useState([]);

    // New state for search functionality
    const [materialCode, setMaterialCode] = useState('');
    const [materialStats, setMaterialStats] = useState(null);
    const [jmbag, setJmbag] = useState('');
    const [studentCertStats, setStudentCertStats] = useState(null);

    /* useEffect(() => {                                                       //FRONT TESTING!!! 
        // Simulate fetching data
        const generateFakeData = () => {
            // Most viewed materials
            const fakeViewedMaterials = [
                { name: "Matematika - Poglavlje 1", views: 245 },
                { name: "Fizika - Uvod", views: 198 },
                { name: "Hrvatski - Esej", views: 187 },
                { name: "Biologija - Stanica", views: 165 },
                { name: "Kemija - Spojevi", views: 156 },
                { name: "Povijest - WWII", views: 143 },
                { name: "Geografija - Klima", views: 134 },
                { name: "Informatika - Python", views: 123 },
                { name: "Engleski - Grammar", views: 112 },
                { name: "Latinski - Glagoli", views: 98 }
            ];
            setMostViewed(fakeViewedMaterials);
    
            // Most downloaded materials
            const fakeDownloadedMaterials = [
                { name: "Matematika - Formule", downloads: 156 },
                { name: "Fizika - Zadaci", downloads: 145 },
                { name: "Hrvatski - Književnost", downloads: 134 },
                { name: "Biologija - Sažetak", downloads: 123 },
                { name: "Kemija - Tablice", downloads: 112 },
                { name: "Povijest - Bilješke", downloads: 98 },
                { name: "Geografija - Karte", downloads: 87 },
                { name: "Informatika - Code", downloads: 76 },
                { name: "Engleski - Vocabulary", downloads: 65 },
                { name: "Latinski - Prijevodi", downloads: 54 }
            ];
            setMostDownloaded(fakeDownloadedMaterials);
    
            // Subject materials count
            const fakeSubjectMaterials = [
                { subject: "Matematika", count: 45 },
                { subject: "Hrvatski", count: 38 },
                { subject: "Engleski", count: 32 },
                { subject: "Fizika", count: 28 },
                { subject: "Kemija", count: 25 },
                { subject: "Biologija", count: 22 }
            ];
            setSubjectMaterials(fakeSubjectMaterials);
    
            // Certificate statistics
            const fakeCertificateStats = [
                { type: "Potvrda o redovitom školovanju", downloads: 234 },
                { type: "Prijepis ocjena", downloads: 156 },
                { type: "Pohvalnica", downloads: 89 },
                { type: "Diploma", downloads: 67 }
            ];
            setCertificateStats(fakeCertificateStats);
        };
    
        generateFakeData();
    }, []); */

    useEffect(() => {
        const userStr = sessionStorage.getItem('user');
        if (!userStr) {
            navigate('/');
            return;
        }
        
        const user = JSON.parse(userStr);
        if (user.role !== 'teacher') {
            navigate('/home');
            return;
        }
        
        setUserData(user);
        fetchStatistics(user.id);
    }, [navigate]);

    // Mock handlers for the search functionalities - FRONT TESTING!!
    /* const handleMaterialSearch = (e) => {
        e.preventDefault();
        // Mock response for material search
        setMaterialStats({
            name: `Material ${materialCode}`,
            views: Math.floor(Math.random() * 200) + 50,
            downloads: Math.floor(Math.random() * 100) + 20
        });
    };

    const handleJmbagSearch = (e) => {
        e.preventDefault();
        // Mock response for JMBAG search
        setStudentCertStats([
            { type: "Potvrda o redovitom školovanju", downloads: Math.floor(Math.random() * 10) + 1 },
            { type: "Prijepis ocjena", downloads: Math.floor(Math.random() * 5) + 1 }
        ]);
    }; */

    const fetchStatistics = async (teacherId) => {
        try {
            // Most viewed materials
            const viewedResponse = await fetch('http://backend-latest-in4o.onrender.com/api/statistics/most-viewed', {
                credentials: 'include'
            });
            const viewedData = await viewedResponse.json();
            setMostViewed(viewedData);

            // Most downloaded materials
            const downloadedResponse = await fetch('http://backend-latest-in4o.onrender.com/api/statistics/most-downloaded', {
                credentials: 'include'
            });
            const downloadedData = await downloadedResponse.json();
            setMostDownloaded(downloadedData);

            // Teacher's materials
            /* const teacherResponse = await fetch(`http://backend-latest-in4o.onrender.com/api/statistics/teacher/${teacherId}/materials`, {
                credentials: 'include'
            });
            const teacherData = await teacherResponse.json();
            setTeacherMaterials(teacherData); */

            // Subject materials count
            const subjectsResponse = await fetch(`http://backend-latest-in4o.onrender.com/api/statistics/subjects/materials`, {
                credentials: 'include'
            });
            const subjectsData = await subjectsResponse.json();
            setSubjectMaterials(subjectsData);

            // Certificate statistics
            const certResponse = await fetch('http://backend-latest-in4o.onrender.com/api/statistics/certificates', {
                credentials: 'include'
            });
            const certData = await certResponse.json();
            setCertificateStats(certData);

        } catch (error) {
            console.error('Error fetching statistics:', error);
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
        try {
            const response = await fetch(`http://backend-latest-in4o.onrender.com/api/statistics/material/${materialCode}`, {
                credentials: 'include'
            });
            const data = await response.json();
            setMaterialStats(data);
        } catch (error) {
            console.error('Error fetching material stats:', error);
        }
    };

    const handleJmbagSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://backend-latest-in4o.onrender.com/api/statistics/student/${jmbag}/certificates`, {
                credentials: 'include'
            });
            const data = await response.json();
            setStudentCertStats(data);
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
                        <button className="sidebar-button">CHAT</button>
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
                                <h4>Material {materialCode}</h4>
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