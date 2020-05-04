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
                <p><b>Characters are listed in the order they wake during the night.</b></p>
                <Divider/>

                <Title level = {4}>
                    Winged Velociraptor 
                </Title>
                <img src = {jerome} alt = "Winged Velociraptor" style = {{height: "40vh", borderRadius: "30%"}}/>
                <p style = {{textAlign: "justify", padding: "5%"}}>
                    The Winged Velociraptor has <b>no special powers</b> but has numbers. She must blend in with the Dorsal Fin Gang and not be caught. 
                    There are multiple Winged Velociraptors based on how many are playing and they wake up together and acknowledge each other's 
                    presence before going back to bed. Lie, decieve and win to prove you are a clever girl... 
                </p>
                <Divider/>

                <Title level = {4}>
                    The Sydney
                </Title>
                <img src = {Sydney} alt = "Sydney" style = {{height: "40vh", borderRadius: "30%"}}/>
                <p style = {{textAlign: "justify", padding: "5%"}}>
                    The Sydney learned practiced dark magic down in the land of Disney and now uses it to help her achieve her goals. 
                    On her turn, the Sydney <b>casts a deep sleep spell on another player of her choice which makes that player sleep through their turn 
                    in the night and they don't activate their power</b>. She then returns to bed... 
                </p>
                <Divider/>

                <Title level = {4}>
                    The Rachel 
                </Title>
                <img src = {Rachel} alt = "Rachel" style = {{height: "40vh", borderRadius: "30%"}}/>
                <p style = {{textAlign: "justify", padding: "5%"}}>
                    The Rachel might be the smartest one here, but she is far from the quietest. During the night she trips over something, 
                    perhaps it was a racoon... The Rachel <b>accidentally makes a noise alerting everyone to her presence</b> and then tries to quietly 
                    go back to sleep despite giving away her identity...
                </p>
                <Divider/>

                <Title level = {4}>
                    The Jacob 
                </Title>
                <img src = {Jacob} alt = "Jacob" style = {{height: "40vh", borderRadius: "30%"}}/>
                <p style = {{textAlign: "justify", padding: "5%"}}>
                    The Jacob's hunting insticts tell him to disorient his prey, unaware that another is waiting to reverse his action. 
                    The Jacob <b>shifts all player's character cards to the right, including his own</b>. Unsure of the repercussions it could have, he
                    sticks to his guns and he returns to bed...
                </p>
                <Divider/>

                <Title level = {4}>
                    The Austin 
                </Title>
                <img src = {Austin} alt = "Austin" style = {{height: "40vh", borderRadius: "30%"}}/>
                <p style = {{textAlign: "justify", padding: "5%"}}>
                    The Austin seeks to undo whatever the Jacob has done, unsure of his own motivation, he sets out. The Austin then 
                    <b> shifts all of the player's character cards to the left, including his own</b>. He then realizes he must complete 
                    his Mac N Cheese in the morning so he heads to bed...
                </p>
                <Divider/>

                <Title level = {4}>
                    The Annalise
                </Title>
                <img src = {Annalise} alt = "Annalise" style = {{height: "40vh", borderRadius: "30%"}}/>
                <p style = {{textAlign: "justify", padding: "5%"}}>
                    The Annalise is used to working for the Big 5, but what happend when she must pick between only 2. The Annalise
                    <b> looks at another player's card and chooses to either swap cards with them or not</b>. Upon making the best decision
                    she falls back asleep easily...
                </p>
                <Divider/>

                <Title level = {4}>
                    The Hannah
                </Title>
                <img src = {Hannah} alt = "Hannah" style = {{height: "40vh", borderRadius: "30%"}}/>
                <p style = {{textAlign: "justify", padding: "5%"}}>
                    The Hannah has always wanted to cause some trouble since meeting the Dorsal Fin Gang and knows that
                    now is the time. The Hannah <b>switches two other player's character cards without looking at either of them</b>.
                    The mischievious one then heads to bed...
                </p>
                <Divider/>

                <Title level = {4}>
                    The Daniel
                </Title>
                <img src = {Daniel} alt = "Annalise" style = {{height: "40vh", borderRadius: "30%"}}/>
                <p style = {{textAlign: "justify", padding: "5%"}}>
                    The Daniel has the highest tolerance of the group, or so he thinks. After a night of drinking the Daniel <b>forgets who he is
                    and switches his card for one of the unused character cards</b>. He then stumbles back to his apartment, wondering if anyone 
                    would go with him to get Jeff's Pizza...
                </p>
                <Divider/>

                <Title level = {4}>
                    The Isaac
                </Title>
                <img src = {Isaac} alt = "Isaac" style = {{height: "40vh", borderRadius: "30%"}}/>
                <p style = {{textAlign: "justify", padding: "5%"}}>
                    The Isaac thinks he is so cool staying up so late every night, until falls asleep on the futon realizing that he isn't 
                    sure who he even is. The Isaac <b>views his own character card to see if it changed</b>, and then falls back asleep and 
                    sleeps until noon...
                </p>
                <Divider/>

                <Title level = {4}>
                    The Cat
                </Title>
                <img src = {Cat} alt = "Catherine" style = {{height: "40vh", borderRadius: "30%"}}/>
                <p style = {{textAlign: "justify", padding: "5%"}}>
                    The Cat is the ultimate exposer, and wants to show people she is the leader of the Dorsal Fin Gang. The Cat 
                    <b> chooses an unused character card to flip over and expose to all players</b>. Satisfied with her assertion of 
                    domiance she goes to bed...
                </p>
                <Divider/>

                <Title level = {4}>
                    The Lucas
                </Title>
                <img src = {Lucas} alt = "Lucas" style = {{height: "40vh", borderRadius: "30%"}}/>
                <p style = {{textAlign: "justify", padding: "5%"}}>
                    The Lucas is just pretending to be happy right now, he would rather be behind the couch getting 10 screenshots 
                    on his snpachat story. The Lucas <b>wins only if he is killed and ends the game</b>. Lucas is tired of this stupid game 
                    and wants to do something else...
                </p>
                <Divider/>

                <Title level = {4}>
                    The Josh
                </Title>
                <img src = {Josh} alt = "Josh" style = {{height: "40vh", borderRadius: "30%"}}/>
                <p style = {{textAlign: "justify", padding: "5%"}}>
                    The Josh is a samurai of old, a sturdy man of which no mortal can move. Many have compared him to gods 
                    such as Zeus and even Wonder Woman. The Josh <b> cannot have his card stolen, shifted, or traded</b>. 
                    The Josh will return to the Dorsal Fin Gang after his long exercusion as a king...
                </p>
                <Divider/>

                
            </div>
        )
    }
}