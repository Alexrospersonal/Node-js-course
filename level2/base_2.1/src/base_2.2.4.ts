import fetch from "node-fetch";


type JsonObj = { [key: string]: string };
const url: string = "https://random-data-api.com/api/users/random_user";

let tryingNumberWithPromise: number = 0;

function getFemaleGenderWithPromise(): void {
    fetch(url)
        .then((response) => {
            response.json()
                .then((json) => {
                    let gender: string = (json as JsonObj).gender;
                    tryingNumberWithPromise++;
                    gender === "Female" ? console.log(tryingNumberWithPromise) : getFemaleGenderWithPromise();
                })
        })
}

getFemaleGenderWithPromise();


let tryingNumberWithAsync: number = 0;

async function getFemaleGenderWithAsync(): Promise<void> {
    const response: Promise<JsonObj> = <Promise<JsonObj>>(await fetch(url)).json();
    const json: JsonObj = await response;
    tryingNumberWithAsync++;
    json.gender === "Female" ? console.log(tryingNumberWithAsync) : getFemaleGenderWithAsync();
}

getFemaleGenderWithAsync();