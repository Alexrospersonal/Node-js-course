// Є функція №1, яку можна евейти, яка поверне рядок == ваш поточний айп.
// Створіть функцію №2, яка повинна використовувати функцію №1 для отримання вашого поточного айпі,
// і яка приймає на вхід один параметр - функцію-коллбек, яка буде викликана, коли айпі буде отримано,
// з першим параметром, що дорівнює цьому айпі. Так, ми намагалися писати заплутано, але тут все чітко.

import fetch from "node-fetch";

type JsonBody = Promise<{ [key: string]: string }>;
const url: string = "https://api.ipify.org/?format=json";

async function getIp(url: string): Promise<string> {
    const response = await <JsonBody>(await fetch(url)).json();
    return response.ip;
}

async function doSomething(callback: (ip: string) => void) {
    const ip = await getIp(url);
    callback(ip);
}

doSomething((ip) => console.log(ip));
