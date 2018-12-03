$(document).ready(() => {
  // Setup game on load
  populateKeyboard();
  newGame();

  // Buttons Onclick Handler
  checkGuess();
});

populateKeyboard = () => {
  // Populate the virtual keyboard with the alphabet
  let alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

  let virtualKb = document.getElementById("letterBtns");
  for (let i = 0; i < 26; i++) {
    let $letterBtn = $(
      '<button type="button" class="btn btn-primary btn-lg">' +
        alphabet[i] +
        "</button>"
    );
    $letterBtn.attr("id", alphabet[i]);
    $letterBtn.appendTo(virtualKb);
  }
};

// Function sets up a new game
newGame = () => {
  let words = {};
  let chosenCategory;
  let chosenWord;

  // Reading in words from json file
  // TODO: Retrieve words from Firebase
  $.getJSON("/data.json", data => {
    $.each(data, (index, value) => {
      data = value["data"];
    });
    return data;
  }).then(data => {
    words = data;
    console.log(words["data"]);

    chosenCategory =
      words["data"][Math.floor(Math.random() * words["data"].length)];
    console.log(chosenCategory["category"]);

    chosenWord =
      chosenCategory["words"][
        Math.floor(Math.random() * chosenCategory["words"].length)
      ];
    console.log(chosenWord.charAt(0).toUpperCase() + chosenWord.slice(1));

    populatePlaceHolder(chosenWord);
  });
};

populatePlaceHolder = word => {
  placeHolder = document.getElementById("placeHolder");
  underlines = document.createElement("ul");

  for (var i = 0; i < word.length; i++) {
    underlines.setAttribute("id", "chosenWord");
    chosenWordLetter = document.createElement("li");
    chosenWordLetter.setAttribute("class", "guess");
    if (word[i] === " ") {
      chosenWordLetter.innerHTML = "&nbsp;";
      space = 1;
    } else {
      chosenWordLetter.innerHTML = "_";
    }

    // geusses.push(guess);
    placeHolder.appendChild(underlines);
    underlines.appendChild(chosenWordLetter);
  }
};

checkGuess = () => {
  $(".letter-buttons .btn").on("click", event => {
    console.log(event.target.innerHTML);
    $("#" + event.target.id).attr("disabled", true);
  });
};
