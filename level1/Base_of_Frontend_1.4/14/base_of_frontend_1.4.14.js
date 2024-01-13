let btn = document.getElementById("scroll_btn");
btn.addEventListener('click', e => {
    window.requestAnimationFrame(scrollToTop);
});


window.addEventListener('scroll', e => {
    if ((document.documentElement.scrollTop + document.documentElement.clientHeight) > document.body.scrollHeight) {
        btn.style.display = "block";
    }
})

function scrollToTop() {
    let scrollPosY = document.documentElement.scrollTop;

    if (scrollPosY > 0) {
        window.requestAnimationFrame(scrollToTop);
        window.scrollTo(0, scrollPosY - 50);
    }
    if (scrollPosY === 0) {
        btn.style.display = "none";
    }
}