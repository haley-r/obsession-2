import React, {useState} from 'react';


const URL = 'ws://localhost:5005/websocket'


function Game() {
    const [createRoomInput, setCreateRoomInput] = useState("");
    const [joinRoomInput, setJoinRoomInput] = useState("");
    const [usernameInput, setUsernameInput] = useState("");

    const ws = new WebSocket(URL)

    const createRoom = (input) => {
        console.log('in createRoom with input: ', input);
        try {
            ws.send(JSON.stringify({
                roomName: input,
                userName: usernameInput
            }))
        } catch (error) {
            console.log('error!', error);
        }
    }

    const joinRoom = (input) => {
        console.log('in joinRoom with input: ', input);
        try {
            ws.send(JSON.stringify({
                roomName: input,
                userName: usernameInput
            }))
        } catch (error) {
            console.log('error!', error);
        }
    }

    return (
        <div className="HomeScreen">
            <h2>Home Screen Component</h2>
                <div>
                    <h3>set a username:</h3>
                    <div>
                        <input type="text" placeholder="your name" value={usernameInput} onChange={(event) => setUsernameInput(event.target.value)} />
                    </div>
                    <h3>do u want to start or join a game?</h3>
                    <div>
                        <input type="text" placeholder="name your room" value={createRoomInput} onChange={(event) => setCreateRoomInput(event.target.value)} />
                        <button onClick={() => createRoom(createRoomInput)}>create room</button>
                    </div>
                    <div>
                        <input type="text" placeholder="enter existing room name" value={joinRoomInput} onChange={(event) => setJoinRoomInput(event.target.value)} />
                        <button onClick={() => joinRoom(joinRoomInput)}>join room</button>
                    </div>
                    {/* <h2>All Rooms:</h2>
                    <p>maybe do a useEffect to get all the rooms from the server?</p>
                    <p>could map the results with 'join' buttons</p> */}
                </div>
        </div>
    );
}

export default Game;