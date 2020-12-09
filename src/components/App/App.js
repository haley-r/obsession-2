import React, { useEffect, useState } from 'react';
// import './App.css';

import HomeScreen from '../HomeScreen/HomeScreen';
import GameBoard from '../GameBoard/GameBoard';

const URL = 'ws://localhost:5005/websocket'

function App() {
  const ws = new WebSocket(URL)
  const [currentRoom, setCurrentRoom] = useState();

  useEffect(() => {
    ws.onopen = () => {
      // on connecting, do nothing but log it to the console
      console.log('ws connected in App.js')
    }
    ws.onmessage = event => {
      // on receiving a message, update things based on whats in the message
      const message = JSON.parse(event.data)
      // then do something with the message
      console.log('message received in App.js is: ', message);
      // this.addMessage(message)
    }
    ws.onclose = () => {
      console.log('disconnected')
      // automatically try to reconnect on connection loss
      // obviously would need to rewrite for funcitonal component, so do that later
      // this.setState({
      //     ws: new WebSocket(URL),
      // })
    }
  });

  return (
    <div className="App">
      <h1>Obsession</h1>
      {!currentRoom &&
        <HomeScreen />
      }
      {currentRoom &&
        <GameBoard />
      }
    </div>
  );
}

export default App;