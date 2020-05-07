import React from 'react';
import CharacterCard from './CharacterCard';

export default class GameScreen extends React.Component{

    render(){
        const {
            role,
            position,
            players,
        } = this.props; 

        return(
            <div>
                {"Role: " + role}
                <br/>
                {"Position: " + position}
                <br/>
                {"Number of Players: " + (players.length + 1)}
                <CharacterCard/>
            </div>
        )
    }
}