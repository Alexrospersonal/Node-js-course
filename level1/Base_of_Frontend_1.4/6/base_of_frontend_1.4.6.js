// let sqrt = document.getElementById("sqrt");


// function showMessage() {
//     alert("Hello");
//     sqrt.removeEventListener('click', showMessage);
//     sqrt.addEventListener('click', hideSqrt);
// }

// function hideSqrt() {
//     sqrt.classList.add('hiden');
// }

// sqrt.addEventListener('click', showMessage);


let btn = document.getElementById("btn");
let sqrt = document.getElementById("sqrt");
btn.addEventListener('mouseover', e => {
    sqrt.classList.add('hiden');
})
btn.addEventListener('mouseout', e => sqrt.classList.remove('hiden'));


