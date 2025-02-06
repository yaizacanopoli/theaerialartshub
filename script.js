const navLogo = document.querySelector("#nav-logo");
const mobileMenu = document.querySelector("#mobile-menu");
const closingX = document.querySelector("#closing-x");
const navItem = document.querySelectorAll("#nav-item");
const navItemH2 = document.querySelectorAll("#nav-item > h2");
const navLinkArrow = document.querySelectorAll("#nav-link-arrow");
const navSearchBar = document.querySelector("#nav-search-bar");
const searchIcon = document.querySelector("#search-icon");

const headerContainer = document.querySelector("#header-container");
const main = document.querySelector("main");
const heartIcon = document.querySelectorAll(".heart-icon");
const heartIconImg = document.querySelectorAll(".heart-icon > img");
const footer = document.querySelector("footer");

const mapCardItemImg = document.querySelector("#map-card-item-img");
const lineupSearchBar = document.querySelector("#lineup-search-bar");
const lineupSearchIcon = document.querySelector("#lineup-search-icon");
const featuredLineupHeader = document.querySelector("#lineup-container > h1");

const filterMenu = document.querySelector("#filter-menu");

// toggle states

function toggleMobileMenu() {
    if (mobileMenu.style.display !== "flex") {
        mobileMenu.style.display = "flex";
        headerContainer.style.display = "none";
        main.style.display = "none";
        footer.style.display = "none";
    } else {
        mobileMenu.style.display = "none";
        headerContainer.style.display = "flex";
        main.style.display = "flex";
        footer.style.display = "flex";
    }
}

function toggleDropdown(arrow, dropdown) {
    if (arrow.src.endsWith("assets/triangle-down.svg")) {
        arrow.src = "assets/triangle-up.svg";
        dropdown.style.visibility = "visible";
        dropdown.style.height = dropdown.scrollHeight + "px";
        dropdown.style.margin = "1.2rem 1.2rem 0 0";

    } else {
        arrow.src = "assets/triangle-down.svg";
        dropdown.style.visibility = "hidden";
        dropdown.style.height = "0";
        dropdown.style.margin = "0";
    }
}

function toggleLikeState(icon) {
    if (icon.src.endsWith("assets/heart-outline.svg")) {
        icon.src = "assets/heart.svg"
    } else {
        icon.src = "assets/heart-outline.svg"
    }
}

// event delegation

document.addEventListener("click", e => {
    if (e.target.matches("#nav-logo > img") || e.target.matches("#closing-x > img")) {
        toggleMobileMenu();
    } else if (e.target.matches("#nav-item > h2")) {
        const thisArrow = e.target.parentElement.nextElementSibling;
        const thisDropdown = thisArrow.nextElementSibling;
        toggleDropdown(thisArrow, thisDropdown);
    } else if (e.target.matches("#nav-link-arrow")) {
        const thisDropdown = e.target.nextElementSibling;
        toggleDropdown(e.target, thisDropdown);
    } else if (e.target.matches(".heart-icon > img")) {
        toggleLikeState(e.target)
    }
})

document.addEventListener("keydown", e => {
    if (e.key === "Enter") {
        if (e.target.matches("#nav-logo") || e.target.matches("#closing-x")) {
            toggleMobileMenu();
        } else if (e.target.matches("#nav-item > h2")) {
            const thisArrow = e.target.nextElementSibling;
            const thisDropdown = thisArrow.nextElementSibling;
            toggleDropdown(thisArrow, thisDropdown);
        } else if (e.target.matches(".heart-icon")) {
            toggleLikeState(e.target.firstChild);
        } else if (e.target === lineupSearchBar) {
            setUpFilters();
        }
    }
})

document.addEventListener("focusin", e => {
    if (e.target.matches("#nav-search-bar") || e.target === lineupSearchBar) {
        e.target.nextElementSibling.style.display = "inline-block";
        e.target.style.width = "min(72vw, 475px)";
    }
})

document.addEventListener("focusout", e => {
    if (e.target.matches("#nav-search-bar") || e.target === lineupSearchBar) {
        e.target.nextElementSibling.style.display = "none";
        e.target.style.width = "min(80vw, 500px)";
    }
})

