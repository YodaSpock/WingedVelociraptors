import React, { useState } from 'react';
import { useSpring, animated as a } from 'react-spring';
import {Button} from 'antd';
import '../Styles/Card.scss';

const CharacterCard = (props) => {
  const [flipped, set] = useState(false)
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 }
  })
  return (
      <div style = {{display: "flex", justifyContent: "center"}}>
        <a.div onClick={() => (props.flippable) ? set(state => !state) : set(state => state)} className="c back" style={{ opacity: opacity.interpolate(o => 1 - o), transform}}>
          <div
          style = {{display: "flex", justifyContent: "center", 
          backgroundColor: "white", textAlign: "center", 
          position: "absolute", bottom: "0px",
          fontFamily: "jurassic", fontSize: "30px", paddingLeft: "10px"}}>
            Player: {props.name}
          </div>
        </a.div>
        <a.div onClick={() => (props.flippable) ? set(state => !state) : set(state => state)} className={"c " + props.role} style={{ opacity, transform: transform.interpolate(t => `${t} rotateX(180deg)`) }} >
          <div
          style = {{display: "flex", justifyContent: "center", 
          backgroundColor: "white", textAlign: "center", 
          position: "absolute", bottom: "0px"}}>
            Your character role is the {props.role} 
          </div>
        </a.div> 
        {props.swap ? <div>
        <Button onClick = {props.onSubmit(true)}>Swap</Button>
        <Button onClick = {props.onSubmit(false)}>Don't Swap</Button>
        </div> : null}
      </div>
  )
}

export default CharacterCard;