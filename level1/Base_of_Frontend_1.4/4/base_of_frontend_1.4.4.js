document.getElementById("action_btn").addEventListener('click', e => {
    let selector = document.getElementById("selector").value;
    let node = document.querySelector(selector);
    if (node !== null) {
        if (node.classList.contains("hiden")) {
            node.classList.remove("hiden");
        } else {
            node.classList.add('hiden');
        }
    }
});

