import React, { useEffect, useState } from 'react';
// import './App.css';

import Header from '../Header/Header';
import HomeScreen from '../HomeScreen/HomeScreen';
import GameBoard from '../GameBoard/GameBoard';

import { GameContextProvider } from '../../gameContext'

const URL = 'ws://localhost:5005/game-websocket'

function App() {
  const server = new WebSocket(URL)
  const [currentRoom, setCurrentRoom] = useState();

  const gameState = {
    currentRoom,
  }

  useEffect(() => {
    server.onopen = () => {
      // on connecting, do nothing but log it to the console
      console.log('ws server connected in App.js')
    }
    server.onmessage = (event) => {
      // on receiving a message, update things based on whats in the message
      const message = JSON.parse(event.data)
      // then do something with the message
      console.log('message received in App.js is: ', message);
      setCurrentRoom('SET')
      // this.addMessage(message)
    }
    server.onclose = () => {
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
        <GameContextProvider value={gameState}>
          <Header />
          {!currentRoom &&
            <HomeScreen />
          }
          {currentRoom &&
            <GameBoard />
          }
      </GameContextProvider>
    </div>
  );
}

export default App;