let input = document.getElementById("mouse_coorinates");


document.querySelector('body').addEventListener('mousemove', e => {
    input.innerHTML = `Х: ${e.x}, У: ${e.y}`;
});


