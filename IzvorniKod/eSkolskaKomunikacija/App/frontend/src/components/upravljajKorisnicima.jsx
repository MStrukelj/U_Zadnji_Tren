// src/components/UpravljajKorisnicima.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './home.css'; 
import './upravljajKorisnicima.css'; 

function UpravljajKorisnicima({ onLogout }) {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [userData, setUserData] = useState(null);
    const [users, setUsers] = useState([]);
    const [editUser, setEditUser] = useState(null);
    const [deleteUser, setDeleteUser] = useState(null);
    const [newUser, setNewUser] = useState({
        email: '',
        lozinka: '',
        ime: '',
        prezime: '',
        uloga1: 'N', 
        uloga2: '',
    });
    const [error, setError] = useState(null); 
    const navigate = useNavigate();

    const backendUrl = 'http://localhost:8080'; // Namjestiti backend url

    useEffect(() => {
        // Dohvaćanje podataka o korisniku iz sessionStorage
        const userStr = sessionStorage.getItem('user');
        if (!userStr) {
            navigate('/');
            return;
        }

        const user = JSON.parse(userStr);
        setUserData(user);

        fetchUsers();
    }, [navigate]);

    // Funkcija za dohvaćanje svih korisnika
    const fetchUsers = async () => {
        try {
            const response = await fetch(`${backendUrl}/api/korisnici`, {
                method: 'GET',
                credentials: 'include', 
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
            setError(error.message);
        }
    };

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    // Funkcija za rukovanje promjenama u formi za dodavanje novog korisnika
    const handleInputChange = (e, userType = 'newUser') => {
        const { name, value } = e.target;
        if (userType === 'newUser') {
            setNewUser(prev => ({ ...prev, [name]: value }));
        } else if (userType === 'editUser') {
            setEditUser(prev => ({ ...prev, [name]: value }));
        }
    };

    // Funkcija za dodavanje novog korisnika
    const handleAddUser = async (e) => {
        e.preventDefault();
        const userExists = users.some(u => u.email === newUser.email);
        if (userExists) {
            alert('Korisnik s tim email-om već postoji.');
            return;
        }

        try {
            const response = await fetch(`${backendUrl}/api/korisnici`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const addedUser = await response.json();
            setUsers([...users, addedUser]);
            alert('Novi korisnik je uspješno dodan.');
            setNewUser({
                email: '',
                lozinka: '',
                ime: '',
                prezime: '',
                uloga1: 'N',
                uloga2: '',
            });
        } catch (error) {
            console.error('Error adding user:', error);
            setError(error.message);
            alert('Došlo je do greške prilikom dodavanja korisnika.');
        }
    };

    // Funkcija za otvaranje modala za uređivanje korisnika
    const handleEdit = (user) => {
        setEditUser(user);
    };

    // Funkcija za otvaranje modala za brisanje korisnika
    const handleDelete = (user) => {
        setDeleteUser(user);
    };

    // Funkcija za potvrdu brisanja korisnika
    const confirmDelete = async () => {
        try {
            const response = await fetch(`${backendUrl}/api/korisnici/${deleteUser.email}`, {
                method: 'DELETE',
                credentials: 'include', 
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            setUsers(users.filter(u => u.email !== deleteUser.email));
            alert('Korisnik je uspješno obrisan.');
            setDeleteUser(null);
        } catch (error) {
            console.error('Error deleting user:', error);
            setError(error.message);
            alert('Došlo je do greške prilikom brisanja korisnika.');
        }
    };

    // Funkcija za ažuriranje korisnika
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${backendUrl}/api/korisnici/${editUser.email}`, {
                method: 'PUT',
                credentials: 'include', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editUser),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const updatedUser = await response.json();
            setUsers(users.map(u => u.email === updatedUser.email ? updatedUser : u));
            alert('Korisnik je uspješno ažuriran.');
            setEditUser(null);
        } catch (error) {
            console.error('Error updating user:', error);
            setError(error.message);
            alert('Došlo je do greške prilikom ažuriranja korisnika.');
        }
    };

    // Funkcija za odjavu korisnika
    const handleLogout = async () => {
        try {
            const response = await fetch(`${backendUrl}/api/auth/logout`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                onLogout(); 
                navigate('/');
            } else {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        } catch (error) {
            console.error('Logout error:', error);
            setError(error.message);
            alert('Došlo je do greške prilikom odjave.');
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
                        {['N', 'A', 'S', 'R'].includes(userData?.uloga1) && (
                            <>
                                <Link to="/predmeti" className="sidebar-button">PREDMETI</Link>
                            </>
                        )}
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

                <main className="content">
                    <h2>Upravljanje Korisnicima</h2>

                    {error && (
                        <div className="error-message">
                            <h4>Došlo je do greške:</h4>
                            <p>{error}</p>
                        </div>
                    )}

                    
                    <div className="add-user-section">
                        <h3>Dodavanje Novog Korisnika</h3>
                        <form onSubmit={handleAddUser}>
                            <div className="form-group">
                                <label>Email:</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={newUser.email}
                                    onChange={(e) => handleInputChange(e, 'newUser')}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Lozinka:</label>
                                <input
                                    type="password"
                                    name="lozinka"
                                    value={newUser.lozinka}
                                    onChange={(e) => handleInputChange(e, 'newUser')}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Ime:</label>
                                <input
                                    type="text"
                                    name="ime"
                                    value={newUser.ime}
                                    onChange={(e) => handleInputChange(e, 'newUser')}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Prezime:</label>
                                <input
                                    type="text"
                                    name="prezime"
                                    value={newUser.prezime}
                                    onChange={(e) => handleInputChange(e, 'newUser')}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Uloga 1:</label>
                                <input
                                    type="text"
                                    name="uloga1"
                                    value={newUser.uloga1}
                                    disabled // Uloga1 je fiksirana na "N"
                                />
                            </div>
                            <div className="form-group">
                                <label>Uloga 2:</label>
                                <input
                                    type="text"
                                    name="uloga2"
                                    value={newUser.uloga2}
                                    onChange={(e) => handleInputChange(e, 'newUser')}
                                    placeholder="(opcionalno)"
                                />
                            </div>
                            <button type="submit">Dodaj Nastavnika</button>
                        </form>
                    </div>

                    {/* Lista korisnika */}
                    <div className="users-list-section">
                        <h3>Svi Korisnici</h3>
                        {users.length === 0 ? (
                            <p>Nema korisnika za prikaz.</p>
                        ) : (
                            <table className="users-table">
                                <thead>
                                    <tr>
                                        <th>Email</th>
                                        <th>Ime</th>
                                        <th>Prezime</th>
                                        <th>Uloge</th>
                                        <th>Akcije</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map(user => (
                                        <tr key={user.email}>
                                            <td>{user.email}</td>
                                            <td>{user.ime}</td>
                                            <td>{user.prezime}</td>
                                            <td>{user.uloga1}{user.uloga2 ? `, ${user.uloga2}` : ''}</td>
                                            <td>
                                                <button onClick={() => handleEdit(user)}>Uredi</button>
                                                <button onClick={() => handleDelete(user)}>Briši</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>

                    
                    {editUser && (
                        <div className="modal">
                            <div className="modal-content">
                                <span className="close" onClick={() => setEditUser(null)}>&times;</span>
                                <h3>Uređivanje Korisnika</h3>
                                <form onSubmit={handleUpdate}>
                                    <div className="form-group">
                                        <label>Email:</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={editUser.email}
                                            disabled // Email se ne može mijenjati
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Lozinka:</label>
                                        <input
                                            type="password"
                                            name="lozinka"
                                            value={editUser.lozinka}
                                            onChange={(e) => handleInputChange(e, 'editUser')}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Ime:</label>
                                        <input
                                            type="text"
                                            name="ime"
                                            value={editUser.ime}
                                            onChange={(e) => handleInputChange(e, 'editUser')}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Prezime:</label>
                                        <input
                                            type="text"
                                            name="prezime"
                                            value={editUser.prezime}
                                            onChange={(e) => handleInputChange(e, 'editUser')}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Uloga 1:</label>
                                        <input
                                            type="text"
                                            name="uloga1"
                                            value={editUser.uloga1}
                                            disabled // Održavanje trenutne uloge1
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Uloga 2:</label>
                                        <input
                                            type="text"
                                            name="uloga2"
                                            value={editUser.uloga2}
                                            onChange={(e) => handleInputChange(e, 'editUser')}
                                            placeholder="npr. ravnatelj (opcionalno)"
                                        />
                                    </div>
                                    <button type="submit">Spremi Promjene</button>
                                </form>
                            </div>
                        </div>
                    )}

                    
                    {deleteUser && (
                        <div className="modal">
                            <div className="modal-content">
                                <span className="close" onClick={() => setDeleteUser(null)}>&times;</span>
                                <h3>Potvrda za Brisanje</h3>
                                <p>Jeste li sigurni da želite obrisati korisnika <strong>{deleteUser.email}</strong>?</p>
                                <button onClick={confirmDelete}>Da, obriši</button>
                                <button onClick={() => setDeleteUser(null)}>Ne, odustani</button>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}

export default UpravljajKorisnicima;
