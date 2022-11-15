import React, { useState } from "react"
import styled from "styled-components";
import Moment from 'moment'
import UpdatePet from "./NewPet";

function PetCard({ pet }) {
    const [isVisible, setIsVisible] = useState(false)

    const handleClick = () => {
        fetch(`/pets/${pet.id}`, { method: 'DELETE' })
            .then(res => res.json())
            .then(data => console.log(data))
    }

    return (
        <PetCardDiv>
            <PetCardP>{pet.name}</PetCardP>
            <PetImage src={pet.pet_image.url} alt={pet.name} />
            <PetCardP>{Moment(pet.birthday).format('MM-DD-YYYY')}</PetCardP>
            <PetCardP>{pet.animal_type}</PetCardP>
            <PetCardP>{pet.breed}</PetCardP>
            <PetCardButton onClick={() => setIsVisible(!isVisible)}>Edit Pet Info</PetCardButton>
            {isVisible === true && <UpdatePet pet={pet} />}
            <PetCardButton onClick={handleClick}>Delete</PetCardButton>
        </PetCardDiv>
    )
}

export default PetCard;

const PetCardDiv = styled.div`
background-color: white; 
width: auto;
height: auto;
display: flex;
flex-direction: column;
justify-content: center;
padding: 10px;
gap: 5px;
margin: 5px;
box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`

const PetImage = styled.img`
width: 300px;
height: 300px;
display:flex;
align-self: center;
`

const PetCardButton = styled.button`
display: flex;
align-self: center;
width: auto;
padding: 10px;
height: auto;
`

const PetCardP = styled.p`
margin: 10px; 
padding: 5px;
font-size: 25px;
`