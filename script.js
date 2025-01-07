const navLogo = document.querySelector("#nav-logo");
const mobileMenu = document.querySelector("#mobile-menu");

navLogo.addEventListener("click", () => {
    if (mobileMenu.style.display === "none") {
        mobileMenu.style.display = "flex";
    } else {
        mobileMenu.style.display = "none";
    }
})