import React from 'react';
import {Button, Row, Col, Modal} from 'antd';
import "../Styles/Waiting.scss"
import RulesPage from './RulesPage';
export default class PlayerWaitingScreen extends React.Component{
    
    state = {rulesVisible: false};

    showRules = () => {
        this.setState({
            rulesVisible: true,
        })
    }

    closeRules = (e) =>{
        this.setState({
            rulesVisible: false,
        })
    }

    render(){
        return(
            <div>
                <Modal
                    title = "Winged Velociraptor Game Rules"
                    visible = {this.state.rulesVisible}
                    onCancel = {this.closeRules}
                    footer = {[
                        <Button key = "noice" type = "primary" onClick = {this.closeRules}>
                            Noice
                        </Button>
                    ]}
                >
                    <RulesPage/>
                </Modal>

                <Row style = {{paddingTop: "3vh", paddingBottom: "3vh", justifyContent: "center"}}>
                    <Col xs = {12} md = {8} style = {{textAlign: "center", fontFamily: "minecraft", fontSize: "200%"}}>
                        {/* Create State for player name */}
                        Welcome Isaac 
                    </Col>
                </Row>

                <Row style = {{paddingTop: "3vh", paddingBottom: "3vh", justifyContent: "center"}}>
                    <Col xs = {24} md = {8} style = {{textAlign: "center", fontFamily: "minecraft", fontSize: "200%"}}>
                        {/* Create State for player name */}
                        You are Player 1
                    </Col>
                </Row>

                <Row style = {{paddingTop: "3vh", justifyContent: "center"}}>
                    <Col xs = {24} md = {8} style = {{textAlign: "center", fontFamily: "jurassic", fontSize: "250%", letterSpacing: "1px"}}>
                        <div className = "loading">
                            {/* TODO- Add a Countdown Timer for a strech goal */}
                            Waiting for Game
                            <span class = "ellipsis">
                                <span>.</span>
                                <span>.</span>
                                <span>.</span>
                            </span>
                        </div>
                    </Col>
                </Row>

                <Row style = {{paddingTop: "3vh", justifyContent: "center"}}>
                    <Col xs = {24} md = {12} style = {{textAlign: "center", fontFamily: "minecraft", fontSize: "100%"}}>
                        {/* TODO -  ADD THE START GAME FUNCTION */}
                        <Button onClick = {this.showRules} style = {{borderRadius: "50%", width: "30vh"}}>
                            {/* <Link to = "/player/1/waiting"> */}
                                Rules
                            {/* </Link> */}
                        </Button>
                    </Col>
                </Row>

                <Row style = {{paddingTop: "3vh", justifyContent: "center"}}>
                    <Col xs = {24} md = {12} style = {{textAlign: "center", fontFamily: "minecraft", fontSize: "100%"}}>
                        {/* TODO -  ADD THE START GAME FUNCTION */}
                        <Button onClick = {this.showRules} style = {{borderRadius: "50%", width: "30vh"}}>
                            {/* <Link to = "/player/1/waiting"> */}
                                Characters
                            {/* </Link> */}
                        </Button>
                    </Col>
                </Row>
            </div>
        )
    }
}