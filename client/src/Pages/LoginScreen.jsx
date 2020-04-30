import React from 'react';
import {Button} from 'antd';
import jerry from "../Images/raptor.png"

export default class LoginScreen extends React.Component{
    render(){
        return(
            <div style = {{alignContent: "center"}}>
                <img src = {jerry} alt = "Velociraptor Guy" style = {{height: "50vh", alignContent: "center"}}/>
                <br/>
                <Button>
                    Player Login
                </Button>
                <br/>
                <Button>
                    Narrator Login
                </Button>
            </div>
        )
    }
}