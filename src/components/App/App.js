import React, { useEffect, useState } from 'react';
// import './App.css';

// import Header from '../Header/Header';
// import HomeScreen from '../HomeScreen/HomeScreen';
// import GameBoard from '../GameBoard/GameBoard';

// import { GameContextProvider } from '../../gameContext'

const URL = 'ws://localhost:5005/game-websocket'

function App() {

  // so these are like the local variables? I think? 
  const [client, setClient] = useState(new WebSocket(URL))
  const [currentRoom, setCurrentRoom] = useState();


  const [createRoomInput, setCreateRoomInput] = useState("");
  const [joinRoomInput, setJoinRoomInput] = useState("");
  const [usernameInput, setUsernameInput] = useState("");


  
  const createRoom = () => {
    console.log('in createRoom');
  }

  const joinRoom = () => {
    console.log('in joinRoom');
  }

  const makeUser = (event, input) => {
    event.preventDefault();
    console.log('in makeUser with input: ', input);
    try {
      client.send(JSON.stringify({
        userName: input,
        action: "NEWUSER"
      }))
    } catch (error) {
      console.log('error!', error);
    }
  }

  useEffect(() => {
    client.onopen = () => {
      console.log('ws client connected in App.js')
    }
    client.onmessage = (event) => {
      console.log('message received in App.js is: ', event.data);
    }
    client.onclose = () => {
      console.log('disconnected')
      setClient(new WebSocket(URL))  // automatically try to reconnect
    }
  });

  return (
    <div className="App">
        <div className="Header">
          <h2>Obsession</h2>
          <p>User Name: </p>
          <p>Room Name:</p>
        </div>

        <div className="HomeScreen">
          <h2>Home Screen Component</h2>
              <div>
                <input type="text" placeholder="enter username" value={usernameInput} onChange={(event) => setUsernameInput(event.target.value)} />
                <button onClick={(event) => makeUser(event, usernameInput)}>set username</button>
              </div>
              <div>
                <input type="text" placeholder="name your room" value={createRoomInput} onChange={(event) => setCreateRoomInput(event.target.value)} />
                <button onClick={() => createRoom(createRoomInput)}>create room</button>
              </div>
              <div>
                <input type="text" placeholder="enter existing room name" value={joinRoomInput} onChange={(event) => setJoinRoomInput(event.target.value)} />
                <button onClick={() => joinRoom(joinRoomInput)}>join room</button>
              </div>
        </div>


          {/* <Header/>
          {!currentRoom &&
            <HomeScreen />
          }
          {currentRoom &&
            <GameBoard />
          } */}
    </div>
  );
}

export default App;