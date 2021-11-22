const baseApiUrl = 'https://rickandmortyapi.com/api/character';
let apiData;
let charApiData;
let cardTable = document.getElementById('card-table');
let message = document.getElementById('message');

// Function resets the cardtable.
function resetCardTable() {
    window.scrollTo(0, 0);
    while (cardTable.firstChild) {
        cardTable.removeChild(cardTable.lastChild);
    }
}

// Functions add and remove loading animation.
let loadingAnimElements = document.getElementById('loading');

function showLoading() {
    loadingAnimElements.style.opacity = 1;
};

function hideLoading() {
    loadingAnimElements.style.opacity = 0;
};

// Function fetches API, returns data in json format.
async function fetchApi(url) {
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    return data;
};

// Function creates new Character Card elements & sets classes. Returns list with new elements.
function createCardElements() {
    let newCharCardDiv = document.createElement('div');
    newCharCardDiv.className = 'char-card';
    let newCharImg = document.createElement('img');
    newCharImg.className = 'char-img';
    let newCharName = document.createElement('h2');
    newCharName.className = 'char-name';
    let newCharIdNum = document.createElement('p');
    newCharIdNum.className = 'char-id';

    newCharCardDiv.appendChild(newCharImg);
    newCharCardDiv.appendChild(newCharName);
    newCharCardDiv.appendChild(newCharIdNum);

    return [newCharCardDiv, newCharImg, newCharName, newCharIdNum];
};

// Function calls createCardElements(), sets content on them and appends them to card table.
async function setCharContent(apiUrl) {
    message.innerHTML = ''
    showLoading()
    apiData = await fetchApi(apiUrl);
    let counter = 0
    let cardList = []
    
    if (apiData !== null) {
        for (let i = 0; i < apiData.results.length; i++) {
            let cardElements = createCardElements()

            cardElements[1].src = apiData.results[i].image;
            cardElements[2].innerText = apiData.results[i].name;
            cardElements[3].innerText = apiData.results[i].id;
            
            // Set Event listener for detail card pop up.
            cardElements[0].addEventListener('click', () => {
                showDetailsCard(cardElements[3].innerText, cardElements[1].style.boxShadow);
            });
               
            // Modify border based on gender of character
            switch (apiData.results[i].gender) {
                case 'Male':
                    cardElements[1].style.boxShadow = '0px 0px 5px 5px #1512da'
                    break;
                case 'Female':
                    cardElements[1].style.boxShadow = '0px 0px 5px 5px #da122d'
                    break;
                case 'Genderless':
                    cardElements[1].style.boxShadow = '0px 0px 5px 5px #ee7b22'
                    break;
                case 'unknown':
                    cardElements[1].style.boxShadow = '0px 0px 5px 5px #4ecf27'
                    break;
                default:
                    cardElements[1].style.boxShadow = '0px 0px 5px 5px #f60fe3'
                    break;
            }
            
            // Checks that Img has loaded before appending
            cardElements[1].addEventListener('load', () => {
                counter ++
                cardList.push(cardElements[0])
                
                if (counter == apiData.results.length) {
                    cardList.sort((a, b) => {
                        return a.lastElementChild.textContent - b.lastElementChild.textContent;
                    });

                    for (const card of cardList) {
                        cardTable.appendChild(card);
                    }
                    hideLoading();
                }
            });
        }
    } else {
        console.log('API Data not loaded');
        hideLoading();
    }
}

// Set initial cards.
setCharContent(baseApiUrl)

// Details card code.
let detailsCard = document.querySelector('.card-detail');

