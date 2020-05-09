import React from 'react';
import CharacterCard from './CharacterCard';
import AllCards from './AllCards';
import Night from './Night';
import CenterCards from './CenterCards';
import { Button } from 'antd'

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
            actionDisabled: false,
            roleToDisplay: "",
            nameToDisplay: ""
        }
        this.handleSAct = this.handleSAct.bind(this);
        this.onAllCardsSubmit = this.onAllCardsSubmit.bind(this);
        this.onCenterCardsSubmit = this.onCenterCardsSubmit.bind(this);
        this.onCharacterCardSubmit = this.onCharacterCardSubmit.bind(this);
    }

    componentDidMount() {
        const { wsem } = this.props;
        wsem.addEventHandler("s_act", this.handleSAct);
        wsem.addEventHandler("s_timerStart", (data) => {
            this.props.onVotingBegin(data);
            this.props.history.push("/player/voting");   
        });
    }
    
    handleSAct(data) {
        if(data.state === "start") this.setState({ turnActive: true });
        else if(data.state === "end") this.setState({ turnActive: false });

        if(!data.data) return;

        if(data.data.sleep) this.setState({ actionDisabled: true });

        const { role } = this.props;
        if(role === "rachel" && data.data.noise) {
            // TODO: play noise
        } else if(role === "annalise" || role === "isaac") {
            this.setState({ roleToDisplay: data.data.role });
        }
    }

    onAllCardsSubmit(ids) {
        const { wsem, role, players } = this.props;
        if(role === "sydney" || role === "annalise") {
            wsem.sendMessage("c_act", { data: { id: ids[0] }});
            if(role === "annalise") {
                this.setState({ nameToDisplay: players.filter((el) => el.id === ids[0])[0].name });
            }
        } else if(role === "hannah") {
            wsem.sendMessage("c_act", { data: { ids }});
        }
    }

    onCenterCardsSubmit(index) {
        const { wsem, role } = this.props;
        if(role === "daniel" || role === "cat") {
            wsem.sendMessage("c_act", { data: { card: index }});
        }
    }

    onCharacterCardSubmit(swap) {
        const { wsem, role } = this.props;
        if(role === "annalise") {
            wsem.sendMessage("c_act", { data: { swap }});
        }
    }

    readyUp = () => {
        this.props.wsem.sendMessage("c_ready");
        this.setState({isReady: true});
    }

    getComponent() {
        const { isReady, turnActive, actionDisabled, roleToDisplay } = this.state;
        const { role, players } = this.props;

        if(!isReady) {
            return (
                <div>
                    <CharacterCard role = {role} name = {"You"} flippable = {true}/>
                    <Button onClick = {this.readyUp} style = {{marginTop: "120vw"}}>
                        READY
                    </Button>
                </div>
            );
        } else if(!turnActive) {
            return <Night />;
        } else if(actionDisabled) {
            // TODO: make look all pretty-like
            return <div>A sleep spell has been cast on you! Go back to sleep.</div>
        } else if(role === "sydney" || role === "annalise" || role === "hannah") {
            return <AllCards players={players} onSubmit={this.onAllCardsSubmit} />;
        } else if(role === "cat" || role === "daniel") {
            return <CenterCards onSubmit={this.onCenterCardsSubmit} />;
        } else if(role === "isaac" || role === "annalise") {
            // TODO - implement annalise edge case for role... 
            //TODO - Add button for isaac/annalise
            return <CharacterCard onSubmit={this.onCharacterCardSubmit} role = {roleToDisplay} flippable = {true} name = {"Name"}/>;
        } else {
            // TODO: default screen when it's your turn
            return <div>It's your turn</div>
        }
        // TODO: s_error display
    }
    
    render() {
        return (
            <div>
                {this.getComponent()}
            </div>
        );
    }
}
