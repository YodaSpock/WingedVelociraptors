import React from 'react';
import CharacterCard from './CharacterCard';
import AllCards from './AllCards';
import Night from './Night';
import CenterCards from './CenterCards';
import {Button} from 'antd';

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

    readyUp = () => {
        this.setState({isReady: true});
    }
    
    render(){
        const {
            role,
            //position,
            players,
        } = this.props; 

        return(
            <div>
                {/* Not going to mess around with the naming thing will take too long */}
                {this.state.isReady ? null : 
                    <div>
                        <CharacterCard role = {role} name = {"You"} flippable = {true}/>
                        <Button onClick = {this.readyUp} style = {{marginTop: "120vw"}}>
                            READY
                        </Button>
                    </div>}

                {/* && game has started and S_act has not been sent*/ }
                {this.state.isReady ? <Night/> : null }

                {/* Add check for the S_act as well */}
                {(this.role === "sydney" || this.role === "annalise" ||this.role === "hannah") ? <AllCards/> : null}
                
                {/* Add check for the S_act as well */}
                {(this.role === "cat" || this.role === "daniel") ? <CenterCards/> : null}

                {/* Add the check for annalise specifically and then  */}
                {(this.role === "isaac" || this.role === "annalise") ? <CharacterCard role = {role} name = {"Name"}/> : null}


                <AllCards role = {role} players = {players}/>
                {/* <CenterCards/> */}

            </div>
        )
    }
}