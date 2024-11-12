import React from 'react';
import './home.css';
 
function Raspored() {
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
                <div className="user-container">
                    <div className="user-names">
                        <span className="user-field">Ime</span>
                        <span className="user-field">Prezime</span>
                    </div>
                    <span className="class-field">Class</span>
                </div>
            </header>

            {/* Sidebar (dropdown menu) */}
            {sidebarVisible && (
                <aside className="sidebar">
                    <button className="sidebar-button">NASLOVNICA</button>
                    <button className="sidebar-button">PREDMETI</button>
                    <button className="sidebar-button">POTVRDE</button>
                    <button className="sidebar-button">CHAT</button>
                </aside>
            )}

            <main className="raspored-container">
                
            </main>

        </div>
    )
}

export default Raspored;