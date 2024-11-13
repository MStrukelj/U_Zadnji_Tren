import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import Home from './components/home';
import Predmeti from './components/predmeti.jsx';
import Raspored from './components/raspored.jsx';
import Potvrde from './components/potvrde.jsx';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [form, setForm] = useState("login");

  // Provjeri autentifikaciju pri učitavanju
  useEffect(() => {
    const checkAuth = () => {
      const userStr = sessionStorage.getItem('user');
      setIsAuthenticated(!!userStr);
    };
    checkAuth();
  }, []);

  const handleAuthentication = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('user');
  };

  // Komponenta za zaštićene rute
  const ProtectedRoute = ({ children }) => {
    const userStr = sessionStorage.getItem('user');
    if (!userStr) {
      return <Navigate to="/" />;
    }
    return children;
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/home" replace />
            ) : (
              form === "login" ? (
                <LogIn FormHandle={setForm} onAuthenticate={handleAuthentication} />
              ) : (
                <SignUp FormHandle={setForm} onAuthenticate={handleAuthentication} />
              )
            )
          }
        />
        
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/predmeti"
          element={
            <ProtectedRoute>
              <Predmeti />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/raspored"
          element={
            <ProtectedRoute>
              <Predmeti />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/potvrde"
          element={
            <ProtectedRoute>
              <Potvrde />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
