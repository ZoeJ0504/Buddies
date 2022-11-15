import React, { useState, useEffect } from "react";
import "./App.css";
import Home from "./Page/Home";
import Profile from "./Page/Profile"
import Login from "./Page/Login";
import Pet from "./Page/Pet"
import Job from "./Page/Job"
import NavBar from "./Components/NavBar";
import { Routes, Route } from "react-router-dom"

function App() {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    fetch("/me").then((response) => {
      if (response.ok) {
        response.json().then((user) => setUser(user));
      }
    });
  }, []);


  return (
    <div className="App">
      {user !== undefined && (
        <NavBar
          attribution={user?.attribution}
          username={user?.username}
          setUser={setUser}
        />
      )}
      <Routes>
        <Route path="/" element={<Login setUser={setUser} />} />
        <Route path="/home" element={<Home user={user} setUser={setUser} />} />
        <Route path="/:username" element={<Profile user={user} />} />
        <Route path="/pets" element={<Pet user={user} />} />
        <Route path="/jobs" element={<Job user={user} />} />
      </Routes>
    </div>
  );
}

export default App;