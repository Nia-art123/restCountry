const searchButton = document.getElementById("searchButton"); 
const countrySearchInput = document.getElementById("countrySearchInput");
const searchResultsContainer = document.getElementById("searchResultsContainer");
const regionDropdown = document.getElementById("regionDropdown");
let filterContainer = document.getElementById("filtersContainer");
let contentWrapper = document.getElementById("contentWrapper");
let darkModeToggle = document.getElementById("darkModeToggle");
let filterResult = document.getElementById("filterResult");

countrySearchInput.addEventListener("keydown", displayCountry);

function displayCountry() {
    searchResultsContainer.innerHTML = "";
    filterContainer.classList.add("hidden");
    searchResultsContainer.classList.remove("hidden");

    let searchValue = countrySearchInput.value;

    fetch(`https://restcountries.com/v3.1/name/${searchValue}`)
        .then(data => {
            if (data.status === 404) {
                return searchResultsContainer.innerText = "Country can't be found";
            } else {
                return data.json();
            }
        })
        .then(data => {
            const obj = data[0].currencies;

            const outerKeys = Object.keys(obj);
            const innerKeys = Object.keys(obj[outerKeys[0]]);
            const currency = obj[outerKeys[0]][innerKeys[0]];

            const obj3 = data[0].languages;
            const language = Object.values(obj3);

            let htmlContent = `
                <div class="searchResults">
                    <img src="${data[0].flags.svg}" />
                    <div class="textDiv">
                        <h3>${data[0].name.common}</h3>
                        <div class="details">
                            <div class="leftDetail">
                                <p>Population: ${data[0].population}</p>
                                <p>Region: ${data[0].region}</p>
                                <p>Sub Region: ${data[0].subregion}</p>
                                <p>Capital: ${data[0].capital}</p>
                            </div>
                            <div class="rightDetail">
                                <p>Top Level Domain: ${data[0].tld}</p>
                                <p>Currency: ${currency}</p>
                                <p>Language: ${language}</p>
                                <p>Borders Country: <span class="border" id="borderId">${data[0].borders}</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            searchResultsContainer.innerHTML += htmlContent;
        });
}

regionDropdown.addEventListener("change", () => {
    const dropDownValue = regionDropdown.value;
    searchResultsContainer.classList.add("hidden");
    filterContainer.classList.remove("hidden");
    filterContainer.innerHTML = '';

    fetch(`https://restcountries.com/v3.1/region/${dropDownValue}`)
        .then(data => data.json())
        .then(data => {
            console.log(data);

            data.forEach(element => {
                console.log(element);

                let htmlContent = `
                <div class="filterResult">
                    <img src="${element.flags.svg}" alt="${element.name.common} flag image"/>
                    <h4>${element.name.common}</h4>
                    <p>Population: ${element.population}</p>
                    <p>Region: ${element.region}</p>
                    <p>Capital: ${element.capital}</p>
                </div>
                `;

                filterContainer.innerHTML += htmlContent;
            });
        });
});

fetch("https://restcountries.com/v3.1/all")
    .then(data => data.json())
    .then(data => {
        data.forEach(element => {
            let htmlContent = `
            <div class="filterResult">
                <img src="${element.flags.svg}" alt="${element.name.common} flag image"/>
                <h4>${element.name.common}</h4>
                <p>Population: ${element.population}</p>
                <p>Region: ${element.region}</p>
                <p>Capital: ${element.capital}</p>
            </div>
            `;

            filterContainer.innerHTML += htmlContent;
        });
    });

darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("darkmode");
    filterResult.classList.toggle("whitemode");
});
