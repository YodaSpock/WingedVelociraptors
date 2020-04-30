import React from 'react';


export default class Footer extends React.Component{
    render(){
        return(
            <div style = {{fontFamily: "jurassic", fontSize: "30px", textAlign: "center", position: "absolute", bottom: "0", width: "100%"}}>
                A Game by Daniel Schubert and Isaac Spanier
            </div>
        )
    }
}