/*
 * Create a list that holds all of your cards
 */
var cards = document.getElementsByClassName("card");
var openCards = [];
var defualtMatchCards = document.getElementsByClassName("match");
var matchedCards = Array.from(defualtMatchCards);
var score = 0;


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


 function restartGame(){
    score = 0;
    for (var i=0; i < cards.length; i++) {
        cards[i].classList.remove("match", "open", "show");
    }
    shuffle(cards);
 }

for (var i=0; i < cards.length; i++) {
    cards[i].onclick = function(){
        this.setAttribute("class", "card open show");
        if(openCards.length == 0){
            openCards.push(this); 
        } else {
            matchCards(this);  
        }
    }
};

function matchCards(clickedCard){
    var prevCard = openCards[0].lastElementChild.classList[1];
    var currentCard = clickedCard.lastElementChild.classList[1];
    if(prevCard === currentCard){
        openCards[0].classList.remove("open", "show");
        openCards[0].classList.add("match");
        clickedCard.classList.remove("open", "show");
        clickedCard.classList.add("match");
        matchedCards.push(openCards[0],clickedCard);
        openCards = [];
        score = score + 1;
        console.log(matchedCards);
    } else {
        
        openCards[0].classList.remove("open", "show");
        clickedCard.classList.remove("open", "show");
        openCards = [];
    }
    checkWinStatus();
}

function checkWinStatus(){
        if((matchedCards.length == 16) && (score >= 7)){
            
        } else {
        
        }  
}



