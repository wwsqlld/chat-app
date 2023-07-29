import { useEffect, useState } from 'react';
import { addDoc, collection, serverTimestamp, onSnapshot, query, where, orderBy } from 'firebase/firestore'
import { auth, db } from '../firebase.js';
import '../styles/Chat.css'


export const Chat = (props) => {

    const {room} = props;
    const [newMessage, setNewMessage] = useState("");
    const [messages, setMessages] = useState([])

    const messageRef = collection(db, "messages");

    useEffect(() => {
        const queryMessages = query(messageRef, where("room", "==", room), orderBy("createdAt"))
        const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
            let messages = [];
            snapshot.forEach((doc) => {
                messages.push({...doc.data(), id: doc.id})
            })
            setMessages(messages);
        });

        return () => unsuscribe();
    })

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (newMessage === "") return;
        await addDoc(messageRef, {
            text: newMessage,
            createdAt: serverTimestamp(),
            user: auth.currentUser.displayName,
            room,

        })
        setNewMessage("");
    }



    return <div className="chat-app">
        <div className='header'>
            <h1> Welcome to: {room.toUpperCase()} </h1>
            </div>
        <div className='messages'>
        {messages.map((message) => (
            <div className='message' key={message.id}>
                <span className='user'>{message.user}:</span>
                <p>{message.text}</p>
            </div>
        ))}
        </div>
        <form className="new-message-form" onSubmit={handleSubmit}>
            <input 
            className="new-message-input" 
            placeholder="type your message here..." 
            onChange={(e) => setNewMessage(e.target.value)}
            value={newMessage}
            >
            </input>
            <button type="submit" className="send-button">Send</button>
        </form>
    </div>
}