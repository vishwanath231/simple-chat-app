import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Chat from './components/Chat/Chat';
import { io } from 'socket.io-client';

const socket = io("https://chat-application-one.herokuapp.com")

const App = () => {
    return (
        <>
            <Route exact path='/' render={() => <Login socket={socket} />} />
            <Route path='/chat' render={() => <Chat socket={socket} />} />
        </>
    )
}

export default App;
