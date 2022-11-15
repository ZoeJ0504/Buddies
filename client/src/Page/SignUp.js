import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import styled from "styled-components";

function SignUp({ setUser, setIsVisible }) {
    const [newUser, setNewUser] = useState({})
    const navigate = useNavigate()

    function handleClick(e) {
        setIsVisible(false);
    }

    const onImageChange = (event) => {
        setNewUser({ ...newUser, featured_image: event.target.files[0] })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData()
        Object.keys(newUser).forEach(key => formData.append(key, newUser[key]))

        fetch("/signup", {
            method: "POST",
            body: formData,
        }).then((r) => {
            if (r.ok) {
                r.json().then((user) => setUser(user));
            }
        });
        setIsVisible(true);
        navigate("/home")
    }

    const handleChange = (event) => {
        setNewUser({ ...newUser, [event.target.name]: event.target.value })

    }
    return (
        <SignUpDiv>
            <TitleP>Welcome To BUDDIES!</TitleP>
            <SignUpForm onSubmit={handleSubmit}>
                <SignUpSelect name="attribution" onChange={handleChange}>
                    <option>Select</option>
                    <option value="owner">Owner</option>
                    <option value="petsitter">Pet Sitter</option>
                </SignUpSelect>
                <div>
                    <label>First Name: </label>
                    <SignUpInput type="text" placeholder="First Name" name="first_name" onChange={handleChange} />
                </div>
                <div>
                    <label>Last Name: </label>
                    <SignUpInput type="text" placeholder="Last Name" name="last_name" onChange={handleChange} />
                </div>
                <div>
                    <label>Username: </label>
                    <SignUpInput
                        type="text"
                        name="username"
                        placeholder="Username"
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="password"> Password: </label>
                    <SignUpInput
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="password_confirmation"> Confirm Password: </label>
                    <SignUpInput
                        type="password"
                        name="password_confirmation"
                        placeholder="Password"
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Email: </label>
                    <SignUpInput type="text" placeholder="Email" name="email" onChange={handleChange} />
                </div>
                <div>
                    <label> City: </label>
                    <SignUpInput type="text" placeholder="City" name="city" onChange={handleChange} />
                    <label> State: </label>
                    <SignUpInput type="text" placeholder="State" name="state" onChange={handleChange} />
                </div>
                <FileInput type="file" accept="image/*" multiple={false} onChange={onImageChange} />
                <FormButton type="submit">Submit</FormButton>
            </SignUpForm>

            <SignUpButton onClick={handleClick}>Have an account already? Login!</SignUpButton>
        </SignUpDiv>
    );
}

export default SignUp;

const SignUpForm = styled.form`
display: flex;
flex-direction: column;
align-content: center;
gap: 25px
`

const SignUpDiv = styled.div`
border-style: solid;
border-radius: 12px;
border-color: #32DE8A;
padding: 30px;
display: flex;
flex-direction: column;
align-content: center;
gap: 10px;
box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`

const SignUpInput = styled.input`
border-style: solid;
border-radius: 12px;
border-color: #32DE8A;
width: 250px;
height: auto;
padding: 10px;
font-size: 15px;
`

const TitleP = styled.p`
font-size: 40px;
margin: 20px;
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

const SignUpSelect = styled.select`
border-style: solid;
border-radius: 12px;
border-color: #32DE8A;
width: 100px;
font-size: 15px;
`

const FileInput = styled.input`
font-size: 15px;
`