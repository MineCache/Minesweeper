var correct = 3;

var submitCallback = function()
{
    var input = document.getElementById("in");
    var out = document.getElementById("out");

    var guess = input.value;
    var output = "You guessed: " + guess + "<br>";
    output += (guess == correct) ? 
	"You are correct! :D" :
	"You are incorrect! D:";
    out.innerHTML = output;
}

var submit = document.getElementById("submit");
submit.addEventListener("click", submitCallback);
