import React from 'react';

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
            </div>
        )
    }
}