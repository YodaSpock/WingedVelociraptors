import React from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import { Input, Button } from 'antd';

const LoginForm = () => (
        <Formik
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
            setTimeout(()=>{
                alert(JSON.stringify(values, null, 2));
                resetForm();
                setSubmitting(false);
            }, 3000)
        }}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                /*Other Things*/
            })=>(
                <form onSubmit = {handleSubmit}>
                    <Input
                    id = "name" 
                    name = "name" 
                    onChange = {handleChange}
                    onBlur = {handleBlur}
                    value = {values.name}
                    placeholder = "Player Name" 
                    style = {{textAlign: "center"}}
                    />
                    <Button style = {{borderRadius: "50%", width: "30vh"}}>
                        Login
                    </Button>
                </form>
            )}
        </Formik>
);

export default LoginForm;