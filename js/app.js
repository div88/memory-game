/*
 * Create a list that holds all of your cards
 */
var cards = document.getElementsByClassName("card");


var openCards = [];
var defualtMatchCards = document.getElementsByClassName("match");
var matchedCards = Array.from(defualtMatchCards);
var movesEl = document.getElementsByClassName("moves");
var stars = document.getElementsByClassName("stars");
var score = 0;
var moves = 0;



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

    cardsList = Array.from(cards);
    cardsList = cardsList.map(card => card.innerHTML);
    cardsList = shuffle(cardsList);

    for (var i=0; i < cards.length; i++) {
        cards[i].classList.remove("match", "open", "show");
        cards[i].innerHTML = cardsList[i];
    }
    
    clearTimer();
    updateMoves(0);
    updateRating(0);
    cardsList =  " ";
    matchedCards = [];
    
 }

for (var i=0; i < cards.length; i++) {
    cards[i].onclick = function(){
        this.setAttribute("class", "card open show");
        moves = moves + 1;
        if(moves === 1) {
            setTimer();
        }
        updateMoves(moves);
        if(openCards.length == 0){
            openCards.push(this); 
        } else {
            matchCards(this, moves);  
        }
    }
   
};

//When 2nd card is clicked
function updateMoves(movesCount){
    var movesEl = document.getElementsByClassName("moves");
    moves = movesCount;
    movesEl[0].textContent = movesCount;
    if(movesCount === 1) {
        movesEl[0].nextSibling.textContent = " Move";
    } else {
        movesEl[0].nextSibling.textContent = " Moves";
    }
}


//When 2nd card is clicked
function matchCards(clickedCard, movesCount){
    var prevCard = openCards[0].lastElementChild.classList[1];
    var currentCard = clickedCard.lastElementChild.classList[1];
    if(prevCard === currentCard){
        matchingCards(clickedCard);
        matchedCards.push(openCards[0],clickedCard);
        openCards = [];
        score = score + 1;
        updateRating(movesCount);
    } else {
        nonMatchingCards(openCards[0], clickedCard);
        openCards = [];
    }
    if((matchedCards.length == 16) && (score >= 7)){
        onWin();
    }  
}

//When 2 open cards dont match
function nonMatchingCards(prev, current){
    setTimeout(function(){
        prev.classList.remove("open", "show");
        current.classList.remove("open", "show");
    },800);
}

//When 2 open cards match
function matchingCards(currentCard){
    openCards[0].classList.remove("open", "show");
    openCards[0].classList.add("match");
    currentCard.classList.remove("open", "show");
    currentCard.classList.add("match");
}

//When all cards match and user wins
function onWin(){
    var timeTaken = document.getElementsByClassName("timer")[0].innerText;
    clearTimer();
    document.getElementById("rating").innerHTML = " 3 stars";
    document.getElementById("timeTaken").innerHTML = timeTaken;
    jQuery('#winModal').modal('show'); 
   
}

//To update star rating
function updateRating(movesCount){
    if(movesCount <= 20){
        for(var i=0;i<stars[0].children.length;i++){
            stars[0].children[i].children[0].classList.remove("fa-star-o");
        }
    } else if(movesCount >= 21 && movesCount <= 31){
        stars[0].children[2].children[0].classList.add("fa-star-o");
        
       
    } else if(movesCount >= 32) {
        stars[0].children[1].children[0].classList.add("fa-star-o");
        stars[0].children[2].children[0].classList.add("fa-star-o");
    }
}


//Timer function from https://stackoverflow.com/questions/5517597/plain-count-up-timer-in-javascript
var timer;
function setTimer(){
    var sec = 0;

    function pad(val) {
        return val > 9 ? val : "0" + val;
    }
    timer = setInterval(function () {
        document.getElementById("seconds").innerHTML = pad(++sec % 60);
        document.getElementById("minutes").innerHTML = pad(parseInt(sec / 60, 10));
    }, 1000);
    
}


function clearTimer(){
  clearInterval(timer);
  var initialValue = 00;
  document.getElementById("seconds").innerHTML = initialValue;
  document.getElementById("minutes").innerHTML = initialValue;
}


