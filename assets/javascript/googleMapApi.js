//google maps API code
var key = "AIzaSyDpiSst7DH-vZ6KpzpN-JxdL3AmflozaIo";

var nameOfBusiness = "blackstar";

var mapImage = "<img src ='https://maps.googleapis.com/maps/api/staticmap?center=" + nameOfBusiness + ",austin,TX&zoom=17&size=500x500&maptype=roadmap&key=" + key + "'>";

$('#map').html(mapImage);

//pending location lat and longitude from yelp API