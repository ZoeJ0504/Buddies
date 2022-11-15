import React, { useState } from "react";
import LoginForm from "../Components/LoginForm";
import SignUp from "./SignUp";
import styled from "styled-components";
import Buddies from "../image/Buddies.jpg"

function Login({ setUser }) {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div>
            <TitleDiv>BUDDIES</TitleDiv>
            <BodyDiv>
                <div>
                    <LogoImg src={Buddies} alt="Buddies Logo" />
                </div>
                {isVisible ? (
                    <SignUp setUser={setUser} setIsVisible={setIsVisible} isVisible={isVisible} />
                ) : (
                    <LoginForm setUser={setUser} setIsVisible={setIsVisible} />
                )}
            </BodyDiv>
        </div>
    );
}

export default Login;

const BodyDiv = styled.div`
display: flex; 
justify-content: space-between;
padding: 30px;
`
const TitleDiv = styled.div`
font-family: 'Luckiest Guy', cursive;
color: #32DE8A;
font-size: 50px;
display: flex;
self-align: flex-start;
padding: 20px;
`

const LogoImg = styled.img`
width: 900px;
height: auto;
padding: 20px;
padding-left: 30px;
margin-left: 50px;
`