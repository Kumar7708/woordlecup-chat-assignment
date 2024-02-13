import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Lobby from './components/Lobby';
import ChatRoom from './components/ChatRoom';
import { useState } from 'react';

function App() {
  const [senderName, setSenderName] = useState("");
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Lobby senderName={senderName} setSenderName={setSenderName} />} />
          <Route path="/chat-room" element={<ChatRoom senderName={senderName} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
