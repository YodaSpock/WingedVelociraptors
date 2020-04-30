import React from 'react';
//import { Layout } from 'antd';
import '../Styles/NavBar.scss';
import LoginScreen from './LoginScreen'


export default class NavBar extends React.Component{
    render(){
        return(
            <div className = "layout">
                <div style = {{fontFamily: "jurassic", fontSize: "65px", textAlign: "center"}}>
                    Winged Velociraptors
                   
                </div>
                <div>
                    <LoginScreen/>
                </div>
                <div style = {{fontFamily: "jurassic", fontSize: "30px", textAlign: "center", position: "absolute", bottom: "0", width: "100%"}}>
                    A Game by Daniel Schubert and Isaac Spanier
                </div>
            </div>
        )
    }
}