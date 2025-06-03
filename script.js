const navLogo = document.querySelector("#nav-logo");
const desktopMenu = document.querySelector("#desktop-menu");
const mobileMenu = document.querySelector("#mobile-menu");
const closingX = document.querySelector("#closing-x");
const navItem = document.querySelectorAll("#nav-item");
const navItemH2 = document.querySelectorAll("#nav-item > h2");
const navLinkArrow = document.querySelectorAll("#nav-link-arrow");
const navSearchBar = document.querySelector("#nav-search-bar");
const desktopSearchBar = document.querySelector("#desktop-search-bar");

const headerContainer = document.querySelector("#header-container");
const main = document.querySelector("main");
const aboutMain = document.querySelector("#about-main");
const heartIcon = document.querySelectorAll(".heart-icon");
const heartIconImg = document.querySelectorAll(".heart-icon > img");
const footer = document.querySelector("footer");

const scrollCards = document.querySelectorAll(".scroll-cards");
const articleCard = document.querySelectorAll(".scroll-cards > .card");
const mapCardItemImg = document.querySelector("#map-card-item-img");
const lineupSearchBar = document.querySelector("#lineup-search-bar");
const featuredLineupHeader = document.querySelector("#lineup-container > h1");
const featuredLineup = document.querySelector("#lineup-lineup");
const lineupTitle = document.querySelectorAll("#lineup-title");
const lineupItemModal = document.querySelector("#lineup-item-modal");
const notModal = document.querySelector("#not-modal");

const filterMenu = document.querySelector("#filter-menu");
const loadMoreBtn = document.querySelector("#load-more-btn");

// database

const supabaseUrl = "https://rziqmzomrmxklxsrsnpx.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6aXFtem9tcm14a2x4c3JzbnB4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk1MTQyNTQsImV4cCI6MjA1NTA5MDI1NH0.Iw9CPRmNSzoANbIuTAp4RoZAaq9M3BSxIreuqTBpKMc";

const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

const resultsPerPage = 12;
let currentOffset = 0;
let totalResults = 0;
let combinedAllResults = [];

const rangeStart = currentOffset;
const rangeEnd = rangeStart + resultsPerPage - 1;
const pagePath = window.location.pathname;
const fileName = pagePath.split("/").pop();
const baseName = fileName.replace(/\.[^/.]+$/, "");

