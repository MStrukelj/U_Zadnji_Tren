import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './obavijestForm.css';

function ObavijestForm({ onLogout }) {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        classes: [],
        subject: '',  // Naslov
        description: '' // Tekst
    });

    const availableClasses = ['A', 'B', 'C', 'D', 'E', 'F'];

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

        setUserData(user);
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://backend-latest-in4o.onrender.com/api/activities', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    naslov: formData.subject,
                    tekst: formData.description,
                    classes: formData.classes
                })
            });

            if (!response.ok) throw new Error('Greška pri slanju obavijesti.');

            setFormData({
                classes: [],
                subject: '',
                description: ''
            });

            alert('Obavijest uspješno poslana!');
        } catch (error) {
            console.error('Error:', error);
            alert('Greška pri slanju obavijesti.');
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
                        <button className="sidebar-button">CHAT</button>
                        <Link to="/obavijestForm" className="sidebar-button active">IZRADI OBAVIJEST</Link>
                        <Link to="/statistika" className="sidebar-button">STATISTIKA</Link>
                        <button className="sidebar-button logout" onClick={handleLogout}>ODJAVA</button>
                    </aside>
                )}

                <div className="extra-curricular-container">
                    <h2>IZRADI OBAVIJEST</h2>
                    <form onSubmit={handleSubmit} className="extra-curricular-form">
                        <div className="form-group">
                            <label>Razredi:</label>
                            <div className="class-select-container">
                                {availableClasses.map((classOption) => (
                                    <label key={classOption} className="class-checkbox">
                                        <input
                                            type="checkbox"
                                            checked={formData.classes.includes(classOption)}
                                            onChange={() => handleClassChange(classOption)}
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
