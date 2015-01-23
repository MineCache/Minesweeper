//var correct = 3
var correct = [3,4,5];
var found = false;

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
	    var lat = position.coords.latitude;
	    var lng = position.coords.longitude;
	    l.innerHTML = "Latitude: " + lat + "<br>Longitude: " + lng;
	});
    }
    else {
	l.innerHTML = "Geolocation is not supported by this browser.";
    }
}

//console.log(navigator.geolocation);

var submit = document.getElementById("submit");
submit.addEventListener("click", submitCallback);
submit.addEventListener("click", getLocation);
