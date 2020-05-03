import React from 'react';
import {Button, Row, Col} from 'antd';

export default class NarratorWaitingScreen extends React.Component{

    render(){
        return(
            <>
            <Row style = {{paddingTop: "3vh", paddingBottom: "3vh"}}>
                <Col xs = {0} md = {8}/>
                <Col xs = {24} md = {8} style = {{textAlign: "center", fontFamily: "minecraft", fontSize: "200%"}}>
                    You are the Narrator
                </Col>
                <Col xs = {0} md = {8}/>
            </Row>
            <Row style = {{paddingTop: "3vh", paddingBottom: "3vh"}}>
                <Col xs = {0} md = {8}/>
                <Col xs = {24} md = {8} style = {{textAlign: "center", fontFamily: "minecraft", fontSize: "200%"}}>
                    Press Start to begin the game
                </Col>
                <Col xs = {0} md = {8}/>
            </Row>
            <Row style = {{paddingTop: "3vh", paddingBottom: "3vh"}}>
                <Col xs = {0} md = {8}/>
                <Col xs = {24} md = {8} style = {{textAlign: "center", fontFamily: "minecraft", fontSize: "200%"}}>
                    (SELECT CARDS - TODO)
                    {/* TODO - Add Model here with selection for each player card and such  */}
                </Col>
                <Col xs = {0} md = {8}/>
            </Row>
            <Row style = {{paddingTop: "3vh", paddingBottom: "3vh"}}>
                <Col xs = {0} md = {8}/>
                <Col xs = {24} md = {8} style = {{textAlign: "center", fontFamily: "minecraft", fontSize: "100%"}}>
                    {/* TODO -  ADD THE START GAME FUNCTION */}
                    <Button style = {{borderRadius: "50%", width: "30vh"}}>Start</Button>
                </Col>
                <Col xs = {0} md = {8}/>
            </Row>
            </>
        )
    }
}