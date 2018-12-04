$(document).ready(() => {
  // Setup game on load
  populateKeyboard();
  startGame();
});

populateKeyboard = () => {
  // Populate the virtual keyboard with the alphabet
  let alphabet = "qwertyuiopasdfghjklzxcvbnm".split("");

  let virtualKb = document.getElementById("letterBtns");
  for (let i = 0; i < 26; i++) {
    let $letterBtn = $(
      '<button type="button" class="btn btn-primary btn-lg">' +
        alphabet[i].toUpperCase() +
        "</button>"
    );
    $letterBtn.attr("id", alphabet[i]);
    $letterBtn.appendTo(virtualKb);
  }
};

// Function sets up a new game
startGame = () => {
  let words = {};
  let chosenCategory;
  let chosenWord;
  let streak = 0;
  let lives = 6;
  let gamesWon = 0;
  let incorrectCounter = 1; // it starts at because the images are named from 1-7.

  // Reading in words from json file
  // TODO: Retrieve words from Firebase
  $.getJSON("/data.json", data => {
    $.each(data, (index, value) => {
      data = value["data"];
    });
    return data;
  })
    .then(data => {
      words = data;
      chosenCategory =
        words["data"][Math.floor(Math.random() * words["data"].length)];
      chosenWord =
        chosenCategory["words"][
          Math.floor(Math.random() * chosenCategory["words"].length)
        ];
      return [chosenCategory, chosenWord];
    })
    .then(results => {
      let category = results[0]["category"];
      let word = results[1];

      console.log(category);
      console.log(word);

      // Show streak counter
      $("<b>Streak:</b>&nbsp;<span>" + streak + "</span>").appendTo(
        document.getElementById("streak")
      );

      // Show lives counter
      $("<b>Lives:</b>&nbsp;<span>" + lives + "</span>").appendTo(
        document.getElementById("lives")
      );

      // Show games won counter
      $("<b>Games Won:</b>&nbsp;<span>" + gamesWon + "</span>").appendTo(
        document.getElementById("gamesWon")
      );

      // Show category
      $("<b>Category:</b>&nbsp;<span>" + category + "</span>").appendTo(
        document.getElementById("category")
      );

      // Populate the placeholder based on the word
      let guesses = populatePlaceHolder(word);

      // Check Guess
      checkGuess(word, lives, guesses, incorrectCounter);
    });
};

populatePlaceHolder = word => {
  let placeHolder = document.getElementById("placeHolder");
  let underlines = document.createElement("ul");
  let guesses = [];

  for (var i = 0; i < word.length; i++) {
    underlines.setAttribute("id", "chosenWord");
    let chosenWordLetter = document.createElement("li");
    chosenWordLetter.setAttribute("class", "guess");
    if (word[i] === " ") {
      chosenWordLetter.innerHTML = "&nbsp;";
      space = 1;
    } else {
      chosenWordLetter.innerHTML = "_";
    }

    guesses.push(chosenWordLetter);
    placeHolder.appendChild(underlines);
    underlines.appendChild(chosenWordLetter);
  }
  return guesses;
};

checkGuess = (word, lives, guesses, incorrectCounter) => {
  $(".letter-buttons .btn").on("click", event => {
    let correct = false;
    let letterIndexes = [];
    let guess = event.target.id;
    $("#" + guess).attr("disabled", true);
    for (let i = 0; i < word.length; i++) {
      if (guess.toLowerCase() === word[i].toLowerCase()) {
        correct = true;
        guesses[i].innerHTML = guess.toUpperCase();
      }
    }
    if (!correct) {
      lives--;
      incorrectCounter++;
      console.log(incorrectCounter);
      $("#lives span").html(lives);
      $("#hangmanImg img").attr("src", "images/" + incorrectCounter + ".png");
    }
  });
};
