let input = document.getElementById("mouse_coorinates");


let coords = [];

navigator.geolocation.getCurrentPosition(function (location) {
    coords.push(String(location.coords.latitude));
    coords.push(String(location.coords.longitude))
});

document.querySelector('body').addEventListener('mousemove', e => {
    input.innerHTML = `Х: ${e.x}, У: ${e.y}\n lang: ${navigator.language}\n Ш:${coords[0]} Д:${coords[1]}`;
});


