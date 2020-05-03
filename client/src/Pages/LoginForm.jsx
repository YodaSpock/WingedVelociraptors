import React from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import { Input, Button} from 'antd';
//import { Link } from 'react-router-dom';

const LoginForm = () => (
        <FormikForm
        initialValues={{
            name: ''
        }}
        validationSchema={Yup.object({
            name: Yup
            .string()
            .min(4, "Put your full name Catherine...")
            .max(15, "I didn't mean your entire full name" )
            .required("You forgot your name, you fool!")
        })}
        onSubmit={(values, {setSubmitting, resetForm}) => {
            console.log(values.name);
            setTimeout(()=>{
                alert(JSON.stringify(values, null, 2));
                resetForm();
                setSubmitting(false);
            }, 3000)
        }}
        >
            {({
                values,
                handleChange,
                handleBlur,
                handleSubmit,
                /*Other Things*/
            })=>(
                <form onSubmit = {handleSubmit}>
                    {/* <Row style = {{paddingTop: "3vh", paddingBottom: "3vh"}}>
                    <Col xs = {6} md = {8}/>
                        <Col xs = {12} md = {8} style = {{textAlign: "center", fontFamily: "minecraft", fontSize: "100%"}}> */}
                            <Input
                            id = "name" 
                            name = "name" 
                            onChange = {handleChange}
                            onBlur = {handleBlur}
                            value = {values.name}
                            placeholder = "Player Name" 
                            style = {{textAlign: "center"}}
                            />
                        {/* </Col>
                        <Col xs = {6} md = {8}/>
                    </Row> */}
                    
                    {/* <Row style = {{paddingTop: "3vh", paddingBottom: "3vh"}}>
                        <Col xs = {0} md = {8}/>
                        <Col xs = {24} md = {8} style = {{textAlign: "center", fontFamily: "minecraft", fontSize: "100%"}}> */}
                            {/* TODO -  ADD THE START GAME FUNCTION */}
                            <Button type = "submit" style = {{borderRadius: "50%", width: "30vh"}}>
                                {/* <Link to = "/player/1/waiting"> */}
                                    Login
                                {/* </Link> */}
                            </Button>
                        {/* </Col>
                        <Col xs = {0} md = {8}/>
                    </Row> */}
                    
                </form>
            )}
        </FormikForm>
);

export default LoginForm;