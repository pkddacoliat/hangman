// Global Variables
let dictionary = data; // from data.js
let player = "Anon";
let streak = 0;
let lives = 6;
let gamesWon = 0;
let chosenCategory;
let chosenWord;
let guesses = [];
let correctCounter = 0;
let incorrectCounter = 1; // starts at 1 because of the names of the images
let space = 0;

$(() => {
  // Hide divs for category and hangman image
  $("#hangmanImg").hide();
  $("#category").hide();

  // Load stats
  $(".streakCounter").text(streak);
  $(".livesCounter").text(lives);
  $(".gamesWonCounter").text(gamesWon);

  // Show keyboard
  populateKeyboard();

  // Disable keyboard on load
  $(".letter-buttons button.btn").attr("disabled", true);

  // Events when the play game button is clicked
  $("#playBtn").on("click", () => {
    $("#playBtn").hide();
    $("#hangmanImg").show();
    $("#category").show();
    $(".letter-buttons button.btn").attr("disabled", false);
    let randomResults = randomCategoryWord(dictionary);
    chosenCategory = randomResults[0]["category"];
    chosenWord = randomResults[1];
    $("#category span").text(chosenCategory);
    populatePlaceHolder();

    console.log(chosenCategory);
    console.log(chosenWord);
  });

  resetGame = () => {
    $("#myModal").modal("hide");
    lives = 6;
    guesses = [];
    $("#chosenWord").remove();
    space = 0;
    correctCounter = 0;
    incorrectCounter = 1;
    $(".streakCounter").text(streak);
    $(".livesCounter").text(lives);
    $(".gamesWonCounter").text(gamesWon);
    $(".letter-buttons button.btn").removeClass("btn-success btn-danger");
    $("#hangmanImg img").attr("src", "images/1.png");
  };

  // Play again button onclick handler
  $("#playAgainBtn").on("click", () => {
    $('.collapse').collapse()
    console.log("Play again!");
    resetGame();
    let randomResults = randomCategoryWord(dictionary);
    chosenCategory = randomResults[0]["category"];
    chosenWord = randomResults[1];
    guesses = [];
    populatePlaceHolder();
    $(".letter-buttons button.btn").attr("disabled", false);

    console.log(chosenCategory);
    console.log(chosenWord);
    showStats();
  });

  // Forfeit button onclick handler
  $("#forfeitBtn").on("click", () => {
    console.log("Forfeit");
    resetGame();
    $(".letter-buttons button.btn").attr("disabled", true); //
    $("#hangmanImg").hide();
    $("#category").hide();
    $("#playBtn").show();

    console.log(chosenCategory);
    console.log(chosenWord);
    showStats();
  });

  // Check guess when a letter is clicked
  checkGuess();
});

populateKeyboard = () => {
  // Populate the virtual keyboard with the alphabet
  let alphabet = "qwertyuiopasdfghjklzxcvbnm".split("");

  let virtualKb = document.getElementById("letterBtns");
  for (let i = 0; i < 26; i++) {
    let $letterBtn = $(
      '<button type="button" class="btn btn-lg">' +
        alphabet[i].toUpperCase() +
        "</button>"
    );
    $letterBtn.attr("id", alphabet[i]);
    $letterBtn.appendTo(virtualKb);
  }
};

randomCategoryWord = () => {
  let chosenCategory =
    dictionary[Math.floor(Math.random() * dictionary.length)];
  let chosenWord =
    chosenCategory["words"][
      Math.floor(Math.random() * chosenCategory["words"].length)
    ];
  return [chosenCategory, chosenWord];
};

populatePlaceHolder = () => {
  let placeHolder = document.getElementById("placeHolder");
  let underlines = document.createElement("ul");

  for (var i = 0; i < chosenWord.length; i++) {
    underlines.setAttribute("id", "chosenWord");
    let chosenWordLetter = document.createElement("li");
    chosenWordLetter.setAttribute("class", "guess");

    if (chosenWord[i] === " ") {
      chosenWordLetter.innerHTML = "&nbsp;";
      space += 1;
    } else {
      chosenWordLetter.innerHTML = "_";
    }
    guesses.push(chosenWordLetter);
    placeHolder.appendChild(underlines);
    underlines.appendChild(chosenWordLetter);
  }
};

checkGuess = () => {
  $(".letter-buttons").on("click", ".btn", event => {
    event.preventDefault();
    let guess = event.target.id;
    let correctGuess = false;
    console.log(guess);

    $("#" + guess).attr("disabled", true); // disable the button;

    // Check if letter selected is in the chosen word
    for (let i = 0; i < chosenWord.length; i++) {
      if (guess.toLowerCase() === chosenWord[i].toLowerCase()) {
        guesses[i].innerHTML = guess.toUpperCase();
        correctCounter += 1;
        correctGuess = true;
      }
    }
    // Check if guess is incorrect
    if (correctGuess === false) {
      lives -= 1;
      incorrectCounter += 1;
      $("#" + guess).addClass("btn-danger");
      $(".livesCounter").text(lives);
      isGameOver(lives);
      $("#hangmanImg img").attr("src", "images/" + incorrectCounter + ".png");
    } else {
      $("#" + guess).addClass("btn-success");
      isGameOver(lives);
    }
  });
};

isGameOver = () => {
  if (lives < 1) {
    $(".letter-buttons button.btn").attr("disabled", true); // disable all the buttons
    streak = 0;
    for (let i = 0; i < chosenWord.length; i++) {
      guesses[i].innerHTML = chosenWord[i].toUpperCase();
    }
    $("#modalTitle").text("You Lost!");
    showModal();
  }
  if (correctCounter + space === chosenWord.length) {
    $(".letter-buttons button.btn").attr("disabled", true); // disable all the buttons
    streak += 1;
    gamesWon += 1;
    $("#modalTitle").text("You Won!");
    showModal();
  }
};

showModal = () => {
  $("#myModal").modal({
    backdrop: "static",
    keyboard: false
  });
};

resetGame = () => {
  $("#myModal").modal("hide");
  lives = 6;
  guesses = [];
  $("#chosenWord").remove();
  space = 0;
  correctCounter = 0;
  incorrectCounter = 1;
  $(".streakCounter").text(streak);
  $(".livesCounter").text(lives);
  $(".gamesWonCounter").text(gamesWon);
  $(".letter-buttons button.btn").removeClass("btn-success btn-danger");
  $("#hangmanImg img").attr("src", "images/1.png");
};

// Console logs for checking stats
showStats = () => {
  console.log(dictionary);
  console.log("Player -", player);
  console.log("Streak -", streak);
  console.log("Lives -", lives);
  console.log("Games Won -", gamesWon);
  console.log("Category -", chosenCategory);
  console.log("Word -", chosenWord);
  console.log("Guesses -", guesses);
  console.log("Correct Counter -", correctCounter);
  console.log("Incorrect Counter -", incorrectCounter);
  console.log("Space -", space);
};
