import React from 'react'; 
import {Typography, Divider} from 'antd'; 
import jerome from "../Images/jerome.png";
import Annalise from "../Images/DorsalFinGang/annalise-1.PNG";
import Austin from "../Images/DorsalFinGang/austin-6.PNG";
import Cat from "../Images/DorsalFinGang/cat-2.PNG";
import Daniel from "../Images/DorsalFinGang/daniel-4.PNG";
import Hannah from "../Images/DorsalFinGang/hannah-4.PNG";
import Isaac from "../Images/DorsalFinGang/isaac-2.PNG";
import Jacob from "../Images/DorsalFinGang/jacob-4.PNG";
import Josh from "../Images/DorsalFinGang/josh-1.PNG";
import Lucas from "../Images/DorsalFinGang/lucas-6.PNG";
import Rachel from "../Images/DorsalFinGang/rachel-2.PNG";
import Sydney from "../Images/DorsalFinGang/sydney-7.PNG";

const {Title} = Typography; 


export default class CharacterPage extends React.Component{

    render(){
        return(
            <div style = {{textAlign: "center"}}>
                <Title level = {4}>
                    Winged Velociraptor (1)
                </Title>
                <img src = {jerome} alt = "Winged Velociraptor" style = {{height: "40vh", borderRadius: "30%"}}/>
                <p style = {{textAlign: "justify"}}>
                This card does 
                {/* TODO - Figure out what card does */}
                </p>
                <Divider/>

                <Title level = {4}>
                    The Sydney (2)
                </Title>
                <img src = {Sydney} alt = "Sydney" style = {{height: "40vh", borderRadius: "30%"}}/>
                <p style = {{textAlign: "justify"}}>
                    This card does 
                    {/* TODO - Figure out what card does */}
                </p>
                <Divider/>

                <Title level = {4}>
                    The Rachel (3)
                </Title>
                <img src = {Rachel} alt = "Rachel" style = {{height: "40vh", borderRadius: "30%"}}/>
                <p style = {{textAlign: "justify"}}>
                    This card does 
                    {/* TODO - Figure out what card does */}
                </p>
                <Divider/>

                <Title level = {4}>
                    The Jacob (4)
                </Title>
                <img src = {Jacob} alt = "Jacob" style = {{height: "40vh", borderRadius: "30%"}}/>
                <p style = {{textAlign: "justify"}}>
                    This card does 
                    {/* TODO - Figure out what card does */}
                </p>
                <Divider/>

                <Title level = {4}>
                    The Austin (5)
                </Title>
                <img src = {Austin} alt = "Austin" style = {{height: "40vh", borderRadius: "30%"}}/>
                <p style = {{textAlign: "justify"}}>
                    This card does 
                    {/* TODO - Figure out what card does */}            
                </p>
                <Divider/>

                <Title level = {4}>
                    The Annalise
                </Title>
                <img src = {Annalise} alt = "Annalise" style = {{height: "40vh", borderRadius: "30%"}}/>
                <p style = {{textAlign: "justify"}}>
                    This card does 
                    {/* TODO - Figure out what card does */}
                </p>
                <Divider/>

                

                <Title level = {4}>
                    The Cat
                </Title>
                <img src = {Cat} alt = "Catherine" style = {{height: "40vh", borderRadius: "30%"}}/>
                <p style = {{textAlign: "justify"}}>
                    This card does 
                    {/* TODO - Figure out what card does */}
                </p>
                <Divider/>

                <Title level = {4}>
                    The Daniel
                </Title>
                <img src = {Daniel} alt = "Annalise" style = {{height: "40vh", borderRadius: "30%"}}/>
                <p style = {{textAlign: "justify"}}>
                    This card does 
                    {/* TODO - Figure out what card does */}
                </p>
                <Divider/>

                <Title level = {4}>
                    The Hannah
                </Title>
                <img src = {Hannah} alt = "Hannah" style = {{height: "40vh", borderRadius: "30%"}}/>
                <p style = {{textAlign: "justify"}}>
                    This card does 
                    {/* TODO - Figure out what card does */}
                </p>
                <Divider/>

                <Title level = {4}>
                    The Isaac
                </Title>
                <img src = {Isaac} alt = "Isaac" style = {{height: "40vh", borderRadius: "30%"}}/>
                <p style = {{textAlign: "justify"}}>
                    This card does 
                    {/* TODO - Figure out what card does */}
                </p>
                <Divider/>

                

                <Title level = {4}>
                    The Josh
                </Title>
                <img src = {Josh} alt = "Josh" style = {{height: "40vh", borderRadius: "30%"}}/>
                <p style = {{textAlign: "justify"}}>
                    This card does 
                    {/* TODO - Figure out what card does */}
                </p>
                <Divider/>

                <Title level = {4}>
                    The Lucas
                </Title>
                <img src = {Lucas} alt = "Lucas" style = {{height: "40vh", borderRadius: "30%"}}/>
                <p style = {{textAlign: "justify"}}>
                    This card does 
                    {/* TODO - Figure out what card does */}
                </p>
                <Divider/>

               

                
            </div>
        )
    }
}