async function searchDatabase(term) {
  if (baseName === "results") {
    if (combinedAllResults.length === 0) {
      const tables = ["studios"];

      for (const table of tables) {
        const { data, error } = await supabase
          .from(table)
          .select("name,address,city,country", { count: "exact" })
          .or(
            `name.ilike.%${term}%,address.ilike.%${term}%,city.ilike.%${term}%,country.ilike.%${term}%`
          )
          .order("name", { ascending: true });

        if (error) {
          console.error(`Error querying ${table}:`, error.message);
          continue;
        }

        combinedAllResults = combinedAllResults.concat(
          data.map((item) => ({
            ...item,
            source: table, // optionally tag where it came from
          }))
        );
      }
    }

    totalResults = combinedAllResults.length;
    const paginatedResults = combinedAllResults.slice(rangeStart, rangeEnd + 1);

    if (paginatedResults.length === 0) {
      featuredLineup.textContent = "No results were found";
      loadMoreBtn.style.display = "none";
    } else {
      paginatedResults.forEach((item) => {
        featuredLineup.innerHTML += `<article class="lineup-item">
            <div class="lineup-item-img" alt=""><h2 class="image-text">${item.name}</h2></div>
            <div class="lineup-info-box">
                <div class="lineup-title-icon">
                    <h2 class="lineup-title" id="lineup-title" data-name="${item.name}" data-city="${item.city}" data-country="${item.country}" data-address="${item.address}">${item.name}</h2>
                    <button class="heart-icon" id="heart-icon"><img src="assets/heart-outline.svg" alt="Like"></button>
                </div>
                <p class="lineup-info-text">${item.city}, ${item.country}</p>
            </div>
        </article>`;
      });
    }
  } else {
    const tableMap = {
      studios: "studios",
      studiomap: "studios",
      coaches: "coaches",
      events: "events",
      results: "studios",
    };

    const tableName = tableMap[baseName];

    const { data, error, count } = await supabase
      .from(tableName)
      .select("name,address,city,country", { count: "exact" })
      .range(rangeStart, rangeEnd)
      .or(
        `name.ilike.%${term}%,address.ilike.%${term}%,city.ilike.%${term}%,country.ilike.%${term}%`
      )
      .order("name", { ascending: true });
    if (error || count === 0) {
      totalResults = 0;
      featuredLineup.textContent = "No results were found";
      filterMenu.style.display = "none";
      loadMoreBtn.style.display = "none";
    } else {
      totalResults = count;
      filterMenu.style.display = "flex";
      data.forEach((item) => {
        featuredLineup.innerHTML += `<article class="lineup-item">
            <div class="lineup-item-img" alt=""><h2 class="image-text">${item.name}</h2></div>
            <div class="lineup-info-box">
                <div class="lineup-title-icon">
                    <h2 class="lineup-title" id="lineup-title" data-name="${item.name}" data-city="${item.city}" data-country="${item.country}" data-address="${item.address}">${item.name}</h2>
                    <button class="heart-icon" id="heart-icon"><img src="assets/heart-outline.svg" alt="Like"></button>
                </div>
                <p class="lineup-info-text">${item.city}, ${item.country}</p>
                <div class="item-tags-group">
                <button class="item-tag">Tag</button>
                <button class="item-tag">Tag</button>
                <button class="item-tag">Tag</button>
            </div>
            </div>
        </article>`;
      });

      setUpFilters();
    }
  }

  if (currentOffset + resultsPerPage >= totalResults) {
    loadMoreBtn.style.display = "none";
  } else {
    loadMoreBtn.style.display = "block";
  }
}

if (lineupSearchBar) {
  searchDatabase("");
}

// supabase for home page

async function loadStudios(category) {
  // pass the ID of each article card in as the category argument
  const selectedScrollCards = document.querySelector(
    `#scroll-cards-${category}`
  );

  if (selectedScrollCards) {
    const { data, error, count } = await supabase
      .from(category)
      .select("name,address,city,country", { count: "exact" })
      .range(0, 8)
      .order("name", { ascending: true });
    if (error || count === 0) {
      selectedScrollCards.textContent = "No results were found";
    } else {
      totalResults = count;
      data.forEach((item) => {
        selectedScrollCards.innerHTML += `<article class="lineup-item">
            <div class="lineup-item-img" alt=""><h2 class="image-text">${item.name}</h2></div>
            <div class="card-info">
                <div class="lineup-title-icon">
                    <h2 class="lineup-title" id="lineup-title" data-name="${item.name}" data-city="${item.city}" data-country="${item.country}" data-address="${item.address}">${item.name}</h2>
                    <button class="heart-icon" id="heart-icon"><img src="assets/heart-outline.svg" alt="Like"></button>
                </div>
                <p class="lineup-info-text">${item.city}, ${item.country}</p>
                <div class="item-tags-group">
                <button class="item-tag">Tag</button>
                <button class="item-tag">Tag</button>
                <button class="item-tag">Tag</button>
            </div>
            </div>
        </article>`;
      });

      selectedScrollCards.innerHTML += `<div class="arrow-see-all-container">
                <a href="studios.html" aria-label="Aerial and pole studios">
                    <img class="arrow-see-all" src="assets/chevron-right.svg" alt="See all">
                </a>
    </div>`;
    }
  }
}

if (scrollCards) {
  // loadStudios("events");
  loadStudios("studios");
  // loadStudios("clothing");
}

// modal toggle

