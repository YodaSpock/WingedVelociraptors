import React from 'react';
import {Input, Button} from 'antd';
import { Link } from 'react-router-dom';

export default class LoginScreen extends React.Component{

    render(){
        return(
            <div>
                Please Enter Your Name: 
                <Input placeholder = "Player Name"/>
                <Link to="/player/waiting">
                <Button>Login</Button>
                </Link>
            </div>
        )
    }
}