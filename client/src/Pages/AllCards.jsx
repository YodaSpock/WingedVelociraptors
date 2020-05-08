import React from 'react';
import CharacterCard from './CharacterCard';

export default class AllCards extends React.Component{
    render(){
        const {
            role,
            players,
        } = this.props; 
        
        return(
            <div>
                All Cards
                <br/>
                Your Role: {role}
                <br/>
                {/* {players.map((player) => <p key={player.id}>{player.name}</p>)} */}
                {players.map((player) => <CharacterCard key = {player.id} flippable = {false} name = {player.name}/> )}
                {players.map((player) => {console.log(player.name)})}
            </div>
        )
    }
}