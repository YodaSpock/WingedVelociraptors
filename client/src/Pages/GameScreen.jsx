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
                <CharacterCard role = {role} />
            </div>
        )
    }
}