import React from 'react';
import {Formik} from 'formik';
import {Link, useHistory} from 'react-router-dom'
import * as Yup from 'yup';
import { Input, Button, Row, Col} from 'antd';

const LoginForm = ({wsem, onRole}) => {
    let history = useHistory();
      
    const getRole = e => {
        onRole(e);
        console.log("GET ROLE - LOGIN FORM")
        console.log(e);
        history.push("/player/game");
    };
    // let history = useHistory();

    // const handleLogin = (name) =>{
    //     console.log("Logged in as " + name);
    //     // TODO - Call the server name function -> send the info to the server
    //     history.push({pathname: "/player/waiting", state: {playerName: name}});
    // }

    return(
        <Formik
            initialValues={{
                name: ''
            }}
            validationSchema={Yup.object({
                name: Yup
                    .string()
                    .min(4, "Put your full name Catherine...")
                    .max(15, "Very funny, please put just your first name" )
                    .required("You forgot your name... you fool!")
            })}
            onSubmit={(values, {setSubmitting, resetForm}) => {
                console.log(values.name);
                wsem.sendMessage("c_join", {name: values.name})
                wsem.addEventHandler("s_role", getRole)
                setTimeout(()=>{
                    alert(JSON.stringify(values, null, 2));
                    resetForm();
                    setSubmitting(false);
                }, 1000)
            }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    /*Other Things*/
                })=>(
                    <form onSubmit = {handleSubmit}>
                        <Row style = {{paddingTop: "3vh", paddingBottom: "3vh", justifyContent: "center"}}>
                            <Col xs = {12} md = {8} style = {{textAlign: "center", fontFamily: "minecraft", fontSize: "100%"}}>
                                <Input
                                id = "name" 
                                name = "name" 
                                onChange = {handleChange}
                                onBlur = {handleBlur}
                                value = {values.name}
                                placeholder = "Player Name" 
                                style = {{textAlign: "center"}}
                                />
                                {touched.name && errors.name}
                            </Col>
                        </Row>
                        
                        <Row style = {{paddingTop: "3vh", paddingBottom: "3vh", justifyContent: "center"}}>
                            <Col xs = {24} md = {12} style = {{textAlign: "center", fontFamily: "minecraft", fontSize: "100%"}}>
                                {/* This is for hiding the errors button when the name has an error */}
                                {errors.name == null ? 
                                    <Button htmlType = "submit" style = {{borderRadius: "50%", width: "30vh"}}>
                                        <Link to={{
                                            pathname: '/player/waiting',
                                            name: values.name,
                                        }}>
                                            Login
                                        </Link>
                                    </Button>
                                : null}
                            </Col>
                        </Row>
                        
                    </form>
                )}
        </Formik>
    );
};

export default LoginForm;