let btnCss = document.querySelector(".btn_css");
let btnJs = document.querySelector(".btn_js");
let btnCssJs = document.querySelector(".btn_css_js");

btnCss.addEventListener("click", (e) => {
    for (const sqrt of document.getElementsByClassName("sqrt")) {
        sqrt.style.display = "none";
    }
});

btnJs.addEventListener("click", (e) => {
    for (let sqrt of Array.from(document.getElementsByClassName("sqrt"))) {
        sqrt.remove();
    }
});

btnCssJs.addEventListener("click", (e) => {
    for (const sqrt of document.getElementsByClassName("sqrt")) {
        if (sqrt.classList.contains("hiden")) {
            sqrt.classList.remove("hiden");
        } else {
            sqrt.classList.add('hiden');
        }
    }
});

