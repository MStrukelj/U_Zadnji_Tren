import React, { useState } from "react";
import "./login.css";

function SignUp({ FormHandle }) {
  // State to keep track of form data
  const [formData, setFormData] = useState({
    email: "",
    lozinka: "",
    ime: "",
    prezime: "",
    smjer: "",
    izborniPredmet: ""
  });

  // Handler for input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handler to manage changes in Smjer selection
  const handleSmjerChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setFormData({
        ...formData,
        smjer: value
      });
    } else {
      setFormData({
        ...formData,
        smjer: ""
      });
    }
  };

  // Handler to manage changes in Izborni Predmeti selection
  const handleIzborniPredmetiChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setFormData({
        ...formData,
        izborniPredmet: value
      });
    } else {
      setFormData({
        ...formData,
        izborniPredmet: ""
      });
    }
  };

  // Handler for form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("https://backend-latest-in4o.onrender.com/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Registration successful!");
        FormHandle("login");
      } else {
        const errorData = await response.text();
        alert("Registration failed: " + errorData);
      }
    } catch (error) {
      alert("Error during registration: " + error.message);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="form-container">
        <h2>REGISTRACIJA</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <input
              type="text"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-control">
            <input
              type="password"
              name="lozinka"
              placeholder="Enter your password"
              value={formData.lozinka}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-control">
            <input
              type="text"
              name="ime"
              placeholder="Enter your first name"
              value={formData.ime}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-control">
            <input
              type="text"
              name="prezime"
              placeholder="Enter your last name"
              value={formData.prezime}
              onChange={handleInputChange}
            />
          </div>

          {/* Smjer selection */}
          <div className="form-control">
            <label>
              <b>Smjer:</b>
            </label>
            <div className="checkbox-group">
              <div className="checkbox-container">
                <label>
                  <input
                    type="checkbox"
                    value="A"
                    onChange={handleSmjerChange}
                    checked={formData.smjer === "A"}
                  />
                  A-Opći
                </label>
              </div>

              <div className="checkbox-container">
                <label>
                  <input
                    type="checkbox"
                    value="B"
                    onChange={handleSmjerChange}
                    checked={formData.smjer === "B"}
                  />
                  B-Informatički
                </label>
              </div>

              <div className="checkbox-container">
                <label>
                  <input
                    type="checkbox"
                    value="C"
                    onChange={handleSmjerChange}
                    checked={formData.smjer === "C"}
                  />
                  C-Matematički
                </label>
              </div>
            </div>
          </div>

          {/* Izborni Predmeti selection */}
          <div className="form-control">
            <label>
              <b>Izborni predmeti:</b>
            </label>
            <div className="checkbox-group">
              <div className="checkbox-container">
                <label>
                  <input
                    type="checkbox"
                    value="FRA"
                    onChange={handleIzborniPredmetiChange}
                    checked={formData.izborniPredmet === "FRA"}
                  />
                  Francuski
                </label>
              </div>
              <div className="checkbox-container">
                <label>
                  <input
                    type="checkbox"
                    value="DSD"
                    onChange={handleIzborniPredmetiChange}
                    checked={formData.izborniPredmet === "DSD"}
                  />
                  Njemački-DSD
                </label>
              </div>
              <div className="checkbox-container">
                <label>
                  <input
                    type="checkbox"
                    value="ASTR"
                    onChange={handleIzborniPredmetiChange}
                    checked={formData.izborniPredmet === "ASTR"}
                  />
                  Astronomija
                </label>
              </div>
            </div>
          </div>

          <button type="submit">REGISTRACIJA</button>
        </form>
        <p onClick={() => FormHandle("login")}>
          Already have an account? Login
        </p>
      </div>
    </div>
  );
}

export default SignUp;
