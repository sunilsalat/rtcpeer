import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RoomPage from "./pages/room/Room";
import NavBar from "./components/navbar/NavBar";
import Introduction from "./pages/introductionPage/Introduction";
import JoinRoomPage from "./pages/joinRoomPage/JoinRoomPage";
import  {connectWithSocketIoServer}  from "./utils/wss";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch()

  useEffect(()=>{
    connectWithSocketIoServer(dispatch)
  }, [])

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Introduction />} />
          <Route path="/room" element={<RoomPage />} />
          <Route path="/join-room" element={<JoinRoomPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
