import React from 'react';
import {Checkbox, Divider, Button} from 'antd';
import '../Styles/FixMargin.scss'

export default class AllCards extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            names: null
        }
    }
    
    onChange = (checkedNames) => {
        var changedNames = [];
        checkedNames.forEach((name) => {
            changedNames.push(name);
            console.log("Player: " + name + " Selected")
        })
        this.setState({
            names: changedNames,
        });
        console.log("State: " + this.state.names)
      };

    render(){
        const {
            players,
            onSubmit, 
            numPlayers
        } = this.props; 
        
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };

        return(
            <div style = {{fontFamily: "minecraft", marginLeft: "10vw", marginRight: "10vw"}}>
                Select {numPlayers} Player{numPlayers > 1 ? "s": ""} : 
                <Divider/>
                <div style = {{alignText: "center", height: "100%", width: "100%"}}>
                    <Checkbox.Group onChange = {this.onChange}>
                        {players.map((player) => 
                            <Checkbox key = {player.id} style = {radioStyle} value = {player.id}>
                                {player.name}
                            </Checkbox>          
                        )}          
                    </Checkbox.Group>
                </div>
                <Divider/>
                <Button onClick = {() => onSubmit(this.state.names)}> Submit </Button>
            </div>
        )
    }
}