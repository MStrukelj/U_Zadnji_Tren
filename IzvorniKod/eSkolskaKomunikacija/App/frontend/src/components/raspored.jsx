import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import "./home.css"
import "./raspored.css";

function Raspored({ onLogout }) {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [userData, setUserData] = useState(null);
    const [raspored, setRaspored] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const userStr = sessionStorage.getItem("user");
        if (!userStr) {
            navigate("/");
            return;
        }

        const user = JSON.parse(userStr);
        setUserData(user);
    }, [navigate]);

    useEffect(() => {
        if (!userData?.razred) return;

        const fetchRaspored = async () => {
            try {
                const response = await fetch(
                    `https://backend-latest-in4o.onrender.com/api/predavanja/razred/${userData.razred}`,
                    {
                        credentials: 'include',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        }
                    }
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log("Fetched schedule data:", data);

                const organizedData = organizeSchedule(data);
                setRaspored(organizedData);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching schedule:", err);
                setError("Failed to load schedule.");
                setLoading(false);
            }
        };

        fetchRaspored();
    }, [userData]);

    const organizeSchedule = (data) => {
        const dayMapping = {
            'Monday': 'Ponedjeljak',
            'Tuesday': 'Utorak',
            'Wednesday': 'Srijeda',
            'Thursday': 'Četvrtak',
            'Friday': 'Petak'
        };

        const subjectMapping = {
            1: 'Hrvatski jezik',
            2: 'Engleski jezik',
            3: 'Njemački jezik',
            4: 'Latinski jezik',
            5: 'Glazbena umjetnost',
            6: 'Likovna umjetnost',
            11: 'Tjelesna i zdravstvena kultura',
            12: 'Matematika',
            14: 'Fizika',
            16: 'Biologija',
            17: 'Kemija',
            18: 'Povijest',
            19: 'Geografija',
            20: 'Informatika',
            22: 'Vjeronauk'
        };

        const organized = {
            "Ponedjeljak": [],
            "Utorak": [],
            "Srijeda": [],
            "Četvrtak": [],
            "Petak": []
        };

        // Log the first few items to verify data structure
        console.log("First few items from database:", data.slice(0, 3));

        data.forEach(lesson => {
            const day = lesson.danUTjednu;
            const croatianDay = dayMapping[day];

            if (!croatianDay) {
                console.error(`Unknown day: ${day}`);
                return;
            }

            organized[croatianDay].push({
                time: `${lesson.vrijemePoc.substring(0, 5)} - ${lesson.vrijemeKraj.substring(0, 5)}`,
                classroom: lesson.oznUcionica,
                subject: subjectMapping[lesson.sifPredmet] || `Predmet ${lesson.sifPredmet}`
            });
        });

        return organized;
    };

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
                onLogout();
                navigate('/');
            }
        } catch (error) {
            console.error('Logout error:', error);
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
                        {['N', 'A', 'S', 'R'].includes(userData?.uloga1) && (
                            <>
                                <Link to="/predmeti" className="sidebar-button">PREDMETI</Link>
                            </>
                        )}
                        <Link to="/raspored" className="sidebar-button active">KALENDAR</Link>
                        {['S', 'A'].includes(userData?.uloga1) && (
                            <>
                                <Link to="/potvrde" className="sidebar-button">POTVRDE</Link>
                            </>
                        )}
                        <Link to="/chat" className="sidebar-button">CHAT</Link>
<<<<<<< Updated upstream
                        {['N', 'A', 'R', 'US'].includes(userData?.uloga1) && (              //N(astavnik), A(dmin), R(avnatelj), US(Ucenicka sluzba)
=======
                        {['N', 'A', 'R', 'US'].includes(userData?.uloga1) && (
>>>>>>> Stashed changes
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

                <main className="schedule-container">
                    <h2>Raspored za {userData?.razred}</h2>
                    {loading ? (
                        <p>Loading schedule...</p>
                    ) : error ? (
                        <p className="error">{error}</p>
                    ) : (
                        <div className="schedule-grid">
                            {Object.entries(raspored).map(([day, lessons]) => (
                                <div key={day} className="schedule-day">
                                    <h3>{day}</h3>
                                    <div className="lessons-list">
                                        {lessons.map((lesson, index) => (
                                            <div key={index} className="lesson-item">
                                                <span className="lesson-time">{lesson.time}</span>
                                                <span className="lesson-subject"> {lesson.subject}</span>
                                                <span className="lesson-classroom">Učionica: {lesson.classroom}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}

<<<<<<< Updated upstream
export default Raspored;
=======
Raspored.propTypes = {
    onLogout: PropTypes.func.isRequired
};

export default Raspored;
>>>>>>> Stashed changes
