import fetch from 'node-fetch';

async function fetchName(addres: string): Promise<string> {
    const response = await fetch('https://api.ipify.org/?format=json');
    const data: { ip: string } = <{ ip: string }>await response.json();
    return `IP: ${data["ip"]}`;
}

const ip: string = await fetchName('https://api.ipify.org/?format=json');
console.log(ip);

let a;

console.log(a);


