// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import Home from './components/home';
import Predmeti from './components/predmeti.jsx';
import Raspored from './components/raspored.jsx';
import Potvrde from './components/potvrde.jsx';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // To track if the user is logged in
  const [form, setForm] = useState("login"); // To toggle between LogIn and SignUp

  const handleAuthentication = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <Routes>
        {/* Fast access to home, for testing */}
        <Route path="/" element={<Home />} />
        
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
        <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/" replace />} />
        
        <Route path="/predmeti" element={<Predmeti />} />
        <Route path="/raspored" element={<Raspored />} />
        <Route path="/potvrde" element={<Potvrde />} />
      </Routes>
    </Router>
  );
}

export default App;
