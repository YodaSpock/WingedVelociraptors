import React from 'react';

export default class NarratorScreen extends React.Component{
    constructor(props) {
        super(props);

        this.handleNarrate = this.handleNarrate.bind(this);
    }

    componentDidMount() {
        this.props.wsem.addEventHandler("s_narrate", this.handleNarrate);
    }

    handleNarrate(data) {
        const audio = new Audio(`/Audio/${data.dialogue}.mp3`);
        audio.addEventListener("ended", () => this.props.wsem.sendMessage("c_narrAck"));
        audio.play();
    }

    render(){
        return(
            <>
            HELLO THERE
            </>
        )
    }
}