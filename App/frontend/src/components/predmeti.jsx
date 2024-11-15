// Predmeti.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./predmeti.css";

function Predmeti() {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [subjects, setSubjects] = useState([]);
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    // Dohvaca predmete iz backenda
    useEffect(() => {
        // Dohvaćanje podataka o korisniku iz sessionStorage
        const userStr = sessionStorage.getItem("user");
        if (!userStr) {
            navigate("/");
            return;
        }

        const user = JSON.parse(userStr);
        setUserData(user);

        const fetchSubjects = async () => {
            try {
                const response = await fetch(
                    "http://localhost:8080/api/ucenici/241/predmeti",
                    {
                        credentials: "include",
                    },
                );

                if (!response.ok) {
                    throw new Error(`Greška: ${response.statusText}`);
                }

                const data = await response.json();
                const subjectWithImage = data.map((subject) => {
                    return {
                        ...subject,
                        imageUrl: `src/assets/${subject.sifPredmet}.png`,
                    };
                });
                setSubjects(subjectWithImage); // Spremaju se predmeti u stanje komponente
            } catch (error) {
                console.error("Greška prilikom dohvaćanja predmeta:", error);
            }
        };

        fetchSubjects();
    }, [navigate]);

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
                        <span className="user-field">
                            {userData?.ime || "Ime"}
                        </span>
                        <span className="user-field">
                            {userData?.prezime || "Prezime"}
                        </span>
                    </div>
                    <span className="class-field">
                        {userData?.razred || "Razred"}
                    </span>
                </div>
            </header>

            <div className="main-content">
                {sidebarVisible && (
                    <aside className="sidebar">
                        <Link to="/home" className="sidebar-button">
                            NASLOVNICA
                        </Link>
                        <Link to="/predmeti" className="sidebar-button active">
                            PREDMETI
                        </Link>
                        <Link to="/raspored" className="sidebar-button">
                            KALENDAR
                        </Link>
                        <Link to="/potvrde" className="sidebar-button">
                            POTVRDE
                        </Link>
                        <button className="sidebar-button">CHAT</button>
                    </aside>
                )}

                <div className="subjects-container">
                    <div className="subjects-grid">
                        {subjects.map((subject) => (
                            <div
                                key={subject.sifPredmet}
                                className="subject-card"
                            >
                                <div className="subject-icon-space">
                                    {subject.imageUrl && (
                                        <img
                                            src={subject.imageUrl}
                                            alt={subject.nazPred}
                                            className="subject-icon"
                                        />
                                    )}
                                </div>
                                <div className="subject-name">
                                    <p>{subject.nazPred}</p>
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
