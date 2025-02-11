const navLogo = document.querySelector("#nav-logo");
const mobileMenu = document.querySelector("#mobile-menu");
const closingX = document.querySelector("#closing-x");
const navItem = document.querySelectorAll("#nav-item");
const navItemH2 = document.querySelectorAll("#nav-item > h2");
const navLinkArrow = document.querySelectorAll("#nav-link-arrow");
const navSearchBar = document.querySelector("#nav-search-bar");

const headerContainer = document.querySelector("#header-container");
const main = document.querySelector("main");
const heartIcon = document.querySelectorAll(".heart-icon");
const heartIconImg = document.querySelectorAll(".heart-icon > img");
const footer = document.querySelector("footer");

const mapCardItemImg = document.querySelector("#map-card-item-img");
const lineupSearchBar = document.querySelector("#lineup-search-bar");
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

function toggleMobileDropdown(arrow, dropdown) {
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

function toggleDesktopDropdown(arrow, dropdown) {
    const allDropdowns = document.querySelectorAll("#desktop-dropdown-container");
    allDropdowns.forEach(otherDropdown => {
        if (otherDropdown !== dropdown) {
            otherDropdown.style.display = "none";
        }
    })

    const allArrows = document.querySelectorAll("#desktop-menu #nav-link-arrow");
    allArrows.forEach(otherArrow => {
        if (otherArrow !== arrow) {
            otherArrow.src = "assets/triangle-down.svg";
        }
    })

    if (arrow.src.endsWith("assets/triangle-down.svg")) {
        arrow.src = "assets/triangle-up.svg";
        dropdown.style.display = "flex";
    } else {
        arrow.src = "assets/triangle-down.svg";
        dropdown.style.display = "none";
    }
}

function toggleLikeState(icon) {
    if (icon.src.endsWith("assets/heart-outline.svg")) {
        icon.src = "assets/heart.svg"
    } else {
        icon.src = "assets/heart-outline.svg"
    }
}

// event listeners

document.addEventListener("load", () => {
    mobileMenu.style.display = "none";
    headerContainer.style.display = "flex";
    main.style.display = "flex";
    footer.style.display = "flex";
})

document.addEventListener("click", e => {
    if (e.target.matches("#nav-logo > img") || e.target.matches("#closing-x > img")) {
        toggleMobileMenu();
    } else if (e.target.matches("#mobile-menu #nav-item > h2")) {
        const thisArrow = e.target.parentElement.nextElementSibling;
        const thisDropdown = thisArrow.nextElementSibling;
        toggleMobileDropdown(thisArrow, thisDropdown);
    } else if (e.target.matches("#mobile-menu #nav-link-arrow")) {
        const thisDropdown = e.target.nextElementSibling;
        toggleMobileDropdown(e.target, thisDropdown);
    } else if (e.target.matches(".heart-icon > img")) {
        toggleLikeState(e.target)
    } else if (e.target.matches("#sign-in-main .sign-in-btn") || e.target.matches("#register-main .register-btn")) {
        const comingSoonText = document.querySelector(".coming-soon-text");
        comingSoonText.innerHTML = "<h2>Coming soon!</h2>";
    } else if (e.target.matches("#arrow-back > img")) {
        if (window.history.length > 1) {
            window.history.back();
        } else {
            window.location.href = "index.html";
        }
    }
})

document.addEventListener("mouseover", e => {
    if (e.target.matches("#desktop-menu #nav-item > h2")) {
        const thisArrow = e.target.nextElementSibling;
        const thisDropdown = thisArrow.parentElement.nextElementSibling;
        toggleDesktopDropdown(thisArrow, thisDropdown);
    }
})

document.addEventListener("mouseout", e => {
    if (e.target.matches("#desktop-dropdown-container")) {
        const thisArrow = e.target.parentElement.firstChild.firstChild.nextElementSibling;
        const thisDropdown = e.target;
        toggleDesktopDropdown(thisArrow, thisDropdown);
    }
})

document.addEventListener("keydown", e => {
    if (e.key === "Enter") {
        if (e.target.matches("#nav-logo") || e.target.matches("#closing-x")) {
            toggleMobileMenu();
        } else if (e.target.matches("#mobile-menu #nav-item")) {
            const thisArrow = e.target.nextElementSibling;
            const thisDropdown = thisArrow.nextElementSibling;
            toggleMobileDropdown(thisArrow, thisDropdown);
        } else if (e.target.matches("#desktop-menu #nav-item")) {
            const thisArrow = e.target.children[1];
            const thisDropdown = thisArrow.parentElement.nextElementSibling;
            toggleDesktopDropdown(thisArrow, thisDropdown);
        } else if (e.target.matches(".heart-icon")) {
            toggleLikeState(e.target.firstChild);
        } else if (e.target === lineupSearchBar) {
            setUpFilters();
        } else if (e.target.matches("#arrow-back")) {
            if (window.history.length > 1) {
                window.history.back();
            } else {
                window.location.href = "index.html";
            }
        }
    }
})

document.addEventListener("focusin", e => {
    if (e.target.matches("#nav-search-bar") || e.target === lineupSearchBar) {
        e.target.nextElementSibling.style.display = "inline-block";
        e.target.style.width = "min(72vw, 475px)";
    } else if (e.target.matches("#desktop-search-bar")) {
        e.target.nextElementSibling.style.display = "inline-block";
    }
})

document.addEventListener("focusout", e => {
    if (e.target.matches("#nav-search-bar") || e.target === lineupSearchBar) {
        e.target.nextElementSibling.style.display = "none";
        e.target.style.width = "min(80vw, 500px)";
    } else if (e.target.matches("#desktop-search-bar")) {
        e.target.nextElementSibling.style.display = "none";
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
                <div class="filter-expanded" id="filter-expanded-one"></div>
            </div>
            <div class="filter-selector">
                <button class="filter-two" id="filter-two"></button>
                <img class="filter-arrow" id="filter-arrow" src="assets/triangle-down.svg">
                <div class="filter-expanded" id="filter-expanded-two"></div>
            </div>
            <div class="filter-selector">
                <button class="filter-three" id="filter-three"></button>
                <img class="filter-arrow" id="filter-arrow" src="assets/triangle-down.svg">
                <div class="filter-expanded" id="filter-expanded-three"></div>
            </div>`
}

function determineFilterOptions() {
    const pagePath = window.location.pathname;
    if (["studios.html", "studiomap.html"].some(page => pagePath.includes(page))) {
        return ["Apparatus", "Features", "Location"];
    } else if (pagePath.includes("coaches.html")) {
        return ["Apparatus", "Details", "Style"];
    } else if (["performers.html", "collectives.html"].some(page => pagePath.includes(page))) {
        return ["Apparatus", "Identifiers", "Style"];
    } else if (["competitions.html", "retreats.html"].some(page => pagePath.includes(page))) {
        return ["Apparatus", "When", "Location"];
    } else if (pagePath.includes("festivals.html")) {
        return ["When", "Location", null];
    } else if (pagePath.includes("health.html")) {
        return ["Type", "Location", null];
    } else if (pagePath.includes("equipment.html")) {
        return ["Equipment type", "Location", null];
    } else if (pagePath.includes("clothing.html")) {
        return ["Clothing type", "Location", null];
    } else if (pagePath.includes("heels.html")) {
        return ["Heel style", "Location", null];
    } else if (pagePath.includes("photography.html")) {
        return ["Kind", "Location", null];
    } else if (pagePath.includes("otherresources.html")) {
        return ["Category", null, null];
    } else if (["hoop.html", "silks.html", "trapeze.html", "hammock.html", "pole.html", "straps.html", "otherskills.html"].some(page => pagePath.includes(page))) {
        return ["Move type", "Level", null];
    } else if (pagePath.includes("events.html")) {
        return ["Event type", "When", "Location"];
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

        const filterContent = {
            "Apparatus": ["Hoop/lyra", "Silks", "Trapeze", "Hammock/sling", "Pole, Straps + rope", "Specialty apparatus"],
            "Features": ["Accessible", "Gender-inclusive", "Queer-friendly", "POC-owned", "Sex work-positive", "Open training"],
            "Location": ["Europe", "USA", "Latin America", "Asia", "Oceania", "Africa"],
            "When": ["This week", "This month", "This year", "Next year", "Other dates"],
            "Level": ["Intro", "Beginner", "Intermediate", "Advanced"],
            "Identifiers": ["Queer", "POC", "Disabled", "Sex work-positive"],
            "Details": ["Queer", "POC", "Disabled", "Sex work-positive", "Certified", "Online"],
            "Style": ["Classic", "Sensual", "Dynamic", "Lyrical", "Comedic"],
            "Type": ["Physiotherapy", "Flexibility", "Mental health", "Other health resources"],
            "Kind": ["Photography", "Videography"],
            "Category": ["Art", "Games", "Music", "Communities"],
            "Clothing type": ["Aerial", "Pole", "Performance", "Custom"],
            "Heel style": ["Sandals", "Boots", "Specialty", "Custom"],
            "Equipment type": ["Rigs", "Accessories", "Grip", "Custom"],
            "Move type": ["Dynamic", "Balance", "Invert", "Bendy", "Spin", "Conditioning", "Mount", "Dance"],
            "Event type": ["Workshop", "Performance", "Seminar", "Retreat", "Festival", "Competition", "Health", "Open call", "Arts", "Social", "Online"],
        };

        function generateFilterContent(filterKey, filterExpanded) {
            filterExpanded.innerHTML = "";
            const expandedFilterContainer = document.createElement("div");
            expandedFilterContainer.classList.add("filter-container");

            if (filterContent[filterKey]) {
                filterContent[filterKey].forEach(option => {
                    const label = document.createElement("label");
                    label.classList.add("filter-item");

                    const checkbox = document.createElement("input");
                    checkbox.type = "checkbox";
                    checkbox.value = option;
                    checkbox.name = filterKey;

                    label.appendChild(checkbox);
                    label.appendChild(document.createTextNode(option));
                    expandedFilterContainer.appendChild(label);
                });
            } else {
                expandedFilterContainer.innerHTML = `<p>No options available</p>`;
            }

            filterExpanded.appendChild(expandedFilterContainer);
        }

        filterExpanded.style.display = "block";
        generateFilterContent(filterKey, filterExpanded);

    } else {
        arrow.src = "assets/triangle-down.svg";
        filterExpanded.style.display = "none";
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