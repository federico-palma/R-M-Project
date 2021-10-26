const baseApiURL = 'https://rickandmortyapi.com/api/character';
let apiData;

// Function fetches API.
async function getAPI(url) {
    let response = await fetch(url);
    let data = await response.json();
    
    apiData = await data;
}
getAPI(baseApiURL);

console.log(apiData);
setTimeout(function() {console.log(apiData)}, 100);


let loadingElements = document.getElementById('loading');
// Functions add and remove loading animation.
function showLoading() {
    loadingElements.classList.add('show');
};

function hideLoading() {
    loadingElements.classList.remove('show')
};


let cardTable = document.getElementById('card-table');
// Function creates new Character Card elements & sets classes. Returns list with new elements.
function createCardElements() {
    let newCharCardDiv = document.createElement('div');
    newCharCardDiv.className = 'char-card';
    let newCharImg = document.createElement('img');
    newCharImg.className = 'char-img';
    let newCharName = document.createElement('h2');
    newCharName.className = 'char-name';

    newCharCardDiv.appendChild(newCharImg);
    newCharCardDiv.appendChild(newCharName);

    return [newCharCardDiv, newCharImg, newCharName];
};

// Function sets content for newly created Character Cards and appends new card to table.
function setCharContent() {
    if (apiData.info.next !== null) {
        for (let i = 0; i < apiData.results.length; i++) {
            let cardElements = createCardElements()

            cardElements[1].src = apiData.results[i].image;
            cardElements[2].innerText = apiData.results[i].name;
            cardTable.appendChild(cardElements[0]);
        }
        apiData = getAPI(apiData.info.next);
    } else {
        console.log('All characters loaded.')
    }
}

setTimeout(() => setCharContent(), 100);



// Event listener for infinte scrolling and loading animation.
window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight && apiData.info.next !== null) {
        
        showLoading();
        setTimeout(setCharContent, 1000);
        setTimeout(function() {hideLoading()}, 1000);
    }
});



