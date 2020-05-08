import React from 'react';
import CharacterCard from './CharacterCard';
import AllCards from './AllCards';
import Night from './Night';
import CenterCards from './CenterCards';

/*
How to play audio:
1. Put audio file in public/Audio
2. Create new Audio object with that url
3. Add event listeners
4. Call play

const audio = new Audio("../Audio/test.mp3");
audio.addEventListener("ended", () => console.log("ended!"));
audio.play();
*/

export default class GameScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isReady: false,
            turnActive: false,
            actionDisabled: false
        }
        this.handleSAct = this.handleSAct.bind(this);
    }

    componentDidMount() {
        const { wsem } = this.props;
        wsem.addEventHandler("s_act", this.handleSAct);
    }
    
    handleSAct(data) {
        if(data.state === "start") this.setState({ turnActive: true });
        else if(data.state === "end") this.setState({ turnActive: false });

        if(data.data.sleep) this.setState({ actionDisabled: true });

        // TODO: deal with role-specific stuff
    }

    readyUp = () => {
        this.setState({isReady: true});
    }

    getComponent() {
        const { isReady, turnActive, actionDisabled } = this.state;
        const { role, players } = this.props;

        if(!isReady) {
            return (
                <div>
                    {/* <CharacterCard role = {role} name = {"You"} flippable = {true}/>
                    <Button onClick = {this.readyUp} style = {{marginTop: "120vw"}}>
                        READY
                    </Button> */}
                    <AllCards players={players} />
                </div>
            );
        } else if(!turnActive) {
            return <Night />;
        } else if(actionDisabled) {
            // TODO: make look all pretty-like
            return <div>A sleep spell has been cast on you! Go back to sleep.</div>
        } else if(role === "sydney" || role === "annalise" ||role === "hannah") {
            return <AllCards players={players} />;
        } else if(role === "cat" || role === "daniel") {
            return <CenterCards />;
        } else if(role === "isaac" || role === "annalise") {
            return <CharacterCard role = {role} flippable = {true} name = {"Name"}/>;
        } else {
            // TODO: default screen when it's your turn
            return <div>It's your turn</div>
        }
    }
    
    render() {
        return (
            <div>
                {this.getComponent()}
            </div>
        );
    }
}
