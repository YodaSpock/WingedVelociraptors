import React from 'react';
import {Button, Row, Col} from 'antd';
import RolesForm from "./RolesForm";

export default class NarratorWaitingScreen extends React.Component{


    onStart = () => {
        this.props.wsem.sendMessage("c_start");
    };

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
                    <RolesForm onSubmit={(roles, wvCount) => {
                        this.props.wsem.sendMessage("c_setRoles", { roles, wvCount });
                    }}/>
                </Col>
                <Col xs = {0} md = {8}/>
            </Row>
            <Row style = {{paddingTop: "3vh", paddingBottom: "3vh"}}>
                <Col xs = {0} md = {8}/>
                <Col xs = {24} md = {8} style = {{textAlign: "center", fontFamily: "minecraft", fontSize: "100%"}}>
                    {/* TODO -  ADD THE START GAME FUNCTION */}
                    <Button onClick = {this.onStart} style = {{borderRadius: "50%", width: "30vh"}}>Start</Button>
                </Col>
                <Col xs = {0} md = {8}/>
            </Row>
            </>
        )
    }
}