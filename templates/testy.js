var mines = [3,4,5,7,8];
var yn = true;
var c = document.getElementById("coord");
for(i=0;i<mines.length;i++){
    if (c == mines[i]){ 
	yn = true;
    }
    else{
	yn = false;
    }
}

var check = function(){
    if (yn == true){
	print "yes";
    }
    else{
	print "no";
    }
}

submit.addEventListener('click',check);
