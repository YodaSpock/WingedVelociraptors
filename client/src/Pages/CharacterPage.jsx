import React from 'react'; 
import {Typography} from 'antd'; 
import jerome from "../Images/jerome.png";

const {Title} = Typography; 


export default class CharacterPage extends React.Component{

    render(){
        return(
            <div style = {{textAlign: "center"}}>
                <Title level = {4}>
                    Winged Velociraptor
                </Title>
                <img src = {jerome} alt = "Winged Velociraptor" style = {{height: "40vh", borderRadius: "30%"}}/>
                <p style = {{textAlign: "justify"}}>
                
                </p>

                <Title level = {4}>
                    The Austin
                </Title>
                <p style = {{textAlign: "justify"}}>
                
                </p>

                <Title level = {4}>
                    The Jacob
                </Title>
                <p style = {{textAlign: "justify"}}>
                                    
                </p>

                <Title level = {4}>
                    The Annalise 
                </Title>
                <p style = {{textAlign: "justify"}}>
                
                </p>
            </div>
        )
    }
}