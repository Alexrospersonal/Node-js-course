let sqrt = document.getElementById("sqrt");


function showMessage() {
    alert("Hello");
    sqrt.removeEventListener('click', showMessage);
    sqrt.addEventListener('click', hideSqrt);
}

function hideSqrt() {
    sqrt.classList.add('hiden');
}

sqrt.addEventListener('click', showMessage);


