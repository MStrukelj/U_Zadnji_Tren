import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { StreamChat } from "stream-chat";
import {
  Chat as StreamChatProvider,
  Channel,
  Window,
  MessageList,
  MessageInput,
  Thread,
} from "stream-chat-react";
import "stream-chat-react/dist/css/v2/index.css"
import "./home.css";
import "./chat.css";

const apiKey = "m6uex4shv7zw"; 
const chatClient = StreamChat.getInstance(apiKey);

function Chat() {
  const [channels, setChannels] = useState([]);
  const [currentChannel, setCurrentChannel] = useState(null);
  const [targetUserEmail, setTargetUserEmail] = useState("");
  const [clientIsReady, setClientIsReady] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const navigate = useNavigate();

  // Dohvaćanje korisničkih podataka iz sessionStorage
  const userStr = sessionStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;
  const userEmail = user?.email;

  useEffect(() => {
    const setupClient = async () => {
      try {
        // Dohvati token za korisnika
        const response = await fetch(`http://backend-latest-in4o.onrender.com/api/chat/token/${userEmail}`);
        const data = await response.json();
        const token = data.data;

        // Poveži korisnika s Stream Chat klijentom
        await chatClient.connectUser({ id: userEmail }, token);

        setClientIsReady(true);

        // Dohvati sve kanale u kojima je korisnik član
        const filters = { type: "messaging", members: { $in: [userEmail] } };
        const fetchedChannels = await chatClient.queryChannels(
          filters,
          { last_message_at: -1 }
        );
        setChannels(fetchedChannels);
      } catch (error) {
        console.error("Error setting up chat client:", error);
      }
    };

    setupClient();

    return () => {
      chatClient.disconnectUser();
    };
  }, [userEmail, navigate]);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const startChat = async () => {
    if (!targetUserEmail || targetUserEmail === userEmail) {
      alert("Unesite validan email korisnika za chat!");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(targetUserEmail)) {
      alert("Unesite validan email format!");
      return;
    }

    const channelId = [userEmail, targetUserEmail].sort().join("-"); // Jedinstveni ID za kanal

    try {
      // Provjeri postoji li već kanal
      const existingChannel = channels.find((ch) => ch.id === channelId);
      if (existingChannel) {
        setCurrentChannel(existingChannel);
      } else {
        // Kreiraj novi kanal
        const newChannel = chatClient.channel("messaging", channelId, {
          members: [userEmail, targetUserEmail],
        });
        await newChannel.watch();
        setCurrentChannel(newChannel);
        setChannels((prevChannels) => [...prevChannels, newChannel]);
      }

      // Resetiraj unos email-a
      setTargetUserEmail("");
    } catch (error) {
      console.error("Error starting chat:", error);
      alert("Došlo je do greške prilikom pokretanja chata.");
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/auth/logout', {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        onLogout(); // Pozivamo onLogout iz App komponente
        navigate('/');
    }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="container">
      <header className="header">
        <button className="menu-button" onClick={toggleSidebar}>
          ☰
        </button>
        <h1 className="logo">eŠkola</h1>
        <div className="user-container">
          <div className="user-names">
            <span className="user-field">{user?.ime || "Ime"}</span>
            <span className="user-field">{user?.prezime || "Prezime"}</span>
          </div>
          <span className="class-field">{user?.razred || "Razred"}</span>
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
            <Link to="/chat" className="sidebar-button active">
              CHAT
            </Link>
            {["N", "A", "R"].includes(user?.role) && ( // N(astavnik), A(dmin), R(avnatelj)
              <>
                <Link to="/obavijestForm" className="sidebar-button">
                  IZRADI OBAVIJEST
                </Link>
                <Link to="/statistika" className="sidebar-button">
                  STATISTIKA
                </Link>
              </>
            )}
            <button className="sidebar-button logout" onClick={handleLogout}>
              ODJAVA
            </button>
          </aside>
        )}
        <div className="content-area">
          <div className="chat-container">
            <div className="channels-list">
              <h2>Kanali</h2>
              {channels.map((ch) => {
                const otherMember = ch.state.members.find(
                  (m) => m.user_id !== userEmail
                );
                return (
                  <div
                    key={ch.id}
                    className={`channel-item ${
                      currentChannel?.id === ch.id ? "active" : ""
                    }`}
                    onClick={() => setCurrentChannel(ch)}
                  >
                    <p>Razgovor s: {otherMember?.user_id || "Nepoznato"}</p>
                  </div>
                );
              })}
              <div className="create-channel">
                <h3>Dodaj novi kanal</h3>
                <input
                  type="email"
                  placeholder="Unesite email korisnika"
                  value={targetUserEmail}
                  onChange={(e) => setTargetUserEmail(e.target.value)}
                  className="input-field"
                />
                <button onClick={startChat} className="create-channel-button">
                  Pokreni Chat
                </button>
              </div>
            </div>

            <div className="chat-window">
              {clientIsReady ? (
                currentChannel ? (
                  <StreamChatProvider client={chatClient} theme="str-chat__theme-light">
                    <Channel channel={currentChannel}>
                      <Window>
                        <MessageList />
                        <MessageInput />
                      </Window>
                      <Thread />
                    </Channel>
                  </StreamChatProvider>
                ) : (
                  <div className="info-section">
                    <p>Odaberite kanal za razgovor</p>
                  </div>
                )
              ) : (
                <div className="info-section">
                  <p>Učitavanje...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
