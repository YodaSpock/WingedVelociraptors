import React from 'react';
import {Row, Col} from 'antd';
import LoginForm from './LoginForm';

export default class LoginScreen extends React.Component{

    render(){
        return(
            <>
            <Row style = {{paddingTop: "3vh"}}>
                <Col xs = {0} md = {8}/>
                <Col xs = {24} md = {8} style = {{textAlign: "center", fontFamily: "minecraft", fontSize: "200%"}}>
                    Please Enter Your Name: 
                </Col>
                <Col xs = {0} md = {8}/>
            </Row>
            <LoginForm/>
            </>
        )
    }
}