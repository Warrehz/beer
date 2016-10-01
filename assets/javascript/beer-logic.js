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

$(function() {

  //variable used to grab snapshot value 
  var place = "";

//splash page button click
  $(".start").on('click', function() {
    location.href = "beerd.html";
  });

  //3 separate sections dynamically controlled
  //Default hidden divs
  $("#aleDetails, #lagerDetails, #stoutPorterDetails, .dynamicBtn, #beerForm, #placeList, #mapArea").hide();
  
  //ALE information toggling
  $("#ale-image").on('click', function() {

    $(".lagerContainer, .stoutContainer").slideToggle(800);
    $("#ale").fadeOut(2000);
    $("#aleDetails").delay(2000).slideDown(2000, "linear");
    $(".aleChoice").animate({
      width: "300px",
      height: "300px",
    }, 800);
    $(".dynamicBtn, #placeList").delay(4000).fadeIn(1500);
    $(this).off();

    database.ref().orderByChild("type").equalTo("ale").limitToFirst(3).on("value", function(snapshot) {

      snapshot.forEach(function(childSnapshot) {

        var showBeerName = childSnapshot.val().name;
        var showBeerLocation = childSnapshot.val().locationName;
        var showBeerAddress = childSnapshot.val().locationAddress;
        console.log(showBeerAddress);

        //dynamically generating buttons with attr for address to use in gmaps
        var a = $('<button>');
        a.addClass('listings');
        a.attr('data-place', showBeerAddress);
        a.text(showBeerLocation); 
        $('#places').append(a); 
        $('#places').append("<p>You should try their: "+ showBeerName + "</p>" +
                            "<p>Address: " + showBeerAddress + "</p>");
      
      });

    });

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
    $(".dynamicBtn, #placeList").delay(4000).fadeIn(1500);
    $(this).off();

    database.ref().orderByChild("type").equalTo("lager").limitToFirst(3).on("value", function(snapshot) {

      snapshot.forEach(function(childSnapshot) {

        var showBeerName = childSnapshot.val().name;
        var showBeerLocation = childSnapshot.val().locationName;
        var showBeerAddress = childSnapshot.val().locationAddress;

        //dynamically generating buttons with attr for address to use in gmaps
        var a = $('<button>');
        a.addClass('listings');
        a.attr('data-place', showBeerAddress);
        a.text(showBeerLocation); 
        $('#places').append(a); 
        $('#places').append("<p>You should try their: "+ showBeerName + "</p>" +
                            "<p>Address: " + showBeerAddress + "</p>");
      });

    });

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
    $(".dynamicBtn, #placeList").delay(4000).fadeIn(1500);
    $(this).off();

    database.ref().orderByChild("type").equalTo("stout/porter").limitToFirst(3).on("value", function(snapshot) {

      snapshot.forEach(function(childSnapshot) {

        var showBeerName = childSnapshot.val().name;
        var showBeerLocation = childSnapshot.val().locationName;
        var showBeerAddress = childSnapshot.val().locationAddress;

        //dynamically generating buttons with attr for address to use in gmaps
        var a = $('<button>');
        a.addClass('listings');
        a.attr('data-place', showBeerAddress);
        a.text(showBeerLocation); 
        $('#places').append(a); 
        $('#places').append("<p>You should try their: "+ showBeerName + "</p>" +
                            "<p>Address: " + showBeerAddress + "</p>");

      });

    });

  });

  // reloads beer.html
  $("#reset").on('click',function(){
    location.reload();
  })

  //brings in submit form
  $("#suggest").on('click', function() {
    $("#beerForm").fadeIn(1500);
    scrollTo($('#beerForm'), 1000);
  })

  //submit button pushes form data to firebase
  $("#submitBeer").on("click", function() {

    var beerType = checkbox;
    var beerName = $("#beerName").val().trim();
    var beerPlace = $("#beerPlace").val().trim();
    var beerPlaceAddress = $("#beerPlaceAddress").val().trim();

    console.log(beerType);
    console.log(beerName);
    console.log(beerPlaceAddress);

    var newBeer = {
      type: beerType,
      name: beerName,
      locationName: beerPlace,
      locationAddress: beerPlaceAddress
    };

    database.ref().push(newBeer);

    $("#beerName").val("");
    $("#beerPlace").val("");
    $("#beerForm").html("<h4>---- Thanks for sharing! ----</h4>")

    return false;

  });

  // checkbox logic so only 1 can be selected and storing value of the checkbox
  var checkbox = "";

  $('input[type=checkbox]').change(function(){
    if($('input.beerbox').filter(':checked').length == 1)
          $('input.beerbox:not(:checked)').attr('disabled', 'disabled');
      else
          $('input.beerbox').removeAttr('disabled');
           console.log($(this).val());
           checkbox = $(this).val();
  });

//Google maps and geocode js and on click to display map
  
  var lat = 0;
  var lng = 0;
  var listingAddress;

  // $("#places").on("click", function() {
  $("#places").on("click", ".listings" , function() {
    $("#mapArea").show();

    listingAddress = $(this).attr('data-place');
    console.log(listingAddress);

    geocode();
  });

  function geocode() {

    var googleKey = 'AIzaSyDpiSst7DH-vZ6KpzpN-JxdL3AmflozaIo';
    // Google API to get lat/lng
    queryURL = "https://maps.googleapis.com/maps/api/geocode/json?address="+listingAddress+"&key="+googleKey;

      $.ajax({
      url: queryURL,
      method: 'GET'

      }).done(function(response) {

      //Lattitude and Longitude of place
      lat = response.results[0].geometry.location.lat;
      lng = response.results[0].geometry.location.lng;
      console.log(lat);
      console.log(lng);

      placesMap();

    }); /*End of googl ajax call*/

  }/*End of geocode function*/

  //displaying map from the lat and long values found from geocode
  function placesMap() {

    var myLatLng = {lat: lat, lng: lng}
    var mapSection = document.getElementById("mapArea");
    var mapDisplay = {
      center: new google.maps.LatLng(lat, lng),
      zoom: 17
    }

    var maps = new google.maps.Map(mapSection, mapDisplay);

    //creates marker on map using lat and long
    var marker = new google.maps.Marker({
            position: myLatLng,
            map: maps
          });
  }
//for google maps callback function reference  
window.map = placesMap;

});


