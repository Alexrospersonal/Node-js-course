import fetch from "node-fetch";

type JsonResponse = { [key: string]: string };

// 2.2.3.1

Promise.all([
    fetch('https://random-data-api.com/api/name/random_name'),
    fetch('https://random-data-api.com/api/name/random_name'),
    fetch('https://random-data-api.com/api/name/random_name')
]).then((responses) => {
    return responses.map(response => <Promise<JsonResponse>>response.json())
}).then(responses => {
    for (const response of responses) {
        response.then((res: { [key: string]: string }) => {
            console.log(res.name);
        });
    }
}).catch(e => console.error(e));


// 2.2.3.2

async function getJsonData(url: string) {
    return fetch(url).then(response => <Promise<JsonResponse>>response.json());
}

Promise.all([
    getJsonData('https://random-data-api.com/api/name/random_name'),
    getJsonData('https://random-data-api.com/api/name/random_name'),
    getJsonData('https://random-data-api.com/api/name/random_name'),
]).then((responses: { [key: string]: string }[]) => {
    for (let responseObj of responses) {
        console.log(responseObj.name);
    }
});


// 2.2.3.3

const url: string = 'https://random-data-api.com/api/name/random_name';
const arr: string[] = [];

fetch(url)
    .then((response) => {
        return response.json().then((response) => {
            arr.push((<JsonResponse>response).name)
            return fetch(url);
        })
    })
    .then((response) => {
        return response.json().then((response) => {
            arr.push((<JsonResponse>response).name)
            return fetch(url);
        })
    })
    .then((response) => {
        return response.json().then((response) => {
            arr.push((<JsonResponse>response).name)
            return fetch(url);
        })
    }).
    finally(() => console.log(arr.join('\n')))
