import React, { useState } from "react";

function NewEvent({ user }) {
    const [attribute, setAttribute] = useState("")
    const [newEvent, setNewEvent] = useState({ owner_id: user })

    const handleSelectChange = (event) => {
        setAttribute(event.target.value)
        setNewEvent({ ...newEvent, [event.target.name]: event.target.value })
    }

    const handleChange = (event) => {
        setNewEvent({ ...newEvent, [event.target.name]: event.target.value })
        console.log(newEvent)
    }

    console.log(newEvent)

    const handleSubmit = (event) => {
        event.preventDefault()

        fetch("/newevent", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newEvent)
        })
    }


    return (
        <div>
            <select name="need" onChange={handleSelectChange}>
                <option value="select">Select</option>
                <option value="walk">Walk</option>
                <option value="petsit">Pet Sitting</option>
            </select>

            {
                attribute === 'select' && (
                    <div>Please Select What Event You'd Like To Plan</div>
                )
            }
            {
                attribute === 'walk' && (
                    <form onSubmit={handleSubmit}>
                        <input type="datetime-local" name="start" onChange={handleChange} />
                        <input type="text" name="details" onChange={handleChange} />
                        <button>Submit</button>
                    </form>
                )
            }
            {attribute === 'petsit' && (
                <form onSubmit={handleSubmit}>
                    <input type="datetime-local" name="start" onChange={handleChange} />
                    <input type="datetime-local" name="end" onChange={handleChange} />
                    <input type="text" name="details" onChange={handleChange} />
                    <button>Submit</button>
                </form>
            )}
        </div>
    )
}

export default NewEvent