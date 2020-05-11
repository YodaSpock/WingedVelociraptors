import React from 'react';
import {Radio, Divider, Button} from 'antd';
import '../Styles/FixMargin.scss'

export default class CenterCards extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            card: 0,
        }
    }
    
    onChange = (e) => {
        this.setState({
            card: e.target.value,
        })
        console.log(e.target.value)
    };

    render(){
        const {
            onSubmit
        } = this.props; 
        
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
            marginBottom: '5px'
        };

        return(
            <div style = {{fontFamily: "minecraft", marginLeft: "10vw", marginRight: "10vw"}}>
                Select a Card: 
                <Divider/>
                <div style = {{alignText: "center", height: "100%", width: "100%"}}>
                    <Radio.Group onChange = {this.onChange}>
                        <Radio.Button style={radioStyle} value={0}>
                            Left Card
                        </Radio.Button>
                        <Radio.Button style={radioStyle} value={1}>
                            Middle Card
                        </Radio.Button>
                        <Radio.Button style={radioStyle} value={2}>
                            Right Card
                        </Radio.Button>
                    </Radio.Group>
                </div>
                <Divider/>
                <Button onClick = {() => onSubmit(this.state.card)}> Submit </Button>
            </div>
        )
    }
}