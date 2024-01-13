let input = document.getElementById("file");

input.addEventListener('dragover', () => {
    input.style.width = "215px";
    input.style.backgroundColor = "rgb(219, 219, 219)";
    input.style.color = "black";
    input.style.transition = " ease-in .3s width, ease-in .3s background-color, ease-in .3s color";
})

input.addEventListener('dragleave', () => {
    input.style.width = "100px";
    input.style.backgroundColor = "rgb(233, 233, 233)";
    input.style.color = "transparent";
    input.style.transition = " ease-in .3s width, ease-in .3s background-color, ease-in .3s color";
})
