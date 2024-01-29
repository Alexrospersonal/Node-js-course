import net from 'net';

const PORT: number = 3690;

net.createServer((socket) => {
    console.log(socket.address());
    let requestMessage: string = '';

    socket.on('data', (chunk: string) => {
        requestMessage += chunk;
        socket.end(requestMessage);
    });

}).listen(PORT, () => {
    console.log("Server listening");
})