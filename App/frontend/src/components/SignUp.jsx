import React, { useState } from 'react';

function SignUp({ FormHandle }) {
  // State to keep track of selected options
  const [smjer, setSmjer] = useState([]);
  const [izborniPredmeti, setIzborniPredmeti] = useState([]);

  // Handler to manage changes in Smjer selection
  const handleSmjerChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSmjer([...smjer, value]);
    } else {
      setSmjer(smjer.filter((item) => item !== value));
    }
  };

  // Handler to manage changes in Izborni Predmeti selection
  const handleIzborniPredmetiChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setIzborniPredmeti([...izborniPredmeti, value]);
    } else {
      setIzborniPredmeti(izborniPredmeti.filter((item) => item !== value));
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
            />
            A-Opći</label>
          </div>

          <div className="checkbox-container">
          <label>
            <input
              type="checkbox"
              value="Matematicki"
              onChange={handleSmjerChange}
            />
            B-Informatički</label>
          </div>

          <div className="checkbox-container">
          <label>
            <input
              type="checkbox"
              value="Informaticki"
              onChange={handleSmjerChange}
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
            />
            Francuski</label>
          </div>
          <div className="checkbox-container">
          <label>
            <input
              type="checkbox"
              value="Njemacki"
              onChange={handleIzborniPredmetiChange}
            />
            Njemački-DSD</label>
          </div>
          <div className="checkbox-container">
          <label>
            <input
              type="checkbox"
              value="Astronomija"
              onChange={handleIzborniPredmetiChange}
            />
            Astronomija</label>
          </div>
          
          </div>
        </div>

        <button>REGISTRIRAJ SE</button>
      </form>
      <p onClick={() => FormHandle("login")}>Imate račun? Prijavi se</p>
    </div>
  );
}

export default SignUp;