// filter functionality

function setUpFilters() {
    featuredLineupHeader.innerHTML = "<h1>Search results</h1>";
    filterMenu.innerHTML = generateFilters();
    if (mapCardItemImg) mapCardItemImg.scrollIntoView({ behavior: "smooth", block: "end" });
    configureFilterButtons();
}

function generateFilters() {
    return `<h4>Filter by:</h4>
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
            </div>`
}

function determineFilterOptions() {
    const pagePath = window.location.pathname;
    if (["studios.html", "studiomap.html", "coaches.html", "performers.html", "collectives.html", "retreats.html"].some(page => pagePath.includes(page))) {
        return ["Apparatus", "Features", null];
    } else if (pagePath.includes("competitions.html")) {
        return ["Apparatus", "Location", null];
    } else if (pagePath.includes("festivals.html")) {
        return ["Date", "Location", null];
    } else if (["health.html", "photography.html", "clothing.html", "heels.html", "equipment.html"].some(page => pagePath.includes(page))) {
        return ["Type", "Location", null];
    } else if (pagePath.includes("otherresources.html")) {
        return ["Type", null, null];
    } else if (["hoop.html", "silks.html", "trapeze.html", "hammock.html", "pole.html", "straps.html", "otherskills.html"].some(page => pagePath.includes(page))) {
        return ["Level", "Type", null];
    } else if (pagePath.includes("events.html")) {
        return ["Type", "Date", "Location"];
    } else {
        return ["Filter one", "Filter two", "Filter three"];
    }
}

function applyFilterOptions(filterOne, filterTwo, filterThree, options) {
    [filterOne, filterTwo, filterThree].forEach((filter, index) => {
        if (options[index]) {
            filter.textContent = options[index];
            filter.style.display = "inline-block";
        } else {
            filter.style.display = "none";
            filter.nextElementSibling.style.display = "none"
        }
    });
}

function toggleFilterMenu(arrow, filterExpanded, filterKey) {
    const allArrows = document.querySelectorAll("#filter-arrow");
    const allExpandedMenus = document.querySelectorAll("[id^=filter-expanded]");

    allExpandedMenus.forEach((otherMenu) => {
        otherMenu.style.display = "none";
    });
        filterExpanded.style.display = "flex";

    allArrows.forEach((otherArrow) => {
        if (otherArrow !== arrow) {
            otherArrow.src = "assets/triangle-down.svg";
        }
    });

    const isExpanded = arrow.src.endsWith("triangle-down.svg");

    if (isExpanded) {
        arrow.src = "assets/triangle-up.svg";
        filterExpanded.innerHTML = `<p>Expanded menu for ${filterKey}</p>`;
    } else {
        arrow.src = "assets/triangle-down.svg";
        filterExpanded.innerHTML = "";
    }
}

function setupFilterToggle(filterButton, filterExpanded, filterKey) {
    const arrow = filterButton.nextElementSibling;
    filterButton.addEventListener("click", () => toggleFilterMenu(arrow, filterExpanded, filterKey));
    arrow.addEventListener("click", () => toggleFilterMenu(arrow, filterExpanded, filterKey));
}

function configureFilterButtons() {
    const filterOne = document.querySelector("#filter-one");
    const filterTwo = document.querySelector("#filter-two");
    const filterThree = document.querySelector("#filter-three");
    const allFilters = [filterOne, filterTwo, filterThree];

    allFilters.forEach((filter, index) => {
        let filterExpanded = document.createElement("div");
        filterExpanded.className = `filter-expanded-${index}`;
        filterExpanded.id = `filter-expanded-${index}`;
        filter.parentElement.parentElement.appendChild(filterExpanded);
        
        filterExpanded.style.flexBasis = "100%";
        filterExpanded.style.marginBottom = "1rem";
        filterExpanded.style.display = "none";
        
        const filterOptions = determineFilterOptions();
        applyFilterOptions(filterOne, filterTwo, filterThree, filterOptions);
        
        setupFilterToggle(filter, filterExpanded, filterOptions[index]);
    });
}