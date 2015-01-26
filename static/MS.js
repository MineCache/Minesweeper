var latitude = 0;
var longitude = 0;
var currLatitude = 0;
var currLongitude = 0;
preUpdateLat = 0;
preUpdateLong = 0;
var newPage = document.getElementsByName("newPage")[0];
var arena;
var explored;
var currentPosition = [0,0];
//ARG I TRIED IDK WHY THE PAGE KEEPS REFRESHING AND THE JS REFRESHES
//var vis = 'hidden';
var vis = 'visible';

document.getElementById("bawx").style.margin = screen.height / 16 + "px " + screen.width / 4 + "px " + screen.height / 16 + "px " + screen.width / 4 + "px" ;
document.getElementById("bawx2").style.margin = screen.height / 16 + "px " + screen.width / 1.75 + "px " + screen.height / 16 + "px " + screen.width / 12 + "px" ;

document.getElementById("game").style.margin = screen.width / 18 + "px";
document.getElementById("game").style.width = 0.8 * screen.width + "px";
document.getElementById("game").style.height = 0.7 * screen.height + "px";

window.addEventListener('mousemove', function(e){
    if (vis == 'visible'){
	vis = vis;
    }
    document.getElementById("ms").style.visibility = vis;
    //window.removeEventListener('mousemove', onetime);
    console.log(vis);
    //return;
    //document.getElementById("game").style.background = "black";
});

document.getElementById("start").addEventListener('click', function(){
    vis = 'visible';
    //console.log(vis);
    document.getElementById("ms").style.visibility = 'visible';
    window.removeEventListener('mousemove');
    //DOESNT REALLY WORK CUZ PAGE REFRESHES
    document.getElementById("game").style.background = "black";
    //return;
}
);				

function getArenaSize(){
    var form = document.getElementsByName("getCoords")[0];
    latitude = form.latitude.value;
    longitude = form.longitude.value;
    currentPosition[0] = Math.floor(Math.random() * (latitude));
    currentPosition[1] = Math.floor(Math.random() * (longitude));
    form.parentNode.removeChild(form);
    var flagBtn = document.createElement("button");
    var flagText = document.createTextNode("Place a flag here");
    flagBtn.appendChild(flagText);
    var mineBtn = document.createElement("button");
    var mineText = document.createTextNode("Check if this is a mine");
    mineBtn.appendChild(mineText);
    var onClickMine = document.createAttribute("onclick");
    onClickMine.value = "isMine()";
    mineBtn.setAttributeNode(onClickMine);
    var onClickFlag = document.createAttribute("onclick");
    onClickFlag.value = "placeFlag()";
    flagBtn.setAttributeNode(onClickFlag);
    newPage.appendChild(flagBtn);
    newPage.appendChild(mineBtn);
    newPage.appendChild(document.createElement("br"));
    arena = generateMines();
    updateWrapper();
    return false;
}

function updatePositions(){
    updateLat();
    updateLong();
}

function updateWrapper(){
    setInterval(updatePositions, 1000); 
    iniMap();
}

function updateLong(){
    navigator.geolocation.getCurrentPosition(getLongitude);
    if(preUpdateLong == 0){
        preUpdateLong = currLongitude;
        if(preUpdateLong != 0){
            var longPara = document.createElement("p");
            var name = document.createAttribute("name");
            name.value = "long";
            longPara.setAttributeNode(name);
            var longText = document.createTextNode("Current longitude: " + currLongitude);
            longPara.appendChild(longText);
            newPage.insertBefore(longPara, document.getElementsByName("arena")[0]);
        }
        return;
    }
    if(Math.abs(preUpdateLong) - Math.abs(currLongitude) > 1.1){
        preUpdateLong = currLongitude;
        currentPosition[1]++;
    }
    else if(Math.abs(preUpdateLong) - Math.abs(currLongitude) < -1.1){
        preUpdateLong = currLongitude;
        currentPosition[1]--;
    }
    else{
        return;
    }
    if(document.getElementsByName("long")[0] != null){
        newPage.removeChild(document.getElementsByName("long")[0]);
    }
    var longPara = document.createElement("p");
    var name = document.createAttribute("name");
    name.value = "long";
    longPara.setAttributeNode(name);
    var longText = document.createTextNode("Current longitude: " + currLongitude);
    longPara.appendChild(longText);
    newPage.appendChild(longPara);
    if(document.getElementsByName("arena")[0] != null){
        newPage.removeChild(document.getElementsByName("arena")[0]);
    }
    updateMap();
}

