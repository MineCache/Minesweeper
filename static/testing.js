var mouseX, mouseY;
var gamebox = document.getElementById("game");
var go = false;


document.getElementById("game").style.width = 0.8 * screen.width + "px";
document.getElementById("game").style.height = 0.7 * screen.height + "px";


document.getElementById("game").style.margin = screen.height / 18 + "px";
document.getElementById("game").style.width = 0.8 * screen.width + "px";
document.getElementById("game").style.height = 0.7 * screen.height + "px";

document.getElementById("start").addEventListener('click',start);
document.getElementById("pause").addEventListener('click',pause);
document.getElementById("resume").addEventListener('click',resume);

function start(){
    go = true;
    //call other things
}

function pause(){
    go = false;
}

function resume(){
    go = true;
}



window.addEventListener('mousemove',function(e){
    mouseX = e.pageX - gamebox.offsetLeft;
    if (mouseX >= 0 && mouseX <=1200){
	//function to check relative mine location
	//console.log(mouseX);
    }
    mouseY = e.pageY - gamebox.offsetTop;
    if (mouseY >=0 && mouseY <=600){
	//function to check relative mine location
	//console.log(mouseY);
    }
});
