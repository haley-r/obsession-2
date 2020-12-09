import React, {useState} from 'react';


const URL = 'ws://localhost:5000/websocket'


function Game() {
    const [createRoomInput, setCreateRoomInput] = useState("");
    const [joinRoomInput, setJoinRoomInput] = useState("");
    const [currentRoom, setCurrentRoom] = useState("CURRENT ROOM PRETEND");

    const ws = new WebSocket(URL)

    const createRoom = (input) => {
        console.log('in createRoom with input: ', input);
        try {
            ws.send(JSON.stringify({
                roomName: input,
            }))
        } catch (error) {
            console.log('error!', error);
        }
    }

    return (
        <>
            {!currentRoom &&
                <div>
                    <h3>do u want to start or join a game?</h3>
                    <div>
                        <input type="text" placeholder="name your room" value={createRoomInput} onChange={(event) => setCreateRoomInput(event.target.value)} />
                        <button onClick={() => createRoom(createRoomInput)}>create room</button>
                    </div>
                    <div>
                        <input type="text" placeholder="enter existing room name" value={joinRoomInput} onChange={(event) => setJoinRoomInput(event.target.value)} />
                        {/* <button onClick={() => dispatch({ type: "JOIN_ROOM", joinRoomInput })}>Join</button> */}
                    </div>
                    {/* <h2>All Rooms:</h2>
                    <p>maybe do a useEffect to get all the rooms from the server?</p>
                    <p>could map the results with 'join' buttons</p> */}
                </div>
            }
            {currentRoom &&
                <h1>hi there is a current room</h1>
            }
        </>
    );
}

export default Game;