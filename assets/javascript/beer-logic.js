//Initialize Firebase
  var config = {
     apiKey: "AIzaSyDG2Bf_b52p4TNK2P4538aAHtnImN88CPg",
     authDomain: "keep-austin-beerd.firebaseapp.com",
     databaseURL: "https://keep-austin-beerd.firebaseio.com",
     storageBucket: "keep-austin-beerd.appspot.com",
     messagingSenderId: "639903526682"
   };

  firebase.initializeApp(config);

  var database = firebase.database();

$(document).ready(function () {

  $("#submitBeer").on("click", function() {

    var beerType = ($("#checkboxArray:checkbox:checked")).value;

    var beerName = $("#beerName").val().trim();

    var beerPlace = $("#beerPlace").val().trim();

    console.log(beerType);
    console.log(beerName);
    console.log(beerPlace);

    var newBeer = {
      type: beerType,
      name: beerName,
      location: beerPlace
    };

    database.ref().push(newBeer);

    $("#beerName").val("");
    $("#beerPlace").val("");

    return false;

  });

});

var newBeer = {
  type: "stout",
  name: "Russian Imperial Stout",
  locationName: "Moontower Saloon",
  locationAddress: "10212 Manchaca Rd, Austin, TX 78748"
};

database.ref().push(newBeer);

//self invoking function, ensulating code and cleaning up variable scoping
var beerd = (function () {
$(function() {

//splash page button click
$(".start").on('click', function() {
  location.href = "beerd.html";
});

//Jquery beerd page. Selecting 1 of 3 choices
//Default hidden divs
$("#aleDetails, #lagerDetails, #stoutPorterDetails, .dynamicBtn, .submitBeer, #maps").hide();

//ALE information toggling
$("#ale-image").on('click', function() {
  $(".lagerContainer, .stoutContainer").slideToggle(800);
  $("#ale").fadeOut(2000);
  $("#aleDetails").delay(2000).slideDown(2000, "linear");
  $(".aleChoice").animate({
    width: "300px",
    height: "300px",
  }, 800);
  $(".dynamicBtn").delay(4000).fadeIn(2000);
  $(this).off();
});

//Lager information toggling
$("#lager-image").on('click', function() {
  $(".aleContainer, .stoutContainer").slideToggle(800);
  $("#lager").fadeOut(2000);
  $("#lagerDetails").delay(2000).slideDown(2000, "linear");
  $(".lagerChoice").animate({
    width: "300px",
    height: "300px",
  }, 800);
  $(".dynamicBtn").delay(4000).fadeIn(1500);
  $(this).off();
});

//Stout information toggling
$("#stout-image").on('click', function() {
  $(".lagerContainer, .aleContainer").slideToggle(800);
  $("#stout-porter").fadeOut(2000);
  $("#stoutPorterDetails").delay(2000).slideDown(2000, "linear");
  $(".stoutChoice").animate({
    width: "300px",
    height: "300px",
  }, 800);
  $(".dynamicBtn").delay(4000).fadeIn(1500);
  $(this).off();
});

//recommendations/suggest button
$("#beerPlaces").on('click', function() {
  $("#maps").show();
  $(".submitBeer").hide();
  geocode();
})

$("#suggest").on('click', function() {
  $(".submitBeer").fadeIn(1500);
  scrollTo($('.submitBeer'), 1000);
  $("#maps").hide();
})

$("#submitBeer").on('click', function() {
  //push data into firebase
})

// checkbox logic so only 1 can be selected
$('input[type=checkbox]').change(function(){
    if($(this).is(':checked')){
$('input[type=checkbox]').attr('disabled',true);
    $(this).attr('disabled','');
    }
    else{
      $('input[type=checkbox]').attr('disabled','');
    }
});

//Google maps and geocode js
var place = " 5353 Burnet Rd, Austin, TX 78756";
var lat = 0;
var lng = 0;

function geocode() {


  var googleKey = 'AIzaSyDpiSst7DH-vZ6KpzpN-JxdL3AmflozaIo';
  // Google API to get lat/lng
  queryURL = "https://maps.googleapis.com/maps/api/geocode/json?address="+place+"&key="+googleKey;

    $.ajax({
    url: queryURL,
    method: 'GET'

    }).done(function(response) {

    console.log(response);

    // placeID = response.results[0].place_id;
    // console.log(placeID);

    //Lattitude and Longitude of place
    lat = response.results[0].geometry.location.lat;
    lng = response.results[0].geometry.location.lng;
    console.log(lat);
    console.log(lng);

    placesMap();

  }); /*End of googl ajax call*/

}/*End of geocode function*/


function placesMap() {
  var myLatLng = {lat: lat, lng: lng}
  var mapSection = document.getElementById("mapArea");
  var mapDisplay = {
    center: new google.maps.LatLng(lat, lng),
    zoom: 16
  }

  var maps = new google.maps.Map(mapSection, mapDisplay);

  var marker = new google.maps.Marker({
          position: myLatLng,
          map: maps,
        });


}

window.map = placesMap;

});

})();
