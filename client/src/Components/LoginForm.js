import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import styled from "styled-components";

function LoginForm({ setUser, setIsVisible, isVisible }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()

    function handleClick(e) {
        setIsVisible(true)
    }

    function handleSubmit(e) {
        e.preventDefault();

        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
            }),
        }).then((r) => {
            if (r.ok) {
                r.json().then((user) => {
                    setUser(user)
                    navigate("/home")
                });
            }
        });

    }
    return (
        <LoginFormDiv>
            <FormTitle>Login</FormTitle>
            <FormLogin onSubmit={handleSubmit}>
                <Input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <FormButton type="submit">Login</FormButton>
            </FormLogin>
            <SignUpButton onClick={handleClick}>Dont have an account?  Sign up!</SignUpButton>
        </LoginFormDiv>
    );
}

export default LoginForm;

const LoginFormDiv = styled.div`
border-style: solid;
border-radius: 12px;
border-color: #32DE8A;
display: flex;
flex-direction: column;
align-items: center;
width: 500px;
height: 550px;
padding: 30px;
box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
gap: 30px;
`

const FormLogin = styled.form`
display: flex;
flex-direction: column;
gap: 30px;
`

const Input = styled.input`
font-size: 20px;
border-style: solid;
border-radius: 12px;
border-color: #32DE8A;
padding: 15px;
width: 350px;
height:auto;
`

const FormTitle = styled.div`
font-size: 50px;
`

const FormButton = styled.button`
border-style: solid;
border-radius: 12px;
border-color: #32DE8A;
background-color: #32DE8A;
color: white;
font-size: 20px;
width: 100px;
height: auto;
display: flex;
align-self: center;
justify-content: center; 
&:hover {
    background-color: #30d986;
  }
`

const SignUpButton = styled.button`
border-style: solid;
border-radius: 12px;
border-color: #32DE8A;
background-color: #32DE8A;
color: white;
font-size: 20px;
width: 250px;
height: auto;
display: flex;
align-self: center;
justify-content: center;
&:hover {
    background-color: #30d986;
  }
`