const navLogo = document.querySelector("#nav-logo");
const mobileMenu = document.querySelector("#mobile-menu");
const closingX = document.querySelector("#closing-x");
const navItem = document.querySelectorAll("#nav-item");
const navItemH2 = document.querySelectorAll("#nav-item > h2");
const navLinkArrow = document.querySelectorAll("#nav-link-arrow");
const dropdownContainer = document.querySelectorAll("#dropdown-container");
const navSearchBar = document.querySelector("#nav-search-bar");
const searchIcon = document.querySelector("#search-icon");

const headerContainer = document.querySelector("#header-container");
const main = document.querySelector("main");
const heartIcon = document.querySelectorAll(".heart-icon");
const heartIconImg = document.querySelectorAll(".heart-icon > img");
const arrowBack = document.querySelectorAll("#arrow-back");
const footer = document.querySelector("footer");

const mapMain = document.querySelector("#map-main");
const foundStudiosContainer = document.querySelector("#found-studios-container");
const blueBackground = document.querySelector("#blue-background");
const mapSearchIcon = document.querySelector("#map-search-icon");
const mapCardItemImg = document.querySelector("#map-card-item-img");

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

navItemH2.forEach(item => {
    item.addEventListener("keydown", e => {
        if (e.key === "Enter") {
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
    navSearchBar.style.width = "min(72vw, 475px)";
})

navSearchBar.addEventListener("blur", () => {
    searchIcon.style.display = "none";
    navSearchBar.style.width = "min(80vw, 500px)";
})

// heart icons

heartIconImg.forEach(icon => {
    icon.addEventListener("click", () => {
        if (icon.src.endsWith("assets/heart-outline.svg")) {
            icon.src = "assets/heart.svg"
        } else {
            icon.src = "assets/heart-outline.svg"
        }
    })
})

heartIcon.forEach(icon => {
    icon.addEventListener("keydown", e => {
        if (e.key === "Enter") {
            if (icon.firstChild.src.endsWith("assets/heart-outline.svg")) {
                icon.firstChild.src = "assets/heart.svg"
            } else {
                icon.firstChild.src = "assets/heart-outline.svg"
            }
        }
    })
})

// for lineup pages

if (lineupSearchBar) {
    lineupSearchBar.addEventListener("focus", () => {
        lineupSearchIcon.style.display = "inline-block";
        lineupSearchBar.style.width = "min(72vw, 475px)";
    })

    lineupSearchBar.addEventListener("blur", () => {
        lineupSearchIcon.style.display = "none";
        lineupSearchBar.style.width = "min(80vw, 500px)";
    })

    lineupSearchBar.addEventListener("keyup", (e) => {
        if (e.key === "Enter") {
            featuredLineupHeader.innerHTML = "";
            filterMenu.innerHTML = "";
            featuredLineupHeader.innerHTML = "<h1>Search results</h1>";
            filterMenu.innerHTML +=
                `<h4>Filter by:</h4>
            <div class="filter-selector">
                <button class="filter-one" id="filter-one"></button>
                <img class="filter-arrow" id="filter-arrow" src="assets/triangle-down.svg">
            </div>
            <div class="filter-selector">
                <button class="filter-two" id="filter-two"></button>
                <img class="filter-arrow" id="filter-arrow" src="assets/triangle-down.svg">
            </div>
            <div class="filter-selector">
                <button class="filter-three" id="filter-three"></button>
                <img class="filter-arrow" id="filter-arrow" src="assets/triangle-down.svg">
            </div>
            <div class="filter-expanded" id="filter-expanded"></div>`;

            if (mapCardItemImg) {
                mapCardItemImg.scrollIntoView({behavior: "smooth", block: "end"});
            }

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
                    filterThree.style.display = "none";
                    filterThree.nextElementSibling.style.display = "none";
                    break;
                case pagePath.includes("competitions.html"):
                    filterOne.textContent = "Apparatus";
                    filterTwo.textContent = "Location";
                    filterThree.style.display = "none";
                    filterThree.nextElementSibling.style.display = "none";
                    break;
                case pagePath.includes("festivals.html"):
                    filterOne.textContent = "Date";
                    filterTwo.textContent = "Location";
                    filterThree.style.display = "none";
                    filterThree.nextElementSibling.style.display = "none";
                    break;
                case pagePath.includes("health.html"):
                case pagePath.includes("photography.html"):
                case pagePath.includes("clothing.html"):
                case pagePath.includes("heels.html"):
                case pagePath.includes("equipment.html"):
                    filterOne.textContent = "Type";
                    filterTwo.textContent = "Location";
                    filterThree.style.display = "none";
                    filterThree.nextElementSibling.style.display = "none";
                    break;
                case pagePath.includes("otherresources.html"):
                    filterOne.textContent = "Type";
                    filterTwo.style.display = "none";
                    filterTwo.nextElementSibling.style.display = "none";
                    filterThree.style.display = "none";
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
                    filterThree.style.display = "none";
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

            const firstArrow = filterOne.nextElementSibling;
            const secondArrow = filterTwo.nextElementSibling;
            const thirdArrow = filterThree.nextElementSibling;

            filterOne.addEventListener("click", () => {
                filterExpanded.innerHTML = "";
                if (firstArrow.src.endsWith("assets/triangle-down.svg")) {
                    firstArrow.src = "assets/triangle-up.svg";
                    filterExpanded.innerHTML = `<p>Expanded menu</p>`;
                    filterExpanded.style.marginBottom = "1rem";
                    secondArrow.src = "assets/triangle-down.svg";
                    thirdArrow.src = "assets/triangle-down.svg";
                } else {
                    firstArrow.src = "assets/triangle-down.svg";
                    filterExpanded.innerHTML = "";
                    filterExpanded.style.marginBottom = "0";
                }
            })

            firstArrow.addEventListener("click", () => {
                filterExpanded.innerHTML = "";
                if (firstArrow.src.endsWith("assets/triangle-down.svg")) {
                    firstArrow.src = "assets/triangle-up.svg";
                    filterExpanded.innerHTML = `<p>Expanded menu</p>`;
                    filterExpanded.style.marginBottom = "1rem";
                    secondArrow.src = "assets/triangle-down.svg";
                    thirdArrow.src = "assets/triangle-down.svg";
                } else {
                    firstArrow.src = "assets/triangle-down.svg";
                    filterExpanded.innerHTML = "";
                    filterExpanded.style.marginBottom = "0";
                }
            })

            filterTwo.addEventListener("click", () => {
                filterExpanded.innerHTML = "";
                if (secondArrow.src.endsWith("assets/triangle-down.svg")) {
                    secondArrow.src = "assets/triangle-up.svg";
                    filterExpanded.innerHTML = `<p>Expanded menu</p>`;
                    filterExpanded.style.marginBottom = "1rem";
                    firstArrow.src = "assets/triangle-down.svg";
                    thirdArrow.src = "assets/triangle-down.svg";
                } else {
                    secondArrow.src = "assets/triangle-down.svg";
                    filterExpanded.innerHTML = "";
                    filterExpanded.style.marginBottom = "0";
                }
            })

            secondArrow.addEventListener("click", () => {
                filterExpanded.innerHTML = "";
                if (secondArrow.src.endsWith("assets/triangle-down.svg")) {
                    secondArrow.src = "assets/triangle-up.svg";
                    filterExpanded.innerHTML = `<p>Expanded menu</p>`;
                    filterExpanded.style.marginBottom = "1rem";
                    firstArrow.src = "assets/triangle-down.svg";
                    thirdArrow.src = "assets/triangle-down.svg";
                } else {
                    secondArrow.src = "assets/triangle-down.svg";
                    filterExpanded.innerHTML = "";
                    filterExpanded.style.marginBottom = "0";
                }
            })

            filterThree.addEventListener("click", () => {
                filterExpanded.innerHTML = "";
                if (thirdArrow.src.endsWith("assets/triangle-down.svg")) {
                    thirdArrow.src = "assets/triangle-up.svg";
                    filterExpanded.innerHTML = `<p>Expanded menu</p>`;
                    filterExpanded.style.marginBottom = "1rem";
                    firstArrow.src = "assets/triangle-down.svg";
                    secondArrow.src = "assets/triangle-down.svg";
                } else {
                    thirdArrow.src = "assets/triangle-down.svg";
                    filterExpanded.innerHTML = "";
                    filterExpanded.style.marginBottom = "0";
                }
            })

            thirdArrow.addEventListener("click", () => {
                filterExpanded.innerHTML = "";
                if (thirdArrow.src.endsWith("assets/triangle-down.svg")) {
                    thirdArrow.src = "assets/triangle-up.svg";
                    filterExpanded.innerHTML = `<p>Expanded menu</p>`;
                    filterExpanded.style.marginBottom = "1rem";
                    firstArrow.src = "assets/triangle-down.svg";
                    secondArrow.src = "assets/triangle-down.svg";
                } else {
                    thirdArrow.src = "assets/triangle-down.svg";
                    filterExpanded.innerHTML = "";
                    filterExpanded.style.marginBottom = "0";
                }
            })



        }
    })

}