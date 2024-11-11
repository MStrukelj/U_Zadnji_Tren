// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home';
/* import SomeOtherPage from './components/SomeOtherPage'; */

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                {/* <Route path="/other" element={<SomeOtherPage />} /> */}
            </Routes>
        </Router>
    );
}

export default App;