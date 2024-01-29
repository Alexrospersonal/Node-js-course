import { Socket, createSocket } from "dgram";

const server: Socket = createSocket('udp4');
const PORT: number = 3690;

server.on('listening', () => {
    const address = server.address();
})

server.on('message', (message, info) => {
    const response = message.toString();

    server.send(response, info.port, info.address, (err) => {
        if (err) {
            console.error('Failed to send response.');
        }
    });
});

server.bind(PORT);

