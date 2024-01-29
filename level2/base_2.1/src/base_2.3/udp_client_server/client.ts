import { Socket, createSocket } from "dgram";

const client: Socket = createSocket('udp4');
const message: string = "Hello from UDP";
const PORT: number = 3690;

const HOSTNAME: string = 'localhost';

client.on('message', (message, info) => {
    console.log(message.toString());
    console.timeEnd();
    client.close();
})

client.send(message, PORT, HOSTNAME, (err) => {
    console.time();
    if (err) {
        console.error('Failed to send packet.');
    }
})