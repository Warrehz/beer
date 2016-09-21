  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBCGNlsZyWEj1KbRpXx6bmUM1T_sVO9_3M",
    authDomain: "keep-austin-beered.firebaseapp.com",
    databaseURL: "https://keep-austin-beered.firebaseio.com",
    storageBucket: "keep-austin-beered.appspot.com",
    messagingSenderId: "57492481901"
  };
  firebase.initializeApp(config);

  var brewKey = "506bb9b48659b2737456b6f9e0966aa8";
  var queryURL = "http://api.brewerydb.com/v2/serach?q=Goosinator&type=beer?key=";

function showBeerInfo() {
  $.ajax({url: queryURL + brewKey, method: "GET"})
		.done(function(response){
      console.log(response);

    });
}

showBeerInfo();
