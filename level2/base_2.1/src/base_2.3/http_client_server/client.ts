
import fetch from 'node-fetch';

const message: string = "Hello world";
const timerLabel: string = "Request/Response";

console.time(timerLabel);

const response = await fetch('http://localhost:3690/', {
    method: 'post',
    body: message,
    headers: { 'Content-Type': 'text/html' }
});

const data = await response.text();

console.log(data);
console.timeEnd(timerLabel);
