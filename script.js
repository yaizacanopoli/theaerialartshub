const navLogo = document.querySelector("#nav-logo");
const mobileMenu = document.querySelector("#mobile-menu");
const closingX = document.querySelector("#closing-x");
const navLinkArrow = document.querySelectorAll("#nav-link-arrow");
const dropdownContainer = document.querySelectorAll("#dropdown-container");

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
})

navLinkArrow.forEach(arrow => {
    arrow.addEventListener("click", () => {
        const thisDropdown = arrow.nextElementSibling;
        if (arrow.src.endsWith("assets/triangle-down.svg")) {
            arrow.src = "assets/triangle-up.svg";
            thisDropdown.style.display = "flex";

        } else {
            arrow.src = "assets/triangle-down.svg";
            thisDropdown.style.display = "none";
        }
    })
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