var mouseX, mouseY;
var width, height;
var gamebox = document.getElementById("game");






document.getElementById("start").addEventListener('click',start);
document.getElementById("pause").addEventListener('click',pause);
document.getElementById("resume").addEventListener('click',resume);

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
