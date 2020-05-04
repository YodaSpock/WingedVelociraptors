import React from 'react'; 
import {Typography} from 'antd'
const {Title} = Typography; 

export default class RulesPage extends React.Component{

    render(){
        return(
            <>
                <Title level = {4}>
                    Overview
                </Title>
                <p style = {{textAlign: "justify"}}>
                    Winged Velociraptors is based on the game One Night Ultimate Werewolf.
                    In this game the <b><i>Winged Velociraptors</i></b> try to blend in with the 
                    other players who are the <b><i>Dorsal Fin Gang</i></b>. The Dorsal Fin Gang's  
                    goal is to figure out who the Winged Velociraptors are, and 
                    get a majority vote to kill one of them. 
                </p>

                <Title level = {4}>
                    The Night
                </Title>
                <p style = {{textAlign: "justify"}}>
                    Eveyone will be assigned a random card which will be their identity for the game. 
                    Then everyone will close their eyes and the shenanigans will ensue. Player's card abilites will 
                    activate at certain times throughout the night, and will allow them to move, switch and view player's cards. 
                    Not everyone will have the same card as at the beginning of the night. Without looking at your new card 
                    you must deduce who everyone at the table really is, and try to find the Winged Velociraptors, 
                    or blend in if you  a Winged Velociraptor. However if your identity switched during the 
                    night you must win with your new identity. <b>So even if you started as a Dorsal Fin Gang 
                    member and your card was switched to a Winged Velociraptor you must try to win as a 
                    Winged Velociraptor. </b>
                </p>

                <Title level = {4}>
                    The Day
                </Title>
                <p style = {{textAlign: "justify"}}>
                    After players wake up, they discuss who they believe the Winged Velociraptors are. All 
                    players can say anything, but once the day begins, <b>you can not look at or show your 
                    card to anyone</b>. Again, you are not always the same character you started as and you 
                    are trying to win as your current character, whose identity is a secret to you. After the 
                    timer goes off players will have a few seconds to lock in their vote. 
                    
                </p>

                <Title level = {4}>
                    Winning
                </Title>
                <p style = {{textAlign: "justify"}}>
                    After everyone locks in their answer then If a majority of people
                    vote for a Winged Velociraptor then the Dorsal Fin Gang wins. However,
                    if the majority of people vote for a Dorsal Fin Gang member then the 
                    Winged Velociraptors will win. If you are playing with <b>The Lucas</b>, there 
                    are additional winning conditions with his character, so refer to the Characters 
                    section. 
                </p>
            </>
        )
    }
}