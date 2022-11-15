import React, { useEffect, useState } from "react"
import styled from "styled-components"
import Event from "../Components/Event"

function Job({ user }) {
    const [events, setEvents] = useState([])

    useEffect(() => {
        fetch("/events")
            .then(res => res.json())
            .then(data => setEvents(data))
    }, [])

    const filteredEvents = events.filter(event => event.petsitter_id === null)

    return (
        <BigDiv>
            <EventsDiv>
                {filteredEvents.map(event => <Event key={event.id} event={event} user={user} />)}
            </EventsDiv>
        </BigDiv>
    )
}

export default Job

const EventsDiv = styled.div`
display: flex;
justify-content: center;
flex-direction: row;
flex-wrap: wrap;
align-self: center;
background-color: #D2B48C;
border: solid;
border-color: #8A6447;
border-width: 10px;
width: 900px;
height: auto;
`

const BigDiv = styled.div`
display: flex; 
justify-content: center;
`