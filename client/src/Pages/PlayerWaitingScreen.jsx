import React from 'react';
import {Button, Row, Col} from 'antd';
import "../Styles/Waiting.scss"
export default class PlayerWaitingScreen extends React.Component{

    render(){
        return(
            <div>
                <Row style = {{paddingTop: "3vh", paddingBottom: "3vh"}}>
                    <Col xs = {6} md = {8}/>
                    <Col xs = {12} md = {8} style = {{textAlign: "center", fontFamily: "minecraft", fontSize: "200%"}}>
                        {/* Create State for player name */}
                        Welcome Isaac 
                    </Col>
                    <Col xs = {6} md = {8}/>
                </Row>
                <Row style = {{paddingTop: "3vh", paddingBottom: "3vh"}}>
                    <Col xs = {6} md = {8}/>
                    <Col xs = {12} md = {8} style = {{textAlign: "center", fontFamily: "minecraft", fontSize: "200%"}}>
                        {/* Create State for player name */}
                        You are Player 1
                    </Col>
                    <Col xs = {6} md = {8}/>
                </Row>
                <Row style = {{paddingTop: "3vh", paddingBottom: "3vh"}}>
                    <Col xs = {6} md = {8}/>
                    <Col xs = {12} md = {8} style = {{textAlign: "center", fontFamily: "jurassic", fontSize: "250%", letterSpacing: "1px"}}>
                        {/* Animated Dots */}
                        <div className = "loading">
                            Waiting for Game
                            <span class = "ellipsis">
                                <span>.</span>
                                <span>.</span>
                                <span>.</span>
                            </span>
                        </div>
                    </Col>
                    <Col xs = {6} md = {8}/>
                </Row>
                <Row style = {{paddingTop: "3vh", paddingBottom: "3vh"}}>
                    <Col xs = {0} md = {8}/>
                    <Col xs = {24} md = {8} style = {{textAlign: "center", fontFamily: "minecraft", fontSize: "100%"}}>
                        {/* TODO -  ADD THE START GAME FUNCTION */}
                        <Button htmlType = "submit" style = {{borderRadius: "50%", width: "30vh"}}>
                            {/* <Link to = "/player/1/waiting"> */}

                                Rules
                            {/* </Link> */}
                        </Button>
                    </Col>
                    <Col xs = {0} md = {8}/>
                </Row>

                
                
                
            </div>
        )
    }
}