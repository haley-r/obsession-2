// unbox tools to make websocket server and static files server
const WebSocket = require('ws')
const express = require('express')
const app = express()

// serve static files?
app.use(express.static('build'));

// heroku would be PORT ENV ?
const server = app.listen(5005)

// rather than listen to a certain port, wait for upgrade opportunity?
const wss = new WebSocket.Server({
    noServer: true,
})

// template for get request
app.get('/', (req, res) => {
    console.log('in basic GET' );
    res.send({test: "hi"});
})

wss.on('connection', function (ws) {
    console.log('websocket connected');
    ws.on('message', function (data) {
        console.log('message!');
        
        // log whats being sent from a single client to the server
        console.log('data being sent to server: ', data);
        // send that out to all clients, except the current one
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ type: 'confirmation-info-received' }));
            }
        })




    })
})

server.on('upgrade', async function upgrade(request, socket, head) {
    wss.handleUpgrade(request, socket, head, function done(ws) {
        wss.emit('connection', ws, request)
    })
})