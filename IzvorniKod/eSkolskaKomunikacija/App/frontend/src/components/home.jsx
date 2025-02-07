import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './home.css';
import SkolaImg from '../assets/skola.jpg';

function Home({ onLogout }) {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [userData, setUserData] = useState(null);
    const [weather, setWeather] = useState(null);
    const [city, setCity] = useState('Zagreb');
    const navigate = useNavigate();

    const API_KEY = 'fef44a173c0db7329768c24b3085ce3d';
    const API_URL = `https://api.openweathermap.org/data/2.5/weather`;

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

    useEffect(() => {
        // Fetch weather data
        const fetchWeather = async () => {
            try {
                const response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric&lang=hr`);
                if (!response.ok) {
                    throw new Error('Neuspješno dohvaćanje vremenskih podataka.');
                }
                const data = await response.json();
                setWeather(data);
            } catch (error) {
                console.error('Error fetching weather data:', error);
                setWeather(null);
            }
        };
        fetchWeather();
    }, [city]);

    const handleLogout = async () => {
        try {
            const response = await fetch('https://backend-latest-in4o.onrender.com/api/auth/logout', {
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
                        {['N', 'A', 'S', 'R'].includes(userData?.uloga1) && (
                            <>
                                <Link to="/predmeti" className="sidebar-button">PREDMETI</Link>
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

                <main className="content">
                    <div className="info-weather-container">
                    <section className="info-section">
                        <img className="info-image" alt="Škola" src={SkolaImg}/>
                        <div className="info-text-container">
                        <h2 className="info-title">NEŠTO O NAMA</h2>
                        <p className="info-text">
                        eŠkola koja nudi tri smjera prilagođena interesima učenika, s ciljem osiguravanja kvalitetnog obrazovanja:

                        Opći smjer: Pruža široko znanje iz različitih područja, idealno za učenike koji žele zadržati raznolike opcije za daljnje obrazovanje.
                        Informatički smjer: Fokusira se na programiranje, tehnologiju i računalne znanosti, pripremajući učenike za izazove u IT sektoru.
                        Matematički smjer: Omogućuje produbljeno znanje iz matematike i logike, namijenjeno učenicima koji se žele usmjeriti prema znanstvenim i tehničkim područjima.
                        </p>
                    </div>
                </section>
                <section className="weather-section">
                        <h2 className="weather-title">Trenutno Vrijeme</h2>
                        <div className="weather-input">
                            <input
                                type="text"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                placeholder="Unesite grad"
                            />
                            <button onClick={() => setCity(city)}>Traži</button>
                        </div>
                            {weather ? (
                                <div className="weather-container">
                                    <p className="weather-city">{weather.name}</p>
                                    <p className="weather-temp">{weather.main.temp}°C</p>
                                    <img
                                        className="weather-icon"
                                        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                                        alt={weather.weather[0].description}
                                    />
                                    <p className="weather-condition">{weather.weather[0].description}</p>
                                    <p className="weather-humidity">Vlažnost: {weather.main.humidity}%</p>
                                </div>
                            ) : city ? (
                                <p className="weather-error">Došlo je do greške prilikom dohvaćanja vremenskih podataka.</p>
                            ) : (
                                <p className="weather-loading">Učitavanje vremenskih podataka...</p>
                            )}
                        </section>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Home;
