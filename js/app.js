/* Create a list that holds all of your cards
 */
var openCards = [];
var totalOpenCards = 0,
  moves = 0,
  stars = 0;

  var elapsedTime = 0;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function shuffleTheDeck() {
  $("#resetGameModal").modal();
  setTimeout(function() {
    $("#resetGameModal").modal("hide");
  }, 1000);
  $("ul")
    .children()
    .removeClass()
    .addClass("card");
  var shuffledDeck = shuffle($(".deck").children("li")).toArray();
  $("ul.deck > li").remove();
  shuffledDeck.forEach(function(elem) {
    $("ul.deck").append(elem);
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
function addActionsToPage() {
  $(".card").click(function(event) {
    if (!$(this).hasClass("open show")) {
      displayCard($(this));
      addItemToList($(this));
    }
  });
  $(".btnPlayAgain").click(function() {
    gameStart();
  });

  $(".fa-repeat").click(function() {
    gameStart();
  });
}

function calculateStarsAndUpdate() {
  moves = moves + 1;
  $(".moves").text(moves);
  switch (moves) {
    case 10:
      $("li .fa-star")
        .last()
        .removeClass("fa-star")
        .addClass("fa-star-o");
      break;
    case 15:
      $("li .fa-star")
        .last()
        .removeClass("fa-star")
        .addClass("fa-star-o");
      break;
    case 20:
      $("li .fa-star")
        .last()
        .removeClass("fa-star")
        .addClass("fa-star-o");
  }
}

function cardMatchFailure() {
  openCards.forEach(function(elem) {
    elem.removeClass().addClass("card error");
    elem.effect("shake", "slow", "1");
    setTimeout(function() {
      elem.removeClass().addClass("card");
    }, 1000);
  });
}

function cardMatchSuccess() {
  openCards.forEach(function(elem) {
    elem.removeClass().addClass("card match");
  });
  totalOpenCards = totalOpenCards + 2;
  if (totalOpenCards === 16) {
    gameOver();
  }
}

// Validates current clicked card
// Process the opened cards
function validateCardMatchAndProcess(card) {
  calculateStarsAndUpdate();
  if (
    openCards[0].children()[0].className == openCards[1].children()[0].className
  ) {
    cardMatchSuccess();
  } else {
    cardMatchFailure();
  }
  openCards = [];
}

// Add items to list and process validations
function addItemToList(card) {
  openCards.push(card);
  // validate if first card exists
  if (openCards.length > 1) {
    validateCardMatchAndProcess();
  }
}

// Displays the card
function displayCard(card) {
  card.addClass("open show");
}

function resetMoves() {
  moves = 0;
  $(".moves").text(moves);
}

function resetStars() {
  $(".stars")
    .children("li")
    .replaceWith('<li><i class="fa fa-star"></i></li>');
}

// Game over!!!!!
function gameOver() {
  stars = $(".fa-star").length;
  $("#number-of-moves").text(moves);
  $("#stars").text(stars);
  $("#exampleModalLong").modal();

  $('#elapsed-time').text($('#time_ticker').text());
  clearInterval(elapsedTime);
}

/*  Game start
    Call all dependent functions for game start 
*/
function gameStart() {
  shuffleTheDeck();
  addActionsToPage();
  resetMoves();
  resetStars();
  startTimer();
}

$(document).ready(function() {
  $("#startGame").modal();
});

function startTimer() {
  //new fixed date kind  - i.e. what will be received from the server
  var d = new Date();

  //func that transforms miliseconds in digital clock format i.e. 22:34:12
  function transformMiliseconds(t) {
    var h = Math.floor((t / (1000 * 60 * 60)) % 24);
    var m = Math.floor((t / (1000 * 60)) % 60);
    var s = Math.floor((t / 1000) % 60);

    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;
    return h + ":" + m + ":" + s;
  }

  //ticker function that will refresh our display every second
  function tick() {
    var newd = new Date();
    document.getElementById("time_ticker").innerHTML = transformMiliseconds(
      newd - d
    );
  }
  elapsedTime = setInterval(tick, 1000);
}

$(".btnPlayAgain").click(function() {
    gameStart();
  });

  $(".fa-repeat").click(function() {
    gameStart();
  });