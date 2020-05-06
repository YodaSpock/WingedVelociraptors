import React from 'react';
import {Row, Col} from 'antd';
import LoginForm from './LoginForm';

export default class LoginScreen extends React.Component{

    render(){

        return(
            <>
                <Row style = {{paddingTop: "3vh", textAlign: "center", justifyContent: "center"}}>
                    <Col xs = {24} md = {8} style = {{textAlign: "center", fontFamily: "minecraft", fontSize: "200%"}}>
                        Please Enter Your Name: 
                    </Col>
                </Row>
                <LoginForm />
            </>
        )
    }
}