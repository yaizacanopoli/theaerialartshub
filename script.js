const navLogo = document.querySelector("#nav-logo");
const mobileMenu = document.querySelector("#mobile-menu");
const closingX = document.querySelector("#closing-x");
const headerContainer = document.querySelector("#header-container");
const main = document.querySelector("main");
const footer = document.querySelector("footer");

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