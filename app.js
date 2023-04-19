// create a grid of 12 cards
const cardArray = [
    {
        name: 'fries',
        img: 'img/fries.png'
    },
    {
        name: 'burger',
        img: 'img/burger.png'
    },
    {
        name: 'hotdog',
        img: 'img/hotdog.png'
    },
    {
        name: 'ice-cream',
        img: 'img/ice-cream.png'
    },
    {
        name: 'milkshake',
        img: 'img/milkshake.png'
    },
    {
        name: 'pizza',
        img: 'img/pizza.png'
    },
    {
        name: 'fries',
        img: 'img/fries.png'
    },
    {
        name: 'burger',
        img: 'img/burger.png'
    },
    {
        name: 'hotdog',
        img: 'img/hotdog.png'
    },
    {
        name: 'ice-cream',
        img: 'img/ice-cream.png'
    },
    {
        name: 'milkshake',
        img: 'img/milkshake.png'
    },
    {
        name: 'pizza',
        img: 'img/pizza.png'
    },
];

// shuffle the cards (sort randomly)
cardArray.sort(() => 0.5 - Math.random());

const grid = document.querySelector("#grid");
const result = document.querySelector("#result");
let cardsChosen = [];
let cardsChosenIds = [];
let cardsWon = [];

function createBoard () {
    // create an element for each item in the array
    for(let i = 0; i < cardArray.length; i++) {
        const card = document.createElement('img');
        card.setAttribute('src', 'img/blank.png');
        card.setAttribute('data-id', i);
        card.addEventListener("click", flipCard);
        grid.append(card);
    }
}

createBoard();

function checkMatch() {
    // get every single card on the grid
    const allCards = document.querySelectorAll("#grid img");
    const optionOneId = cardsChosenIds[0];
    const optionTwoId = cardsChosenIds[1];

    // if the user clicks the same image twice
    if(optionOneId == optionTwoId) {
        alert("You have clicked the same card!")
    }
    // get both of the items in the cardsChosen array and check if they match
    if (cardsChosen[0] === cardsChosen[1]) {
        alert("you found a match!");
        allCards[optionOneId].setAttribute("src", "img/white.png");
        allCards[optionTwoId].setAttribute("src", "img/white.png");
        allCards[optionOneId].removeEventListener("click", flipCard);
        allCards[optionTwoId].removeEventListener("click", flipCard);
        cardsWon.push([cardsChosen]);
    } else {
        // the two cards are not a match, flip them back over
        allCards[optionOneId].setAttribute("src", "img/blank.png");
        allCards[optionTwoId].setAttribute("src", "img/blank.png");
        alert("Sorry, try again.")
    }

    // update the score
    result.textContent = cardsWon.length;
    // empty the arrays so you can compare the next two cards
    cardsChosen = [];
    cardsChosenIds = [];

    if(cardsWon.length == (cardArray.length/2)) {
        result.textContent = "Congratulations you've found them all!";
    }
}

function flipCard() {
    // the this keyword will let us access whatever element we clicked and get its attribute
    const cardId = this.getAttribute("data-id");
    cardsChosen.push(cardArray[cardId].name);
    cardsChosenIds.push(cardId);
    // add the card's image
    this.setAttribute('src', cardArray[cardId].img)
    if(cardsChosen.length === 2) {
        // js method that calls a function after a certain amount of time is passed
        // first parameter is a function, second is time you want passed in milliseconds
        setTimeout(checkMatch, 500);
    }
}