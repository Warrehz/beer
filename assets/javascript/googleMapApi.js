//google maps API code
var key = "AIzaSyDpiSst7DH-vZ6KpzpN-JxdL3AmflozaIo";

var nameOfBusiness = "blackstar";

var mapImage = "<img src ='https://maps.googleapis.com/maps/api/staticmap?center=" + nameOfBusiness + ",austin,TX&zoom=17&size=500x500&maptype=roadmap&key=" + key + "'>";

$('#map').html(mapImage);

//pending location lat and longitude from yelp API

//google places

//THIS CODE FOR HTML
<input id="pac-input" class="controls" type="text"
    placeholder="Enter a location">
<div id="map"></div>
<!-- Replace the value of the key parameter with your own API key. -->
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCkUOdZ5y7hMm0yrcCQoCvLwzdM6M8s5qk&libraries=places&callback=initMap"
        async defer></script>

//end HTML

  var input = document.getElementById('pac-input');

  var autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.bindTo('bounds', map);

  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  var infowindow = new google.maps.InfoWindow();
  var marker = new google.maps.Marker({
    map: map
  });
  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });

  autocomplete.addListener('place_changed', function() {
    infowindow.close();
    var place = autocomplete.getPlace();
    if (!place.geometry) {
      return;
    }

    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);
    }

    // Set the position of the marker using the place ID and location.
    marker.setPlace({
      placeId: place.place_id,
      location: place.geometry.location
    });
    marker.setVisible(true);

    infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
        'Place ID: ' + place.place_id + '<br>' +
        place.formatted_address);
    infowindow.open(map, marker);
  });
}