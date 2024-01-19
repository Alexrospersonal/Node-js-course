import fetch from 'node-fetch';

const response = await fetch('https://api.ipify.org/?format=json');
const data: { ip: string } = <{ ip: string }>await response.json();
console.log(`IP: ${data["ip"]}`);


