import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './obavijestForm.css';

function ObavijestForm({ onLogout }) {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        classes: [],
        subject: '',
        description: '',
        location: null
    });
    const [availableClasses, setAvailableClasses] = useState([]);
    const [showMap, setShowMap] = useState(false);
    const [mapInstance, setMapInstance] = useState(null);
    const [marker, setMarker] = useState(null);


    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/ucenici/classes", {
                    credentials: "include",
                });

                if (!response.ok) throw new Error("Greška prilikom dohvaćanja razreda.");

                const data = await response.json();
                setAvailableClasses(data);
            } catch (error) {
                console.error("Error fetching classes:", error);
                alert("Nije moguće dohvatiti razrede.");
            }
        };

        fetchClasses();

        const userStr = sessionStorage.getItem("user");
        if (!userStr) {
            navigate("/");
            return;
        }

        const user = JSON.parse(userStr);
        if (user.uloga1 !== "N") {
            navigate("/home");
            return;
        }

        setUserData(user);
    }, [navigate]);


    useEffect(() => {
        if (showMap) {
            const map = new google.maps.Map(document.getElementById("map"), {
                center: { lat: 45.815, lng: 15.981 },
                zoom: 8,
            });

            let localMarker = null;

            map.addListener("click", (e) => {
                const clickedLocation = {
                    lat: e.latLng.lat(),
                    lng: e.latLng.lng()
                };

                setFormData(prev => ({
                    ...prev,
                    location: clickedLocation
                }));


                if (localMarker) {
                    localMarker.setPosition(e.latLng);
                } else {

                    localMarker = new google.maps.Marker({
                        position: e.latLng,
                        map: map,
                        title: "Odabrana lokacija"
                    });
                }
            });

            setMapInstance(map);


            return () => {
                setMapInstance(null);
                setMarker(null);
            };
        }
    }, [showMap]);





    const handleSubmit = async (e) => {
        e.preventDefault();

        const requestBody = {
            subject: formData.subject,
            description: formData.description,
            classes: formData.classes,
            location: formData.location,
        };



        console.log("Request body:", requestBody);

        try {
            const response = await fetch('http://localhost:8080/api/activities', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || 'Greška pri slanju obavijesti.');
            }

            setFormData({
                classes: [],
                subject: '',
                description: '',
                location: null
            });

            alert('Obavijest uspješno poslana!');
        } catch (error) {
            console.error('Error:', error);
            alert(`Greška pri slanju obavijesti: ${error.message}`);
        }
    };

    const handleClassChange = (classOption) => {
        setFormData(prev => ({
            ...prev,
            classes: prev.classes.includes(classOption)
                ? prev.classes.filter(c => c !== classOption)
                : [...prev.classes, classOption]
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleLogout = async () => {
        try {
            const response = await fetch('https://backend-latest-in4o.onrender.com/api/auth/logout', {
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
                        <Link to="/obavijestForm" className="sidebar-button active">IZRADI OBAVIJEST</Link>
                        <Link to="/statistika" className="sidebar-button">STATISTIKA</Link>
                        {['A', 'R'].includes(userData?.uloga1) && (
                            <>
                                <Link to="/upravljajKorisnicima" className="sidebar-button active">UPRAVLJANJE KORISNICIMA</Link>
                            </>
                        )}
                        <button className="sidebar-button logout" onClick={handleLogout}>ODJAVA</button>
                    </aside>
                )}

                <div className="extra-curricular-container">
                    <h2>IZRADI OBAVIJEST</h2>
                    <form onSubmit={handleSubmit} className="extra-curricular-form">
                        <div className="form-group">
                            <label>Razredi:</label>
                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(auto-fit, minmax(80px, 1fr))",
                                    gap: "10px",
                                    padding: "10px",
                                    maxHeight: "200px",
                                    overflowY: "auto",
                                    border: "1px solid #ccc",
                                    borderRadius: "5px",
                                }}
                            >
                                {availableClasses.map((classOption) => (
                                    <label
                                        key={classOption}
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "start",
                                            fontSize: "14px",
                                            whiteSpace: "nowrap",
                                        }}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={formData.classes.includes(classOption)}
                                            onChange={() => handleClassChange(classOption)}
                                            style={{
                                                marginRight: "10px",
                                            }}
                                        />
                                        {classOption}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Predmet:</label>
                            <input
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                placeholder="Unesite naziv predmeta"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Opis:</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Unesite opis aktivnosti"
                                rows="4"
                                required
                            />
                        </div>

                        <div className="form-group" style={{marginBottom: '15px'}}>
                            <label>
                                <input
                                    type="checkbox"
                                    onChange={(e) => setShowMap(e.target.checked)}
                                />
                                Lokacija za terensku nastavu
                            </label>
                            {showMap && (
                                <div
                                    id="map"
                                    style={{
                                        width: "100%",
                                        height: "400px",
                                        marginTop: "10px",
                                        border: "1px solid #ccc",
                                        borderRadius: "5px",
                                    }}
                                ></div>
                            )}
                        </div>


                        <button type="submit" className="submit-button">
                            Izradi
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ObavijestForm;
