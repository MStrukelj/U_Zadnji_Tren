import React, { useState } from 'react';
import './login.css';

function SignUp({ FormHandle }) {
  // State to keep track of selected options
  const [smjer, setSmjer] = useState([]);
  const [izborniPredmeti, setIzborniPredmeti] = useState([]);

  // Handler to manage changes in Smjer selection
const handleSmjerChange = (event) => {
  const { value, checked } = event.target;
  if (checked) {
    // Set smjer to an array containing only the selected value
    setSmjer([value]);
  } else {
    // If unchecked, clear the smjer array
    setSmjer([]);
  }
};

// Handler to manage changes in Izborni Predmeti selection
const handleIzborniPredmetiChange = (event) => {
  const { value, checked } = event.target;
  if (checked) {
    // Set izborniPredmeti to an array containing only the selected value
    setIzborniPredmeti([value]);
  } else {
    // If unchecked, clear the izborniPredmeti array
    setIzborniPredmeti([]);
  }
};


  return (
    <div className="form-container">
      <h2>REGISTRACIJA</h2>
      <form>
        <div className="form-control">
          <input type="text" placeholder="Enter your email" />
        </div>

        <div className="form-control">
          <input type="password" placeholder="Enter your password" />
        </div>

        {/* Smjer selection */}
        <div className="form-control">
          <label><b>Smjer:</b></label>
          <div className="checkbox-group">
          <div className="checkbox-container">
          <label>
            <input
              type="checkbox"
              value="Opci"
              onChange={handleSmjerChange}
              checked={smjer.includes("Opci")}
            />
            A-Opći</label>
          </div>

          <div className="checkbox-container">
          <label>
            <input
              type="checkbox"
              value="Informaticki"
              onChange={handleSmjerChange}
              checked={smjer.includes("Informaticki")}
            />
            B-Informatički</label>
          </div>

          <div className="checkbox-container">
          <label>
            <input
              type="checkbox"
              value="Matematicki"
              onChange={handleSmjerChange}
              checked={smjer.includes("Matematicki")}
            />
            C-Matematički</label>
          </div>
          </div>
        </div>

        {/* Izborni Predmeti selection */}
        <div className="form-control">
          <label><b>Izborni predmeti:</b></label>
          <div className="checkbox-group">
          <div className="checkbox-container">
          <label>
            <input
              type="checkbox"
              value="Francuski"
              onChange={handleIzborniPredmetiChange}
              checked={izborniPredmeti.includes("Francuski")}
            />
            Francuski</label>
          </div>
          <div className="checkbox-container">
          <label>
            <input
              type="checkbox"
              value="Njemacki"
              onChange={handleIzborniPredmetiChange}
              checked={izborniPredmeti.includes("Njemacki")}
            />
            Njemački-DSD</label>
          </div>
          <div className="checkbox-container">
          <label>
            <input
              type="checkbox"
              value="Astronomija"
              onChange={handleIzborniPredmetiChange}
              checked={izborniPredmeti.includes("Astronomija")}
            />
            Astronomija</label>
          </div>
          
          </div>
        </div>

        <button>REGISTRACIJA</button>
      </form>
      <p onClick={() => FormHandle("login")}>Already have an account? Login</p>
    </div>
  );
}

export default SignUp;
