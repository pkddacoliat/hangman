$(() => {
  let userEmail = "";

  let pageURL = window.location.href;
  if (/login/.test(pageURL)) {
    $("#login").addClass("active");
  }

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      $("#login").hide();
      $("#logout").show();
      $("#profile").removeClass("disabled");
      $("#profile").text(user.email);
      userEmail = user.email;
      console.log(userEmail);
    } else {
      // No user is signed in.
      $("#logout").hide();
      $("#login").show();
    }
  });

  $("#logout").on("click", () => {
    firebase
      .auth()
      .signOut()
      .then(function() {
        // Sign-out successful.
        window.location.replace("/");
        window.alert("Sign out successful.");
      })
      .catch(function(error) {
        // An error happened.
        window.alert(error);
      });
  });
});

login = () => {
  let userEmail = document.getElementById("email").value;
  let userPassword = document.getElementById("password").value;

  firebase
    .auth()
    .signInWithEmailAndPassword(userEmail, userPassword)
    .then(data => {
      console.log(data);
      window.location.replace("/");
    })
    .catch(error => {
      // Handle Errors here.
      let errorCode = error.code;
      let errorMessage = error.message;

      window.alert(errorCode + ": " + errorMessage);
      // ...
    });
};
