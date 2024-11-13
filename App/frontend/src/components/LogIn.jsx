import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './login.css';

function LogIn({ FormHandle, onAuthenticate }) {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user,
          lozinka: password
        })
      });

      const data = await response.json();

      if (data.success) {
        // Uspješna prijava
        console.log('Prijava uspješna:', data.user);
        // Pozivamo onAuthenticate da ažuriramo stanje u App komponenti
        onAuthenticate();
        // Spremamo podatke o korisniku u sessionStorage
        sessionStorage.setItem('user', JSON.stringify(data.user));
        // Preusmjeravamo na home stranicu
        navigate('/home');
      } else {
        // Neuspješna prijava
        setError(data.message || 'Greška prilikom prijave');
      }
    } catch (err) {
      setError('Došlo je do greške prilikom komunikacije sa serverom');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-wrapper">
      <div className="form-container">
        <h2>PRIJAVA</h2>
        <form onSubmit={handleLogin}>
          <div className="form-control">
            <input
              type="email"
              placeholder="Unesite email"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              required
            />
          </div>

          <div className="form-control">
            <input
              type="password"
              placeholder="Unesite lozinku"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" disabled={loading}>
            {loading ? 'UČITAVANJE...' : 'PRIJAVA'}
          </button>
        </form>
        <p onClick={() => FormHandle("signup")}>
          Novi korisnik? Registriraj se
        </p>
      </div>
    </div>
  );
}

export default LogIn;
