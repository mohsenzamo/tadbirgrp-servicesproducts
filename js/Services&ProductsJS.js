let x0 = null;
const breakpoint = 155;
let currentMove = 0;

const handleClick = (event) => {
    const focused = event.target;
    // focused.classList.remove("smooth");
    reset();
    changeFocus(focused);
};

const reset = () => {
    console.log('reset')
    // console.log(e? e.name:'none')
    x0 = null;
    carousel.style.setProperty("--offset", "0px");
    currentMove = 0;
};

const changeFocus = (focused) => {
    if (focused.classList.contains("focused")) {
        console.log("is already focused");
        return;
    }
    const items = document.querySelectorAll(".zr__circle-carousel__item");
    let focusedIndex = -1;
    items.forEach((item, i) => {
        item.classList.remove("before");
        item.classList.remove("after");
        item.classList.remove("focused-before");
        item.classList.remove("focused-after");
        if (item == focused) {
            focusedIndex = i;
            item.classList.add("focused");
        } else {
            item.classList.remove("focused");
            if (focusedIndex >= 0) {
                item.classList.add("after");
            } else {
                item.classList.add("before");
            }
        }
    });

    if (focusedIndex > 0) {
        items[focusedIndex - 1].classList.remove("before");
        items[focusedIndex - 1].classList.add("focused-before");
    }
    if (focusedIndex < items.length - 1) {
        items[focusedIndex + 1].classList.remove("after");
        items[focusedIndex + 1].classList.add("focused-after");
    }
};

const lock = (event) => {
    console.log(
        "lock",
        "start",
        "x0:",
        x0,
        "--offset:",
        carousel.style.getPropertyValue("--offset")
    );
    x0 = unify(event).clientX;
    console.log(
        "lock",
        "end",
        "x0:",
        x0,
        "--offset:",
        carousel.style.getPropertyValue("--offset")
    );
};

const unify = (event) => {
    return event.changedTouches ? event.changedTouches[0] : event;
};

const drag = (event) => {
    event.preventDefault();

    if (x0 || x0 === 0) {
        const offset = Math.round(unify(event).clientX - x0);
        const moves = Math.round(Math.abs(offset / breakpoint));

        if (moves == 0) {
            carousel.style.setProperty("--offset", `${offset}px`);
        } else {
            const queryClass = offset > 0 ? "before" : "after";
            const focused = document.querySelector(`.focused-${queryClass}`);

            if (!focused) {
                reset();
            }

            if (focused && moves > currentMove) {
                currentMove += 1;
                focused.classList.add("smooth");
                changeFocus(focused);
            }
        }
    }
};

const carousel = document.querySelector(".zr__circle-carousel");
carousel.style.setProperty("--offset", "0px");
carousel.addEventListener("mousedown", lock, false);
carousel.addEventListener("touchstart", lock, false);

carousel.addEventListener("mouseup", reset, false);
carousel.addEventListener("mouseleave", reset, false);
carousel.addEventListener("touchend", reset, false);

carousel.addEventListener("mousemove", drag, false);
carousel.addEventListener("touchmove", drag, false);

document.querySelectorAll(".zr__circle-carousel__item").forEach((item) => {
    item.addEventListener("click", handleClick);
});

function change(liElmnt , liDivActive) {
    var liI =liElmnt.children;
    liI[1].style.display = "none";
    var liDiv = document.getElementsByClassName('arrowDivClass');
    for (let k = 0;k< liDiv.length;k++){
        liDiv[k].style.display = "none";
    }
    var liDivA = document.getElementById(liDivActive);
    liDivA.style.display = 'grid';
}
document.getElementById("defaultProductOpen").click();



  /*nav js*/

function myFunction(x) {
    var z = document.getElementById('mobilenav');
    var y = document.getElementById("myLinks");
    var asd = document.getElementById("asd");
    var w = y.children;
    if (y.style.display === "flex") {
        y.style.display = "none";
        z.style.boxShadow = "none";
        asd.style.backgroundColor="transparent";

    } else {
        y.style.display = "flex";
        z.style.boxShadow = " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)";
        asd.style.backgroundColor="#ffffff";
        for (let i of w){
            i.style.opacity= "1";
            i.style.animation="opacityAnimation 2s";
        }

    }
    x.classList.toggle("change");
}

  /*popUp js*/
function openNav() {
    document.getElementById("myNav").style.width = "100%";
}

/* Close when someone clicks on the "x" symbol inside the overlay */
function closeNav() {
    document.getElementById("myNav").style.width = "0%";
}

  /*slider js*/
var slideIndex = [1,1];
var slideId = ["mySlides1", "mySlides2"]
showSlides(1, 0);
showSlides(1, 1);

function plusSlides(translate,n, no) {
    showSlides(translate,slideIndex[no] += n, no);
}

function showSlides(translate,n, no) {
    var i;
    var x = document.getElementsByClassName(slideId[no]);
    if (n > x.length) {slideIndex[no] = 1}
    if (n < 1) {slideIndex[no] = x.length}
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    x[slideIndex[no]-1].style.display = "grid";
    if(translate === 'left'){
        x[slideIndex[no]-1].style.animation = "leftAnima 2s";
    }
    else{
        x[slideIndex[no]-1].style.animation = "rightAnima 2s";
    }
}

