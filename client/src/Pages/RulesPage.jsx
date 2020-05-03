import React from 'react'; 
import {Typography} from 'antd'
const {Title} = Typography; 

export default class RulesPage extends React.Component{

    render(){
        return(
            <>
            <Title level = {4}>
                Gameplay
            </Title>
            <p>
                This game is very similar to One Night Ultimate Werewolf
            </p>
            
            </>

        )
    }
}