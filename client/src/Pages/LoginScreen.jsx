import React from 'react';
import {Input, Button, Row, Col} from 'antd';
import { Link } from 'react-router-dom';
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
            {/* <Row style = {{paddingTop: "3vh", paddingBottom: "3vh"}}>
                <Col xs = {6} md = {8}/>
                <Col xs = {12} md = {8} style = {{textAlign: "center", fontFamily: "minecraft", fontSize: "200%"}}>
                    <Input 
                        id = "name" 
                        name = "name" 
                        //onChange = {formik.handleChange}
                        //value = {formik.values.name}
                        placeholder = "Player Name" 
                        style = {{textAlign: "center"}}
                    />
                </Col>
                <Col xs = {6} md = {8}/>
            </Row>
            <Row style = {{paddingTop: "3vh", paddingBottom: "3vh"}}>
                <Col xs = {0} md = {8}/>
                <Col xs = {24} md = {8} style = {{textAlign: "center", fontFamily: "minecraft", fontSize: "100%"}}> */}
                    {/* TODO -  ADD THE START GAME FUNCTION */}
                    {/* <Button style = {{borderRadius: "50%", width: "30vh"}}>
                        <Link to = "/player/1/waiting">
                            Login
                        </Link>
                    </Button>
                </Col>
                <Col xs = {0} md = {8}/>
            </Row> */}
            </>
        )
    }
}