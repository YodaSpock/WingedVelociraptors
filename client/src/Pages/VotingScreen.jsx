import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";

const VotingScreen = ({ wsem, players }) => {
  const [timerLength, setTimerLength] = useState();
  const [timerStart, setTimerStart] = useState();
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [middle, setMiddle] = useState([]);

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

  return (
    <div>
      <Row justify="space-around">
        {middle.map((card, i) => <Col key={i}>{card.exposed ? card.role : "unknown"}</Col>)}
      </Row>

      <Row justify="center">
        <p>{getTimeString()}</p>
      </Row>

      <div>
        <Row justify="center">Dropdown select</Row>
        <Row justify="center">Submit</Row>
      </div>
    </div>
  )
};

export default VotingScreen;
