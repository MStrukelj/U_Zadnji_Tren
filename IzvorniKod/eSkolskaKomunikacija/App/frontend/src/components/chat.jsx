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

const getUsernameFromEmail = (email) => {
  return email.split('@')[0].replace(/\./g, "");
};

function Chat() {
  const [channels, setChannels] = useState([]);
  const [currentChannel, setCurrentChannel] = useState(null);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [targetUserEmail, setTargetUserEmail] = useState("");
  const [clientIsReady, setClientIsReady] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [isConnecting, setIsConnecting] = useState(true);

  const navigate = useNavigate();

  // Dohvaćanje korisničkih podataka iz sessionStorage
  const userStr = sessionStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;
  const userEmail = user?.email;
  const username = user ? getUsernameFromEmail(user.email) : null;

  useEffect(() => {
    const setupClient = async () => {
      try {
        // Dohvati token za korisnika
        const response = await fetch(`https://backend-latest-in4o.onrender.com/api/chat/token/${username}`);
        const data = await response.json();
        const token = data.data;

        // Poveži korisnika s Stream Chat klijentom
        await chatClient.connectUser( 
          { id: username, name: `${user.ime} ${user.prezime}` },
          token
        );
        console.log('User connected successfully.');
        setClientIsReady(true);
        setIsConnecting(false);

        // Dohvati sve kanale u kojima je korisnik član
        const filters = { type: "messaging", members: { $in: [username] } };
        const fetchedChannels = await chatClient.queryChannels(
          filters,
          { last_message_at: -1 }
        );
        setChannels(fetchedChannels);
      } catch (error) {
        console.error("Error setting up chat client:", error);
        setIsConnecting(false);
      }
    };

    if (username) {
      setupClient();
    }

    return () => {
      chatClient.disconnectUser();
    };
  }, [userEmail, navigate]);

  // Dohvaćanje liste korisnika iz backend-a
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://backend-latest-in4o.onrender.com/api/korisnici', {
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Neuspješno dohvaćanje korisnika.');
        }
        const data = await response.json();
        // Filtriraj trenutnog korisnika iz liste
        const filteredUsers = data.filter(u => u.email !== userEmail);
        setUsers(filteredUsers);
        setFilteredUsers(filteredUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [userEmail]);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const startChat = async (selectedUser) => {
    console.log(chatClient.clientID + 'U startChatu');
    const targetUserEmail = selectedUser.email;
    if (!targetUserEmail || targetUserEmail === userEmail) {
      alert("Odaberite validnog korisnika za chat!");
      return;
    }

    const targetUsername = getUsernameFromEmail(targetUserEmail);
    const channelId = [username, targetUsername].sort().join("-");

    try {
      const targetUser = await chatClient.queryUsers({ id: targetUsername });
      if(targetUser.users.length === 0) {
        try {
          const response = await fetch(`https://backend-latest-in4o.onrender.com/api/chat/${targetUsername}`, {
            method: 'POST',
            credentials: 'include',
          });
          if (!response.ok) {
            console.error('Error upserting user.');
            return;
          }
          console.log(`User ${targetUsername} has been upserted.`);

        } catch (error) {
          console.error('Error with API request to upsert user:', error);
        } }
      // Provjeri postoji li već kanal
      const existingChannel = channels.find((ch) => ch.id === channelId);
      if (existingChannel) {
        setCurrentChannel(existingChannel);
      } else {
        // Kreiraj novi kanal
        const newChannel = chatClient.channel("messaging", channelId, {
          members: [username, targetUsername],
          name: `Razgovor s ${selectedUser.ime} ${selectedUser.prezime}`
        });
        await newChannel.watch();
        setCurrentChannel(newChannel);
        setChannels((prevChannels) => [...prevChannels, newChannel]);
      }
    } catch (error) {
      console.error("Error starting chat:", error);
      alert("Došlo je do greške prilikom pokretanja chata.");
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('https://backend-latest-in4o.onrender.com/api/auth/logout', {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        onLogout();
        navigate('/');
    }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term.trim() === "") {
      setFilteredUsers(users);
    } else {
      const lowerTerm = term.toLowerCase();
      const filtered = users.filter((user) =>
        `${user.ime} ${user.prezime}`.toLowerCase().includes(lowerTerm) ||
        user.email.toLowerCase().includes(lowerTerm)
      );
      setFilteredUsers(filtered);
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
                <span className="user-field">{user?.ime || 'Ime'}</span>
                <span className="user-field">{user?.prezime || 'Prezime'}</span>
            </div>
            <span className="class-field">{user?.razred || 'Razred'}</span>
        </div>
    </header>
    
    <div className="main-content">
        {sidebarVisible && (
            <aside className="sidebar">
                <Link to="/home" className="sidebar-button">NASLOVNICA</Link>
                {['N', 'A', 'S', 'R'].includes(user?.uloga1) && (
                    <>
                        <Link to="/predmeti" className="sidebar-button">PREDMETI</Link>
                    </>
                )}
                <Link to="/raspored" className="sidebar-button">KALENDAR</Link>
                {['S', 'A'].includes(user?.uloga1) && (
                    <>
                        <Link to="/potvrde" className="sidebar-button">POTVRDE</Link>
                    </>
                )}
                <Link to="/chat" className="sidebar-button active">CHAT</Link>
                {['N', 'A', 'R', 'US'].includes(user?.uloga1) && (              //N(astavnik), A(dmin), R(avnatelj), US(Ucenicka sluzba)
                    <>
                        <Link to="/obavijestForm" className="sidebar-button">IZRADI OBAVIJEST</Link>
                    </>
                )}
                {['N', 'A', 'R'].includes(user?.uloga1) && (
                    <>
                        <Link to="/statistika" className="sidebar-button">STATISTIKA</Link>
                    </>
                )}
                {['A', 'R'].includes(user?.uloga1) && (
                    <>
                        <Link to="/upravljajKorisnicima" className="sidebar-button">UPRAVLJANJE KORISNICIMA</Link>
                    </>
                )}  
                <button className="sidebar-button logout" onClick={handleLogout}>ODJAVA</button>
            </aside>
        )}
        <div className="content-area">
          <div className="chat-container">
            <div className="channels-list">
              <h2>Kanali</h2>
              {channels.map((ch) => {
                const otherMember = Object.values(ch.state.members).find(
                  (m) => m.user_id !== username
                );
                return (
                  <div
                    key={ch.id}
                    className={`channel-item ${
                      currentChannel?.id === ch.id ? "active" : ""
                    }`}
                    onClick={() => setCurrentChannel(ch)}
                  >
                    <p>
                      Razgovor s:{" "}
                      {otherMember?.user?.name ||
                        otherMember?.user_id ||
                        "Nepoznato"}
                    </p>
                  </div>
                );
              })}
              <div className="create-channel">
                <h3>Dodaj novi kanal</h3>
                <input
                  type="text"
                  className="search-field"
                  placeholder="Pretraži korisnike..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <ul className="user-list">
                  {filteredUsers.map((u) => (
                    <li key={u.id} className="user-item">
                      <p>
                        {u.ime} {u.prezime} ({u.email})
                      </p>
                      <button
                        onClick={() => startChat(u)}
                        className="create-channel-button"
                      >
                        Pokreni Chat
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="chat-window">
              {isConnecting ? ( // Dodano loading stanje
                <div className="info-section">
                  <p>Učitavanje...</p>
                </div>
              ) : currentChannel ? (
                <StreamChatProvider
                  client={chatClient}
                  theme="str-chat__theme-light"
                >
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
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
