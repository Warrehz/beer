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


// At the initial load, get a snapshot of the current data.
stout.on("value", function(snapshot) {

  var stouts = snapshot.val().stout.nameOfBeer.flavor; 

  // Print the initial data to the console.
  console.log(snapshot.val().stouts);
  
});


//Jquery beerd page. Selecting 1 of 3 choices

//Default hidden divs
$("#aleDetails").hide();
$("#lagerDetails").hide();
$("#stoutPorterDetails").hide();

//ALE information toggling
$("#ale-image").on('click', function() {
  $(".lagerContainer").slideToggle(600);
  $(".stoutContainer").slideToggle(600);
  $("#ale").fadeOut(2000);
  $("#aleDetails").slideDown(2000, "linear");
  $(this).off();
  $(".aleChoice").animate({
    width: "325px",
    height: "325px",
  }, 600);
});

//Lager information toggling
$("#lager-image").on('click', function() {
  $(".aleContainer").slideToggle(600);
  $(".stoutContainer").slideToggle(600);
  $("#lager").fadeOut(2000);
  $("#lagerDetails").slideDown(2000, "linear");
  $(this).off();
  $(".lagerChoice").animate({
    width: "325px",
    height: "325px",
  }, 600);
});

//Stout information toggling
$("#stout-image").on('click', function() {
  $(".lagerContainer").slideToggle(600);
  $(".aleContainer").slideToggle(600);
  $("#stout-porter").fadeOut(2000);
  $("#stoutPorterDetails").slideDown(2000, "linear");
  $(this).off();
  $(".stoutChoice").animate({
    width: "325px",
    height: "325px",
  }, 600);
});


