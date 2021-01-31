// unbox tools to make websocket server and static files server
const WebSocket = require('ws')
const express = require('express')
const app = express()
// serve static files
app.use(express.static('build'));
// heroku would be PORT ENV ?
const server = app.listen(5005)
// rather than listen to a certain port, wait for upgrade opportunity
const wss = new WebSocket.Server({
    noServer: true,
})



// let board = null ----- I think this is like what room would be
// const players = { 'red': null, 'yellow': null }
// let player = 'red'


// template for get request
app.get('/', (req, res) => {
    console.log('in basic GET' );
    res.send({test: "hi"});
})

wss.on('connection', function (ws) {
    console.log('websocket connected at ', Date.now());
    // ws.info = {
    //     connected: true,
    //     user: ''
    // }
    // ws.info = { username: "does this stick?"}

    console.log('ws.info is: ', ws.info);

    // console.log('wss.clients is: ', wss);


    ws.on('message', function (data) {
        // log whats being sent from a single client to the server
        console.log('data being sent to server: ', data);
        parsedData = JSON.parse(data);
        console.log('data is:', parsedData)
        // const { userName, action, roomName } = JSON.parse(data);
        // console.log('username: ', userName);
        
        try {
            switch (parsedData.action) {
                case 'CREATE': {
                    console.log('in create case in server. now wat?');

                    // console.log('rooms: ', rooms);

                    // ws.info.user = userName;
                    // rooms.push(roomName)
                    // updateRoomList()

                    break
                }
                case 'JOIN': {
                    console.log('in join case in server. now wat?');
                    break
                }
                case 'NEWUSER': {
                    console.log('in new user, now do something');
                    //probably just like, save the name to the websocket?
                    //does the user have a game property? or do games have two users?
                    //echo back or push the name??
                    ws.info.username = parsedData.username;

                    // allClients.push(ws)
                    // updateAllUsers()
                    break
                }
            }

        } catch (error) {
            // not expected
        }



        // send that out to all clients, except the current one
        
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ type: 'confirmation-info-received' }));
            }
        })

        // do different things based on kind of message!
        //if its creating a room, add to room array and send back current room to w
        //if its joining a room, check for room array and send back current room to ws

    })
})

server.on('upgrade', async function upgrade(request, socket, head) {
    wss.handleUpgrade(request, socket, head, function done(ws) {
        wss.emit('connection', ws, request)
    })
})


// this code is from the bitlab example
// const WebSocket = require('ws');

// const wss = new WebSocket.Server({ port: 3030 });

// wss.on('connection', function connection(ws) {
//     ws.on('message', function incoming(data) {
//         wss.clients.forEach(function each(client) {
//             if (client !== ws && client.readyState === WebSocket.OPEN) {
//                 client.send(data);
//             }
//         });
//     });
// });