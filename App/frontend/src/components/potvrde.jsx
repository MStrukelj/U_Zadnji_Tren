import React from 'react';
import './home.css';
 
function Potvrde() {
    const [sidebarVisible, setSidebarVisible] = useState(false);

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    return (
        <div className="container">
            {/* Header with menu button and school logo */}
            <header className="header">
                <button className="menu-button" onClick={toggleSidebar}>
                    ☰
                </button>
                <h1 className="logo">eŠkola</h1>
                <div className="header-buttons">
                    <button className="header-button">Prijava</button>
                    <button className="header-button">Registracija</button>
                </div>
            </header>

            {/* Sidebar (dropdown menu) */}
            {sidebarVisible && (
                <aside className="sidebar">
                    <button className="sidebar-button">NASLOVNICA</button>
                    <button className="sidebar-button">PREDMETI</button>
                    <button className="sidebar-button">RASPORED</button>
                    <button className="sidebar-button">CHAT</button>
                </aside>
            )}


            {/*NEEDS TO BE PROPERLY CHANGED FOR THIS SPECIFIC SITE} */}
            <main className="">
                
            </main>

        </div>
    )
}

export default Potvrde;