import React, { useState, useEffect } from "react";
import { Row, Col, Select, Button } from "antd";

const { Option } = Select;

/*
To test, paste the following into App.js below `const wsem = ...` and
set VotingScreen's `players` prop to `testPlayers`:

wsem.addEventHandler = (event, cb) => {
  setTimeout(() => {
    cb({
      length: 70,
      middle: [
        { exposed: false, role: null },
        { exposed: true, role: "josh" },
        { exposed: false, role: null }
      ]
    })
  }, 1000);
};
wsem.sendMessage = (event, data) => {
  console.log(event);
  console.log(data);
}
const testPlayers = [
  { name: "Daniel", id: 0 },
  { name: "Isaac", id: 1},
  { name: "Lucas", id: 2 }
]
*/

const VotingScreen = ({ wsem, players }) => {
  const [timerLength, setTimerLength] = useState();
  const [timerStart, setTimerStart] = useState();
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [middle, setMiddle] = useState([]);
  const [voteId, setVoteId] = useState();

  useEffect(() => {
    wsem.addEventHandler("s_timerStart", (data) => {
      setTimerLength(data.length);
      setTimerStart(Date.now());
      setMiddle(data.middle);
    });
  }, [wsem]);

  useEffect(() => {
    if(timerLength && timerStart) {
      const interval = setInterval(() => {
        let elapsed = (Date.now() - timerStart) / 1000;
        if(elapsed > timerLength) {
          elapsed = timerLength;
          clearInterval(interval);
        }
        setTimeRemaining(timerLength - elapsed);
      }, 1000);
    }
  }, [timerLength, timerStart]);

  const formatTime = (val) => `0${Math.floor(val)}`.slice(-2);

  const getTimeString = () => {
    const minutes = timeRemaining / 60;
    const seconds = timeRemaining % 60;
    return [minutes, seconds].map(formatTime).join(":");
  };

  const submitVote = () => {
    if(voteId !== undefined) wsem.sendMessage("c_vote", { id: voteId });
  };

  return (
    <div>
      <Row justify="space-around" style={{marginBottom: "1rem"}}>
        {middle.map((card, i) => <Col key={i}>{card.exposed ? card.role : "unknown"}</Col>)}
      </Row>

      <Row justify="center" style={{fontSize: "2rem", marginBottom: "1rem"}}>
        {`Time remaining: ${getTimeString()}`}
      </Row>

      <div>
        <Row justify="center" style={{marginBottom: "0.5rem"}}>
          <Select 
            value={voteId}
            onSelect={(value) => setVoteId(value)}
            placeholder="Select a player"
            style={{ width: "50%" }}>
            {players.map((player) => (
              <Option key={player.id} value={player.id}>{player.name}</Option>
            ))}
          </Select>
        </Row>
        <Row justify="center">
          <Button onClick={submitVote}>Submit</Button>
        </Row>
      </div>
    </div>
  )
};

export default VotingScreen;
