import React, { useEffect, useState } from "react"
import styled from "styled-components"
import PetSit from "../image/PetSit.png"
import PetWalk from "../image/PetWalk.png"
import Modal from 'react-modal';

function Event({ event, user }) {
    const [owner, setOwner] = useState({})
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [pets, setPets] = useState([])
    const [petsitter, setPetsitter] = useState({})
    let subtitle;

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '350px',
        },
    };

    useEffect(() => {
        fetch(`/user/${event.owner_id}`)
            .then(res => res.json())
            .then(data => setOwner(data))
    }, [event])

    useEffect(() => {
        event.petsitter_id === null ? console.log("No Petsitter") :
            fetch(`/user/${event.petsitter_id}`)
                .then(res => res.json())
                .then(data => setPetsitter(data))
    }, [])


    useEffect(() => { setPets(owner.pets) }, [owner])

    function closeModal() {
        setIsOpen(false);
    }
    function openModal() {
        setIsOpen(true);
    }
    function afterOpenModal() {
        subtitle.style.color = '#32DE8A';
    }
    const UpdateEvent = () => {
        fetch(`/events/${event.id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                petsitter_id: user.id,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
    }

    return (
        <>
            <EventDiv>
                {event?.need === "walk" ? <DefaultImage src={PetWalk} alt="Pet walk" /> : <DefaultImage src={PetSit} alt="Pet Sit" />}
                <p>{owner.city}, {owner.state}</p>

                <button onClick={openModal}>More Info</button>
                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <button onClick={closeModal}>close</button>
                    <h2 ref={(_subtitle) => (subtitle = _subtitle)}>More Info</h2>
                    <p>Owner: {owner.username}</p>
                    <p>PetSitter: {petsitter?.username || 'No Helper'}</p>
                    <p>{event.details}</p>
                    {user?.attribution === "petsitter" ? <button onClick={UpdateEvent}>Choose</button> : console.log("NOT A PETSITTER")}
                    <div>
                        {pets?.map(pet => {
                            return (
                                <PetDiv>
                                    <p>{pet.name}</p>
                                    <p>{pet.animal_type}</p>
                                    <PetImage src={pet.pet_image.url} alt="Pet" />
                                </PetDiv>
                            )
                        })}
                    </div>
                </Modal>
            </EventDiv>
        </>
    )
}

export default Event;

const EventDiv = styled.div`
background-color: white; 
width: 200px;
height: 350px;
display: flex;
flex-direction: column;
justify-content: center;
gap: 15px;
margin: 15px;
padding: 15px;
box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`
const DefaultImage = styled.img`
width: 150px;
height: 150px;
display: flex;
align-self: center;
`

const PetImage = styled.img`
width: 100px;
height: auto;
`
const PetDiv = styled.div`
display: flex; 
border: solid;
border-color: #32DE8A;
border-radius: 10px;
flex-direction: column;
justify-content: center;
`