document.addEventListener("click", (e) => {
  if (e.target.matches(".lineup-title")) {
    const modalItemName = e.target.dataset.name;
    const modalItemCity = e.target.dataset.city;
    const modalItemCountry = e.target.dataset.country;
    const modalItemAddress = e.target.dataset.address;

    lineupItemModal.style.display = "flex";
    lineupItemModal.innerHTML = `<article class="lineup-item">
          <div class="lineup-item-img" alt=""><h2 class="image-text">${modalItemName}</h2></div>
          <div class="lineup-info-box">
              <div class="lineup-title-icon">
                  <h2 class="modal-title" id="modal-title">${modalItemName}</h2>
                  <button class="heart-icon" id="heart-icon"><img src="assets/heart-outline.svg" alt="Like"></button>
              </div>
              <p class="modal-info-text">${modalItemCity}, ${modalItemCountry}</p>
              <p class="modal-info-text">${modalItemAddress}</p>
          </div>
    </article>`;

    notModal.classList.add("disabled-click-hover");
    headerContainer.classList.add("disabled-click-hover");
    desktopMenu.classList.add("disabled-click-hover");
    mobileMenu.classList.add("disabled-click-hover");
    footer.classList.add("disabled-click-hover");
    notModal.style.opacity = "0.3";
    footer.style.opacity = "0.3";
  } else if (!e.target.closest("#lineup-item-modal")) {
    lineupItemModal.style.display = "none";
    notModal.style.opacity = "1";
    footer.style.opacity = "1";
    notModal.classList.remove("disabled-click-hover");
    headerContainer.classList.remove("disabled-click-hover");
    desktopMenu.classList.remove("disabled-click-hover");
    mobileMenu.classList.remove("disabled-click-hover");
    footer.classList.remove("disabled-click-hover");
  }
});

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
    aboutMain.style.display = "grid";
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
  allDropdowns.forEach((otherDropdown) => {
    if (otherDropdown !== dropdown) {
      otherDropdown.style.display = "none";
    }
  });

  const allArrows = document.querySelectorAll("#desktop-menu #nav-link-arrow");
  allArrows.forEach((otherArrow) => {
    if (otherArrow !== arrow) {
      otherArrow.src = "assets/triangle-down.svg";
    }
  });

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
    icon.src = "assets/heart.svg";
  } else {
    icon.src = "assets/heart-outline.svg";
  }
}

// click and keydown events

document.addEventListener("click", (e) => {
  if (
    e.target.matches("#nav-logo > img") ||
    e.target.matches("#closing-x > img")
  ) {
    toggleMobileMenu();
  } else if (e.target.matches("#mobile-menu #nav-item > h2")) {
    const thisArrow = e.target.parentElement.nextElementSibling;
    const thisDropdown = thisArrow.nextElementSibling;
    toggleMobileDropdown(thisArrow, thisDropdown);
  } else if (e.target.matches("#mobile-menu #nav-link-arrow")) {
    const thisDropdown = e.target.nextElementSibling;
    toggleMobileDropdown(e.target, thisDropdown);
  } else if (e.target.matches(".heart-icon > img")) {
    toggleLikeState(e.target);
  } else if (
    e.target.matches("#sign-in-main .sign-in-btn") ||
    e.target.matches("#register-main .register-btn")
  ) {
    e.preventDefault();
    const comingSoonText = document.querySelector(".coming-soon-text");
    comingSoonText.innerHTML = "<h2>Coming soon!</h2>";
  } else if (e.target.matches("#load-more-btn")) {
    currentOffset += resultsPerPage;
    if (lineupSearchBar) {
      searchDatabase(lineupSearchBar.value);
    } else if (window.location.href.includes("results.html")) {
      const params = new URLSearchParams(window.location.search);
      const searchTerm = params.get("term") || "";
      searchDatabase(searchTerm);
    }
  } else if (e.target.matches("#lineup-search-icon")) {
    currentOffset = 0;
    featuredLineup.innerHTML = "";
    loadMoreBtn.style.display = "none";
    featuredLineupHeader.innerHTML = "<h1>Search results</h1>";
    searchDatabase(lineupSearchBar.value);
    if (mapCardItemImg)
      mapCardItemImg.scrollIntoView({ behavior: "smooth", block: "end" });
  } else if (e.target.matches("#desktop-search-icon")) {
    const searchTerm = encodeURIComponent(desktopSearchBar.value);
    window.location.href = `results.html?term=${searchTerm}`;
  } else if (e.target.matches("#nav-search-icon")) {
    const searchTerm = encodeURIComponent(navSearchBar.value);
    window.location.href = `results.html?term=${searchTerm}`;
  } else if (e.target.matches("#arrow-back > img")) {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = "index.html";
    }
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const pagePath = window.location.pathname;
  const fileName = pagePath.split("/").pop();

  if (fileName === "results.html") {
    const params = new URLSearchParams(window.location.search);
    const term = params.get("term") || "";
    if (term) {
      combinedAllResults = [];
      currentOffset = 0;
      featuredLineup.innerHTML = "";
      searchDatabase(term);
    }
  }
});