function updateLat(){
    navigator.geolocation.getCurrentPosition(getLatitude);
    if(preUpdateLat == 0){
        preUpdateLat = currLatitude;
        if(preUpdateLat != 0){
            var latPara = document.createElement("p");
            var name = document.createAttribute("name");
            name.value = "lat";
            latPara.setAttributeNode(name);
            var latText = document.createTextNode("Current latitude: " + currLatitude);
            latPara.appendChild(latText);
            newPage.insertBefore(latPara, document.getElementsByName("arena")[0]);
        }
        return;
    }
    if(Math.abs(preUpdateLat) - Math.abs(currLatitude) > 1.1){
        preUpdateLat = currLatitude;
        currentPosition[0]++;
    }
    else if(Math.abs(preUpdateLat) - Math.abs(currLatitude) < -1.1){
        preUpdateLat = currLatitude;
        currentPosition[1]--;
    }
    else{
        return;
    }
    if(document.getElementsByName("lat")[0] != null){
        newPage.removeChild(document.getElementsByName("lat")[0]);
    }
    var latPara = document.createElement("p");
    var name = document.createAttribute("name");
    name.value = "lat";
    latPara.setAttributeNode(name);
    var latText = document.createTextNode("Current latitude: " + currLatitude);
    latPara.appendChild(latText);
    newPage.appendChild(latPara);
    if(document.getElementsByName("arena")[0] != null){
        newPage.removeChild(document.getElementsByName("arena")[0]);
    }
    updateMap();
}

function createPicture(mapPara, pic){
    var arenaPic = document.createElement("img");
    var arenaPicSrc = document.createAttribute("src");
    if(pic == -1){
        arenaPicSrc.value = "/static/Flag.jpg";
    }
    else if(pic == 0){
        arenaPicSrc.value = "/static/Blank.jpg";
    }
    else if(pic == 1){
        arenaPicSrc.value = "/static/Mine.jpg";
    }
    else if(pic == 2){
        arenaPicSrc.value = "/static/Checked.jpg";
    }
    arenaPic.setAttributeNode(arenaPicSrc);
    var arenaPicStyle = document.createAttribute("style");
    arenaPicStyle.value = "width:10px;height:10px";
    arenaPic.setAttributeNode(arenaPicStyle);
    mapPara.appendChild(arenaPic);
    mapPara.appendChild(document.createTextNode(" "));
    return mapPara;
}

function iniMap(){
    var mapPara = document.createElement("p");
    var name = document.createAttribute("name");
    name.value = "arena";
    mapPara.setAttributeNode(name);
    for(var lat = 0; lat < latitude; lat++){
        for(var long = 0; long < longitude; long++){
            mapPara = createPicture(mapPara, 0);
        }
        mapPara.appendChild(document.createElement("br"));
    }
    newPage.appendChild(mapPara);
}

function updateMap(){
    var mapPara = document.createElement("p");
    var name = document.createAttribute("name");
    name.value = "arena";
    mapPara.setAttributeNode(name);
    for(var lat = 0; lat < latitude; lat++){
        for(var long = 0; long < longitude; long++){
            if(explored[lat][long] == 1){
                mapPara = createPicture(mapPara, arena[lat][long]);
            }
            else{
                mapPara = createPicture(mapPara, 0);
            }
        }
        mapPara.appendChild(document.createElement("br"));
    }
    newPage.appendChild(mapPara);
}

function getLongitude(position){
    currLongitude = Math.round(position.coords.longitude * 100000) / 100000;
}

function getLatitude(position){
    currLatitude = Math.round(position.coords.latitude * 100000) / 100000;
}

function floatToInt(value){
    return value | 0;
}

function placeFlag(){
    explored[currentPosition[0]][currentPosition[1]] = 1;
    if(arena[currentPosition[0]][currentPosition[1]] != -1){
        alert("You place a flag");
        arena[currentPosition[0]][currentPosition[1]] = -1;
        if(document.getElementsByName("arena")[0] != null){
            newPage.removeChild(document.getElementsByName("arena")[0]);
        }
        updateMap();
    }
    else{
        alert("There is already a flag there");
    }
}

function isMine(){
    explored[currentPosition[0]][currentPosition[1]] = 1;
    if(arena[currentPosition[0]][currentPosition[1]] == 1){
        alert("BOOM!");
        arena[currentPosition[0]][currentPosition[1]] = 1;
    }
    else{
        arena[currentPosition[0]][currentPosition[1]] = 2;
    }
    if(document.getElementsByName("arena")[0] != null){
        newPage.removeChild(document.getElementsByName("arena")[0]);
    }
    updateMap();
}

function generateMines(){
    var arenaLocal = [];
    explored = [];
    for(var iter = 0; iter < longitude; iter++){
        arenaLocal[iter] = [];
        explored[iter] = [];
    }
    for(var lat = 0; lat < latitude; lat++){
        for(var long = 0; long < longitude; long++){
            if(Math.floor(Math.random() * (longitude*latitude)) < (longitude*latitude)/3){
                arenaLocal[lat][long] = 1;
            }
            else{
                arenaLocal[lat][long] = 0;
            }
            explored[lat][long] = 0;
        }
    }
    return arenaLocal;
}
