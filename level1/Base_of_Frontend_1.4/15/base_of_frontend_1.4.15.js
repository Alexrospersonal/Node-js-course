let outerContainer = document.getElementById("outer_container");
let innerContainer = document.getElementById("inner_container");

outerContainer.addEventListener('click', e => {
    alert("Outer container");
});

innerContainer.addEventListener('click', e => {
    alert("Inner container");
    e.stopPropagation();
});