document.addEventListener("mouseover", (e) => {
  if (e.target.matches("#desktop-menu #nav-item > h2")) {
    const thisArrow = e.target.nextElementSibling;
    const thisDropdown = thisArrow.parentElement.nextElementSibling;
    toggleDesktopDropdown(thisArrow, thisDropdown);
  }
});

document.addEventListener("mouseout", (e) => {
  if (e.target.matches("#desktop-dropdown-container")) {
    const thisArrow =
      e.target.parentElement.firstChild.firstChild.nextElementSibling;
    const thisDropdown = e.target;
    toggleDesktopDropdown(thisArrow, thisDropdown);
  }
});

document.addEventListener("keydown", (e) => {
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
      currentOffset = 0;
      featuredLineup.innerHTML = "";
      loadMoreBtn.style.display = "none";
      featuredLineupHeader.innerHTML = "<h1>Search results</h1>";
      searchDatabase(lineupSearchBar.value);
      if (mapCardItemImg)
        mapCardItemImg.scrollIntoView({ behavior: "smooth", block: "end" });
    } else if (e.target.matches("#desktop-search-bar")) {
      const searchTerm = encodeURIComponent(desktopSearchBar.value);
      window.location.href = `results.html?term=${searchTerm}`;
    } else if (e.target.matches("#nav-search-bar")) {
      const searchTerm = encodeURIComponent(navSearchBar.value);
      window.location.href = `results.html?term=${searchTerm}`;
    } else if (e.target === loadMoreBtn) {
      currentOffset += resultsPerPage;
      searchDatabase(lineupSearchBar.value);
    } else if (e.target.matches("#arrow-back")) {
      if (window.history.length > 1) {
        window.history.back();
      } else {
        window.location.href = "index.html";
      }
    }
  }
});

document.addEventListener("focusin", (e) => {
  if (e.target.matches("#nav-search-bar") || e.target === lineupSearchBar) {
    e.target.nextElementSibling.style.display = "inline-block";
    e.target.style.width = "min(72vw, 475px)";
  } else if (e.target.matches("#desktop-search-bar")) {
    e.target.nextElementSibling.style.display = "inline-block";
  }
});

document.addEventListener("focusout", (e) => {
  if (
    e.target.matches("#nav-search-bar") ||
    (e.target === lineupSearchBar && e.target.value === "")
  ) {
    e.target.nextElementSibling.style.display = "none";
    e.target.style.width = "min(80vw, 500px)";
  } else if (e.target.matches("#desktop-search-bar") && e.target.value === "") {
    e.target.nextElementSibling.style.display = "none";
  }
});

// filter functionality

