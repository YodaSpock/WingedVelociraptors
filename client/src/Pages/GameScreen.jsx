import React, { useEffect } from 'react';
import CharacterCard from './CharacterCard';
import AllCards from './AllCards';
import Night from './Night';
import CenterCards from './CenterCards';
import { Button } from 'antd';
import useStorageState from "../useStorageState";

const GameScreen = ({ wsem, history, onVotingBegin, role, players }) => {
    const [isReady, setIsReady] = useStorageState("isReady", false);
    const [turnActive, setTurnActive] = useStorageState("turnActive", false);
    const [actionDisabled, setActionDisabled] = useStorageState("actionDisabled", false);
    const [roleToDisplay, setRoleToDisplay] = useStorageState("roleToDisplay", "");
    const [nameToDisplay, setNameToDisplay] = useStorageState("nameToDisplay", "");

    useEffect(() => {
        const handleSAct = (data) => {
            if(data.state === "start") setTurnActive(true);
            else if(data.state === "end") setTurnActive(false);
    
            if(!data.data) return;
    
            if(data.data.sleep) setActionDisabled(true);
    
            if(role === "rachel" && data.data.noise) {
                // const audio = new Audio("../Audio/test.mp3");
                // audio.play();
                console.log("FIX this")
            } else if(role === "annalise" || role === "isaac") {
                setRoleToDisplay(data.data.role);
            }
        };

        wsem.addEventHandler("s_act", handleSAct);
        wsem.addEventHandler("s_timerStart", (data) => {
            onVotingBegin(data);
            history.push("/player/voting");   
        });
    }, [history, onVotingBegin, role, setActionDisabled, setRoleToDisplay, setTurnActive, wsem]);

    const onAllCardsSubmit = (ids) => {
        if(role === "sydney" || role === "annalise") {
            wsem.sendMessage("c_act", { data: { id: ids[0] }});
            if(role === "annalise") {
                setNameToDisplay(players.filter((el) => el.id === ids[0])[0].name);
            }
        } else if(role === "hannah") {
            wsem.sendMessage("c_act", { data: { ids }});
        }
    };

    const onCenterCardsSubmit = (index) => {
        if(role === "daniel" || role === "cat") {
            wsem.sendMessage("c_act", { data: { card: index }});
        }
    };

    const onCharacterCardSubmit = (swap) => {
        if(role === "annalise") {
            wsem.sendMessage("c_act", { data: { swap }});
        }
    };

    const readyUp = () => {
        wsem.sendMessage("c_ready");
        setIsReady(true);
    };

    const getComponent = () => {
        if(!isReady) {
            return (
                <div>
                    <CharacterCard role = {role} name = {"You"} flippable = {true}/>
                    <Button onClick = {readyUp} style = {{marginTop: "120vw"}}>
                        READY
                    </Button>
                    
                </div>
            );
        } else if(!turnActive) {
            return <Night />;
        } else if(actionDisabled) {
            // TODO: make look all pretty-like
            return <div>A sleep spell has been cast on you! Go back to sleep.</div>
        } else if(role === "sydney" || (role === "annalise" && !roleToDisplay) || role === "hannah") {
            const numPlayers = (role === "hannah" ? 2 : 1);
            return <AllCards players={players} onSubmit={onAllCardsSubmit} numPlayers = {numPlayers} />;
        } else if(role === "cat" || role === "daniel") {
            return <CenterCards onSubmit={onCenterCardsSubmit} />;
        } else if(role === "isaac") {
            return <CharacterCard onSubmit={onCharacterCardSubmit} role = {roleToDisplay} flippable = {true} name = {"You"}/>;
        } else if(role === "annalise") {
            return <CharacterCard onSubmit={onCharacterCardSubmit} role = {roleToDisplay} swap = {true} flippable = {true} name = {nameToDisplay}/>;
        } else {
            // TODO: default screen when it's your turn
            return <div>It's your turn</div>
        }
        // TODO: s_error display
    }

    return (
        <div>
            {getComponent()}
        </div>
    );
};

export default GameScreen;
