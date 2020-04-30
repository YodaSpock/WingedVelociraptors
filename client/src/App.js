import React from 'react';
import {BrowserRouter,
//Route
} from 'react-router-dom'
import './App.css';
import NavBar from './Pages/NavBar';
import 'antd/dist/antd.css';


function App() {
  return (
    <div className = "mainDiv" style = {{height: "100%"}}>
      <BrowserRouter>
        <NavBar/>
      </BrowserRouter>
    </div>
  );
}

export default App;
