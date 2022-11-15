import React from "react"
import { useState, useEffect } from "react"
import styled from "styled-components"
import NewPet from "../Components/NewPet"
import PetCard from "../Components/PetCard"

function Pet({ user }) {
    const [formVisible, setFormVisible] = useState(false)
    const [pets, setPets] = useState([])

    const handleClick = () => {
        setFormVisible(!formVisible)
    }

    useEffect(() => setPets(user?.pets), [user])


    return (
        <ParentDiv>
            <PetDiv>
                <div>
                    <button onClick={handleClick}>Add New Pet</button>
                    {formVisible ? <NewPet loggedInUser={user} /> : <p></p>}
                </div>
                <CardDiv>
                    {pets?.map(pet => <PetCard pet={pet} />)}
                </CardDiv>
            </PetDiv>
        </ParentDiv>
    )
}

export default Pet;

const PetDiv = styled.div`
display: flex;
justify-content: center;
flex-direction: column;
flex-wrap: wrap;
background-color: #D2B48C;
border: solid;
border-color: #8A6447;
border-width: 10px;
width: auto;
height: auto;
`
const ParentDiv = styled.div`
display: flex;
justify-content: center;
flex-direction: row;
flex-wrap: wrap;
`
const CardDiv = styled.div`
display: flex;
justify-content: center;
flex-direction: row;
flex-wrap: wrap;
`
