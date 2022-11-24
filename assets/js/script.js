$(function(){
// // Total Order
// var orderNumber= document.getElementById('quantity') ; 
// var totalOrder= document.getElementById('totalorder') ; 

// //totalOrder.addEventListener("click", orderInput);

// var quantity1 = document.getElementById('quantity1');
// var quantity2 = document.getElementById('quantity2');
// var quantity3 = document.getElementById('quantity3');
// var quantity4 = document.getElementById('quantity4');

// const totalQuantity = [quantity1*30 + quantity2*15 + product3*10 + product4*5]

function orderInput(){

}

function distancebetween(){
  //calculation between the initmap and user location input
}

var origin = `${localStorage.getItem("street-address")}, ${localStorage.getItem("city")}, ${localStorage.getItem("region")}`;
var destination = 'Finch Station, Toronto, Ontario';

var service = new google.maps.DistanceMatrixService();

service.getDistanceMatrix(
  {
    origins: [origin],
    destinations: [destination],
    travelMode: 'DRIVING',
    drivingOptions: {
        departureTime: new Date(Date.now()),
        trafficModel: 'bestguess'
    },
    unitSystem: google.maps.UnitSystem.METRIC,
    avoidHighways: true,
    avoidTolls: true,
  }, callback);

function callback(response, status) {
  if (status == 'OK') {
    var origins = response.originAddresses;
    var destinations = response.destinationAddresses;
    for (var i = 0; i < origins.length; i++) {
      var results = response.rows[i].elements;
      for (var j = 0; j < results.length; j++) {
        var element = results[j];
        var distance = element.distance.text;
        var duration = element.duration.text;
        var from = origins[i];
        var to = destinations[j];
      }
    }
  }
  $('#travelTime').text(`Estimated Travel Time from ${origin}: ${duration}`);
  console.log(duration);
}

// delivery and pickup check boxes only one checkbox allowed


// Order Form Auto Complete

const checkoutButton = document.getElementById("checkout");

checkoutButton.addEventListener("click", function(event){
  event.preventDefault();

  var firstnameStorage = document.getElementById("first-name");
  var lastnameStorage = document.getElementById("last-name");
  var emailAddressStorage = document.getElementById("email-address");
  var streetAddressStorage = document.getElementById("street-address");
  var countryStorage = document.getElementById("country");
  var cityStorage = document.getElementById("city");
  var provinceStorage = document.getElementById("region");
  var postalCodeStorage = document.getElementById("postal-code");

  localStorage.setItem("first-name", firstnameStorage.value);
  localStorage.setItem("last-name", lastnameStorage.value);
  localStorage.setItem("email-address", emailAddressStorage.value);
  localStorage.setItem("country", countryStorage.value);
  localStorage.setItem("street-address", streetAddressStorage.value);
  localStorage.setItem("city", cityStorage.value);
  localStorage.setItem("region", provinceStorage.value);
  localStorage.setItem("postal-code", postalCodeStorage.value);

window.onload = function renderLastRegistered() {
    var firstnameEl = document.getElementById("first-name")
    var lastnameEl = document.getElementById("last-name")
    var emailAddressEl = document.getElementById("email-address")
    var countryEl = document.getElementById("country")
    var streetEl= document.getElementById("street-address") 
    var cityEl = document.getElementById("city")
    var provinceEl = document.getElementById("region")
    var postalEl = document.getElementById("postal-code")

    var firstName = localStorage.getItem("first-name");
    firstnameEl.textContent = firstName;

    var lastName = localStorage.getItem("last-name");
    lastnameEl.textContent = lastName;

    var emailAddress = localStorage.getItem("email-address");
    emailAddressEl.textContent = emailAddress;

    var country = localStorage.getItem("country");
    countryEl.textContent = country;

    var streetAddress = localStorage.getItem("street-address");
    streetEl.textContent = streetAddress;

    var city = localStorage.getItem("city");
    cityEl.textContent = city;

    var province = localStorage.getItem("region");
    provinceEl.textContent = province;
    
    var postalCode = localStorage.getItem("postal-code");
    postalEl.textContent = postalCode;

}
});


//Displays the location of the store at the bottom
function initMap(){
  document.getElementById("map").display
    var location = {lat: 43.659815, lng: -79.408903}
    var map = new google.maps.Map(document.getElementById("map"),{
      zoom: 4,
      center: location
    });
    var marker = new google.maps.Marker({
      position: location,
      map: map
    });
    
  }
  initMap();
});