function setUpFilters() {
  filterMenu.innerHTML = generateFilters();
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
            </div>`;
}

function determineFilterOptions() {
  const pagePath = window.location.pathname;
  if (
    ["studios.html", "studiomap.html"].some((page) => pagePath.includes(page))
  ) {
    return ["Apparatus", "Features", "Location"];
  } else if (pagePath.includes("coaches.html")) {
    return ["Apparatus", "Details", "Style"];
  } else if (
    ["performers.html", "collectives.html"].some((page) =>
      pagePath.includes(page)
    )
  ) {
    return ["Apparatus", "Identifiers", "Style"];
  } else if (
    ["competitions.html", "retreats.html"].some((page) =>
      pagePath.includes(page)
    )
  ) {
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
  } else if (
    [
      "hoop.html",
      "silks.html",
      "trapeze.html",
      "hammock.html",
      "pole.html",
      "straps.html",
      "rope.html",
      "hairhang.html",
      "otherskills.html",
    ].some((page) => pagePath.includes(page))
  ) {
    return ["Resource type", null, null];
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
      filter.nextElementSibling.style.display = "none";
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
      Apparatus: [
        "Hoop/lyra",
        "Silks",
        "Trapeze",
        "Hammock/sling",
        "Pole",
        "Straps",
        "Rope",
        "Specialty apparatus",
      ],
      Features: [
        "Accessible",
        "Gender-inclusive",
        "Queer-friendly",
        "POC-owned",
        "Sex work-positive",
        "Open training",
      ],
      Location: [
        "Europe",
        "North America",
        "Latin America",
        "Asia",
        "Oceania",
        "Africa",
      ],
      When: [
        "This week",
        "This month",
        "This year",
        "Next year",
        "Other dates",
      ],
      Identifiers: ["Queer", "POC", "Disabled", "Sex work-positive"],
      Details: [
        "Queer",
        "POC",
        "Disabled",
        "Sex work-positive",
        "Certified",
        "Online",
      ],
      Style: ["Classic", "Sensual", "Dynamic", "Lyrical", "Comedic"],
      Type: [
        "Physiotherapy",
        "Flexibility",
        "Mental health",
        "Other health resources",
      ],
      Kind: ["Photography", "Videography"],
      Category: ["Art", "Games", "Music", "Communities"],
      "Clothing type": ["Aerial", "Pole", "Performance", "Custom"],
      "Heel style": ["Sandals", "Boots", "Specialty", "Custom"],
      "Equipment type": ["Rigs", "Accessories", "Grip", "Custom"],
      "Event type": [
        "Workshop",
        "Performance",
        "Seminar",
        "Retreat",
        "Festival",
        "Competition",
        "Health",
        "Open call",
        "Arts",
        "Social",
        "Online",
      ],
      "Resource type": [
        "Videos",
        "Skill directories",
        "Online platforms",
        "Apps",
        "Books",
        "Free",
        "Paid",
      ],
      "I'm looking for...": [
        "Studios",
        "Training resources",
        "Brands",
        "Events",
        "Other resources",
      ],
    };

    function generateFilterContent(filterKey, filterExpanded) {
      filterExpanded.innerHTML = "";
      const expandedFilterContainer = document.createElement("div");
      expandedFilterContainer.classList.add("filter-container");

      if (filterContent[filterKey]) {
        filterContent[filterKey].forEach((option) => {
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
  filterButton.addEventListener("click", () =>
    toggleFilterMenu(arrow, filterExpanded, filterKey)
  );
  arrow.addEventListener("click", () =>
    toggleFilterMenu(arrow, filterExpanded, filterKey)
  );
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

// menu state for back button

window.addEventListener("pageshow", (e) => {
  mobileMenu.style.display = "none";
  headerContainer.style.display = "flex";
  main.style.display = "flex";
  if (aboutMain) aboutMain.style.display = "grid";
  footer.style.display = "flex";

  const mobileArrows = document.querySelectorAll(
    "#mobile-menu #nav-link-arrow"
  );
  const mobileDropDowns = document.querySelectorAll(
    "#mobile-menu #dropdown-container"
  );
  mobileArrows.forEach((arrow) => (arrow.src = "assets/triangle-down.svg"));
  mobileDropDowns.forEach((dropdown) => (dropdown.style.visibility = "hidden"));
  mobileDropDowns.forEach((dropdown) => (dropdown.style.height = "0"));
  mobileDropDowns.forEach((dropdown) => (dropdown.style.margin = "0"));

  const allDesktopDropdowns = document.querySelectorAll(
    "#desktop-dropdown-container"
  );
  allDesktopDropdowns.forEach((dropdown) => (dropdown.style.display = "none"));

  const allDesktopArrows = document.querySelectorAll(
    "#desktop-menu #nav-link-arrow"
  );
  allDesktopArrows.forEach((arrow) => (arrow.src = "assets/triangle-down.svg"));
});
