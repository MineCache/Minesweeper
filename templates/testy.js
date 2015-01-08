var mines = [3,4,5,7,8];
var yn = true;
var c = document.getElementById("coord");

var check = function(e){
    for(i=0;i<mines.length;i++){
	if (c == mines[i]){ 
	    yn = true;
	}
	else{
	    yn = false;
	}
    }
    if (yn == true){
	console.log("yes");
    }
    else{
	console.log("no");
    }
}

document.getElementById("submit").addEventListener('click',check);

window.addEventListener('mousemove',function(e){
    console.log("hello");
});
