const navLogo = document.querySelector("#nav-logo");
const mobileMenu = document.querySelector("#mobile-menu");
const closingX = document.querySelector("#closing-x");
const navLinkArrow = document.querySelectorAll("#nav-link-arrow");
const dropdownContainer = document.querySelectorAll("#dropdown-container");
const navSearchBar = document.querySelector("#nav-search-bar");
const searchIcon = document.querySelector("#search-icon");

const headerContainer = document.querySelector("#header-container");
const main = document.querySelector("main");
const heartIcon = document.querySelectorAll(".heart-icon");
const arrowBack = document.querySelectorAll("#arrow-back");
const footer = document.querySelector("footer");

const foundStudiosContainer = document.querySelector("#found-studios-container");
const blueBackground = document.querySelector("#blue-background");
const mapSearchBar = document.querySelector("#map-search-bar");
const mapSearchIcon = document.querySelector("#map-search-icon");

const eventsSearchBar = document.querySelector("#events-search-bar");
const eventsSearchIcon = document.querySelector("#events-search-icon");

// for mobile menu

navLogo.addEventListener("click", () => {
    mobileMenu.style.display = "flex";
    headerContainer.style.display = "none";
    main.style.display = "none";
    footer.style.display = "none";
})

closingX.addEventListener("click", () => {
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
            thisDropdown.style.visibility = "visible";
            thisDropdown.style.height = thisDropdown.scrollHeight + "px";
            thisDropdown.style.margin = "1.2rem 1.2rem 0 0";

        } else {
            arrow.src = "assets/triangle-down.svg";
            thisDropdown.style.visibility = "hidden";
            thisDropdown.style.height = "0";
            thisDropdown.style.margin = "0";
        }
    })
})

navSearchBar.addEventListener("focus", () => {
    searchIcon.style.display = "inline-block";
    navSearchBar.style.width = "28ch";
})

navSearchBar.addEventListener("blur", () => {
    searchIcon.style.display = "none";
    navSearchBar.style.width = "30ch";
})

// heart icons (home page and resources)

heartIcon.forEach(icon => {
    icon.addEventListener("click", () => {
        if (icon.src.endsWith("assets/heart-outline.svg")) {
            icon.src = "assets/heart.svg"
        } else {
            icon.src = "assets/heart-outline.svg"
        }
    })
})

// for studio map page

if (mapSearchBar) {
    mapSearchBar.addEventListener("focus", () => {
        mapSearchIcon.style.display = "inline-block";
        mapSearchBar.style.width = "23ch";
    })
    
    mapSearchBar.addEventListener("blur", () => {
        mapSearchIcon.style.display = "none";
        mapSearchBar.style.width = "25ch";
    })
    
    mapSearchBar.addEventListener("keyup", (e) => {
        if (e.key === "Enter") {
            console.log("Enter pressed");
            foundStudiosContainer.innerHTML = "";
            foundStudiosContainer.innerHTML +=
                `<div class="found-studio-item">
                <div class="map-studio-found-text">
                    <div class="map-studio-name-icon">
                        <h1>Studio name</h1>
                        <img src="assets/heart-outline.svg" class="heart-icon">
                     </div>
                    <h2>City, country</h2>
                    <h2>Other info</h2>
                </div>
            <div class="avatar-circle"></div>
            </div>
    
            <div class="found-studio-item">
                <div class="map-studio-found-text">
                    <div class="map-studio-name-icon">
                        <h1>Studio name</h1>
                        <img src="assets/heart-outline.svg" class="heart-icon">
                     </div>
                    <h2>City, country</h2>
                    <h2>Other info</h2>
                </div>
            <div class="avatar-circle"></div>
            </div>
    
            <div class="found-studio-item">
                <div class="map-studio-found-text">
                    <div class="map-studio-name-icon">
                        <h1>Studio name</h1>
                        <img src="assets/heart-outline.svg" class="heart-icon">
                     </div>
                    <h2>City, country</h2>
                    <h2>Other info</h2>
                </div>
            <div class="avatar-circle"></div>
            </div>
    
            <div class="found-studio-item">
                <div class="map-studio-found-text">
                    <div class="map-studio-name-icon">
                        <h1>Studio name</h1>
                        <img src="assets/heart-outline.svg" class="heart-icon">
                     </div>
                    <h2>City, country</h2>
                    <h2>Other info</h2>
                </div>
            <div class="avatar-circle"></div>
            </div>
            `
        }
    })
    
    foundStudiosContainer.addEventListener("click", e => {
        if (e.target.classList.contains("heart-icon")) {
            if (e.target.src.endsWith("assets/heart-outline.svg")) {
                e.target.src = "assets/heart.svg"
            } else {
                e.target.src = "assets/heart-outline.svg"
            }
        }
    });
}

// for events page

if (eventsSearchBar) {
    eventsSearchBar.addEventListener("focus", () => {
        eventsSearchIcon.style.display = "inline-block";
        eventsSearchBar.style.width = "23ch";
    })
    
    eventsSearchBar.addEventListener("blur", () => {
        eventsSearchIcon.style.display = "none";
        eventsSearchBar.style.width = "25ch";
    })
}