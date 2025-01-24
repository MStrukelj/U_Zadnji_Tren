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

        setUserData(user);

        const fetchSubjects = async () => {
            try {
                let endpoint;       //Odredit cemo koji endpoint koristimo ovisno o ulogiranom korisniku
                
                if (user.uloga1 === 'S') {
                    if (!user.JMBAG) {
                        console.error("JMBAG is missing in the user object:", user);
                        navigate("/");
                        return;
                    }
                    endpoint = `https://backend-latest-in4o.onrender.com/api/ucenici/${user.JMBAG}/predmeti`;           //endpoint za ucenike
                } else if (user.uloga1 === 'N') {
                    if (!user.sifNast) {
                        console.error("sifnast is missing in the user object:", user);
                        navigate("/");
                        return;
                    }
                    endpoint = `https://backend-latest-in4o.onrender.com/api/nastavnik/${user.sifNast}/predmeti`;       //endpoint za nastavnike
                } else if (['A', 'R'].includes(user.uloga1)) {
                    endpoint = `https://backend-latest-in4o.onrender.com/api/predmeti`;                                  //Note: nez po cemu ces vuc njihov endpoint pa ako odredis nesto posebno copy paste kod od gornjih ifova
                } else {                                                                              //za provjeru postoji li kod usera i display errora (ako treba), izbrisi ovaj kom nakon :) endpoint za admine i ravnatelja
                    console.error("Invalid user role:", user.uloga1);
                    navigate("/");
                    return;
                }                                                                                    
                
                const response = await fetch(
                    endpoint,
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
            const response = await fetch("https://backend-latest-in4o.onrender.com/api/auth/logout", {
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
                        {['S', 'A'].includes(userData?.uloga1) && (
                            <>
                                <Link to="/potvrde" className="sidebar-button">POTVRDE</Link>
                            </>
                        )}
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
