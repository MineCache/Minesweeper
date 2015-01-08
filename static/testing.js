var mouseX;
var mouseY;
var width;
var height;







document.getElementById("start").addEventListener('click',start);
document.getElementById("pause").addEventListener('click',pause);
document.getElementById("resume").addEventListener('click',resume);

window.addEventListener('mousemove',function(e){
    mouseX = e.pageX;
    //console.log(mouseX);
    mouseY = e.pageY;
});
