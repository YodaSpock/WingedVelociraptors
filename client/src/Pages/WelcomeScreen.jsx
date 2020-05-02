import React from 'react';
import {Button} from 'antd';
import jerome from "../Images/jerome.png"
import {Link} from 'react-router-dom';

export default class WelcomeScreen extends React.Component{
    render(){
        return(
            <div style = {{textAlign: "center"}}>
                <img src = {jerome} alt = "Velociraptor Guy" style = {{height: "50vh"}}/>
                <br/>
                Login as:
                <br/>
                <Link to="/player">
                    <Button>
                        Player
                    </Button>
                </Link>
                <br/>
                <Link to="/narrator/waiting">
                    <Button>
                        Narrator
                    </Button>
                </Link>
            </div>
        )
    }
}