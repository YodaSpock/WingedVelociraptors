import React from 'react';
import {Button} from 'antd';
import jerry from "../Images/raptor.png"
import {Link} from 'react-router-dom';

export default class WelcomeScreen extends React.Component{
    render(){
        return(
            <div style = {{alignContent: "center"}}>
                <img src = {jerry} alt = "Velociraptor Guy" style = {{height: "50vh", alignContent: "center"}}/>
                <br/>
                <Link to="/player">
                    <Button>
                        Player Login
                    </Button>
                </Link>
                <br/>
                <Link to="/narrator">
                    <Button>
                        Narrator Login
                    </Button>
                </Link>
            </div>
        )
    }
}