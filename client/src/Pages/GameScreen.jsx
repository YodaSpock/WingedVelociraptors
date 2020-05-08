import React from 'react';
import CharacterCard from './CharacterCard';

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
    render(){
        const {
            role,
            //position,
            //players,
        } = this.props; 

        
        return(
            <div>
                <CharacterCard role = {role} />
            </div>
        )
    }
}