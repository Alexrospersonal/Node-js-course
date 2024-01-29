import { createServer } from 'http';

const PORT: number = 3690;

createServer((req, res) => {
    console.log(req.socket.address());
    let requestMessage: string = '';

    req.on('data', (chunk: string) => {
        requestMessage += chunk;
    });

    req.on('end', () => {
        res.end(requestMessage);
    });
}).listen(PORT, () => {
    console.log("Server listening");
})