async function showDetailsCard(charID, borderColor) {
    charApiData = await fetchApi(baseApiUrl + '/' + charID)
    detailsCard.classList.add('show-detail-card')

    document.getElementById('char-id-detail').innerText = charID;
    document.getElementById('char-img-detail').src = charApiData.image;
    document.getElementById('char-img-detail').style.boxShadow = borderColor
    document.getElementById("char-name-detail").innerText = charApiData.name;
    document.getElementById("char-gender-detail").innerText = charApiData.gender;
    document.getElementById("char-species-detail").innerText = charApiData.species;
    document.getElementById("char-origin-detail").innerText = charApiData.origin.name;
    document.getElementById("char-location-detail").innerText = charApiData.location.name;
    document.getElementById("char-status-detail").innerText = charApiData.status;
}

// Close details card.
let closeBtn = document.getElementById('close-btn');
closeBtn.addEventListener('click', () => {
    detailsCard.classList.remove('show-detail-card')
});

// Show all characters button.
let allCharBtn = document.getElementById('allCharBtn');
allCharBtn.addEventListener('click', showAllChar);
function showAllChar() {
    resetCardTable();
    setCharContent(baseApiUrl);
}

// Search feature.
// Searching filters.
let filtersTab = document.querySelector('.filters-tab');
let filtersBtn = document.getElementById('show-filter-btn');
let filterArrow = document.getElementById('filter-arrow');

let statusFilter = '';
let statusSelect = document.getElementById('status-select');
statusSelect.onchange = () => {statusFilter = statusSelect.value};

let speciesFilter = '';
let speciesSelect = document.getElementById('species-select');
speciesSelect.onchange = () => {speciesFilter = speciesSelect.value};

let genderFilter = '';
let genderSelect = document.getElementById('gender-select');
genderSelect.onchange = () => {genderFilter = genderSelect.value};

// Reset filters button.
let resetFilterBtn = document.getElementById('reset-filter-btn');
resetFilterBtn.addEventListener('click', () => {
    searchInput.value = '';
    statusFilter = '';
    statusSelect.value = '';
    speciesFilter = '';
    speciesSelect.value = '';
    genderFilter = '';
    genderSelect.value = '';
});

// Event Listener to show search filters.
filtersBtn.addEventListener('click', () => {
    if (filterArrow.classList[1] == 'down') {
        filterArrow.classList.remove('down')
        filterArrow.classList.add('up')
        filtersTab.classList.add('show-filter-tab');
        filtersBtn.childNodes[0].textContent = 'Hide filters';
    } else {
        filterArrow.classList.remove('up')
        filterArrow.classList.add('down')
        filtersTab.classList.remove('show-filter-tab');
        filtersBtn.childNodes[0].textContent = 'Show filters';
    }
});

// Function takes searchbar input, and calls setCharContent() to fetch and post filtered character by name.
async function searchFilterChar(input) {
    let filteredUrl = baseApiUrl + '/?'

    let lowerCaseInput = input.toLowerCase();
    if (searchInput.value != '') {
        filteredUrl += 'name=' + lowerCaseInput;
    }
    if (statusFilter != '') {
        filteredUrl += '&status=' + statusFilter;
    }
    if (speciesFilter != '') {
        filteredUrl += '&species=' + speciesFilter;
    }
    if (genderFilter != '') {
        filteredUrl += '&gender=' + genderFilter;
    }

    let filteredApiData = await fetchApi(filteredUrl);
    console.log(filteredUrl)

    if (filteredApiData['error'] == 'There is nothing here') {
        message.innerHTML = "There's no character with the name: '" + input + "'";
    } else {
        setCharContent(filteredUrl);
    }
}

// Search on input function.
let searchInput = document.getElementById('search-input')
let timer;
searchInput.addEventListener('keyup', searchOnInput);

function searchOnInput() {
    showLoading();
    clearTimeout(timer);
    timer = setTimeout(searchFunctions, 1500);
};

function searchFunctions() {
    resetCardTable();
    searchFilterChar(searchInput.value);
};

// Event listener for infinte scrolling.
window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight && apiData.info.next !== null) {
        setCharContent(apiData.info.next);

    } else if (scrollTop + clientHeight >= scrollHeight && apiData.info.next == null){
        console.log('All characters loaded.')
    }
});

// Test function to add time to a task
function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}
