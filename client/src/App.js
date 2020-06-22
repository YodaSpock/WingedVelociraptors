import React, { useEffect } from 'react';
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
import useStorageState from "./useStorageState";


const wsem = new WebSocketEventManager(`ws://${window.location.hostname}:81`);
// TODO - storing data using useState or useRef - STRETCH GOAL

const isSessionPath = () => ["/", "/player", "/player/end"].every(path => window.location.pathname !== path);

function App() {

  const [role, setRole] = useStorageState("role", "", isSessionPath());
  const [position, setPosition] = useStorageState("position", 0, isSessionPath());
  const [players, setPlayers] = useStorageState("players", [{}], isSessionPath());
  const [votingData, setVotingData] = useStorageState("votingData", { middle: [] }, isSessionPath());
  const [killed, setKilled] = useStorageState("killed", [], isSessionPath());

  useEffect(() => {
    if(isSessionPath() &&
       localStorage.getItem("clientID") !== null &&
       localStorage.getItem("sessionID") !== null) {
      wsem.sendMessage("c_reconnect", {
        clientID: Number(localStorage.getItem("clientID")),
        sessionID: localStorage.getItem("sessionID")
      });
    } else {
      localStorage.clear();
      wsem.addEventHandler("s_init", (data) => {
        localStorage.setItem("clientID", data.clientID);
        localStorage.setItem("sessionID", data.sessionID);
      });
    }
  }, []);
  
  const recieveRole = e => {
    setRole(e.role);
    setPosition(e.position);
    setPlayers(e.players);
  };

  const onVotingBegin = (data) => {
    setVotingData(data);
  };

  const onEnd = (data) => {
    setRole(data.role);
    setPlayers(data.players);
    setKilled(data.killed);
    localStorage.clear();
  };

  return (
    <div className = "layout" style = {{height: "100%"}}>
      <BrowserRouter>
        <Header/>
        <Route path = "/" exact component={() => <WelcomeScreen wsem={wsem} />}/>
        <Route path = "/player" exact component={() => <LoginScreen wsem={wsem} />}/>
        <Route path = "/narrator/waiting" exact component={({ history }) => <NarratorWaitingScreen history={history} wsem={wsem} />}/>
        <Route path = "/player/waiting" exact component = {(props) => <PlayerWaitingScreen {...props} wsem={wsem} onRole={recieveRole} />}/>
        <Route path = "/player/game" exact component = {({ history }) => <GameScreen history={history} wsem={wsem} role = {role} position = {position} players = {players} onVotingBegin={onVotingBegin}/>}/>
        <Route path = "/narrator/game" exact component = {() => <NarratorScreen wsem={wsem} />}/>
        <Route path = "/player/voting" exact component = {() => <VotingScreen wsem={wsem} players={players} votingData={votingData} onEnd={onEnd} />} />
        <Route path = "/player/end" exact component = {() => <EndGameScreen role={role} players={players} killed={killed} />} />
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
