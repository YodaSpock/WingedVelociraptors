import React from 'react';
import {Button} from 'antd';
import jerome from "../Images/jerome.png"
import {Link} from 'react-router-dom';
import {Col, Row} from 'antd';

export default class WelcomeScreen extends React.Component{
    render(){
        return(
            <div style = {{textAlign: "center"}}>
                <img src = {jerome} alt = "Velociraptor Guy" style = {{height: "50vh", borderRadius: "30%"}}/>
                <Col style = {{padding: "5vh"}}>
                    <Row xs = {0} md = {8}/>
                    <Row xs = {24} md = {8} style = {{display: "flex", justifyContent: "center"}}>
                        <Button style = {{borderRadius: "50%", width: "30vh"}}>
                            <Link to="/player">
                                Player
                            </Link>
                        </Button>
                    </Row>
                    <Row xs = {0} md = {8}/>
                </Col>
                <Col>
                    <Row xs = {0} md = {8}/>
                    <Row xs = {24} md = {8} style = {{display: "flex", justifyContent: "center"}}>
                        <Button style = {{borderRadius: "50%", width: "30vh"}}>
                            <Link to="/narrator/waiting">
                                Narrator
                            </Link>
                        </Button>
                    </Row>
                    <Row xs = {0} md = {8}/>
                </Col>
                    
            </div>
        )
    }
}