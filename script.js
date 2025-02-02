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
const lineupContainer = document.querySelector("#lineup-container");
const featuredLineupHeader = document.querySelector("#lineup-container > h1");

const filterMenu = document.querySelector("#filter-menu");

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
    navSearchBar.style.width = "72vw";
})

navSearchBar.addEventListener("blur", () => {
    searchIcon.style.display = "none";
    navSearchBar.style.width = "80vw";
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
        mapSearchBar.style.width = "72vw";
    })

    mapSearchBar.addEventListener("blur", () => {
        mapSearchIcon.style.display = "none";
        mapSearchBar.style.width = "80vw";
    })

    mapSearchBar.addEventListener("keyup", (e) => {
        if (e.key === "Enter") {
            foundStudiosContainer.innerHTML = "";
            foundStudiosContainer.style.display = "grid";
            foundStudiosContainer.style.gridTemplateColumns = "repeat(auto-fill, minmax(140px, 2fr))";
            foundStudiosContainer.style.gap = "1rem";
            foundStudiosContainer.style.width = "calc(100% - 3rem)";
            foundStudiosContainer.style.marginBottom = "2rem";
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
            foundStudiosContainer.insertAdjacentHTML("afterbegin", "<h1>Search results</h1>");
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
        lineupSearchBar.style.width = "72vw";
    })

    lineupSearchBar.addEventListener("blur", () => {
        lineupSearchIcon.style.display = "none";
        lineupSearchBar.style.width = "80vw";
    })

    lineupSearchBar.addEventListener("keyup", (e) => {
        if (e.key === "Enter") {
            console.log("Enter pressed");
            featuredLineupHeader.innerHTML = "";
            filterMenu.innerHTML = "";
            featuredLineupHeader.innerHTML = "<h1>Search results</h1>";
            filterMenu.innerHTML +=
                `<h4>Filter by:</h4>
            <div class="filter-selector">
                <p class="filter-one" id="filter-one"></p>
                <img src="assets/triangle-down.svg" class="filter-arrow" id="filter-arrow">
            </div>
            <div class="filter-selector">
                <p class="filter-two" id="filter-two"></p>
                <img src="assets/triangle-down.svg" class="filter-arrow" id="filter-arrow">
            </div>
            <div class="filter-selector">
                <p class="filter-three" id="filter-three"></p>
                <img src="assets/triangle-down.svg" class="filter-arrow" id="filter-arrow">
            </div>
            <div class="filter-expanded" id="filter-expanded"></div>`;

            const filterExpanded = document.querySelector("#filter-expanded");
            const filterOne = document.querySelector("#filter-one");
            const filterTwo = document.querySelector("#filter-two");
            const filterThree = document.querySelector("#filter-three");
            const filterArrow = document.querySelectorAll("#filter-arrow");

            const pagePath = window.location.pathname;
            switch (true) {
                case pagePath.includes("studios.html"):
                case pagePath.includes("coaches.html"):
                case pagePath.includes("performers.html"):
                case pagePath.includes("collectives.html"):
                case pagePath.includes("retreats.html"):
                    filterOne.textContent = "Apparatus";
                    filterTwo.textContent = "Features";
                    filterThree.textContent = "";
                    filterThree.nextElementSibling.style.display = "none";
                    break;
                case pagePath.includes("competitions.html"):
                    filterOne.textContent = "Apparatus";
                    filterTwo.textContent = "Location";
                    filterThree.textContent = "";
                    filterThree.nextElementSibling.style.display = "none";
                    break;
                case pagePath.includes("festivals.html"):
                    filterOne.textContent = "Date";
                    filterTwo.textContent = "Location";
                    filterThree.textContent = "";
                    filterThree.nextElementSibling.style.display = "none";
                    break;
                case pagePath.includes("health.html"):
                case pagePath.includes("photography.html"):
                case pagePath.includes("clothing.html"):
                case pagePath.includes("heels.html"):
                case pagePath.includes("equipment.html"):
                    filterOne.textContent = "Type";
                    filterTwo.textContent = "Location";
                    filterThree.textContent = "";
                    filterThree.nextElementSibling.style.display = "none";
                    break;
                case pagePath.includes("otherresources.html"):
                    filterOne.textContent = "Type";
                    filterTwo.textContent = "";
                    filterTwo.nextElementSibling.style.display = "none";
                    filterThree.textContent = "";
                    filterThree.nextElementSibling.style.display = "none";
                    break;
                case pagePath.includes("hoop.html"):
                case pagePath.includes("silks.html"):
                case pagePath.includes("trapeze.html"):
                case pagePath.includes("hammock.html"):
                case pagePath.includes("pole.html"):
                case pagePath.includes("straps.html"):
                case pagePath.includes("otherskills.html"):
                    filterOne.textContent = "Level";
                    filterTwo.textContent = "Type";
                    filterThree.textContent = "";
                    filterThree.nextElementSibling.style.display = "none";
                    break;
                case pagePath.includes("events.html"):
                    filterOne.textContent = "Type";
                    filterTwo.textContent = "Date";
                    filterThree.textContent = "Location";
                    break;
                default:
                    filterOne.textContent = "Filter one";
                    filterTwo.textContent = "Filter two";
                    filterThree.textContent = "Filter three";
            }

            filterOne.addEventListener("click", () => {
                filterExpanded.innerHTML = "";
                const thisArrow = filterOne.nextElementSibling;
                if (thisArrow.src.endsWith("assets/triangle-down.svg")) {
                    thisArrow.src = "assets/triangle-up.svg";
                    filterExpanded.innerHTML = `<p>Expanded menu</p>`;

                } else {
                    thisArrow.src = "assets/triangle-down.svg";
                    filterExpanded.innerHTML = "";
                }
            })

            filterTwo.addEventListener("click", () => {
                filterExpanded.innerHTML = "";
                const thisArrow = filterTwo.nextElementSibling;
                if (thisArrow.src.endsWith("assets/triangle-down.svg")) {
                    thisArrow.src = "assets/triangle-up.svg";
                    filterExpanded.innerHTML = `<p>Expanded menu</p>`;

                } else {
                    thisArrow.src = "assets/triangle-down.svg";
                    filterExpanded.innerHTML = "";
                }
            })

            filterThree.addEventListener("click", () => {
                filterExpanded.innerHTML = "";
                const thisArrow = filterThree.nextElementSibling;
                if (thisArrow.src.endsWith("assets/triangle-down.svg")) {
                    thisArrow.src = "assets/triangle-up.svg";
                    filterExpanded.innerHTML = `<p>Expanded menu</p>`;

                } else {
                    thisArrow.src = "assets/triangle-down.svg";
                    filterExpanded.innerHTML = "";
                }
            })

            filterArrow.forEach(arrow => {
                arrow.addEventListener("click", () => {
                    filterExpanded.innerHTML = "";
                    if (arrow.src.endsWith("assets/triangle-down.svg")) {
                        arrow.src = "assets/triangle-up.svg";
                        filterExpanded.innerHTML = `<p>Expanded menu</p>`;

                    } else {
                        arrow.src = "assets/triangle-down.svg";
                        filterExpanded.innerHTML = "";
                    }
                })
            })

        }
    })

}