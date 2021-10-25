const baseApiURL = 'https://rickandmortyapi.com/api/character';
let apiData;

// Function fetches API.
async function getAPI(url) {
    const response = await fetch(url);
    const data = await response.json();
    
    apiData = await data;
}
getAPI(baseApiURL);

console.log(apiData);
setTimeout(function() {console.log(apiData)}, 100);

// Functions add and remove loading animation.
let loadingElements = document.getElementById('loading');
function showLoading() {
    loadingElements.classList.add('show');
};

function hideLoading() {
    loadingElements.classList.remove('show')
};

// Function creates new Character Card elements and sets classes. 
let cardTable = document.getElementById('card-table');
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

// Function sets content for newly created Character Cards and appends card to .
function setCharContent() {
    let cardElements = createCardElements()

    cardElements[1].src = apiData.results[0].image;
    cardElements[2].innerText = apiData.results[0].name;
    cardTable.appendChild(cardElements[0]);
}





setTimeout(function() {
    document.getElementsByClassName('char-name')[0].innerText = apiData.results[0].name;
    document.getElementsByClassName('char-img')[0].src = apiData.results[0].image;
}, 100);



window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight) {

        showLoading();
        setTimeout(setCharContent, 1000);
    
    } else {
        hideLoading()
    }
});



