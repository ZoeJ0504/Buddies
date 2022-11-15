import React from "react";
import { useNavigate } from "react-router-dom"
import styled from 'styled-components'

function NavBar({ attribution, logout, username, setUser }) {
    const navigate = useNavigate()

    function handleClick(e) {
        fetch("/logout", {
            method: "DELETE",
        }).then((r) => {
            if (r.ok) {
                logout(null);
            }
        });
        navigate("/")
        setUser(undefined)
    }

    const handleHomeClick = () => navigate("/home")
    const handlePetClick = () => navigate("/pets")
    const handleProfileClick = () => navigate(`/${username}`)
    const handleJobClick = () => navigate("/jobs")

    return (
        <div>

            {attribution === "owner" ? <NavBarDiv>
                <TitleDiv>Buddies</TitleDiv>
                <NormalDiv onClick={handleHomeClick}>Home</NormalDiv>
                <NormalDiv onClick={handleProfileClick}>Profile</NormalDiv>
                <NormalDiv onClick={handlePetClick}>Pets</NormalDiv>
                <NormalDiv onClick={handleClick}>Logout</NormalDiv>
            </NavBarDiv> : <NavBarDiv>
                <TitleDiv>Buddies</TitleDiv>
                <NormalDiv onClick={handleHomeClick}>Home</NormalDiv>
                <NormalDiv onClick={handleProfileClick}>Profile</NormalDiv>
                <NormalDiv onClick={handleJobClick}>Jobs</NormalDiv>
                <NormalDiv onClick={handleClick}>Logout</NormalDiv>
            </NavBarDiv>}
        </div>
    )
}

export default NavBar

const TitleDiv = styled.div`
font-family: 'Luckiest Guy', cursive;
color: #32DE8A;
font-size: 50px;
cursor: default;
`

const NormalDiv = styled.div`
font-family: 'Luckiest Guy', cursive;
font-size: 30px;
cursor: pointer;
`

const NavBarDiv = styled.div`
padding: 20px;
display: flex; 
justify-content: space-between;
align-items: center;
`