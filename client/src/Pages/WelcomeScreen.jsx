import React from 'react';
import {Button} from 'antd';
import jerome from "../Images/jerome.png"
import {Link} from 'react-router-dom';

export default class WelcomeScreen extends React.Component{
    render(){
        return(
            <div style = {{textAlign: "center"}}>
                <img src = {jerome} alt = "Velociraptor Guy" style = {{height: "50vh", borderRadius: "30%"}}/>
                <div style = {{padding: "5%"}}>
                    <Link to="/player">
                        <Button style = {{borderRadius: "50%", width: "35%"}}>
                            Player
                        </Button>
                    </Link>
                </div>
                <div>
                    <Link to="/narrator/waiting">
                        <Button style = {{borderRadius: "50%", width: "35%"}}>
                            Narrator
                        </Button>
                    </Link>
                </div>
            </div>
        )
    }
}