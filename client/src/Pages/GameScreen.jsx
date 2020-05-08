import React, {useState} from 'react';
import CharacterCard from './CharacterCard';
import AllCards from './AllCards';
import Night from './Night';
import CenterCards from './CenterCards';

/*
How to play audio:
1. Put audio file in public/Audio
2. Create new Audio object with that url
3. Add event listeners
4. Call play

const audio = new Audio("../Audio/test.mp3");
audio.addEventListener("ended", () => console.log("ended!"));
audio.play();
*/

export default class GameScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isReady: false
        }
    }
    
    render(){
        const {
            role,
            //position,
            //players,
        } = this.props; 

        
        return(
            <div>
                {/* Not going to mess around with the naming thing will take too long */}
                {this.state.isReady ? null : <CharacterCard role = {role} name = {"You"} />}
                <AllCards/>
                <CenterCards/>
                <Night/>
            </div>
        )
    }
}