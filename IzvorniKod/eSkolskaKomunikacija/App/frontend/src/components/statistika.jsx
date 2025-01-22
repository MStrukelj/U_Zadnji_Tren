import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell
} from "recharts";
import "./statistika.css";

function Statistika({ onLogout }) {
  const COLORS = ['#4a3a8b', '#73a2cd', '#8884d8', '#82ca9d', '#ffc658', '#ff7300'];

  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // States for different statistics
  const [sifNast, setSifNast] = useState(null);
  const [mostViewed, setMostViewed] = useState([]);
  const [mostDownloaded, setMostDownloaded] = useState([]);
  const [subjectMaterials, setSubjectMaterials] = useState([]);
  const [certificateStats, setCertificateStats] = useState([]);

  // States for search functionality
  const [materialCode, setMaterialCode] = useState("");
  const [materialStats, setMaterialStats] = useState(null);
  const [jmbag, setJmbag] = useState("");
  const [studentCertStats, setStudentCertStats] = useState(null);
  const [materialError, setMaterialError] = useState(false);
  const [jmbagError, setJmbagError] = useState(false);

  const fetchSifNast = async (email) => {
    try {
      const response = await fetch(
        `https://backend-latest-in4o.onrender.com/api/nastavnik/${email}`,
        {
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(
          `Pogreška pri dohvaćanju šifre nastavnika: ${response.statusText}`
        );
      }
      const sifNastData = await response.json();
      console.log(sifNastData);
      setSifNast(sifNastData);
    } catch (error) {
      console.error("Pogreška pri dohvaćanju šifre nastavnika:", error);
    }
  };

  useEffect(() => {
    const userStr = sessionStorage.getItem("user");
    if (!userStr) {
      navigate("/");
      return;
    }

    const user = JSON.parse(userStr);
    if (!["N", "A", "R"].includes(user.uloga1)) {
      navigate("/home");
      return;
    }
    fetchSifNast(user.email);
  }, [navigate]);

  useEffect(() => {
    if (sifNast) {
      const userStr = sessionStorage.getItem("user");
      const user = JSON.parse(userStr);
      console.log(sifNast);
      const updatedUser = { ...user, sifNast };
      sessionStorage.setItem("user", JSON.stringify(updatedUser));
      setUserData(updatedUser);
      fetchStatistics(user.sifNast);
    }
  }, [sifNast]);

  const fetchStatistics = async (teacherId) => {
    setLoading(true); // Start loading
    try {
      // Most viewed materials for teacher's subjects
      const viewedResponse = await fetch(
        `https://backend-latest-in4o.onrender.com/api/materijal/stats/mostviewed/${teacherId}`,
        { credentials: "include" }
      );
      if(viewedResponse.status === 200) {
      const viewedData = await viewedResponse.json();
      const formattedViewedData = viewedData.map((item) => ({
        name: item.nazMaterijal,
        views: item.brPregleda,
      }));
      setMostViewed(formattedViewedData);}

      // Most downloaded materials for teacher's subjects
      const downloadedResponse = await fetch(
        `https://backend-latest-in4o.onrender.com/api/materijal/stats/mostdownloaded/${teacherId}`,
        { credentials: "include" }
      );
      if(downloadedResponse.status === 200){
      const downloadedData = await downloadedResponse.json();
      const formattedDownloadsData = downloadedData.map((item) => ({
        name: item.nazmaterijal,
        downloads: item.brskidanja,
      }));
      setMostDownloaded(formattedDownloadsData);}

      // Subject materials count
      const subjectsResponse = await fetch(
        `https://backend-latest-in4o.onrender.com/api/materijal/stats/materijalpredmet/${teacherId}`,
        {
          credentials: "include",
        }
      );
      if(subjectsResponse.status === 200){
      const subjectsData = await subjectsResponse.json();
      const formatedSubjectsData = subjectsData.map((item) => ({
        subject: item.nazpred,
        count: item.ukupnoMaterijala,
      }));
      setSubjectMaterials(formatedSubjectsData);}

      // Certificate statistics
      const certResponse = await fetch(
        "https://backend-latest-in4o.onrender.com/api/potvrda/stats",
        {
          credentials: "include",
        }
      );
      if(certResponse.status === 200){
      const certData = await certResponse.json();
      const formatedCertData = certData.map((item) => ({
        type: item.vrsta,
        downloads: item.ukupno,
      }));
      setCertificateStats(formatedCertData); }
    } catch (error) {
      console.error("Error fetching statistics:", error);
    } finally {
      setLoading(false); // End loading
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("https://backend-latest-in4o.onrender.com/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        sessionStorage.clear();
        if (typeof onLogout === "function") {
          onLogout();
        }
        navigate("/");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleMaterialSearch = async (e) => {
    e.preventDefault();
    setMaterialError(false); // Reset error state
    setMaterialStats(null); // Reset previous results
    const userStr = sessionStorage.getItem("user");
    const user = JSON.parse(userStr);
    try {
      const response = await fetch(
        `https://backend-latest-in4o.onrender.com/api/materijal/stats/${user.sifNast}/${materialCode}`,
        {
          credentials: "include",
        }
      );
      if (!response.ok) {
        setMaterialError(true);
        return;
      }
      const data = await response.json();
      if (!data || !data.nazmaterijal) {
        setMaterialError(true);
        return;
      }
      const formatedData = {
        name: data.nazmaterijal,
        views: data.brpregleda,
        downloads: data.brskidanja,
      };
      setMaterialStats(formatedData);
    } catch (error) {
      console.error("Error fetching material stats:", error);
      setMaterialError(true);
    }
  };

  const handleJmbagSearch = async (e) => {
    e.preventDefault();
    setJmbagError(false); // Reset error state just like in material search ^
    setStudentCertStats(null); // Also reset previous results
    try {
      const response = await fetch(
        `https://backend-latest-in4o.onrender.com/api/potvrda/stats/${jmbag}`,
        {
          credentials: "include",
        }
      );
      if (!response.ok) {
        setJmbagError(true);
        return;
      }
      const data = await response.json();
      if (!data || data.length === 0) {
        setJmbagError(true);
        return;
      }
      const formatedCertData = data.map((item) => ({
        type: item.vrsta,
        downloads: item.brskidanja,
      }));
      setStudentCertStats(formatedCertData);
    } catch (error) {
      console.error("Error fetching student certificate stats:", error);
      setJmbagError(true);
    }
  };

  return (
    <div className="container">
      <header className="header">
        <button
          className="menu-button"
          onClick={() => setSidebarVisible(!sidebarVisible)}
        >
          ☰
        </button>
        <h1 className="logo">eŠkola</h1>
        <div className="user-container">
          <div className="user-names">
            <span className="user-field">{userData?.ime || "Ime"}</span>
            <span className="user-field">{userData?.prezime || "Prezime"}</span>
          </div>
          <span className="class-field">{userData?.razred || "Razred"}</span>
        </div>
      </header>

      <div className="main-content">
        {sidebarVisible && (
          <aside className="sidebar">
            <Link to="/home" className="sidebar-button">
              NASLOVNICA
            </Link>
            <Link to="/predmeti" className="sidebar-button">
              PREDMETI
            </Link>
            <Link to="/raspored" className="sidebar-button">
              KALENDAR
            </Link>
            <Link to="/potvrde" className="sidebar-button">
              POTVRDE
            </Link>
            <Link to="/chat" className="sidebar-button">
              CHAT
            </Link>
            <Link to="/obavijestForm" className="sidebar-button">
              IZRADI OBAVIJEST
            </Link>
            <Link to="/statistika" className="sidebar-button active">
              STATISTIKA
            </Link>
            <button className="sidebar-button logout" onClick={handleLogout}>
              ODJAVA
            </button>
          </aside>
        )}

        {loading ? (
          <div className="loading-spinner">
            <p>Loading...</p>
          </div>
        ) : (
          <div className="statistics-container">
            <h2>Statistika</h2>

            <div className="charts-grid">
              {userData?.uloga1 === "N" && (
                <>
                  <div className="chart-container">
                    <h3>Najgledaniji Materijali</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={mostViewed}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          dataKey="name"
                          angle={-45}
                          textAnchor="end"
                          height={100}
                        />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar
                          dataKey="views"
                          fill="#4a3a8b"
                          name="Broj pregleda"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="chart-container">
                    <h3>Najpreuzimaji Materijali</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={mostDownloaded}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          dataKey="name"
                          angle={-45}
                          textAnchor="end"
                          height={100}
                        />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar
                          dataKey="downloads"
                          fill="#73a2cd"
                          name="Broj preuzimanja"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="chart-container">
                    <h3>Materijali po Predmetima</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={subjectMaterials}
                          dataKey="count"
                          nameKey="subject"
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          fill="#4a3a8b"
                          label
                        >
                          {subjectMaterials.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>    
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="search-container">
                    <h3>Pretraži Materijal</h3>
                    <form
                      onSubmit={handleMaterialSearch}
                      className="search-form"
                    >
                      <input
                        type="text"
                        value={materialCode}
                        onChange={(e) => setMaterialCode(e.target.value)}
                        placeholder="Unesite kod materijala"
                      />
                      <button type="submit">Pretraži</button>
                    </form>
                    {materialError ? (
                      <div className="stats-result error-message">
                        <p>Materijal ne postoji.</p>
                      </div>
                    ) : (
                      materialStats && (
                        <div className="stats-result">
                          <h4>Material {materialStats.name}</h4>
                          <p>
                            <span>Broj pregleda:</span>
                            <span className="stats-number">
                              {materialStats.views}
                            </span>
                          </p>
                          <p>
                            <span>Broj preuzimanja:</span>
                            <span className="stats-number">
                              {materialStats.downloads}
                            </span>
                          </p>
                        </div>
                      )
                    )}
                  </div>
                </>
              )}

              {/* Sections visible to all (N, A, R) */}
              <div className="chart-container">
                <h3>Statistika Potvrda</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={certificateStats}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="type" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="downloads"
                      fill="#4a3a8b"
                      name="Broj preuzimanja"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="search-container">
                <h3>Pretraži Potvrde Studenta</h3>
                <form onSubmit={handleJmbagSearch} className="search-form">
                  <input
                    type="text"
                    value={jmbag}
                    onChange={(e) => setJmbag(e.target.value)}
                    placeholder="Unesite JMBAG"
                  />
                  <button type="submit">Pretraži</button>
                </form>
                {jmbagError ? (
                  <div className="stats-result error-message">
                    <p>Student ne postoji.</p>
                  </div>
                ) : (
                  studentCertStats && (
                    <div className="stats-result">
                      <h4>Potvrde:</h4>
                      {studentCertStats.map((cert, index) => (
                        <p key={index}>
                          <span>{cert.type}:</span>
                          <span className="stats-number">
                            {cert.downloads} preuzimanja
                          </span>
                        </p>
                      ))}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Statistika;