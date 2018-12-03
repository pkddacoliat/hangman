$(document).ready(() => {
  // Reading in words from json file
  // TODO: Retrieve words from Firebase
  let words = {};
  $.getJSON("/words.json", data => {
    $.each(data, (index, value) => {
      words = value;
    });
    console.log(words);
  });

  // Populating the letters to be used for the virtual keyboard
  let alphabet = "a b c d e f g h i j k l m n o p q r s t u v w x y z";
  alphabet = alphabet.split("");
  alphabet = alphabet.filter(str => {
    return /\S/.test(str);
  });

  // Group 1 Buttons
  let group1Btns = document.getElementById("letterBtns");
  for (let i = 0; i < 26; i++) {
    let $letterBtn = $(
      '<button type="button" class="btn btn-primary btn-lg">' +
        alphabet[i] +
        "</button>"
    );
    $letterBtn.attr("id", alphabet[i]);
    $letterBtn.appendTo(group1Btns);
  }

  // Buttons Onclick Handler
  $(".letter-buttons .btn").on("click", event => {
    console.log(event.target.innerHTML);
    $("#" + event.target.id).attr("disabled", true);
  });
});
