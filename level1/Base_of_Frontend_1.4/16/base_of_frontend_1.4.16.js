
let overlay = document.getElementById("overlay");

overlay.addEventListener('click', (e) => {
    overlay.style.display = "none";
    document.body.style.overflow = "auto";
    e.topPropagation();
})

document.getElementById("btn").addEventListener('click', () => {
    overlay.style.display = "block";
    document.body.style.overflow = "hidden";
});