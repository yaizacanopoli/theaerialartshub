const navLogo = document.querySelector("#nav-logo");
const mobileMenu = document.querySelector("#mobile-menu");
const closingX = document.querySelector("#closing-x");
const navItem = document.querySelectorAll("#nav-item");
const navLinkArrow = document.querySelectorAll("#nav-link-arrow");
const dropdownContainer = document.querySelectorAll("#dropdown-container");
const navSearchBar = document.querySelector("#nav-search-bar");
const searchIcon = document.querySelector("#search-icon");

const headerContainer = document.querySelector("#header-container");
const main = document.querySelector("main");
const heartIcon = document.querySelectorAll(".heart-icon");
const arrowBack = document.querySelectorAll("#arrow-back");
const footer = document.querySelector("footer");

const mapMain = document.querySelector("#map-main");
const mapImage = document.querySelector("#map-placeholder-img");
const foundStudiosContainer = document.querySelector("#found-studios-container");
const blueBackground = document.querySelector("#blue-background");
const mapSearchBar = document.querySelector("#map-search-bar");
const mapSearchIcon = document.querySelector("#map-search-icon");

const lineupSearchBar = document.querySelector("#lineup-search-bar");
const lineupSearchIcon = document.querySelector("#lineup-search-icon");

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

navItem.forEach(item => {
    item.addEventListener("click", () => {
        const thisArrow = item.nextElementSibling;
        const thisDropdown = thisArrow.nextElementSibling;
        if (thisArrow.src.endsWith("assets/triangle-down.svg")) {
            thisArrow.src = "assets/triangle-up.svg";
            thisDropdown.style.visibility = "visible";
            thisDropdown.style.height = thisDropdown.scrollHeight + "px";
            thisDropdown.style.margin = "1.2rem 1.2rem 0 0";

        } else {
            thisArrow.src = "assets/triangle-down.svg";
            thisDropdown.style.visibility = "hidden";
            thisDropdown.style.height = "0";
            thisDropdown.style.margin = "0";
        }
    })
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
            foundStudiosContainer.style.flexWrap = "wrap";
            foundStudiosContainer.style.flexDirection = "row";
            foundStudiosContainer.style.justifyContent = "center";
            foundStudiosContainer.style.width = "94%";
            foundStudiosContainer.style.marginTop = "1rem";
            foundStudiosContainer.innerHTML +=
                `<div class="lineup-item">
                    <img class="lineup-item-img" src="assets/placeholder.jpg" alt="Placeholder for studio image">
                    <div class="lineup-info-box">
                        <div class="lineup-title-icon">
                            <h3 class="lineup-title">Name of studio</h3>
                            <img class="heart-icon" id="heart-icon" src="assets/heart-outline.svg" alt="Like">
                        </div>
                        <p class="lineup-info-text">City, country</p>
                        <p class="lineup-info-text">Other info</p>
                    </div>
                </div>
    
            <div class="lineup-item">
                    <img class="lineup-item-img" src="assets/placeholder.jpg" alt="Placeholder for studio image">
                    <div class="lineup-info-box">
                        <div class="lineup-title-icon">
                            <h3 class="lineup-title">Name of studio</h3>
                            <img class="heart-icon" id="heart-icon" src="assets/heart-outline.svg" alt="Like">
                        </div>
                        <p class="lineup-info-text">City, country</p>
                        <p class="lineup-info-text">Other info</p>
                    </div>
                </div>
    
            <div class="lineup-item">
                    <img class="lineup-item-img" src="assets/placeholder.jpg" alt="Placeholder for studio image">
                    <div class="lineup-info-box">
                        <div class="lineup-title-icon">
                            <h3 class="lineup-title">Name of studio</h3>
                            <img class="heart-icon" id="heart-icon" src="assets/heart-outline.svg" alt="Like">
                        </div>
                        <p class="lineup-info-text">City, country</p>
                        <p class="lineup-info-text">Other info</p>
                    </div>
                </div>
    
            <div class="lineup-item">
                    <img class="lineup-item-img" src="assets/placeholder.jpg" alt="Placeholder for studio image">
                    <div class="lineup-info-box">
                        <div class="lineup-title-icon">
                            <h3 class="lineup-title">Name of studio</h3>
                            <img class="heart-icon" id="heart-icon" src="assets/heart-outline.svg" alt="Like">
                        </div>
                        <p class="lineup-info-text">City, country</p>
                        <p class="lineup-info-text">Other info</p>
                    </div>
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

// for lineup pages

if (lineupSearchBar) {
    lineupSearchBar.addEventListener("focus", () => {
        lineupSearchIcon.style.display = "inline-block";
        lineupSearchBar.style.width = "23ch";
    })
    
    lineupSearchBar.addEventListener("blur", () => {
        lineupSearchIcon.style.display = "none";
        lineupSearchBar.style.width = "25ch";
    })
}