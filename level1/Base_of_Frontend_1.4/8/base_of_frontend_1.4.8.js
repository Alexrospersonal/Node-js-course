let btn = document.getElementById("btn");
let urlInput = document.getElementById("text");
let img = document.getElementById("image");


btn.addEventListener('click', e => {
    if (urlInput.value !== null || urlInput.value.length === 0) {
        img.setAttribute("src", urlInput.value);
    }
});


