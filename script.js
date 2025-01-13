const navLogo = document.querySelector("#nav-logo");
const mobileMenu = document.querySelector("#mobile-menu");
const closingX = document.querySelector("#closing-x");
const headerContainer = document.querySelector("#header-container");
const main = document.querySelector("main");
const heartIcon = document.querySelectorAll("#heart-icon");
const arrowBack = document.querySelectorAll("#arrow-back");
const footer = document.querySelector("footer");

// for mobile menu

navLogo.addEventListener("click", () => {
        mobileMenu.style.display = "flex";
        headerContainer.style.display = "none";
        main.style.display = "none";
        footer.style.display = "none";
})
closingX.addEventListener ("click", () => {
    mobileMenu.style.display = "none";
    headerContainer.style.display = "flex";
    main.style.display = "flex";
    footer.style.display = "flex";

    // look into memorising scroll position
})

// for home page

heartIcon.forEach(icon => {
    icon.addEventListener("click", () => {
        if (icon.src.endsWith("assets/heart-outline.svg")) {
            icon.src = "assets/heart.svg"
        } else {
            icon.src = "assets/heart-outline.svg"
        }
    })
})