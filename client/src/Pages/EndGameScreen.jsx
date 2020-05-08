import React from "react";
import { Row, Divider } from "antd";

import "../Styles/EndGame.scss";

/*
To test, past this code into App.js and pass these as props:
const testKilled = [
  { name: "danielisgr8", id: 0 },
  { name: "minu354", id: 1 }
];
const testRole = "daniel";
const testPlayers = [
  { name: "danielisgr8", id: 0, role: "sydney" },
  { name: "minu354", id: 1, role: "cat" },
  { name: "comcy", id: 2, role: "wv" }
];
*/

const EndGameScreen = ({ role, players, killed }) => {
  const getKilledNames = () => {
    let str = "";
    killed.forEach((player, i) => str += player.name + (i === killed.length - 1 ? "" : ", "));
    return str;
  };

  return (
    <div className="endGameScreen">
      <Row justify="center" >
        <h2 style={{ margin: 0 }}>Killed: {getKilledNames()}</h2>
      </Row>

      <Divider />

      <Row justify="center" >
        <h2 style={{ margin: 0 }}>Your role: {role}</h2>
      </Row>

      <Divider />

      <Row justify="center">
        <div style={{ textAlign: "center" }}>
          <h2><u>Other roles</u></h2>
          {players.map((player) => <p key={player.id}>{player.name} - {player.role}</p>)}
        </div>
      </Row>
    </div>
  );
};

export default EndGameScreen;
