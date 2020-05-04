import React from 'react';

export default class GameScreen extends React.Component{

    render(){
        const {
            role,
            position,
            players,
        } = this.props; 

        return(
            <>
                {role}
                {position}
                {players}
            </>
        )
    }
}