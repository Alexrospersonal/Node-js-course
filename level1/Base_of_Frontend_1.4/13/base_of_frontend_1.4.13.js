let localStorageText = document.getElementById('local_storage');
let cookiesText = document.getElementById('cookie');
let sessionStorageText = document.getElementById('session_storage');

localStorageText.addEventListener('keyup', e => {
    localStorage.setItem('text', localStorageText.innerHTML);
});

cookiesText.addEventListener('keyup', e => {
    console.log(cookiesText.innerHTML);
    document.cookie = `text=${cookiesText.innerHTML}`;
});

sessionStorageText.addEventListener('keyup', e => {
    sessionStorage.setItem('text', sessionStorageText.innerHTML);
});


window.addEventListener('load', e => {
    if (localStorage.getItem('text') !== null || localStorage.getItem('text').length === 0) {
        localStorageText.innerHTML = localStorage.getItem('text');
    }

    let arr = document.cookie.split('=');
    if (arr.length > 0) {
        cookiesText.innerHTML = arr[0];
    }

    if (sessionStorage.getItem('text') !== null || sessionStorage.getItem('text').length === 0) {
        sessionStorageText.innerHTML = sessionStorage.getItem('text');
    }
})