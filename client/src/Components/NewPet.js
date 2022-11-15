import React, { useEffect, useState } from "react";

function NewPet({ loggedInUser }) {

    const [userId, setUserId] = useState(0)
    const [newPet, setNewPet] = useState({})


    useEffect(() => setUserId(loggedInUser?.id), [loggedInUser])

    const onImageChange = (event) => {
        setNewPet({ ...newPet, pet_image: event.target.files[0] })
    }

    const handleChange = (event) => {
        setNewPet({ ...newPet, [event.target.name]: event.target.value })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData()
        formData.append('user_id', userId)
        Object.keys(newPet).forEach(key => formData.append(key, newPet[key]))

        fetch("/newpet", {
            method: "POST",
            body: formData,
        }).then((r) => {
            if (r.ok) {
                r.json().then((pet) => console.log(pet));
            }
        });
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input onChange={handleChange} type="text" placeholder="name" name="name" />
                <input onChange={handleChange} type="text" placeholder="animal-type" name="animal_type" />
                <input onChange={handleChange} type="text" placeholder="breed" name="breed" />
                <input onChange={handleChange} type="date" name="birthday" />
                <input type="file" accept="image/*" multiple={false} onChange={onImageChange} />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default NewPet