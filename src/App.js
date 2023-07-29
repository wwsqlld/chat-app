import { Auth } from './components/Auth';
import './App.css';
import React, { useState, useRef } from 'react';
import Cookies from 'universal-cookie';
import { Chat } from './components/Chat';
import { signOut } from "firebase/auth";
import { auth } from './firebase.js';

const cookies = new Cookies();

function App() {

  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"))
  const [room, setRoom] = useState(null);

  const roomInputRef = useRef(null);

  const signUserOut = async () => {
    await signOut(auth);
    cookies.remove("auth-token")
    setIsAuth(false)
    setRoom(null)
  }

  if (!isAuth) {

  return (
    <div className="App">
      <Auth setIsAuth={setIsAuth}/>
    </div>
  );
  }

  return (
  <div>
    {room ? (
      <Chat room={room}/>
    ) : (
      <div className='room'>
        <label>Enter Room Name:</label>
        <input ref={roomInputRef}></input>
        <button onClick={() => setRoom(roomInputRef.current.value)}>Enter Chat</button>
      </div> 
    )}

    <div className='sign-out'>
      <button onClick={signUserOut}>Sign Out</button>
    </div>
  </div>
  );
}


export default App;
