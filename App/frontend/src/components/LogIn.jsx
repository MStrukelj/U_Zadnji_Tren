import { useState } from "react";
import './login.css';

function LogIn({ FormHandle }) {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    console.log("Sending payload:", {
        email: user,
        lozinka: password
      });
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
        setUser('');
        setPassword('');
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
