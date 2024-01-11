let btnCss = document.querySelector(".btn_css");
let btnJs = document.querySelector(".btn_js");
let btnCssJs = document.querySelector(".btn_css_js");

btnCss.addEventListener("click", (e) => {
    document.getElementById("sqrt").style.display = "none";
});

btnJs.addEventListener("click", (e) => {
    document.getElementById("sqrt").remove();
});

btnCssJs.addEventListener("click", (e) => {
    let sqrt = document.getElementById("sqrt");
    if (sqrt.classList.contains("hiden")) {
        sqrt.classList.remove("hiden");
    } else {
        sqrt.classList.add('hiden');
    }
})

