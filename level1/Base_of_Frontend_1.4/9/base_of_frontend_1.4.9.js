let btn = document.getElementById("btn");
let urlInput = document.getElementById("text");
let imgContainer = document.getElementById("image_container");


btn.addEventListener('click', e => {
    imgContainer.append(...urlInput.value
        .split('\n')
        .map((val, idx, array) => {
            let img = document.createElement('img');
            img.setAttribute('src', val);
            return img;
        })
    );
});


