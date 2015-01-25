var mouseX, mouseY;
var gamebox = document.getElementById("game");
var go = false;


document.getElementById("bawx").style.margin = screen.height / 16 + "px " + screen.width / 4 + "px " + screen.height / 16 + "px " + screen.width / 4 + "px" ;
document.getElementById("bawx2").style.margin = screen.height / 16 + "px " + screen.width / 1.75 + "px " + screen.height / 16 + "px " + screen.width / 12 + "px" ;

document.getElementById("game").style.margin = screen.width / 18 + "px";
document.getElementById("game").style.width = 0.8 * screen.width + "px";
document.getElementById("game").style.height = 0.7 * screen.height + "px";

var startCallback = function(){
    window.location.href = "test";
}

var aboutCallback = function(){
    window.location.href = "about";
}

var loginCallback = function(){
    window.location.href = "login";
}

document.getElementById("start").addEventListener('click',startCallback);
document.getElementById("about").addEventListener('click',aboutCallback);
document.getElementById("login").addEventListener('click',loginCallback);

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
