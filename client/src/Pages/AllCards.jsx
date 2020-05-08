import React from 'react';
import {Checkbox, Divider, Button} from 'antd';
//import CharacterCard from './CharacterCard';
import '../Styles/FixMargin.scss'

export default class AllCards extends React.Component{
    state = {
        names = [],
    }

    onChange = (checkedNames) => {
        changedNames = [];
        console.log(checkedNames);
        checkedNames.forEach((name) => {
            
            console.log("Player: " + name + " Selected")
        })
        // this.setState({
        //     value: e.target.value,
        // });
      };

    render(){
        const {
            role,
            players,
            AllCardsSubmit
        } = this.props; 
        
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
            //marginBottom: '5px',
        };

        const {value} = this.state;

        {/* {players.map((player) => <p key={player.id}>{player.name}</p>)} */}
        {/* {players.map((player) => <CharacterCard key = {player.id} flippable = {false} name = {player.name}/> )}
        {players.map((player) => {console.log(player.name)})} */}
        return(
            <div style = {{fontFamily: "minecraft", marginLeft: "10vw", marginRight: "10vw"}}>
                Select a Player: 
                <Divider/>
                <div style = {{alignText: "center", height: "100%", width: "100%"}}>
                    <Checkbox.Group onChange = {this.onChange}>
                            <Checkbox key = {1} style = {radioStyle} value = {1}>
                                {1}
                            </Checkbox> 
                            <Checkbox key = {2} style = {radioStyle} value = {2}>
                                {2}
                            </Checkbox> 
                            <Checkbox key = {3} style = {radioStyle} value = {3}>
                                {3}
                            </Checkbox> 
                        {/* {players.map((player) => 
                            <Checkbox key = {player.id} style = {radioStyle} value = {player.id}>
                                {player.name}
                            </Checkbox>          
                        )}           */}
                    </Checkbox.Group>
                    <Button onClick = {() => AllCardsSubmit()}> Submit </Button>
                </div>
            </div>
        )
    }
}