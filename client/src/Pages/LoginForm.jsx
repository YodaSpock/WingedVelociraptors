import React from 'react';
import {Formik} from 'formik';
import {useHistory} from 'react-router-dom'
import * as Yup from 'yup';
import { Input, Button, Row, Col} from 'antd';

const LoginForm = ({wsem, onRole}) => {

    let history = useHistory();
      
    const getRole = e => {
        onRole(e);
        history.push("/player/game");
        // TODO - ADD A way to remove the listener - STRETCH GOAL
    };

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
            onSubmit={(values) => {
                console.log(values.name);
                wsem.sendMessage("c_join", {name: values.name})
                history.push("/player/waiting");
                wsem.addEventHandler("s_role", getRole)
                
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
                                {errors.name == null ? 
                                    <Button htmlType = "submit" style = {{borderRadius: "50%", width: "30vh"}}>
                                            Login
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