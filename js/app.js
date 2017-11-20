/*
 * Create a list that holds all of your cards
 */
var openCards = [];
var totalOpenCards;
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

$('.fa-repeat').click(function () {
    $('ul').children().removeClass().addClass('card')
    var shuffledDeck = shuffle($('.deck').children('li')).toArray();
    $('ul.deck > li').remove();
    shuffledDeck.forEach(function (elem) {
        $('ul.deck').append(elem);
    });

    addActionsToCards();

});




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



// Add event listeners to cards
function addActionsToCards() {
    $('.card').click(function (event) {

        displayCard($(this));
        addItemToList($(this));
    });
}

// Validates current clicked card
// Process the opened cards
function validateCardMatchAndProcess(card) {
    // TODO: to be refactored for much easier comparision
    if (openCards[0].children()[0].className == openCards[1].children()[0].className) {

        // Freeze matched open cards
        openCards.forEach(function (elem) {
            elem.addClass('match');
        });
    }
    else {
        // reset
    
        openCards.forEach(function (elem) {
            elem.removeClass().addClass('card error');
            elem.effect('shake');
            setTimeout(function () {
                elem.removeClass().addClass('card');
            }, 1000);
        });
    }
    openCards = [];
}

// Add items to list and process validations
function addItemToList(card) {
    openCards.push(card);
    card.attr('disabled','disabled');

    // validate if first card exists
    if (openCards.length > 1) {
        validateCardMatchAndProcess();
    }
};

// Displays the card
function displayCard(card) {
    card.addClass('open show');
};

$(document).ready(function () {
    addActionsToCards();
});