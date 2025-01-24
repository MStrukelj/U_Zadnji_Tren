
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./home.css"
import "./Raspored.css";

function Raspored({ onLogout }) {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [userData, setUserData] = useState(null);
    const [raspored, setRaspored] = useState({});
    const [isProfesor, setIsProfesor] = useState(false);
    const [isStudent, setIsStudent] = useState(false);
    const [isSat, setIsSat] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedRazred, setSelectedRazred] = useState("");

    const navigate = useNavigate();

    const razrediLista = [
        "1.A", "1.B", "1.C", "1.D", "1.E", "1.F",
        "2.A", "2.B", "2.C", "2.D", "2.E", "2.F",
        "3.A", "3.B", "3.C", "3.D", "3.E", "3.F",
        "4.A", "4.B", "4.C", "4.D", "4.E", "4.F"
    ];

    useEffect(() => {
        const userStr = sessionStorage.getItem("user");
        if (!userStr) {
            navigate("/");
            return;
        }

        const user = JSON.parse(userStr);
        setUserData(user);

        if (user.uloga1 === "N") { 
            setIsProfesor(true);
            setIsStudent(false);
            setIsSat(false);
        } else if (user.uloga1 === "S") { 
            setIsStudent(true);
            setIsProfesor(false);
            setIsSat(false);
        } else if (user.uloga1 === "SAT") { 
            setIsSat(true);
            setIsProfesor(false);
            setIsStudent(false);
        }
    }, [navigate]);

    useEffect(() => {
        if (isSat) {
            if (selectedRazred) {
                fetchRasporedZaRazred(selectedRazred);
            } else {
                setRaspored({});
                setLoading(false);
            }
        } else {
            const fetchRaspored = async () => {
                try {
                    let response;
                    if (isProfesor && userData?.sifNast) {
                        response = await fetch(`http://localhost:5000/api/predavanja/nastavnik/${userData.sifNast}`);
                    } else if (isStudent && userData?.razred) {
                        response = await fetch(`http://localhost:5000/api/predavanja/razred/${userData.razred}`);
                    } else if (isSat) {
                        response = await fetch(`http://localhost:5000/api/predavanja`);
                    } else {
                        setLoading(false);
                        return;
                    }

                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }

                    const data = await response.json();

                    if (isProfesor) {
                        setRaspored(organizeTeacherSchedule(data));
                    } else if (isStudent) {
                        setRaspored(organizeStudentSchedule(data));
                    }

                    setLoading(false);
                } catch (err) {
                    console.error("Error fetching schedule:", err);
                    setError("Failed to load schedule.");
                    setLoading(false);
                }
            };

            fetchRaspored();
        }
    }, [userData, isProfesor, isStudent, isSat, selectedRazred]);

    const determineShift = (oznRazred) => {
        const razredBroj = parseInt(oznRazred.charAt(0), 10);
        if ([1, 2].includes(razredBroj)) {
            return 'A';
        } else if ([3, 4].includes(razredBroj)) {
            return 'B';
        }
        return null;
    };

    const isValidStartTime = (vrijemePoc, shift) => {
        const validTimesA = ["07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00"];
        const validTimesB = ["12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"];
        if (shift === 'A') {
            return validTimesA.includes(vrijemePoc);
        } else if (shift === 'B') {
            return validTimesB.includes(vrijemePoc);
        }
        return false;
    };

    const organizeStudentSchedule = (data) => {
        const organizirani = {};
        data.forEach((item) => {
            const { danUTjednu, vrijemePoc, vrijemeKraj, oznUcionica, sifPredmet, nazPredmet, oznRazred } = item;
            if (!organizirani[danUTjednu]) {
                organizirani[danUTjednu] = {};
            }
            const shift = determineShift(oznRazred);
            const period = getPeriod(vrijemePoc, shift);
            if (period !== -1) {
                organizirani[danUTjednu][period].push({
                    vrijemePoc,
                    vrijemeKraj,
                    oznUcionica,
                    sifPredmet,
                    nazPredmet,
                    oznRazred,
                    sifNast,
                });
            }
        });
        return organizirani;
    };

    const organizeTeacherSchedule = (data) => {
        const organizirani = {};
        data.forEach((item) => {
            const { danUTjednu, vrijemePoc, vrijemeKraj, oznUcionica, sifPredmet, nazPredmet, oznRazred, sifNast } = item;
            if (!organizirani[danUTjednu]) {
                organizirani[danUTjednu] = {};
            }
            const shift = determineShift(oznRazred);
            const period = getPeriod(vrijemePoc, shift);
            if (period !== -1) {
                if (!organizirani[danUTjednu][period]) {
                    organizirani[danUTjednu][period] = [];
                }
                organizirani[danUTjednu][period].push({
                    vrijemePoc,
                    vrijemeKraj,
                    oznUcionica,
                    sifPredmet,
                    nazPredmet,
                    oznRazred,
                    sifNast,
                });
            }
        });
        return organizirani;
    };

    const organizeSatSchedule = (data) => {
        const organizirani = {};
        data.forEach((item) => {
            const { danUTjednu, vrijemePoc, vrijemeKraj, oznUcionica, oznRazred, sifPredmet, sifNast, nazPredmet } = item;
            if (!organizirani[danUTjednu]) {
                organizirani[danUTjednu] = {};
            }
            const shift = determineShift(oznRazred);
            const period = getPeriod(vrijemePoc, shift);
            if (period !== -1) {
                if (!organizirani[danUTjednu][period]) {
                    organizirani[danUTjednu][period] = [];
                }
                organizirani[danUTjednu][period].push({
                    danUTjednu,
                    vrijemePoc,
                    vrijemeKraj,
                    oznUcionica,
                    oznRazred,
                    sifPredmet,
                    sifNast,
                    nazPredmet,
                });
            }
        });
        return organizirani;
    };

    const getPeriod = (vrijemePoc, shift) => {
        if (shift === 'A') {
            const vremenskaMapaA = {
                "07:00": 0,
                "08:00": 1,
                "09:00": 2,
                "10:00": 3,
                "11:00": 4,
                "12:00": 5,
                "13:00": 6,
                "14:00": 7,
                "15:00": 8,
            };
            return vremenskaMapaA[vrijemePoc] !== undefined ? vremenskaMapaA[vrijemePoc] : -1;
        } else if (shift === 'B') {
            const vremenskaMapaB = {
                "12:00": 0,
                "13:00": 1,
                "14:00": 2,
                "15:00": 3,
                "16:00": 4,
                "17:00": 5,
                "18:00": 6,
                "19:00": 7,
                "20:00": 8,
            };
            return vremenskaMapaB[vrijemePoc] !== undefined ? vremenskaMapaB[vrijemePoc] : -1;
        }
        return -1;
    };

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

    const fetchRasporedZaRazred = async (razred) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:5000/api/predavanja/razred/${razred}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setRaspored(organizeSatSchedule(data));
            setLoading(false);
        } catch (err) {
            console.error("Error fetching schedule for class:", err);
            setError("Failed to load schedule for the selected class.");
            setLoading(false);
        }
    };

    const handleEditRaspored = (dan, period, sifPredmet, sifNast) => {
        if (isProfesor || isSat) {

            const predmet = raspored[dan][period].find(p => p.sifPredmet === sifPredmet && p.sifNast === sifNast);
            if (!predmet) return;
    

            const noviPredmet = prompt(
                `Unesite novu šifru predmeta za ${dan}, period ${period + 1}:`,
                predmet.sifPredmet
            );
            if (!noviPredmet || noviPredmet.trim() === "") return;
    

            let noviRazred = predmet.oznRazred;
            if (isSat) {
                noviRazred = prompt(`Unesite novu oznaku razreda za ${dan}, period ${period + 1}:`, predmet.oznRazred);
                if (!noviRazred || noviRazred.trim() === "") return;
            }
    

            const shift = determineShift(noviRazred);
            if (!shift) {
                alert("Nevažeća oznaka razreda.");
                return;
            }
    

            const vrijemePoc = prompt("Unesite novo vrijeme početka (npr. 07:00):", predmet.vrijemePoc);
            if (!vrijemePoc || vrijemePoc.trim() === "") {
                alert("Vrijeme početka je obavezno.");
                return;
            }
    
            if (!isValidStartTime(vrijemePoc.trim(), shift)) {
                alert(`Vrijeme početka ${vrijemePoc} nije validno za smjenu ${shift}.`);
                return;
            }
    
           
            const vrijemeKraj = addMinutes(vrijemePoc.trim(), 45);
    

            const updatedData = {
                sifPredmet: parseInt(noviPredmet.trim()),
                oznRazred: noviRazred.trim(),
                danUTjednu: dan.trim(),
                vrijemePoc: vrijemePoc.trim(),
                vrijemeKraj: vrijemeKraj,
                oznUcionica: predmet.oznUcionica,
                sifNast: predmet.sifNast, 
                nazPredmet: predmet.nazPredmet, 
            };
    
            fetch(`http://localhost:5000/api/predavanja`, { 
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedData),
            })
            .then(async (response) => {
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || "Failed to update schedule.");
                }
                return response.json();
            })
            .then((data) => {
                const updatedRaspored = { ...raspored };
                updatedRaspored[dan][period] = updatedRaspored[dan][period].map(p => 
                    (p.sifPredmet === sifPredmet && p.sifNast === sifNast) 
                        ? { 
                            ...p, 
                            sifPredmet: data.sifPredmet, 
                            nazPredmet: data.nazPredmet, 
                            oznRazred: data.oznRazred,
                            vrijemePoc: data.vrijemePoc,
                            vrijemeKraj: data.vrijemeKraj,

                        } 
                        : p
                );
                setRaspored(updatedRaspored);
            })
            .catch((err) => {
                console.error("Error updating schedule:", err);
                alert(err.message || "Failed to update schedule.");
            });
        }
    };

    const handleDeleteRaspored = (dan, period, sifPredmet, sifNast) => {
        if (isSat) {
            const predmet = raspored[dan][period].find(p => p.sifPredmet === sifPredmet && p.sifNast === sifNast);
            if (!predmet) return;

            if (window.confirm(`Jeste li sigurni da želite izbrisati predavanje ${predmet.nazPredmet} za ${dan}, period ${period + 1}?`)) {
                fetch(`http://localhost:5000/api/predavanja/${sifPredmet}/${sifNast}}`, {
                    method: "DELETE",
                })
                .then(async (response) => {
                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(errorData.message || "Failed to delete schedule.");
                    }
                    return response.json();
                })
                .then((data) => {
                    const updatedRaspored = { ...raspored };
                    updatedRaspored[dan][period] = updatedRaspored[dan][period].filter(p => !(p.sifPredmet === sifPredmet && p.sifNast === sifNast));
                    if (updatedRaspored[dan][period].length === 0) {
                        delete updatedRaspored[dan][period];
                    }
                    setRaspored(updatedRaspored);
                })
                .catch((err) => {
                    console.error("Error deleting schedule:", err);
                    alert(err.message || "Failed to delete schedule.");
                });
            }
        }
    };

    const handleAddRaspored = () => {
        if (isSat && selectedRazred) {
            const dan = prompt("Unesite dan u tjednu (npr. Monday):");
            const vrijemePoc = prompt("Unesite vrijeme početka (npr. 07:00 za A smjenu ili 12:00 za B smjenu):");
            const vrijemeKraj = prompt("Unesite vrijeme kraja (npr. 07:45):");
            const oznUcionica = prompt("Unesite oznaku učionice (npr. J2):");
            const sifPredmet = prompt("Unesite šifru predmeta (npr. MAT):");
            const sifNast = prompt("Unesite šifru nastavnika:");

            if (!dan || !vrijemePoc || !vrijemeKraj || !oznUcionica || !sifPredmet || !sifNast) {
                alert("Sva polja su obavezna.");
                return;
            }

            const shift = determineShift(selectedRazred);
            if (!shift) {
                alert("Nevažeća oznaka razreda.");
                return;
            }

            if (!isValidStartTime(vrijemePoc.trim(), shift)) {
                alert(`Vrijeme početka ${vrijemePoc} nije validno za smjenu ${shift}.`);
                return;
            }

            fetch(`http://localhost:5000/api/predavanja`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    danUTjednu: dan.trim(),
                    vrijemePoc: vrijemePoc.trim(),
                    vrijemeKraj: vrijemeKraj.trim(),
                    oznUcionica: oznUcionica.trim(),
                    oznRazred: selectedRazred.trim(),
                    sifPredmet: parseInt(sifPredmet.trim()),
                    sifNast: parseInt(sifNast.trim()),
                }),
            })
            .then(async (response) => {
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || "Failed to add schedule.");
                }
                return response.json();
            })
            .then((newPredavanje) => {
                const updatedRaspored = { ...raspored };
                if (!updatedRaspored[newPredavanje.danUTjednu]) {
                    updatedRaspored[newPredavanje.danUTjednu] = {};
                }
                const shiftNew = determineShift(newPredavanje.oznRazred);
                const period = getPeriod(newPredavanje.vrijemePoc, shiftNew);
                if (period !== -1) {
                    if (!updatedRaspored[newPredavanje.danUTjednu][period]) {
                        updatedRaspored[newPredavanje.danUTjednu][period] = [];
                    }
                    updatedRaspored[newPredavanje.danUTjednu][period].push({
                        vrijemePoc: newPredavanje.vrijemePoc,
                        vrijemeKraj: newPredavanje.vrijemeKraj,
                        oznUcionica: newPredavanje.oznUcionica,
                        sifPredmet: newPredavanje.sifPredmet,
                        nazPredmet: newPredavanje.nazPredmet,
                        oznRazred: newPredavanje.oznRazred,
                        sifNast: newPredavanje.sifNast,
                    });
                    setRaspored({ ...updatedRaspored });
                }
            })
            .catch((err) => {
                console.error("Error adding schedule:", err);
                alert(err.message || "Failed to add schedule.");
            });
        } else {
            alert("Molimo odaberite razred prije dodavanja predavanja.");
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
                        <Link to="/home" className="sidebar-button active">NASLOVNICA</Link>
                        <Link to="/predmeti" className="sidebar-button">PREDMETI</Link>
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
                                <Link to="/upravljajKorisnicima" className="sidebar-button active">UPRAVLJANJE KORISNICIMA</Link>
                            </>
                        )}  
                        <button className="sidebar-button logout" onClick={handleLogout}>ODJAVA</button>
                    </aside>
                )}
                <main className="contentArea">
                    <h2>Raspored {isProfesor ? "Profesora" : isSat ? "Satnika" : `za ${userData?.razred}`}</h2>
                    
                    {isSat && (
                        <div className="razredSelector">
                            <label htmlFor="razred">Odaberite razred: </label>
                            <select
                                id="razred"
                                className="razredDropdown"
                                value={selectedRazred}
                                onChange={(e) => setSelectedRazred(e.target.value)}
                            >
                                <option value="">-- Odaberi Razred --</option>
                                {razrediLista.map((razred, index) => (
                                    <option key={index} value={razred}>{razred}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    {isSat && selectedRazred && (
                        <div>
                            <button className="addButton" onClick={handleAddRaspored}>
                                Dodaj Predavanje
                            </button>
                        </div>
                    )}

                    {loading ? (
                        <p>Učitavanje rasporeda...</p>
                    ) : error ? (
                        <p>{error}</p>
                    ) : (
                        Object.keys(raspored).length === 0 ? (
                            <p>Nema rasporeda za prikaz.</p>
                        ) : (
                            <div className="scheduleTableContainer">
                                <table className="scheduleTable">
                                    <thead>
                                        <tr>
                                            <th className="tableHeaderCell tableHeader">
                                                Dan u Tjednu
                                            </th>
                                            {[...Array(9)].map((_, index) => (
                                                <th key={index} className="tableHeaderCell tableHeader">
                                                    Period {index + 1}
                                                </th>
                                            ))}
                                            {(isProfesor || isSat) && (
                                                <th className="tableHeaderCell tableHeader">
                                                    Razred
                                                </th>
                                            )}
                                            {isSat && (
                                                <th className="tableHeaderCell tableHeader">
                                                    Akcije
                                                </th>
                                            )}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Object.entries(raspored).map(([dan, periodi]) => (
                                            <tr key={`${dan}`} className="tableRow">
                                                <td className="tableCell">{dan}</td>
                                                {[...Array(9)].map((_, indexPeriod) => (
                                                    <td key={indexPeriod} className="tableCell">
                                                        {periodi[indexPeriod] && periodi[indexPeriod].length > 0 ? (
                                                            periodi[indexPeriod].map((predmet) => (
                                                                <div 
                                                                    key={`${dan}-${predmet.vrijemePoc}-${predmet.sifPredmet}-${predmet.sifNast}`} 
                                                                    className="subjectCell"
                                                                >
                                                                    <span className="subjectName">{predmet.nazPredmet}</span>
                                                                    <span className="subjectTime">
                                                                        {predmet.vrijemePoc} - {predmet.vrijemeKraj}
                                                                    </span>
                                                                    <span className="subjectClassroom">
                                                                        {predmet.oznUcionica}
                                                                    </span>
                                                                    {isSat && (
                                                                        <>
                                                                            <span className="subjectClassroom">
                                                                                Razred: {predmet.oznRazred}
                                                                            </span>
                                                                            <button
                                                                                className="editButton"
                                                                                onClick={() => handleEditRaspored(dan, indexPeriod, predmet.sifPredmet, predmet.sifNast)}
                                                                            >
                                                                                Uredi
                                                                            </button>
                                                                            <button
                                                                                className="deleteButton"
                                                                                onClick={() => handleDeleteRaspored(dan, indexPeriod, predmet.sifPredmet, predmet.sifNast)}
                                                                            >
                                                                                Izbriši
                                                                            </button>
                                                                        </>
                                                                    )}
                                                                    {isProfesor && (
                                                                        <button
                                                                            className="editButton"
                                                                            onClick={() => handleEditRaspored(dan, indexPeriod, predmet.sifPredmet, predmet.sifNast)}
                                                                        >
                                                                            Uredi
                                                                        </button>
                                                                    )}
                                                                </div>
                                                            ))
                                                        ) : (
                                                            "-"
                                                        )}
                                                    </td>
                                                ))}
                                                {(isProfesor || isSat) && (
                                                    <td className="tableCell">
                                                        {(isProfesor && "") || (isSat && "-")}
                                                    </td>
                                                )}
                                                
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )
                    )}
                </main>
            </div>
        </div>
    );
}

export default Raspored;