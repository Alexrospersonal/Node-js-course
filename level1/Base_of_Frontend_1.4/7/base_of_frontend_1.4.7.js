let input = document.getElementById("text");
let sqrt = document.getElementById("sqrt");

input.addEventListener('focus', e => {
    sqrt.classList.add('hiden');
});

input.addEventListener('blur', e => {
    sqrt.classList.remove('hiden');
});


