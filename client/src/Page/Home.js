import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import styled from "styled-components";
import Buddies from "../image/Buddies.jpg"


function Home({ user, setUser }) {
    const navigate = useNavigate()

    useEffect(() => {
        user !== undefined ? navigate("/home") : navigate('/')

        console.log(user)
    }, [user])


    return (
        <div>
            <TitleP>Welcome to BUDDIES!!</TitleP>
            <img src={Buddies} alt="Logo" />
        </div>
    );
}

export default Home;

const TitleP = styled.p`
font-size: 50px;
`