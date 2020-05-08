import React, {useState} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import './App.css';
import Header from './Pages/Header';
import Footer from './Pages/Footer';
import 'antd/dist/antd.css';
import LoginScreen from './Pages/LoginScreen';
import WelcomeScreen from './Pages/WelcomeScreen';
import NarratorWaitingScreen from './Pages/NarratorWaitingScreen';
import PlayerWaitingScreen from './Pages/PlayerWaitingScreen';
import NarratorScreen from './Pages/NarratorScreen';
import GameScreen from './Pages/GameScreen';
import VotingScreen from "./Pages/VotingScreen";
import EndGameScreen from "./Pages/EndGameScreen";
import '../src/Styles/Layout.scss';
import WebSocketEventManager from './Networking/websocket-event-manager';


const wsem = new WebSocketEventManager(`ws://${window.location.hostname}:81`);
// TODO - storing data using useState or useRef - STRETCH GOAL

function App() {

  const [role, setRole] = useState("");
  const [position, setPosition] = useState(0);
  const [players, setPlayers] = useState([{}]);
  const [killed, setKilled] = useState([]);
  
  const recieveRole = e => {
    setRole(e.role);
    setPosition(e.position);
    setPlayers(e.players);
  };

  const onEnd = (data) => {
    setRole(data.role);
    setPlayers(data.players);
    setKilled(data.killed);
  };

  return (
    <div className = "layout" style = {{height: "100%"}}>
      <BrowserRouter>
        <Header/>
        <Route path = "/" exact component={() => <WelcomeScreen wsem={wsem} />}/>
        <Route path = "/player" exact component={() => <LoginScreen wsem={wsem} onRole={recieveRole} />}/>
        <Route path = "/narrator/waiting" exact component={() => <NarratorWaitingScreen wsem={wsem} />}/>
        <Route path = "/player/waiting" exact component = {PlayerWaitingScreen}/>
        <Route path = "/player/game" exact component = {() => <GameScreen role = {role} position = {position} players = {players}/>}/>
        <Route path = "/narrator/game" exact component = {NarratorScreen}/>
        <Route path = "/player/voting" exact component = {() => <VotingScreen wsem={wsem} players={players} onEnd={onEnd} />} />
        <Route path = "/player/end" exact component = {() => <EndGameScreen role={role} players={players} killed={killed} />} />
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
