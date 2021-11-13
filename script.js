const baseApiUrl = 'https://rickandmortyapi.com/api/character';
let apiData;
let charApiData;
let cardTable = document.getElementById('card-table');

// Function resets the cardtable.
function resetCardTable() {
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
                // sleep(100)
                counter ++
                cardList.push(cardElements[0])
                
                if (counter == apiData.results.length) {
                    cardList.sort((a, b) => {
                        console.log(a.lastElementChild.textContent)
                        console.log(b.lastElementChild.textContent)
                        a.lastElementChild.textContent - b.lastElementChild.textContent
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
    }
<<<<<<< HEAD

    // test
    return 1
}

// Test function waits for content to be loaded, while showing and hiding loading animation.
// function loadNewContent() {
//     let test = setCharContent(apiData.info.next)
//     sleep(2000);
//     while (test == 0) {

//     }
    

// }
=======
}
>>>>>>> main

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

// Event listener for infinte scrolling.
window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight && apiData.info.next !== null) {
        setCharContent(apiData.info.next);

    } else if (scrollTop + clientHeight >= scrollHeight && apiData.info.next == null){
        console.log('All characters loaded.')
    }
});

// Search function
let searchInput = document.getElementById('search-bar')
let searchBtn = document.getElementById('search-btn')

searchBtn.addEventListener('click', () => {
    resetCardTable();
    
})



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

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}
