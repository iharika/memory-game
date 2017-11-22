/* Create a list that holds all of your cards
 */
// Global variables
var openCards = [];
var totalOpenCards = 0, moves = 0, stars = 0, t, d, newd, timerResult;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    'use strict';
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
/*  Function to reset the game
    Resets the moves, star and clears
    the opened cards list.
    Shows the start game modal pop up
*/
function resetGame() {
    'use strict';
    shuffleTheDeck();
    totalOpenCards = 0;
    resetMoves();
    resetStars();
    $('#startGameModal').modal();
}
// Randommly shuffles the cards
// Appends the shuffled cards to the game
function shuffleTheDeck() {
    $('ul').children().removeClass().addClass('card');
    var shuffledDeck = shuffle($('.deck').children('li')).toArray();
    $('ul.deck > li').remove();
    shuffledDeck.forEach(function (elem) {
        $('ul.deck').append(elem);
    });
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



// Add event listeners to cards
function addActionsToCards() {
    'use strict';
    $('.card').click(function (event) {
        if ((!$(this).hasClass('open show')) && (!$(this).hasClass('error')) ) {
            displayCard($(this));
            addItemToList($(this));
        }
    });
}

// Validates current clicked card
// Process the opened cards
function validateCardMatchAndProcess() {
    'use strict';
    calculateRatingAndUpdate();
    // Check if the cards match
    if ((openCards[0].children()[0].className == openCards[1].children()[0].className) && !(openCards[0].hasClass('error')) &&  !(openCards[1].hasClass('error')) )  {
        // On successful card match
        cardMatchSuccess();
    }
    else {
        // On card match failure
        cardMatchFailure();
    }
    openCards = [];
}
// Function to show card error
// on card match failure.
function cardMatchFailure() {
    'use strict';
    openCards.forEach(function (elem) {
        elem.removeClass().addClass('card error');
        elem.effect('shake','slow');
        setTimeout(function () {
            elem.removeClass().addClass('card');
        }, 250);
    });
}
/*  Function to show card match success
    Freeze the cards, update and check total opened cards
    If all cards are opened - game over..!!!
*/
function cardMatchSuccess() {
    'use strict';
    openCards.forEach(function (elem) {
        elem.removeClass().addClass('card match');
        elem.off('click');
    });
    totalOpenCards = totalOpenCards + 2;
    if (totalOpenCards === 16) {
        gameOver();
    }
}
/*  Function to calculate rating
    based on number of moves
    Update the rating stars on the UI.
*/
function calculateRatingAndUpdate() {
    'use strict';
    moves = moves + 1;
    $('.moves').text(moves);
    switch (moves) {
        case 15:
            $('li .fa-star').last().removeClass('fa-star').addClass('fa-star-o');
            break;
        case 20:
            $('li .fa-star').last().removeClass('fa-star').addClass('fa-star-o');
            break;
    }
}

// Add items to list and process validations
function addItemToList(card) {
    'use strict';
    openCards.push(card);
    // validate if first card exists
    if (openCards.length > 1) {
        validateCardMatchAndProcess();
    }
};

// Displays the card
function displayCard(card) {
    card.addClass('open show');
};

// Reset the total moves count to 0 and update the label
function resetMoves() {
    moves = 0;
    $('.moves').text(moves);
}
// Function to reset the star rating back to 3
function resetStars() {
    $('.stars').children('li').replaceWith("<li><i class=\"fa fa-star\"></i></li>");
    stars = 0;
}

/*  Woohooo! Successfully completed the game !!!!!
    Function to show the success modal pop up with
    number of moves, time elapsed and star ratings
*/
function gameOver() {
    stars = $('.fa-star').length;
    timerResult = $('#time_ticker').text();
    $('#number-of-moves').text(moves);
    $('#stars').text(stars);
    $('#timer-result').text(timerResult);
    $('#exampleModalLong').modal()
    clearInterval(t);
    d, newd = '';
}

// Function to start the time ticker
// Timer is cleared upon successful game completion
function startTimer() {
    //new fixed date kind  - i.e. what will be received from the server
    d = new Date();
    //func that transforms miliseconds in digital clock format i.e. 22:34:12
    function transformMiliseconds(t) {
        var h = Math.floor((t / (1000 * 60 * 60)) % 24);
        var m = Math.floor((t / (1000 * 60)) % 60);
        var s = Math.floor((t / 1000) % 60);

        h = (h < 10) ? '0' + h : h;
        m = (m < 10) ? '0' + m : m;
        s = (s < 10) ? '0' + s : s;
        return h + ':' + m + ':' + s;
    }
    //ticker function that will refresh our display every second
    function tick() {
        newd = new Date();
        document.getElementById('time_ticker').innerHTML = transformMiliseconds(newd - d);
    }
    //the runner
    t = setInterval(tick, 1000);
}

/*
    Document ready functions,
    Buttons event listeners bindings
*/
$(document).ready(function () {
    resetGame();
});

// Resets the game when reset button is clicked
$('.fa-repeat').click(function () {
    resetGame();
});
// Reset game, start new game
$('.btnPlayAgain').click(function () {
    resetGame();
});
// Adds actions to cards and starts the timer when
// Start playing button is clicked
$('.btnStartGame').click(function () {
    addActionsToCards();
    startTimer();
});
// Removes click functionality on opened cards when
// player clicks on close button
$('.btnClose').click(function () {
    $('.card').off('click');
});