import React, {useState} from 'react';


const URL = 'ws://localhost:5005/game-websocket'


function Game() {
    const [createRoomInput, setCreateRoomInput] = useState("");
    const [joinRoomInput, setJoinRoomInput] = useState("");
    const [usernameInput, setUsernameInput] = useState("");

    // const ws = new WebSocket(URL)

    const createRoom = (infoObject) => {
        
        console.log('in createRoom- use function state to send object');
        console.log('info object is: ', infoObject);
        
        try {
            ws.send(JSON.stringify(infoObject))
        } catch (error) {
            console.log('error!', error);
        }

        //then should it joinRoom from here or should that be handled in server? prolly server?
    }

    const joinRoom = (input) => {
        console.log('in joinRoom with input: ', input);
        try {
            ws.send(JSON.stringify({
                roomName: input,
                userName: usernameInput,
                action: "JOIN"
            }))
        } catch (error) {
            console.log('error!', error);
        }
    }

    const makeUser =(event, input)=>{
        event.preventDefault();
        console.log('in makeUser with input: ', input);
        try {
            ws.send(JSON.stringify({
                userName: input,
                action: "NEWUSER"
            }))
        } catch (error) {
            console.log('error!', error);
        }
    }

    return (
        <div className="HomeScreen">
            <h2>Home Screen Component</h2>
                <div>
                    {2===2 //if there is not a user set (===''), then let them enter a username.
                        ?
                        <>
                            <input type="text" placeholder="enter username" value={usernameInput} onChange={(event) => setUsernameInput(event.target.value)} />
                            <button onClick={()=>makeUser(usernameInput)}>set username</button>
                        </>
                        :
                        <>
                            <p>Hi, (Username)</p>
                            <div>
                                <input type="text" placeholder="name your room" value={createRoomInput} onChange={(event) => setCreateRoomInput(event.target.value)} />
                                <button onClick={() => createRoom(createRoomInput)}>create room</button>
                            </div>
                            <div>
                                <input type="text" placeholder="enter existing room name" value={joinRoomInput} onChange={(event) => setJoinRoomInput(event.target.value)} />
                                <button onClick={() => joinRoom(joinRoomInput)}>join room</button>
                            </div>
                        </>
                    }
                    
                    {/* <h2>All Rooms:</h2>
                    <p>maybe do a useEffect to get all the rooms from the server?</p>
                    <p>could map the results with 'join' buttons</p> */}
                </div>
        </div>
    );
}

export default Game;