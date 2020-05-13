import React, { useState, useEffect } from "react";
import { Row, Col, Select, Button } from "antd";
import { useHistory } from 'react-router-dom';

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

// TODO: voting for yourself
const VotingScreen = ({ wsem, players, onEnd, votingData: { endTime , middle } }) => {
  const history = useHistory();

  const [timeRemaining, setTimeRemaining] = useState(0);
  const [voteId, setVoteId] = useState();

  useEffect(() => {
    wsem.addEventHandler("s_results", (data) => {
      onEnd(data);
      history.push("/player/end");
    });
  }, [wsem, onEnd, history]);

  useEffect(() => {
    const interval = setInterval(() => {
      let remaining = (new Date(endTime) - Date.now()) / 1000;
      if(remaining < 0) {
        remaining = 0;
        clearInterval(interval);
      }
      setTimeRemaining(remaining);
    }, 1000);

    return () => clearInterval(interval);
  }, [endTime]);

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
