const buttonPlus = document.getElementById("plus_btn");
const buttonMinus = document.getElementById("minus_btn");

const plusLabel = document.getElementById("plus_label");
const minusLabel = document.getElementById("minus_label");

enum BUTTONS {
    PLUS,
    MINUS
}

buttonMinus?.addEventListener('click', async (e) => {
    let data = {
        button: BUTTONS.MINUS
    }

    if (minusLabel !== null && minusLabel !== undefined) {

        let response = await fetch('http://localhost:8320/', {
            method: 'POST',
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })

        let responseData: { val: string } = JSON.parse(await response.json());

        console.log("responseData: ", responseData.val);

        minusLabel.innerHTML = `${responseData.val}`;
    }
});

buttonPlus?.addEventListener('click', async (e) => {
    let data = {
        button: BUTTONS.PLUS
    }

    if (plusLabel !== null && plusLabel !== undefined) {

        let response = await fetch('http://localhost:8320/', {
            method: 'POST',
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })

        let responseData: { val: string } = JSON.parse(await response.json());

        console.log("responseData: ", responseData.val);

        plusLabel.innerHTML = `${responseData.val}`;
    }
});


