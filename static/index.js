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

document.getElementById("start").addEventListener('click',startCallback);
document.getElementById("about").addEventListener('click',aboutCallback);

window.addEventListener('mousemove',function(e){
    mouseX = e.pageX;
    //console.log(mouseX);
    mouseY = e.pageY;
});
