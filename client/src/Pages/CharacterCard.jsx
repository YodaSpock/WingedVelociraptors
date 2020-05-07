import React, { useState } from 'react';
import { useSpring, animated as a } from 'react-spring';
import '../Styles/Card.scss';

const CharacterCard = (props) => {
  const [flipped, set] = useState(false)
  //const name = "front"
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 }
  })
  return (
    <div>
      <div onClick={() => set(state => !state)} style = {{display: "flex", justifyContent: "center"}}>
        <a.div className="c back" style={{ opacity: opacity.interpolate(o => 1 - o), transform}}>
          <div
          style = {{display: "flex", justifyContent: "center", 
          backgroundColor: "white", textAlign: "center", 
          position: "absolute", bottom: "0px",
          fontFamily: "jurassic", fontSize: "30px", paddingLeft: "10px"}}>
            DORSAL FIN GANG
          </div>
        </a.div>
        <a.div className={"c " + props.role} style={{ opacity, transform: transform.interpolate(t => `${t} rotateX(180deg)`) }} >
          <div
          style = {{display: "flex", justifyContent: "center", 
          backgroundColor: "white", textAlign: "center", 
          position: "absolute", bottom: "0px"}}>
            Your character role is the {props.role} 
          </div>
        </a.div> 
        
      </div>
      {/* <p className = "role" style = {flipped ? {opacity: 1} : {opacity: 0} }>The + {props.role}</p> */}
    </div>
  )
}

export default CharacterCard;