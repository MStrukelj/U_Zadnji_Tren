import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./materijali.css";

function Materijali({ onLogout }) {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [materials, setMaterials] = useState([]);
    const [userData, setUserData] = useState(null);
    const [sifNast, setSifNast] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { subjectId } = useParams();
    const location = useLocation();
    const { title } = location.state || {};
    const [subjectTitle, setSubjectTitle] = useState(title || "Predmet");

    useEffect(() => {
        const fetchMaterials = async () => {
            setError(null);

            if (!subjectId) {
                setError("ID predmeta nije dostupan.");
                return;
            }

            try {
                const response = await fetch(
                    `http://localhost:8080/api/predmeti/${subjectId}/materijali`,
                    { credentials: "include" }
                );

                if (!response.ok) throw new Error(`Greška: ${response.statusText}`);

                const data = await response.json();
                setMaterials(data);
            } catch {
                setError("Trenutno nema dostupnih materijala.");
            }
        };

        fetchMaterials();
    }, [subjectId]);

    useEffect(() => {
        const userStr = sessionStorage.getItem("user");
        if (!userStr) {
            navigate("/");
            return;
        }
        const user = JSON.parse(userStr);
        setUserData(user);

        if (user.isTeacher && user.email) {
            fetchSifNast(user.email);
        }
    }, [navigate]);

    const fetchSifNast = async (email) => {
        try {
            const response = await fetch(
                `http://localhost:8080/api/nastavnik/${email}`,
                {
                    credentials: "include",
                }
            );

            if (!response.ok) {
                throw new Error(
                    `Pogreška pri dohvaćanju šifre nastavnika: ${response.statusText}`
                );
            }
            const sifNastData = await response.json();
            console.log("Fetched sifNast:", sifNastData);
            setSifNast(sifNastData);
        } catch (error) {
            console.error("Pogreška pri dohvaćanju šifre nastavnika:", error);
        }
    };

    const toggleSidebar = () => setSidebarVisible(!sidebarVisible);

    const handleLogout = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/auth/logout", {
                method: "POST",
                credentials: "include",
            });

            if (response.ok) {
                sessionStorage.clear();
                if (typeof onLogout === "function") onLogout();
                navigate("/");
            }
        } catch {}
    };

    const handleDownloadClick = async (material) => {
        const fileUrl = material.fileUrl; // Ensure fileUrl is correctly retrieved from the material object
        if (!fileUrl) return alert("Nije moguće preuzeti datoteku jer nedostaje URL.");

        try {
            const response = await fetch(
                `http://localhost:8080/api/predmeti/${subjectId}/materijali/download?fileUrl=${encodeURIComponent(fileUrl)}`,
                { method: "GET", credentials: "include" }
            );

            if (!response.ok) throw new Error();

            const blob = await response.blob();
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.setAttribute("download", fileUrl.substring(fileUrl.lastIndexOf("/") + 1));
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            alert("Preuzimanje datoteke nije uspjelo.");
        }
    };



    const handleUploadClick = async (event) => {
        const file = event.target.files[0];
        if (!file) return alert("Molimo odaberite datoteku.");

        const formData = new FormData();
        formData.append("file", file);

        try {
            if (!subjectId) return alert("ID predmeta nije dostupan.");

            const userStr = sessionStorage.getItem("user");
            if (!userStr) {
                return alert("Korisnički podaci nisu pronađeni. Prijavite se ponovno.");
            }

            const user = JSON.parse(userStr);

            const sifNast = user.sifNast;
            if (!sifNast) {
                return alert("Šifra nastavnika nije dostupna.");
            }

            formData.append("sifNast", sifNast);

            const response = await fetch(
                `http://localhost:8080/api/predmeti/${subjectId}/materijali/upload`,
                {
                    method: "POST",
                    body: formData,
                    credentials: "include",
                }
            );

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || "Nepoznata greška");
            }

            const result = await response.json();
            alert("Datoteka uspješno učitana!");
            setMaterials((prev) => [...prev, { fileUrl: result.fileUrl, fileName: file.name }]);
        } catch (error) {
            alert(`Nije moguće učitati datoteku. Razlog: ${error.message}`);
        }
    };



    return (
        <div className="container">
            <header className="header">
                <button className="menu-button" onClick={toggleSidebar}>☰</button>
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
                                <Link to="/predmeti" className="sidebar-button active">PREDMETI</Link>
                            </>
                        )}
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
                <div className="materials-container">
                    <div className="subject-header">{subjectTitle}</div>
                    {error ? (
                        <div className="error-message">{error}</div>
                    ) : (
                        <div className="materials-grid">
                            {materials.map((material, index) => (
                                <div
                                    key={index}
                                    className="material-card"
                                    onClick={() => handleDownloadClick(material)}
                                >
                                    <span className="material-icon">📚</span>
                                    <span className="material-name">{material.fileName}</span>
                                </div>
                            ))}
                        </div>

                    )}
                    {userData?.uloga1 === "N" && (
                        <div className="upload-container">
                            <label htmlFor="file-upload" className="upload-button">Dodaj datoteku</label>
                            <input id="file-upload" type="file" onChange={handleUploadClick} style={{display: "none"}}/>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Materijali;
