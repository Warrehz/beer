  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDG2Bf_b52p4TNK2P4538aAHtnImN88CPg",
    authDomain: "keep-austin-beerd.firebaseapp.com",
    databaseURL: "https://keep-austin-beerd.firebaseio.com",
    storageBucket: "keep-austin-beerd.appspot.com",
    messagingSenderId: "639903526682"
  };
  firebase.initializeApp(config);

var database = firebase.database();

//splash page button click
$(".start").on('click', function() {
  location.href = "beerd.html";
});



//DATABASE TESTING
var testing1 = ['testin','array'];
var testing2 = "test";
var testing = 5;

// make a reset to clear the data and leave them empty. 

var stout = database.ref("stout");
var lager = database.ref("lager");
var ale = database.ref("ale");
var malt = database.ref("malt");


stout.update({
    nameOfBeer:{
        flavor:testing1,
        place:testing2,
        price:testing
    }
  });

lager.update({
    nameOfBeer:{
        flavor:testing1,
        place:testing2,
        price:testing
      }
  });

ale.update({
    nameOfBeer:{
        flavor:testing1,
        place:testing2,
        price:testing

    }
  });

malt.update({
    nameOfBeer:{
        flavor:testing1,
        place:testing2,
        price:testing

    }
  });

// At the initial load, get a snapshot of the current data.
stout.on("value", function(snapshot) {

  var stouts = snapshot.val().stout.name; 

  // Print the initial data to the console.
  console.log(snapshot.val().stouts);
  
  
  
});


//Jquery beerd page. Selecting 1 of 3 choices

//ALE information
$("#ale-image").on('click', function() {
  $(".lagerContainer").slideToggle("slow", "linear");
  $(".stoutContainer").slideToggle("slow", "linear");
  $(this).off();
});

//Lager information
$("#lager-image").on('click', function() {
  $(".aleContainer").slideToggle("slow");
  $(".stoutContainer").slideToggle("slow");
  $(this).off();
});

//Stout information
$("#stout-image").on('click', function() {
  $(".lagerContainer").slideToggle("slow");
  $(".aleContainer").slideToggle("slow");
  $(this).off();
});


