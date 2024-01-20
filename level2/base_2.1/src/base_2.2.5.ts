// Є функція №1, яка приймає коллбек, який буде викликаний з параметром == ваш поточний айпі.
// Створіть функцію №2, яку можна евейтити, яка буде користуватися функцією №1

import fetch from "node-fetch";

type JsonBody = Promise<{ [key: string]: string }>;
const url: string = "https://api.ipify.org/?format=json";

async function one(callback: (ip: string) => void): Promise<void> {
    const response = await getIp(url);
    callback(response.ip);
}

async function getIp(url: string): Promise<JsonBody> {
    return <Promise<JsonBody>>(await fetch(url)).json();
}

one((ip: string) => console.log(ip));

