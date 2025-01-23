import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./predmeti.css";

function Predmeti({ onLogout }) {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [subjects, setSubjects] = useState([]);
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        const userStr = sessionStorage.getItem("user");
        console.log("Raw user data from sessionStorage:", userStr);

        if (!userStr) {
            console.error("User data is missing from sessionStorage.");
            navigate("/");
            return;
        }

        const user = JSON.parse(userStr);
        console.log("Parsed user object:", user);

        if (!user?.JMBAG) {
            console.error("JMBAG is missing in the user object:", user);
            navigate("/");
            return;
        }

        console.log("JMBAG:", user.JMBAG);

        setUserData(user);

        const fetchSubjects = async () => {
            try {
                const response = await fetch(
                    `http://localhost:8080/api/ucenici/${user.JMBAG}/predmeti`,
                    {
                        credentials: "include",
                    }
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
                setSubjects(subjectWithImage);
            } catch (error) {
                console.error("Greška prilikom dohvaćanja predmeta:", error);
            }
        };

        fetchSubjects();
    }, [navigate]);





    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    const handleLogout = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/auth/logout", {
                method: "POST",
                credentials: "include",
            });

            if (response.ok) {
                onLogout();
                navigate("/");
            }
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    const handleSubjectClick = (sifPredmet, nazPred) => {
        navigate(`/predmet/${sifPredmet}`, { state: { title: nazPred } });
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
                        <Link to="/home" className="sidebar-button">NASLOVNICA</Link>
                        <Link to="/predmeti" className="sidebar-button active">PREDMETI</Link>
                        <Link to="/raspored" className="sidebar-button">KALENDAR</Link>
                        <Link to="/potvrde" className="sidebar-button">POTVRDE</Link>
                        <Link to="/chat" className="sidebar-button">CHAT</Link>
                        {['N', 'A', 'R'].includes(userData?.uloga1) && (
                            <>
                                <Link to="/obavijestForm" className="sidebar-button">IZRADI OBAVIJEST</Link>
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

                <div className="subjects-container">
                    <div className="subjects-grid">
                        {subjects.map(subject => (
                            <div
                                key={subject.sifPredmet}
                                className="subject-card"
                                onClick={() => handleSubjectClick(subject.sifPredmet, subject.nazPred)}
                                style={{cursor: "pointer"}}
                                role="button"
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
