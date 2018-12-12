// DB reference of the currently logged in user
let userDbRef;

$(() => {
  // Firebase config
  let config = {
    apiKey: "AIzaSyDLV2057pL2j10bwo1tK7_dygxEAQrQtXs",
    authDomain: "hangman-pkdd.firebaseapp.com",
    databaseURL: "https://hangman-pkdd.firebaseio.com",
    projectId: "hangman-pkdd",
    storageBucket: "hangman-pkdd.appspot.com",
    messagingSenderId: "396826161162"
  };
  firebase.initializeApp(config);

  // Checks if current page is the login page
  let pageURL = window.location.href;
  if (/login/.test(pageURL)) {
    $("#login").addClass("active");
  }

  // Hide divs onload
  $("#confirmPasswordDiv").hide();
  $("#registerBtn").hide();
  $("#loginErrorMsg").hide();
  $("#regErroMsg").hide();

  // Auth state changed checks if a user is logged in or not
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      $("#profileDropDown").hide();
      $("#profileDropDown").show();
      $("#profileDropDown").text(user.email);
      $("#login").hide();
      console.log("auth changed", user);

      // Set the db reference of the current user
      userDbRef = firebase.database().ref("users/" + user.uid);

      userDbRef.once("value").then(snapshot => {
        if (snapshot.exists()) {
          let userData = snapshot.val();
          userName = userData.userName;
          gamesWon = userData.gamesWon;
          gamesLost = userData.gamesLost;
          totalGamesPlayed = userData.totalGamesPlayed;
          $(".gamesWonCounter").text(gamesWon);
          console.log("Data already exists");
        } else {
          userDbRef.set({
            userEmail: user.email,
            userName: "",
            gamesWon: 0,
            gamesLost: 0,
            totalGamesPlayed: 0,
            winRatio: 0
          });
          console.log("Data saved to DB");
        }
      });
    } else {
      // No user is signed in.
      $("#profileDropDown").hide();
      $("#login").show();
    }
  });

  // Event handler for the logout link in the navigation
  $("#logout").on("click", () => {
    firebase
      .auth()
      .signOut()
      .then(function() {
        // Sign-out successful.
        window.location.replace("/");
      })
      .catch(function(error) {
        // An error happened.
        window.alert(error);
      });
  });

  // Event handler for the register link
  $("#registerLink a").on("click", () => {
    $("#email").val("");
    $("#password").val("");
    $("#confirmPassword").val("");
    $("#confirmPasswordDiv").show();
    $("#registerBtn").show();
    $("#registerLink").hide();
    $("#loginBtn").hide();
    $("#loginErrorMsg").hide();
  });
});

// Function to login the user
login = () => {
  let userEmail = document.getElementById("email").value;
  let userPassword = document.getElementById("password").value;

  firebase
    .auth()
    .signInWithEmailAndPassword(userEmail, userPassword)
    .then(data => {
      console.log("login", data);
      window.location.replace("/");
    })
    .catch(error => {
      // Handle Errors here.
      let errorCode = error.code;
      let errorMessage = error.message;
      $("#loginErrorMsg").text(errorMessage);
      $("#loginErrorMsg").show();
      // ...
    });
};

// Function to register a user
register = () => {
  let userEmail = document.getElementById("email").value;
  let userPassword = document.getElementById("password").value;
  let confirmPassword = document.getElementById("confirmPassword").value;

  if (userPassword !== confirmPassword) {
    $("#regErroMsg").text("Password and password confirmation don't match.");
    $("#regErroMsg").show();
  } else {
    firebase
      .auth()
      .createUserWithEmailAndPassword(userEmail, userPassword)
      .then(userData => {
        window.location.replace("/");
      })
      .catch(function(error) {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        $("#regErroMsg").text(errorMessage);
        $("#regErroMsg").show();
        // ...
      });
  }
};
