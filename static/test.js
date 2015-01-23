//var correct = 3
var correct = [3,4,5];
var found = false;
var lat,lng;
var latrange,lngrange;
var numMines;
var newLat, newLng;
var mineLat = [];
var mineLng = [];
var topright,topleft,botright,botleft;


var submitCallback = function()
{
    var input = document.getElementById("in");
    var out = document.getElementById("out");

    var guess = input.value;
    var output = "You guessed: " + guess + "<br>";
    for (var i = 0; i < correct.length; i++){
	if (guess == correct[i]){
	    found = true;
	    output += "You are correct! :D";
	}
    }
    var points = document.getElementById("points");
    if (found) {
	points.setAttribute("data-points", points.getAttribute("data-points") + 1);
	out.innerHTML = output;
    }
    else {
	output += "You are incorrect! D:";	
	out.innerHTML = output;
    }
    found = false;

    //output += (guess == correct) ? 
	//"You are correct! :D" :
	//"You are incorrect! D:";
    //out.innerHTML = output;
}

var l = document.getElementById("location");

function getLocation()
{
    if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(function(position){
	    lat = position.coords.latitude;
	    lng = position.coords.longitude;
	    l.innerHTML = "Latitude: " + lat + "<br>Longitude: " + lng;
	});
    }
    else {
	l.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function createMine()
{
    var equals = true;
    while (equals) {
	var templat = Math.floor(Math.random() * latrange);
	if (templat - lat != 0){
	    newLat = templat;
	    equals = false;
	}
    }
    equals = true;
    while (equals) {
	var templng = Math.floor(Math.random() * lngrange);
	if (templng - lng != 0){
	    newLng = templng;
	    equals = false;
	}
    }
}
    
function mineGenerator()
{
    for(var i = 0, i < numMines, i++){
	createMine();
	mineLat.push(newLat);
	mineLng.push(newLng);
}

function getDistance(a,b,)
{
    
	

var submit = document.getElementById("submit");
submit.addEventListener("click", submitCallback);
submit.addEventListener("click", getLocation);
