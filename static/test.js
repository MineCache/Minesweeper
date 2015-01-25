//var correct = 3
var correct = [3,4,5];
var found = false;
var lat,lng;
var latrange,lngrange;
var numMines;
var newLat, newLng;
var mineLat = [];
var mineLng = [];
var flagLat = [];
var flagLng = [];
var topright,topleft,botright,botleft;
var dist;
var least;

var submitCallback = function()
{
    var input = document.getElementById("in");
    var out = document.getElementById("out");
    var points = document.getElementById("points");

    var guess = input.value;
    var output = "You guessed: " + guess + "<br>";
    for (var i = 0; i < correct.length; i++){
	if (guess == correct[i]){
	    found = true;
	    output += "You are correct! :D";
	}
    }
    if (found) {
	var points = document.getElementById("points");
	points.setAttribute("value", parseInt(points.getAttribute("value")) + 1);
	points.setAttribute("size", points.getAttribute("value").toString().length);
    }
    else {
	output += "You are incorrect! D:";
    }
    out.innerHTML = output;
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
}    

function getDistance(myL,myLn,l,ln)
{
    dist = Math.sqrt(Math.pow(myL-l,2)+Math.pow(myLn-ln,2));
}

function checkClosest()
{
    for (var i = 0;i<numMines;i++){
	getDistance(lat,lng,mineLat[i],mineLng[i]);
	var d = dist;
	if (i == 0) {
	    least = i;
	}
	else if (d < getDistance(lat,lng,mineLat[least],mineLng[least])) {
	    least = i;
	}
    }
}

function placeFlag(fLat,fLng)
{
    flagLat.push(fLat);
    flagLng.push(fLng);
}

function onMine(){
    if (lat in mineLat && lng in mineLng){
	for (var i = 0; i < mineLat.length; i++){
	    if (mineLat[i] == lat && mineLng[i] == lng){
		return true;
	    }
	}
    }
    return false;
}

	    
var submit = document.getElementById("submit");
submit.addEventListener("click", submitCallback);
submit.addEventListener("click", getLocation);
