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
const allFilterCheckboxes = document.querySelectorAll('input[type="checkbox"]');

// format date

function formatDate(dateString) {
  if (!dateString) return ""; // Handle cases where the date is null or undefined
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

// database

const supabaseUrl = "https://rziqmzomrmxklxsrsnpx.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6aXFtem9tcm14a2x4c3JzbnB4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk1MTQyNTQsImV4cCI6MjA1NTA5MDI1NH0.Iw9CPRmNSzoANbIuTAp4RoZAaq9M3BSxIreuqTBpKMc";

const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

const resultsPerPage = 12;
let currentOffset = 0;
let totalResults = 0;
let combinedAllResults = [];

const pagePath = window.location.pathname;
const fileName = pagePath.split("/").pop();
const baseName = fileName.replace(/\.[^/.]+$/, "");

async function getTableColumns(tableName) {
  if (tableColumnsMap[tableName]) {
    return tableColumnsMap[tableName];
  } else {
    console.error(`No column map found for table ${tableName}`);
    return [];
  }
}

async function searchWholeDatabase(term) {
  const rangeStart = currentOffset;
  const rangeEnd = rangeStart + resultsPerPage - 1;

  const tableMap = {
    studios: "studios",
    studiomap: "studios",
    coaches: "people",
    performers: "people",
    clothing: "clothing",
    collectives: "troupes",
    equipment: "equipment",
    health: "physio",
    photography: "photography",
    pole: "pole",
    otherresources: "others",
    retreats: "retreats",
    festivals: "festivals",
  };

  const tableName = tableMap[baseName];

  const columns = await getTableColumns(tableName);

  const selectColumns = columns.filter((col) =>
    [
      "name",
      "address",
      "city",
      "country",
      "continent",
      "instagram",
      "website",
      "type",
      "apparatus",
      "coach",
      "performer",
      "exact",
      "image",
    ].includes(col)
  );

  if (baseName === "results") {
    if (combinedAllResults.length === 0) {
      const tables = [
        "studios",
        "people",
        "clothing",
        "equipment",
        "photography",
        "physio",
        "troupes",
        "venues",
        "others",
        "pole",
        "retreats",
        "festivals",
        "venues",
      ];

      for (const table of tables) {
        const tableColumns = await getTableColumns(table);

        const tableSelectColumns = tableColumns.filter((col) =>
          [
            "name",
            "address",
            "city",
            "country",
            "continent",
            "instagram",
            "website",
            "type",
            "apparatus",
            "coach",
            "performer",
            "exact",
            "image",
          ].includes(col)
        );

        const supabaseQuery = supabase
          .from(table)
          .select(tableSelectColumns.join(","), { count: "exact" })
          .or(
            tableColumns
              .filter((col) =>
                [
                  "name",
                  "address",
                  "city",
                  "country",
                  "continent",
                  "instagram",
                  "type",
                  "apparatus",
                ].includes(col)
              )
              .map((col) => `${col}.ilike.%${term}%`)
              .join(",")
          )
          .order("name", { ascending: true });

        const { data, error } = await supabaseQuery;
        if (error) {
          console.error(`Error querying ${table}:`, error.message);
          continue;
        }

        combinedAllResults = combinedAllResults.concat(
          data.map((item) => ({
            ...item,
            source: table,
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
        const sourceMap = {
          people: (item) => (item.coach === true ? "Coach" : "Performer"),
          studios: () => "Studio",
          clothing: () => "Clothing",
          equipment: () => "Equipment",
          photography: () => "Photo & video",
          physio: () => "Physio & flexy",
          troupes: () => "Collective",
          venues: () => "Venue",
          others: () => "Others",
          pole: () => "Pole",
          retreats: () => "Retreat",
          festivals: () => "Festival",
        };

        featuredLineup.innerHTML += `<article class="lineup-item">
            ${
              item.image && item.image !== "null" && item.image !== "undefined"
                ? `<img class="lineup-item-img" src="${item.image}" alt=""></div>`
                : `<div class="lineup-item-background" alt=""><h2 class="image-text">${item.name}</h2></div>`
            }
            <div class="lineup-info-box">
                <p class="lineup-info-category">${
                  sourceMap[item.source]
                    ? sourceMap[item.source](item)
                    : item.source
                }</p>
                <div class="lineup-title-icon">
                    <h2 class="lineup-title" id="lineup-title" data-name="${
                      item.name
                    }" data-city="${item.city}" data-country="${
          item.country
        }" data-address="${item.address}" data-image="${
          item.image
        }" data-instagram="${item.instagram}" data-website="${item.website}" data-start="${item.start}" data-end="${item.end}">${
          item.name
        }</h2>
                    <button class="heart-icon" id="heart-icon"><img src="assets/heart-outline.svg" alt="Like"></button>
                </div>
                <p class="lineup-info-text">${
                  item.city
                    ? `${item.city}, ${item.country}`
                    : item.country
                    ? item.country
                    : ""
                }</p>
                <p class="lineup-info-dates">${
                  item.start && item.end
                  ? formatDate(item.start) === formatDate(item.end)
                  ? formatDate(item.start)
                  : `${formatDate(item.start)} – ${formatDate(item.end)}`
                  : ""
                }
                </p>
                <div class="item-tags-group">
                ${
                  item.apparatus
                    ? item.apparatus
                        .split(",")
                        .map(
                          (apparatus) =>
                            `<button class="item-tag">${apparatus.trim()}</button>`
                        )
                        .join("")
                    : item.type
                    ? item.type
                        .split(",")
                        .map(
                          (type) =>
                            `<button class="item-tag">${type.trim()}</button>`
                        )
                        .join("")
                    : `<button class="item-tag">Tag</button>`
                }
            </div>
            </div>
        </article>`;
      });
    }
  }

  if (currentOffset + resultsPerPage >= totalResults) {
    loadMoreBtn.style.display = "none";
  } else {
    loadMoreBtn.style.display = "block";
  }
}

const allContinents = [
  "Europe",
  "North America",
  "Latin America",
  "Asia",
  "Oceania",
  "Africa",
];

const tableColumnsMap = {
  studios: [
    "name",
    "address",
    "city",
    "country",
    "continent",
    "instagram",
    "website",
    "apparatus",
    "exact",
    "image",
  ],
  people: [
    "name",
    "country",
    "continent",
    "apparatus",
    "instagram",
    "coach",
    "performer",
    "image",
  ],
  clothing: [
    "name",
    "country",
    "continent",
    "type",
    "instagram",
    "website",
    "image",
  ],
  equipment: [
    "name",
    "country",
    "continent",
    "type",
    "instagram",
    "website",
    "image",
  ],
  photography: [
    "name",
    "country",
    "continent",
    "type",
    "instagram",
    "website",
    "image",
  ],
  physio: [
    "name",
    "country",
    "continent",
    "type",
    "instagram",
    "website",
    "image",
  ],
  troupes: [
    "name",
    "country",
    "continent",
    "apparatus",
    "instagram",
    "website",
    "image",
  ],
  venues: [
    "name",
    "address",
    "city",
    "country",
    "continent",
    "instagram",
    "website",
    "image",
  ],
  others: ["name", "type", "instagram", "website", "image"],
  pole: ["name", "type", "instagram", "website", "image"],
  retreats: [
    "name",
    "country",
    "continent",
    "apparatus",
    "instagram",
    "website",
    "image",
    "start",
    "end",
  ],
  festivals: [
    "name",
    "city",
    "country",
    "continent",
    "instagram",
    "website",
    "image",
    "start",
    "end",
    "apparatus",
  ],
};

async function searchFilteredDatabase(filters) {
  const { searchTerm, continents, apparatus, type, when } = filters;

  const rangeStart = currentOffset;
  const rangeEnd = rangeStart + resultsPerPage - 1;

  const tableMap = {
    studios: "studios",
    studiomap: "studios",
    coaches: "people",
    performers: "people",
    clothing: "clothing",
    collectives: "troupes",
    equipment: "equipment",
    health: "physio",
    photography: "photography",
    pole: "pole",
    otherresources: "others",
    retreats: "retreats",
    festivals: "festivals",
  };

  const tableName = tableMap[baseName];

  const columns = await getTableColumns(tableName);

  const selectColumns = columns.filter((col) =>
    [
      "name",
      "address",
      "city",
      "country",
      "continent",
      "instagram",
      "website",
      "type",
      "apparatus",
      "coach",
      "performer",
      "exact",
      "image",
      "start",
      "end",
    ].includes(col)
  );

  let orFilters = "";
  if (searchTerm.trim() !== "") {
    orFilters = columns
      .filter((col) =>
        [
          "name",
          "address",
          "city",
          "country",
          "continent",
          "instagram",
          "type",
          "apparatus",
        ].includes(col)
      )
      .map((col) => `${col}.ilike.%${searchTerm}%`)
      .join(",");
  }

  const supabaseQuery = supabase
    .from(tableName)
    .select(selectColumns.join(","), { count: "exact" })
    .range(rangeStart, rangeEnd)
    .in("continent", continents)
    .order("name", { ascending: true });

  if (apparatus.length > 0) {
    const apparatusFilters = apparatus
      .map((item) => `apparatus.ilike.%${item}%`)
      .join(",");
    supabaseQuery.or(apparatusFilters);
  }

  if (type.length > 0) {
    const typeFilters = type.map((item) => `type.ilike.%${item}%`).join(",");
    supabaseQuery.or(typeFilters);
  }

  if (when.length > 0) {
    const today = new Date();
    const dateRanges = {
      "This month": {
        start: new Date(today.getFullYear(), today.getMonth(), 1), // Start of the month
        end: new Date(today.getFullYear(), today.getMonth() + 1, 0), // End of the month
      },
      "This year": {
        start: new Date(today.getFullYear(), 0, 1), // Start of the year
        end: new Date(today.getFullYear(), 11, 31), // End of the year
      },
      "Next year": {
        start: new Date(today.getFullYear() + 1, 0, 1), // Start of next year
        end: new Date(today.getFullYear() + 1, 11, 31), // End of next year
      },
      "Past dates": {
        start: new Date(0), // Arbitrary start date (e.g., epoch)
        end: new Date(), // Current date
      },
    };

    const whenFilters = when
      .map((item) => {
        const range = dateRanges[item];
        if (range) {
          const startDate = range.start.toISOString().split("T")[0];
          const endDate = range.end.toISOString().split("T")[0];
          const startFilter = `start.lte.${endDate}`;
          const endFilter = `end.gte.${startDate}`;
          return `(${startFilter}&${endFilter})`;
        }
        return null;
      })
      .filter(Boolean)
      .join(",");

      if (when.length === 1) {
        const range = dateRanges[when[0]];
        if (range) {
          const startDate = range.start.toISOString().split("T")[0];
          const endDate = range.end.toISOString().split("T")[0];
          supabaseQuery
            .lte("start", endDate)
            .gte("end", startDate);
        }
      }

  }

  if (baseName === "coaches") {
    supabaseQuery.eq("coach", true);
  } else if (baseName === "performers") {
    supabaseQuery.eq("performer", true);
  }

  if (orFilters) {
    supabaseQuery.or(orFilters);
  }

  const { data, error, count } = await supabaseQuery;

  if (error || count === 0) {
    totalResults = 0;
    featuredLineup.textContent = "No results were found";
    loadMoreBtn.style.display = "none";
  } else {
    totalResults = count;
    filterMenu.style.display = "flex";

    data.forEach((item) => {
      console.log(item);
      featuredLineup.innerHTML += `<article class="lineup-item">
            ${
              item.image && item.image !== "null" && item.image !== "undefined"
                ? `<img class="lineup-item-img" src="${item.image}" alt=""></div>`
                : `<div class="lineup-item-background" alt=""><h2 class="image-text">${item.name}</h2></div>`
            }
            <div class="lineup-info-box">
                <div class="lineup-title-icon">
                    <h2 class="lineup-title" id="lineup-title" data-name="${
                      item.name
                    }" data-city="${item.city}" data-country="${
        item.country
      }" data-address="${item.address}" data-image="${
        item.image
      }" data-instagram="${item.instagram}" data-website="${item.website}" data-start="${item.start}" data-end="${item.end}">${
        item.name
      }</h2>
                    <button class="heart-icon" id="heart-icon"><img src="assets/heart-outline.svg" alt="Like"></button>
                </div>
                <p class="lineup-info-text">${
                  item.city
                    ? `${item.city}, ${item.country}`
                    : item.country
                    ? item.country
                    : ""
                }</p>
                <p class="lineup-info-dates">${
                  item.start && item.end
                  ? formatDate(item.start) === formatDate(item.end)
                  ? formatDate(item.start)
                  : `${formatDate(item.start)} – ${formatDate(item.end)}`
                  : ""
                }
                </p>
                <div class="item-tags-group">
                ${
                  item.apparatus
                    ? item.apparatus
                        .split(",")
                        .map(
                          (apparatus) =>
                            `<button class="item-tag">${apparatus.trim()}</button>`
                        )
                        .join("")
                    : item.type
                    ? item.type
                        .split(",")
                        .map(
                          (type) =>
                            `<button class="item-tag">${type.trim()}</button>`
                        )
                        .join("")
                    : `<button class="item-tag">Tag</button>`
                }
            </div>
            </div>
        </article>`;
    });
  }

  if (currentOffset + resultsPerPage >= totalResults) {
    loadMoreBtn.style.display = "none";
  } else {
    loadMoreBtn.style.display = "block";
  }
}

if (lineupSearchBar) {
  const filters = getFilterCriteria();
  const { searchTerm, continents, apparatus, type, when } = filters;
  searchFilteredDatabase(filters);
  setUpFilters();
}

// supabase for home page

async function loadData(category) {
  const selectedScrollCards = document.querySelector(
    `#scroll-cards-${category}`
  );

  const tableMap = {
    studios: "studios",
    studiomap: "studios",
    coaches: "people",
    performers: "people",
    clothing: "clothing",
    collectives: "troupes",
    equipment: "equipment",
    health: "physio",
    photography: "photography",
    pole: "pole",
    otherresources: "others",
    retreats: "retreats",
    festivals: "festivals",
  };

  const tableName = tableMap[baseName];

  const columns = await getTableColumns(tableName);

  const selectColumns = columns.filter((col) =>
    [
      "name",
      "address",
      "city",
      "country",
      "continent",
      "instagram",
      "website",
      "type",
      "apparatus",
      "coach",
      "performer",
      "exact",
    ].includes(col)
  );

  if (selectedScrollCards) {
    const { data, error, count } = await supabase
      .from(category)
      .select(selectColumns.join(","), {
        count: "exact",
      })
      .range(0, 8)
      .order("name", { ascending: true });
    if (error || count === 0) {
      selectedScrollCards.textContent = "No results were found";
    } else {
      totalResults = count;
      data.forEach((item) => {
        console.log(item.apparatus, item.type);
        selectedScrollCards.innerHTML += `<article class="scroll-item">
            ${
              item.image && item.image !== "null" && item.image !== "undefined"
                ? `<img class="lineup-item-img" src="${item.image}" alt=""></div>`
                : `<div class="lineup-item-background" alt=""><h2 class="image-text">${item.name}</h2></div>`
            }
            <div class="lineup-info-box">
                <div class="lineup-title-icon">
                    <h2 class="lineup-title" id="lineup-title" data-name="${
                      item.name
                    }" data-city="${item.city}" data-country="${
          item.country
        }" data-address="${item.address}" data-image="${
          item.image
        }" data-instagram="${item.instagram}" data-website="${item.website}" data-start="${item.start}" data-end="${item.end}">${
          item.name
        }</h2>
                    <button class="heart-icon" id="heart-icon"><img src="assets/heart-outline.svg" alt="Like"></button>
                </div>
                <p class="lineup-info-text">${
                  item.city
                    ? `${item.city}, ${item.country}`
                    : item.country
                    ? item.country
                    : ""
                }</p>
                <p class="lineup-info-dates">${
                  item.start && item.end
                  ? formatDate(item.start) === formatDate(item.end)
                  ? formatDate(item.start)
                  : `${formatDate(item.start)} – ${formatDate(item.end)}`
                  : ""
                }
                </p>
                <div class="item-tags-group">
                ${
                  item.apparatus &&
                  typeof item.apparatus === "string" &&
                  item.apparatus.trim() !== ""
                    ? item.apparatus
                        .split(",")
                        .map(
                          (apparatus) =>
                            `<button class="item-tag">${apparatus.trim()}</button>`
                        )
                        .join("")
                    : item.type &&
                      typeof item.type === "string" &&
                      item.type.trim() !== ""
                    ? item.type
                        .split(",")
                        .map(
                          (type) =>
                            `<button class="item-tag">${type.trim()}</button>`
                        )
                        .join("")
                    : `<button class="item-tag">Tag</button>`
                }
            </div>
            </div>
        </article>`;
      });

      selectedScrollCards.innerHTML += `<div class="arrow-see-all-container">
                <a href="${category}.html" aria-label="Aerial and pole ${category}">
                    <img class="arrow-see-all" src="assets/chevron-right.svg" alt="See all">
                </a>
      </div>`;
    }
  }
}

if (
  window.location.href.endsWith("index.html") ||
  window.location.href.endsWith("/")
) {
  // loadData("events");
  loadData("studios");
  loadData("clothing");
}

if (window.location.href.includes("allresources.html")) {
  loadData("studios");
  loadData("people");
  loadData("people");
  loadData("collectives");
  loadData("retreats");
  loadData("competitions");
  loadData("festivals");
  loadData("health");
  loadData("photography");
  loadData("otherresources");
}

// modal toggle

document.addEventListener("click", (e) => {
  if (e.target.matches(".lineup-title")) {
    const modalItemName = e.target.dataset.name;
    const modalItemImage = e.target.dataset.image;
    const modalItemCity = e.target.dataset.city;
    const modalItemCountry = e.target.dataset.country;
    const modalItemAddress = e.target.dataset.address;
    const modelItemInstagram = e.target.dataset.instagram;
    const modelItemWebsite = e.target.dataset.website;
    const modalItemStart = e.target.dataset.start;
    const modalItemEnd = e.target.dataset.end;

    const instagramText =
      modelItemInstagram &&
      modelItemInstagram.split("/").filter(Boolean).pop() !== "null" &&
      modelItemInstagram.split("/").filter(Boolean).pop() !== "undefined"
        ? `<a href="${modelItemInstagram}" target="_blank" rel="noopener noreferrer">Instagram</a>`
        : "";

    const websiteText =
      modelItemWebsite &&
      modelItemWebsite.split("/").filter(Boolean).pop() !== "null" &&
      modelItemWebsite.split("/").filter(Boolean).pop() !== "undefined"
        ? `<a href="${modelItemWebsite}" target="_blank" rel="noopener noreferrer">Website</a>`
        : "";

    let modalLinksText;
    if (instagramText && websiteText) {
      modalLinksText = `${instagramText} | ${websiteText}`;
    } else if (instagramText) {
      modalLinksText = instagramText;
    } else if (websiteText) {
      modalLinksText = websiteText;
    } else {
      modalLinksText = "";
    }

    lineupItemModal.style.display = "flex";
    lineupItemModal.innerHTML = `<article class="lineup-item">
    ${
      modalItemImage &&
      modalItemImage !== "undefined" &&
      modalItemImage !== "null"
        ? `<img class="modal-item-img" src="${modalItemImage}" alt=""></div>`
        : `<div class="lineup-item-background" alt=""><h2 class="image-text">${modalItemName}</h2></div>`
    }
          <div class="lineup-info-box">
              <div class="lineup-title-icon">
                  <h2 class="modal-title" id="modal-title">${modalItemName}</h2>
                  <button class="heart-icon" id="heart-icon"><img src="assets/heart-outline.svg" alt="Like"></button>
              </div>
              <p class="modal-info-text">${
                modalItemCity !== "undefined"
                  ? `${modalItemCity}, ${modalItemCountry}`
                  : modalItemCountry !== "undefined"
                  ? modalItemCountry
                  : ""
              }</p>
              <p class="modal-info-dates">${
                modalItemStart !== "undefined" && modalItemEnd !== "undefined"
                  ? formatDate(modalItemStart) === formatDate(modalItemEnd)
                  ? formatDate(modalItemStart)
                  : `${formatDate(modalItemStart)} – ${formatDate(modalItemEnd)}`
                  : ""
                }
                </p>
              <p class="modal-info-text">${
                modalItemAddress !== "undefined" ? modalItemAddress : ""
              }</p>
              <p class="modal-info-text">${modalLinksText}</p>
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
      const filters = getFilterCriteria();
      const { searchTerm, continents, apparatus, type, when } = filters;
      searchFilteredDatabase(filters);
    } else if (window.location.href.includes("results.html")) {
      const params = new URLSearchParams(window.location.search);
      const searchTerm = params.get("term") || "";
      searchWholeDatabase(searchTerm);
    }
  } else if (e.target.matches("#lineup-search-icon")) {
    currentOffset = 0;
    featuredLineup.innerHTML = "";
    loadMoreBtn.style.display = "none";
    featuredLineupHeader.innerHTML = "<h1>Search results</h1>";
    const filters = getFilterCriteria();
    const { searchTerm, continents, apparatus } = filters;
    searchFilteredDatabase(filters);
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
      searchWholeDatabase(term);
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
      const filters = getFilterCriteria();
      const { searchTerm, continents, apparatus, type, when } = filters;
      searchFilteredDatabase(filters);
      setUpFilters();
      if (mapCardItemImg)
        mapCardItemImg.scrollIntoView({ behavior: "smooth", block: "end" });
    } else if (e.target.matches("#desktop-search-bar")) {
      const searchTerm = encodeURIComponent(desktopSearchBar.value);
      window.location.href = `results.html?term=${searchTerm}`;
    } else if (e.target.matches("#nav-search-bar")) {
      const searchTerm = encodeURIComponent(navSearchBar.value);
      window.location.href = `results.html?term=${searchTerm}`;
    } else if (e.target.matches("#load-more-btn")) {
      currentOffset += resultsPerPage;
      if (lineupSearchBar) {
        const filters = getFilterCriteria();
        const { searchTerm, continents, apparatus, type, when } = filters;
        searchFilteredDatabase(filters);
      } else if (window.location.href.includes("results.html")) {
        const params = new URLSearchParams(window.location.search);
        const searchTerm = params.get("term") || "";
        searchWholeDatabase(searchTerm);
      }
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

const filterState = {};

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
    return ["Apparatus", "Location", null];
  } else if (pagePath.includes("coaches.html")) {
    return ["Apparatus", "Location", null];
  } else if (
    ["performers.html", "collectives.html"].some((page) =>
      pagePath.includes(page)
    )
  ) {
    return ["Apparatus", "Location", null];
  } else if (
    ["competitions.html", "retreats.html"].some((page) =>
      pagePath.includes(page)
    )
  ) {
    return ["When", "Location", "Apparatus"];
  } else if (pagePath.includes("festivals.html")) {
    return ["When", "Location", "Apparatus"];
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
    return ["Category", "Location", null];
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

function getFilterCriteria() {
  const locationCheckboxes = document.querySelectorAll(
    'input[name="Location"]:checked'
  );
  const selectedContinents = Array.from(locationCheckboxes).map(
    (checkbox) => checkbox.value
  );

  const apparatusCheckboxes = document.querySelectorAll(
    'input[name="Apparatus"]:checked'
  );
  const selectedApparatus = Array.from(apparatusCheckboxes).map(
    (checkbox) => checkbox.value
  );

  const typeCheckboxes = [
    ...document.querySelectorAll('input[name="Equipment type"]:checked'),
    ...document.querySelectorAll('input[name="Clothing type"]:checked'),
    ...document.querySelectorAll('input[name="Kind"]:checked'),
    ...document.querySelectorAll('input[name="Type"]:checked'),
    ...document.querySelectorAll('input[name="Category"]:checked'),
    ...document.querySelectorAll('input[name="Resource type"]:checked'),
  ];

  const selectedType = typeCheckboxes.map((checkbox) => checkbox.value);

  const whenCheckboxes = document.querySelectorAll(
    'input[name="When"]:checked'
  );
  const selectedWhen = Array.from(whenCheckboxes).map(
    (checkbox) => checkbox.value
  );

  const searchTerm = lineupSearchBar ? lineupSearchBar.value : "";

  const continentsToQuery =
    selectedContinents.length > 0
      ? selectedContinents
      : [
          "Europe",
          "North America",
          "Latin America",
          "Asia",
          "Oceania",
          "Africa",
        ];

  return {
    searchTerm,
    continents: continentsToQuery,
    apparatus: selectedApparatus,
    type: selectedType,
    when: selectedWhen,
  };
}

function applyFilters() {
  const { searchTerm, continents, apparatus, type, when } = getFilterCriteria();

  currentOffset = 0;
  featuredLineup.innerHTML = "";

  searchFilteredDatabase({ searchTerm, continents, apparatus, type, when });
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
        "Hoop",
        "Silks",
        "Trapeze",
        "Hammock",
        "Pole",
        "Straps",
        "Rope",
        "Hair hang",
        "Specialty",
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
      When: ["This month", "This year", "Next year", "Past dates"],
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
      Category: ["Art", "Games", "Music", "Magazine", "Community", "Service"],
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
          checkbox.type = filterKey === "When" ? "radio" : "checkbox";
          checkbox.value = option;
          checkbox.name = filterKey;
          checkbox.checked = filterState[filterKey]?.includes(option) || false;

          checkbox.addEventListener("change", (e) => {
            if (filterKey === "When") {
              filterState[filterKey] = [option];
            } else {
            if (!filterState[filterKey]) {
              filterState[filterKey] = [];
            }
            if (e.target.checked) {
              filterState[filterKey].push(option);
            } else {
              filterState[filterKey] = filterState[filterKey].filter(
                (item) => item !== option
              );
            }
          }
            applyFilters();
          });

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
