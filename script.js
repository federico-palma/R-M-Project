const baseApiUrl = 'https://rickandmortyapi.com/api/character';
let apiData;
let charApiData;
let cardTable = document.getElementById('card-table');

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

// Function sets content for newly created Character Cards and appends new card to table.
async function setCharContent(apiUrl) {
    apiData = await fetchApi(apiUrl);

    if (apiData !== null) {
        for (let i = 0; i < apiData.results.length; i++) {
            let cardElements = createCardElements()

            cardElements[1].src = apiData.results[i].image;
            cardElements[2].innerText = apiData.results[i].name;
            cardElements[3].innerText = apiData.results[i].id;
            cardTable.appendChild(cardElements[0]);

            // Set Event listener for detail card pop up.
            cardElements[0].addEventListener('click', () => {
                showDetailsCard(cardElements[3].innerText);
            });
        }
    } else {
        console.log('API Data not loaded');
    }
}

// Set initial cards.
setCharContent(baseApiUrl);

// Details card code.
let detailsCard = document.querySelector('.card-detail');

async function showDetailsCard(charID) {
    charApiData = await fetchApi(baseApiUrl + '/' + charID)
    console.log(charApiData);
    detailsCard.style.visibility = 'visible';

    document.getElementById('char-id-detail').innerText = charID;
    document.getElementById('char-img-detail').src = charApiData.image;
    document.getElementById("char-name-detail").innerText = charApiData.name;
    document.getElementById("char-gender-detail").innerText = charApiData.gender;
    document.getElementById("char-origin-detail").innerText = charApiData.origin.name;
    document.getElementById("char-status-detail").innerText = charApiData.status;
}

// Close details card.
let closeBtn = document.getElementById('close-btn');
closeBtn.addEventListener('click', () => {
    detailsCard.style.visibility = 'hidden';
});

// Event listener for infinte scrolling and loading animation.
window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight && apiData.info.next !== null) {
        showLoading();
        setCharContent(apiData.info.next);
        hideLoading();
    } else if (scrollTop + clientHeight >= scrollHeight && apiData.info.next == null){
        console.log('All characters loaded.')
    }
});

// Functions add and remove loading animation.
let loadingAnimElements = document.getElementById('loading');
function showLoading() {
    loadingAnimElements.classList.add('show');
};

function hideLoading() {
    loadingAnimElements.classList.remove('show')
};



// Function to resize navbar 

// function scrollFunction() {
//     if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
//         document.getElementById("header-img").style.width = "100px";
//         document.getElementById("header").style.height = "60px";
//         document.getElementById("cts").classList.add("cts-anim-class");
//         if (screen.width < 635) {
//             document.getElementById("nav-bar").style.flexDirection = "row";
//         }
        
//     } else {
//         document.getElementById("header-img").style.width = "170px";
//         document.getElementById("header").style.height = "120px";
//         document.getElementById("cts").classList.remove("cts-anim-class");
//         if (screen.width < 635) {
//             document.getElementById("nav-bar").style.flexDirection = "column";
//         }
//     }
// }



