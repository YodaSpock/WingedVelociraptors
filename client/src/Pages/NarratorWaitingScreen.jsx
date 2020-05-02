import React from 'react';
import {Button} from 'antd';

export default class NarratorWaitingScreen extends React.Component{

    render(){
        return(
            <div>
                You are the Narrator...
                <br/>
                Press Start to begin the game
                <br/> 
                <Button>Start</Button>
            </div>
        )
    }
}