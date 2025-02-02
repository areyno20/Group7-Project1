$(function(){

// Calculate total cost of products
function totalCost (){
  
  let productPrice={
    cake: 30,
    muffins: 15,
    donuts: 10,
    croissants: 5
  }
  
  let itemPrice = {}

  itemPrice.cake = ($("#cakequantity").val() * productPrice.cake)
  itemPrice.muffins = ($("#muffinsquantity").val() * productPrice.muffins)
  itemPrice.donuts = ($("#donutsquantity").val() * productPrice.donuts)
  itemPrice.croissants = ($("#croissantsquantity").val() * productPrice.croissants)

  let total = itemPrice.cake + itemPrice.muffins + itemPrice.donuts + itemPrice.croissants;

  console.log(total)
  $("#totalorder").text(total);
}

$(function()
 {
    $(".quantity").on("change keyup", totalCost)
})
  
  // Google Travel Time API 
  var destination = '33 Ulster St, Toronto, Ontario';
  
  function travelTime (origin, destination) {
  var origin = `${localStorage.getItem("street-address")}, ${localStorage.getItem("city")}, ${localStorage.getItem("region")}`;
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
    $('#formModal-title').text(`Estimated Travel Time from ${origin} to Fresh Bakery`);
    $('#formModal-p').text(`${duration}`);
  }}
  
  // Pass order form values to local storage 
  const checkoutButton = document.getElementById("checkout");
  
  checkoutButton.addEventListener("click", function(event){
    event.preventDefault();
  
    document.getElementById("formModal").classList.remove("modalDisplay");

    var firstnameStorage = document.getElementById("first-name");
    var lastnameStorage = document.getElementById("last-name");
    var emailAddressStorage = document.getElementById("email-address");
    var streetAddressStorage = document.getElementById("street-address");
    var countryStorage = document.getElementById("country");
    var cityStorage = document.getElementById("city");
    var provinceStorage = document.getElementById("region");
    var postalCodeStorage = document.getElementById("postal-code");
    
    console.log(firstnameStorage.value, lastnameStorage.value, emailAddressStorage.value, streetAddressStorage.value);

    localStorage.setItem("first-name", firstnameStorage.value);
    localStorage.setItem("last-name", lastnameStorage.value);
    localStorage.setItem("email-address", emailAddressStorage.value);
    localStorage.setItem("country", countryStorage.value);
    localStorage.setItem("street-address", streetAddressStorage.value);
    localStorage.setItem("city", cityStorage.value);
    localStorage.setItem("region", provinceStorage.value);
    localStorage.setItem("postal-code", postalCodeStorage.value);

    if(firstnameStorage.value === '' || 
      lastnameStorage.value === '' || 
      emailAddressStorage.value === '' || 
      streetAddressStorage.value === '' || 
      cityStorage.value === '' || 
      postalCodeStorage.value === '') {
      $('#formModal-title').text(`Please Complete the Entire Form!`);
      $('#formModal-p').text(``);
    } else {
      travelTime(origin,destination);
    }

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
        zoom: 16,
        center: location
      });
      var marker = new google.maps.Marker({
        position: location,
        map: map
      });
      
    }
    initMap();

//Autocomplete API for address
// let autocomplete;

// function initAutocomplete () {
//   autocomplete = new google.maps.places.Autocomplete(
//     document.getElementById('street-address'),
//   {
//     types:['establistment'],
//     componentRestrictions:{'country' : ['CA']},
//     fields: ['place_id', 'geometry', 'name']
//   });


//google.maps.event.addDomListener(window, 'load', initAutocomplete);

// Wikipedia API to grab plain text
function wikipediaText(requestUrl) {
  var apiInfo, productInfo;
  const title = document.getElementById('modal-title');
  const para = document.getElementById('modal-p');
  fetch(requestUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    apiInfo = data.query.pages;
    productInfo = apiInfo[Object.keys(apiInfo)[0]];
    console.log(productInfo.extract);
    title.innerHTML = (productInfo.title);
    para.innerHTML = (productInfo.extract);
  });
}

// Modals for Product Descriptions
// $("a").on("click", function(auto){
//   auto.preventDefault();
// });

document.getElementById("blackForestCake").addEventListener("click", function(event) {
  event.preventDefault();
  let requestUrl = 'https://en.wikipedia.org/w/api.php?origin=*&format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=Black_Forest_gateau';
  wikipediaText(requestUrl);
  document.getElementById("productModal").classList.remove("modalDisplay");
});

document.getElementById("crumbCake").addEventListener("click", function(event) {
  event.preventDefault();
  let requestUrl = 'https://en.wikipedia.org/w/api.php?origin=*&format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=Streuselkuchen';
  wikipediaText(requestUrl);
    document.getElementById("productModal").classList.remove("modalDisplay");
});

document.getElementById("franzbrotchen").addEventListener("click", function(event) {
  event.preventDefault();
  let requestUrl = 'https://en.wikipedia.org/w/api.php?origin=*&format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=Franzbrötchen';
  wikipediaText(requestUrl);
  document.getElementById("productModal").classList.remove("modalDisplay");
});

document.getElementById("berliner").addEventListener("click", function(event) {
  event.preventDefault();
  let requestUrl = 'https://en.wikipedia.org/w/api.php?origin=*&format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=Berliner_(doughnut)';
  wikipediaText(requestUrl);
  document.getElementById("productModal").classList.remove("modalDisplay");
});

document.getElementById("productModal").addEventListener("click", function() {
  document.getElementById("productModal").classList.add("modalDisplay");
});

document.getElementById("formModal").addEventListener("click", function() {
  document.getElementById("formModal").classList.add("modalDisplay");
});

});

