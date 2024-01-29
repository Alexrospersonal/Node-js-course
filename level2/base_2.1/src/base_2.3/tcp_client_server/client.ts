import net from 'net';

const PORT: number = 3690;
const socket: net.Socket = new net.Socket();
const message: string = "Hello from TCP client";
const timerLabel: string = "Request/Response";

let responseMessage: string = '';

socket.connect(PORT, 'localhost');

socket.on('connect', () => {
    console.log('Connected');
    console.time(timerLabel);
    socket.write(message);
});

socket.on('data', (data) => {
    responseMessage += data;
})

socket.on('end', () => {
    console.log(responseMessage);
    console.timeEnd(timerLabel);
})
