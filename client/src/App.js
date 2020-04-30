import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom'
import './App.css';
import Header from './Pages/Header';
import Footer from './Pages/Footer';
import 'antd/dist/antd.css';
import LoginScreen from './Pages/LoginScreen';
import WelcomeScreen from './Pages/WelcomeScreen';
import NarratorWaitingScreen from './Pages/NarratorWaitingScreen';
import '../src/Styles/Layout.scss';


function App() {
  return (
    <div className = "layout" style = {{height: "100%"}}>
      <BrowserRouter>
        <Header/>
        <Route path = "/" exact component = {WelcomeScreen}/>
        <Route path = "/player" exact component = {LoginScreen}/>
        <Route path = "/narrator" exact component = {NarratorWaitingScreen}/>
        <Route path = "/" exact component = {LoginScreen}/>
        <Route path = "/" exact component = {LoginScreen}/>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
