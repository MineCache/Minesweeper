var mouseX;
var mouseY;
var width;
var height;

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
    mouseX = e.pageX;
    //console.log(mouseX);
    mouseY = e.pageY;
});
