let speedChecked = document.getElementById("speed-check");
let speed = document.getElementById("speed");
let speedBox = document.getElementById("speed-box");
let speedBoxOne = document.getElementById("speed-box-1");
let speedBoxTwo = document.getElementById("speed-box-2");

let accelationBox = document.getElementById("acceleration-box");
let accelationBoxOne = document.getElementById("acceleration-box-1");
let accelationBoxTwo = document.getElementById("acceleration-box-2");
let accelationCheck = document.getElementById("acceleration-check");

let gyroscopeBox = document.getElementById("gyroscope-box");
let gyroscopeBoxOne = document.getElementById("gyroscope-box-1");
let gyroscopeBoxTwo = document.getElementById("gyroscope-box-2");
let gyroscopeCheck = document.getElementById("gyroscope-check");

let magnetometerBox = document.getElementById("magnetometer-box");
let magnetometerBoxOne = document.getElementById("magnetometer-box-1");
let magnetometerBoxTwo = document.getElementById("magnetometer-box-2");
let magnetometerCheck = document.getElementById("magnetometer-check");

let orientationBox = document.getElementById("orientation-box");
let orientationBoxOne = document.getElementById("orientation-box-1");
let orientationBoxTwo = document.getElementById("orientation-box-2");
let orientationCheck = document.getElementById("orientation-check");


let enerygyBox = document.getElementById("energy-spent-box");
let enerygyBoxOne = document.getElementById("energy-spent-box-1");
let enerygyBoxTwo = document.getElementById("energy-spent-box-2");
let enerygyCheck = document.getElementById("energy-spent-check");

let distanceBox = document.getElementById("distance-box");
let distanceBoxOne = document.getElementById("distance-box-1");
let distanceBoxTwo = document.getElementById("distance-box-2");
let distanceCheck = document.getElementById("distance-check");

let temparatureBox = document.getElementById("temparature-box");
let temparatureBoxOne = document.getElementById("temparature-box-1");
let temparatureBoxTwo = document.getElementById("temparature-box-2");
let temparatureCheck = document.getElementById("temparature-check");

let pressureBox = document.getElementById("pressure-box");
let pressureBoxOne = document.getElementById("pressure-box-1");
let pressureBoxTwo = document.getElementById("pressure-box-2");
let pressureCheck = document.getElementById("pressure-check");

let humidityBox = document.getElementById("humidity-box");
let humidityBoxOne = document.getElementById("humidity-box-1");
let humidityBoxTwo = document.getElementById("humidity-box-2");
let humidityCheck = document.getElementById("humidity-check");

let lightBox = document.getElementById("light-box");
let lightBoxOne = document.getElementById("light-box-1");
let lightBoxTwo = document.getElementById("light-box-2");
let lightCheck = document.getElementById("light-check");

speedChecked.onchange = function(){
    console.log(speedChecked.checked)
    if(speedChecked.checked){
        speedBox.style.display = "block";
        speedBoxOne.style.display = "block";
        speedBoxTwo.style.display = "block";
        slideOne();
        slideTwo();
        
    }else {
        speedBox.style.display = "none";
        speedBoxOne.style.display = "none";
        speedBoxTwo.style.display = "none";
    }
}

accelationCheck.onchange = function(){
    console.log(accelationCheck.checked)
    if(accelationCheck.checked){
        accelationBox.style.display = "block";
        accelationBoxOne.style.display = "block";
        accelationBoxTwo.style.display = "block";
        slideOne();
        slideTwo();
        
        
    }else {
        accelationBox.style.display = "none";
        accelationBoxOne.style.display = "none";
        accelationBoxTwo.style.display = "none";
    }
}

gyroscopeCheck.onchange = function(){
    console.log(gyroscopeCheck.checked)
    if(gyroscopeCheck.checked){
        gyroscopeBox.style.display = "block";
        gyroscopeBoxOne.style.display = "block";
        gyroscopeBoxTwo.style.display = "block";
        slideOne();
        slideTwo();
        
    }else {
        gyroscopeBox.style.display = "none";
        gyroscopeBoxOne.style.display = "none";
        gyroscopeBoxTwo.style.display = "none";
    }
}

magnetometerCheck.onchange = function(){
    console.log(magnetometerCheck.checked)
    if(magnetometerCheck.checked){
        magnetometerBox.style.display = "block";
        magnetometerBoxOne.style.display = "block";
        magnetometerBoxTwo.style.display = "block";
        slideOne();
        slideTwo();
        
    }else {
        magnetometerBox.style.display = "none";
        magnetometerBoxOne.style.display = "none";
        magnetometerBoxTwo.style.display = "none";
    }
}

orientationCheck.onchange = function(){
    console.log(orientationCheck.checked)
    if(orientationCheck.checked){
        orientationBox.style.display = "block";
        orientationBoxOne.style.display = "block";
        orientationBoxTwo.style.display = "block";
        slideOne();
        slideTwo();
        
    }else {
        orientationBox.style.display = "none";
        orientationBoxOne.style.display = "none";
        orientationBoxTwo.style.display = "none";
    }
}



enerygyCheck.onchange = function(){
    console.log(enerygyCheck.checked)
    if(enerygyCheck.checked){
        enerygyBox.style.display = "block";
        enerygyBoxOne.style.display = "block";
        enerygyBoxTwo.style.display = "block";
        slideOne();
        slideTwo();
        
    }else {
        enerygyBox.style.display = "none";
        enerygyBoxOne.style.display = "none";
        enerygyBoxTwo.style.display = "none";
    }
}

distanceCheck.onchange = function(){
    console.log(distanceCheck.checked)
    if(distanceCheck.checked){
        distanceBox.style.display = "block";
        distanceBoxOne.style.display = "block";
        distanceBoxTwo.style.display = "block";

        slideOne();
        slideTwo();
        
    }else {
        distanceBox.style.display = "none";
        distanceBoxOne.style.display = "none";
        distanceBoxTwo.style.display = "none";

    }
}

temparatureCheck.onchange = function(){
    console.log(temparatureCheck.checked)
    if(temparatureCheck.checked){
        temparatureBox.style.display = "block";
        temparatureBoxOne.style.display = "block";
        temparatureBoxTwo.style.display = "block";

        slideOne();
        slideTwo();
        
    }else {
        temparatureBox.style.display = "none";
        temparatureBoxOne.style.display = "none";
        temparatureBoxTwo.style.display = "none";

    }
}

pressureCheck.onchange = function(){
    console.log(pressureCheck.checked)
    if(pressureCheck.checked){
        pressureBox.style.display = "block";
        pressureBoxOne.style.display = "block";
        pressureBoxTwo.style.display = "block";

        slideOne();
        slideTwo();
        
    }else {
        pressureBox.style.display = "none";
        pressureBoxOne.style.display = "none";
        pressureBoxTwo.style.display = "none";

    }
}

humidityCheck.onchange = function(){
    console.log(humidityCheck.checked)
    if(humidityCheck.checked){
        humidityBox.style.display = "block";
        humidityBoxOne.style.display = "block";
        humidityBoxTwo.style.display = "block";
        slideOne();
        slideTwo();
        
    }else {
        humidityBox.style.display = "none";
        humidityBoxOne.style.display = "none";
        humidityBoxTwo.style.display = "none";

    }
}

lightCheck.onchange = function(){
    console.log(lightCheck.checked)
    if(lightCheck.checked){
        lightBox.style.display = "block";
        lightBoxOne.style.display = "block";
        lightBoxTwo.style.display = "block";
        slideOne();
        slideTwo();
        
    }else {
        lightBox.style.display = "none";
        lightBoxOne.style.display = "none";
        lightBoxTwo.style.display = "none";
    }
}   


// slider 

// Updating single-axis attributes
// Assigning variables to access the html elements
let distanceSliderOne = document.getElementById("distance-slider-1");
let distanceSliderTwo = document.getElementById("distance-slider-2");
let distDisplayValOne = document.getElementById("distance-range1");
let distDisplayValTwo = document.getElementById("distance-range2");

let energySliderOne = document.getElementById("energy-slider-1");
let energySliderTwo = document.getElementById("energy-slider-2");
let energyDisplayValOne = document.getElementById("energy-range1");
let energyDisplayValTwo = document.getElementById("energy-range2");

let speedSliderOne = document.getElementById("speed-slider-1");
let speedSliderTwo = document.getElementById("speed-slider-2");
let speedDisplayValOne = document.getElementById("speed-range1");
let speedDisplayValTwo = document.getElementById("speed-range2");

let tempSliderOne = document.getElementById("temp-slider-1");
let tempSliderTwo = document.getElementById("temp-slider-2");
let tempDisplayValOne = document.getElementById("temp-range1");
let tempDisplayValTwo = document.getElementById("temp-range2");

let pressureSliderOne = document.getElementById("pressure-slider-1");
let pressureSliderTwo = document.getElementById("pressure-slider-2");
let pressureDisplayValOne = document.getElementById("pressure-range1");
let pressureDisplayValTwo = document.getElementById("pressure-range2");

let humiditySliderOne = document.getElementById("humidity-slider-1");
let humiditySliderTwo = document.getElementById("humidity-slider-2");
let humidityDisplayValOne = document.getElementById("humidity-range1");
let humidityDisplayValTwo = document.getElementById("humidity-range2");

let lightSliderOne = document.getElementById("light-slider-1");
let lightSliderTwo = document.getElementById("light-slider-2");
let lightDisplayValOne = document.getElementById("light-range1");
let lightDisplayValTwo = document.getElementById("light-range2");

let accXSliderOne = document.getElementById("accX-slider-1");
let accXSliderTwo = document.getElementById("accX-slider-2");
let accXDisplayValOne = document.getElementById("accX-range1");
let accXDisplayValTwo = document.getElementById("accX-range2");

let accYSliderOne = document.getElementById("accY-slider-1");
let accYSliderTwo = document.getElementById("accY-slider-2");
let accYDisplayValOne = document.getElementById("accY-range1");
let accYDisplayValTwo = document.getElementById("accY-range2");

let accZSliderOne = document.getElementById("accZ-slider-1");
let accZSliderTwo = document.getElementById("accZ-slider-2");
let accZDisplayValOne = document.getElementById("accZ-range1");
let accZDisplayValTwo = document.getElementById("accZ-range2");

let gyroXSliderOne = document.getElementById("gyroX-slider-1");
let gyroXSliderTwo = document.getElementById("gyroX-slider-2");
let gyroXDisplayValOne = document.getElementById("gyroX-range1");
let gyroXDisplayValTwo = document.getElementById("gyroX-range2");

let gyroYSliderOne = document.getElementById("gyroY-slider-1");
let gyroYSliderTwo = document.getElementById("gyroY-slider-2");
let gyroYDisplayValOne = document.getElementById("gyroY-range1");
let gyroYDisplayValTwo = document.getElementById("gyroY-range2");

let gyroZSliderOne = document.getElementById("gyroZ-slider-1");
let gyroZSliderTwo = document.getElementById("gyroZ-slider-2");
let gyroZYDisplayValOne = document.getElementById("gyroZ-range1");
let gyroZDisplayValTwo = document.getElementById("gyroZ-range2");

let magXSliderOne = document.getElementById("magX-slider-1");
let magXSliderTwo = document.getElementById("magX-slider-2");
let magXDisplayValOne = document.getElementById("magX-range1");
let magXDisplayValTwo = document.getElementById("magX-range2");

let magYSliderOne = document.getElementById("magY-slider-1");
let magYSliderTwo = document.getElementById("magY-slider-2");
let magYDisplayValOne = document.getElementById("magY-range1");
let magYDisplayValTwo = document.getElementById("magY-range2");

let magZSliderOne = document.getElementById("magZ-slider-1");
let magZSliderTwo = document.getElementById("magZ-slider-2");
let magZDisplayValOne = document.getElementById("magZ-range1");
let magZDisplayValTwo = document.getElementById("magZ-range2");

let orienXSliderOne = document.getElementById("orienX-slider-1");
let orienXSliderTwo = document.getElementById("orienX-slider-2");
let orienXDisplayValOne = document.getElementById("orienX-range1");
let orienXDisplayValTwo = document.getElementById("orienX-range2");

let orienYSliderOne = document.getElementById("orienY-slider-1");
let orienYSliderTwo = document.getElementById("orienY-slider-2");
let orienYDisplayValOne = document.getElementById("orienY-range1");
let orienYDisplayValTwo = document.getElementById("orienY-range2");

let orienZSliderOne = document.getElementById("orienZ-slider-1");
let orienZSliderTwo = document.getElementById("orienZ-slider-2");
let orienZDisplayValOne = document.getElementById("orienZ-range1");
let orienZDisplayValTwo = document.getElementById("orienZ-range2");

let minGap = 0;
let distSliderTrack = document.querySelector(".slider-track");
let energySliderTrack = document.querySelector(".slider-track1");
let speedSliderTrack = document.querySelector(".slider-track2");
let tempSliderTrack = document.querySelector(".slider-track3");
let pressureSliderTrack = document.querySelector(".slider-track4");
let humiditySliderTrack = document.querySelector(".slider-track5");
let lightSliderTrack = document.querySelector(".slider-track6");
let accXSliderTrack = document.querySelector(".slider-track7");
let accYSliderTrack = document.querySelector(".slider-track8");
let accZSliderTrack = document.querySelector(".slider-track9");
let gyroXSliderTrack = document.querySelector(".slider-track10");
let gyroYSliderTrack = document.querySelector(".slider-track11");
let gyroZSliderTrack = document.querySelector(".slider-track12");
let magXSliderTrack = document.querySelector(".slider-track13");
let magYSliderTrack = document.querySelector(".slider-track14");
let magZSliderTrack = document.querySelector(".slider-track15");
let orienXSliderTrack = document.querySelector(".slider-track16");
let orienYSliderTrack = document.querySelector(".slider-track17");
let orienZSliderTrack = document.querySelector(".slider-track18");




let distSliderMaxValue = document.getElementById("distance-slider-1").max;
let energySliderMaxValue = document.getElementById("energy-slider-1").max;
let speedSliderMaxValue = document.getElementById("speed-slider-1").max;
let tempSliderMaxValue = document.getElementById("temp-slider-1").max;
let pressureSliderMaxValue = document.getElementById("pressure-slider-1").max;
let humiditySliderMaxValue = document.getElementById("humidity-slider-1").max;
let lightSliderMaxValue = document.getElementById("light-slider-1").max;
let accXSliderMaxValue = document.getElementById("accX-slider-1").max;
let accYSliderMaxValue = document.getElementById("accY-slider-1").max;
let accZSliderMaxValue = document.getElementById("accZ-slider-1").max;
let gyroXSliderMaxValue = document.getElementById("gyroX-slider-1").max;
let gyroYSliderMaxValue = document.getElementById("gyroY-slider-1").max;
let gyroZSliderMaxValue = document.getElementById("gyroZ-slider-1").max;
let magXSliderMaxValue = document.getElementById("magX-slider-1").max;
let magYSliderMaxValue = document.getElementById("magY-slider-1").max;
let magZSliderMaxValue = document.getElementById("magZ-slider-1").max;
let orienXSliderMaxValue = document.getElementById("orienX-slider-1").max;
let orienYSliderMaxValue = document.getElementById("orienY-slider-1").max;
let orienZSliderMaxValue = document.getElementById("orienZ-slider-1").max;





function slideOne(){
    if(parseInt(distanceSliderTwo.value) - parseInt(distanceSliderOne.value) <= minGap){
        distanceSliderOne.value = parseInt(distanceSliderTwo.value) - minGap;
    }
    else if(parseInt(energySliderTwo.value) - parseInt(energySliderOne.value) <= minGap){
        energySliderOne.value = parseInt(energySliderTwo.value) - minGap;
    }
    else if(parseInt(speedSliderTwo.value) - parseInt(speedSliderOne.value) <= minGap){
        speedSliderOne.value = parseInt(speedSliderTwo.value) - minGap;
    }
    else if(parseInt(tempSliderTwo.value) - parseInt(tempSliderOne.value) <= minGap){
        tempSliderOne.value = parseInt(tempSliderTwo.value) - minGap;
    }
    else if(parseInt(pressureSliderTwo.value) - parseInt(pressureSliderOne.value) <= minGap){
        pressureSliderOne.value = parseInt(pressureSliderTwo.value) - minGap;
    }
    else if(parseInt(humiditySliderTwo.value) - parseInt(humiditySliderOne.value) <= minGap){
        humiditySliderOne.value = parseInt(humiditySliderTwo.value) - minGap;
    }
    else if(parseInt(lightSliderTwo.value) - parseInt(lightSliderOne.value) <= minGap){
        lightSliderOne.value = parseInt(lightSliderTwo.value) - minGap;
    }
    else if(parseInt(accXSliderTwo.value) - parseInt(accXSliderOne.value) <= minGap){
        accXSliderOne.value = parseInt(accXSliderTwo.value) - minGap;
    }
    else if(parseInt(accYSliderTwo.value) - parseInt(accYSliderOne.value) <= minGap){
        accYSliderOne.value = parseInt(accYSliderTwo.value) - minGap;
    }
    else if(parseInt(accZSliderTwo.value) - parseInt(accZSliderOne.value) <= minGap){
        accZSliderOne.value = parseInt(accZSliderTwo.value) - minGap;
    }
    else if(parseInt(gyroXSliderTwo.value) - parseInt(gyroXSliderOne.value) <= minGap){
        gyroXSliderOne.value = parseInt(gyroXSliderTwo.value) - minGap;
    }
    else if(parseInt(gyroYSliderTwo.value) - parseInt(gyroYSliderOne.value) <= minGap){
        gyroYSliderOne.value = parseInt(gyroYSliderTwo.value) - minGap;
    }
    else if(parseInt(gyroZSliderTwo.value) - parseInt(gyroZSliderOne.value) <= minGap){
        gyroZSliderOne.value = parseInt(gyroZSliderTwo.value) - minGap;
    }
    else if(parseInt(magXSliderTwo.value) - parseInt(magXSliderOne.value) <= minGap){
        magXSliderOne.value = parseInt(magXSliderTwo.value) - minGap;
    }
    else if(parseInt(magYSliderTwo.value) - parseInt(magYSliderOne.value) <= minGap){
        magYSliderOne.value = parseInt(magYSliderTwo.value) - minGap;
    }
    else if(parseInt(magZSliderTwo.value) - parseInt(magZSliderOne.value) <= minGap){
        magZSliderOne.value = parseInt(magZSliderTwo.value) - minGap;
    }
    else if(parseInt(orienXSliderTwo.value) - parseInt(orienXSliderOne.value) <= minGap){
        orienXSliderOne.value = parseInt(orienXSliderTwo.value) - minGap;
    }
    else if(parseInt(orienYSliderTwo.value) - parseInt(orienYSliderOne.value) <= minGap){
        orienYSliderOne.value = parseInt(orienYSliderTwo.value) - minGap;
    }
    else if(parseInt(orienZSliderTwo.value) - parseInt(orienZSliderOne.value) <= minGap){
        orienZSliderOne.value = parseInt(orienZSliderTwo.value) - minGap;
    }
    distDisplayValOne.textContent = distanceSliderOne.value + " m";
    energyDisplayValOne.textContent = energySliderOne.value;
    speedDisplayValOne.textContent = speedSliderOne.value + " kmph";
    tempDisplayValOne.textContent = tempSliderOne.value + " °F";
    pressureDisplayValOne.textContent = pressureSliderOne.value+"psi" ;
    humidityDisplayValOne.textContent = humiditySliderOne.value +"%";
    lightDisplayValOne.textContent = lightSliderOne.value;
    accXDisplayValOne.textContent = accXSliderOne.value;
    accYDisplayValOne.textContent = accYSliderOne.value;
    accZDisplayValOne.textContent = accZSliderOne.value;
    gyroXDisplayValOne.textContent = gyroXSliderOne.value;
    gyroYDisplayValOne.textContent = gyroYSliderOne.value;
    gyroZYDisplayValOne.textContent = gyroZSliderOne.value;
    magXDisplayValOne.textContent = magXSliderOne.value;
    magYDisplayValOne.textContent = magYSliderOne.value;
    magZDisplayValOne.textContent = magZSliderOne.value;
    orienXDisplayValOne.textContent = orienXSliderOne.value;
    orienYDisplayValOne.textContent = orienYSliderOne.value;
    orienZDisplayValOne.textContent = orienZSliderOne.value;


    fillColor();
}
function slideTwo(){
    if(parseInt(distanceSliderTwo.value) - parseInt(distanceSliderOne.value) <= minGap){
        distanceSliderTwo.value = parseInt(distanceSliderOne.value) + minGap;
    }
    else if(parseInt(energySliderTwo.value) - parseInt(energySliderOne.value) <= minGap){
        energySliderTwo.value = parseInt(energySliderOne.value) + minGap;
    }
    else if(parseInt(speedSliderTwo.value) - parseInt(speedSliderOne.value) <= minGap){
        speedSliderTwo.value = parseInt(speedSliderOne.value) + minGap;
    }
    else if(parseInt(tempSliderTwo.value) - parseInt(tempSliderOne.value) <= minGap){
        tempSliderTwo.value = parseInt(tempSliderOne.value) + minGap;
    }
    else if(parseInt(pressureSliderTwo.value) - parseInt(pressureSliderOne.value) <= minGap){
        pressureSliderTwo.value = parseInt(pressureSliderOne.value) + minGap;
    }
    else if(parseInt(humiditySliderTwo.value) - parseInt(humiditySliderOne.value) <= minGap){
        humiditySliderTwo.value = parseInt(humiditySliderOne.value) + minGap;
    }
    else if(parseInt(lightSliderTwo.value) - parseInt(lightSliderOne.value) <= minGap){
        lightSliderTwo.value = parseInt(lightSliderOne.value) + minGap;
    }
    else if(parseInt(accXSliderTwo.value) - parseInt(accXSliderOne.value) <= minGap){
        accXSliderTwo.value = parseInt(accXSliderOne.value) + minGap;
    }
    else if(parseInt(accYSliderTwo.value) - parseInt(accYSliderOne.value) <= minGap){
        accYSliderTwo.value = parseInt(accYSliderOne.value) + minGap;
    }
    else if(parseInt(accZSliderTwo.value) - parseInt(accZSliderOne.value) <= minGap){
        accZSliderTwo.value = parseInt(accZSliderOne.value) + minGap;
    }
    else if(parseInt(gyroXSliderTwo.value) - parseInt(gyroXSliderOne.value) <= minGap){
        gyroXSliderTwo.value = parseInt(gyroXSliderOne.value) + minGap;
    }
    else if(parseInt(gyroYSliderTwo.value) - parseInt(gyroYSliderOne.value) <= minGap){
        gyroYSliderTwo.value = parseInt(gyroYSliderOne.value) + minGap;
    }
    else if(parseInt(gyroZSliderTwo.value) - parseInt(gyroZSliderOne.value) <= minGap){
        gyroZSliderTwo.value = parseInt(gyroZSliderOne.value) + minGap;
    }
    else if(parseInt(magXSliderTwo.value) - parseInt(magXSliderOne.value) <= minGap){
        magXSliderTwo.value = parseInt(magXSliderOne.value) + minGap;
    }
    else if(parseInt(magYSliderTwo.value) - parseInt(magYSliderOne.value) <= minGap){
        magYSliderTwo.value = parseInt(magYSliderOne.value) + minGap;
    }
    else if(parseInt(magZSliderTwo.value) - parseInt(magZSliderOne.value) <= minGap){
        magZSliderTwo.value = parseInt(magZSliderOne.value) + minGap;
    }
    else if(parseInt(orienXSliderTwo.value) - parseInt(orienXSliderOne.value) <= minGap){
        orienXSliderTwo.value = parseInt(orienXSliderOne.value) + minGap;
    }
    else if(parseInt(orienYSliderTwo.value) - parseInt(orienYSliderOne.value) <= minGap){
        orienYSliderTwo.value = parseInt(orienYSliderOne.value) + minGap;
    }
    else if(parseInt(orienZSliderTwo.value) - parseInt(orienZSliderOne.value) <= minGap){
        orienZSliderTwo.value = parseInt(orienZSliderOne.value) + minGap;
    }

    distDisplayValTwo.textContent = distanceSliderTwo.value +" m";
    energyDisplayValTwo.textContent = energySliderTwo.value;
    speedDisplayValTwo.textContent = speedSliderTwo.value+" kmph";
    tempDisplayValTwo.textContent = tempSliderTwo.value+" °F";
    pressureDisplayValTwo.textContent = pressureSliderTwo.value+"psi";
    humidityDisplayValTwo.textContent = humiditySliderTwo.value+"%";
    lightDisplayValTwo.textContent = lightSliderTwo.value;
    accXDisplayValTwo.textContent = accXSliderTwo.value;
    accYDisplayValTwo.textContent = accYSliderTwo.value;
    accZDisplayValTwo.textContent = accZSliderTwo.value;
    gyroXDisplayValTwo.textContent = gyroXSliderTwo.value;
    gyroYDisplayValTwo.textContent = gyroYSliderTwo.value;
    gyroZDisplayValTwo.textContent = gyroZSliderTwo.value;
    magXDisplayValTwo.textContent = magXSliderTwo.value;
    magYDisplayValTwo.textContent = magYSliderTwo.value;
    magZDisplayValTwo.textContent = magZSliderTwo.value;
    orienXDisplayValTwo.textContent = orienXSliderTwo.value;
    orienYDisplayValTwo.textContent = orienYSliderTwo.value;
    orienZDisplayValTwo.textContent = orienZSliderTwo.value;


    fillColor();
}
function fillColor(){
    
    disPercent1 = (distanceSliderOne.value / distSliderMaxValue) * 100;
    disPercent2 = (distanceSliderTwo.value / distSliderMaxValue) * 100;
    energyPercent1 = (energySliderOne.value / energySliderMaxValue) * 100;
    energyPercent2 = (energySliderTwo.value / energySliderMaxValue) * 100;
    speedPercent1 = (speedSliderOne.value / speedSliderMaxValue) * 100;
    speedPercent2 = (speedSliderTwo.value / speedSliderMaxValue) * 100;
    tempPercent1 = (tempSliderOne.value / tempSliderMaxValue) * 100;
    tempPercent2 = (tempSliderTwo.value / tempSliderMaxValue) * 100;              
    pressurePercent1 = (pressureSliderOne.value / pressureSliderMaxValue) * 100;
    pressurePercent2 = (pressureSliderTwo.value / pressureSliderMaxValue) * 100;
    humidityPercent1 = (humiditySliderOne.value / humiditySliderMaxValue) * 100;
    humidityPercent2 = (humiditySliderTwo.value / humiditySliderMaxValue) * 100;
    lightPercent1 = (lightSliderOne.value / lightSliderMaxValue) * 100;
    lightPercent2 = (lightSliderTwo.value / lightSliderMaxValue) * 100;
    accXPercent1 = (accXSliderOne.value / accXSliderMaxValue) * 100;
    accXPercent2 = (accXSliderTwo.value / accXSliderMaxValue) * 100;
    accYPercent1 = (accYSliderOne.value / accYSliderMaxValue) * 100;
    accYPercent2 = (accYSliderTwo.value / accYSliderMaxValue) * 100;
    accZPercent1 = (accZSliderOne.value / accZSliderMaxValue) * 100;
    accZPercent2 = (accZSliderTwo.value / accZSliderMaxValue) * 100;
    gyroXPercent1 = (gyroXSliderOne.value / gyroXSliderMaxValue) * 100;
    gyroXPercent2 = (gyroXSliderTwo.value / gyroXSliderMaxValue) * 100;
    gyroYPercent1 = (gyroYSliderOne.value / gyroYSliderMaxValue) * 100;
    gyroYPercent2 = (gyroYSliderTwo.value / gyroYSliderMaxValue) * 100;
    gyroZPercent1 = (gyroZSliderOne.value / gyroZSliderMaxValue) * 100;
    gyroZPercent2 = (gyroZSliderTwo.value / gyroZSliderMaxValue) * 100;
    magXPercent1 = (magXSliderOne.value / magXSliderMaxValue) * 100;
    magXPercent2 = (magXSliderTwo.value / magXSliderMaxValue) * 100;
    magYPercent1 = (magYSliderOne.value / magYSliderMaxValue) * 100;
    magYPercent2 = (magYSliderTwo.value / magYSliderMaxValue) * 100;
    magZPercent1 = (magZSliderOne.value / magZSliderMaxValue) * 100;
    magZPercent2 = (magZSliderTwo.value / magZSliderMaxValue) * 100;
    orienXPercent1 = (orienXSliderOne.value / orienXSliderMaxValue) * 100;
    orienXPercent2 = (orienXSliderTwo.value / orienXSliderMaxValue) * 100;
    orienYPercent1 = (orienYSliderOne.value / orienYSliderMaxValue) * 100;
    orienYPercent2 = (orienYSliderTwo.value / orienYSliderMaxValue) * 100;
    orienZPercent1 = (orienZSliderOne.value / orienZSliderMaxValue) * 100;
    orienZPercent2 = (orienZSliderTwo.value / orienZSliderMaxValue) * 100;
    

    distSliderTrack.style.background = `linear-gradient(to right, #dadae5 ${disPercent1}% , #3264fe ${disPercent1}% , #3264fe ${disPercent2}%, #dadae5 ${disPercent2}%)`;
    energySliderTrack.style.background = `linear-gradient(to right, #dadae5 ${energyPercent1}% , #3264fe ${energyPercent1}% , #3264fe ${energyPercent2}%, #dadae5 ${energyPercent2}%)`;
    speedSliderTrack.style.background = `linear-gradient(to right, #dadae5 ${speedPercent1}% , #3264fe ${speedPercent1}% , #3264fe ${speedPercent2}%, #dadae5 ${speedPercent2}%)`;
    tempSliderTrack.style.background = `linear-gradient(to right, #dadae5 ${tempPercent1}% , #3264fe ${tempPercent1}% , #3264fe ${tempPercent2}%, #dadae5 ${tempPercent2}%)`;
    pressureSliderTrack.style.background = `linear-gradient(to right, #dadae5 ${pressurePercent1}% , #3264fe ${pressurePercent1}% , #3264fe ${pressurePercent2}%, #dadae5 ${pressurePercent2}%)`;
    humiditySliderTrack.style.background = `linear-gradient(to right, #dadae5 ${humidityPercent1}% , #3264fe ${humidityPercent1}% , #3264fe ${humidityPercent2}%, #dadae5 ${humidityPercent2}%)`;
    lightSliderTrack.style.background = `linear-gradient(to right, #dadae5 ${lightPercent1}% , #3264fe ${lightPercent1}% , #3264fe ${lightPercent2}%, #dadae5 ${lightPercent2}%)`;
    accXSliderTrack.style.background = `linear-gradient(to right, #dadae5 ${accXPercent1}% , #3264fe ${accXPercent1}% , #3264fe ${accXPercent2}%, #dadae5 ${accXPercent2}%)`;
    accYSliderTrack.style.background = `linear-gradient(to right, #dadae5 ${accYPercent1}% , #3264fe ${accYPercent1}% , #3264fe ${accYPercent2}%, #dadae5 ${accYPercent2}%)`;
    accZSliderTrack.style.background = `linear-gradient(to right, #dadae5 ${accZPercent1}% , #3264fe ${accZPercent1}% , #3264fe ${accZPercent2}%, #dadae5 ${accZPercent2}%)`;
    gyroXSliderTrack.style.background = `linear-gradient(to right, #dadae5 ${gyroXPercent1}% , #3264fe ${gyroXPercent1}% , #3264fe ${gyroXPercent2}%, #dadae5 ${gyroXPercent2}%)`;
    gyroYSliderTrack.style.background = `linear-gradient(to right, #dadae5 ${gyroYPercent1}% , #3264fe ${gyroYPercent1}% , #3264fe ${gyroYPercent2}%, #dadae5 ${gyroYPercent2}%)`;
    gyroZSliderTrack.style.background = `linear-gradient(to right, #dadae5 ${gyroZPercent1}% , #3264fe ${gyroZPercent1}% , #3264fe ${gyroZPercent2}%, #dadae5 ${gyroZPercent2}%)`;
    magXSliderTrack.style.background = `linear-gradient(to right, #dadae5 ${magXPercent1}% , #3264fe ${magXPercent1}% , #3264fe ${magXPercent2}%, #dadae5 ${magXPercent2}%)`;
    magYSliderTrack.style.background = `linear-gradient(to right, #dadae5 ${magYPercent1}% , #3264fe ${magYPercent1}% , #3264fe ${magYPercent2}%, #dadae5 ${magYPercent2}%)`;
    magZSliderTrack.style.background = `linear-gradient(to right, #dadae5 ${magZPercent1}% , #3264fe ${magZPercent1}% , #3264fe ${magZPercent2}%, #dadae5 ${magZPercent2}%)`;
    orienXSliderTrack.style.background = `linear-gradient(to right, #dadae5 ${orienXPercent1}% , #3264fe ${orienXPercent1}% , #3264fe ${orienXPercent2}%, #dadae5 ${orienXPercent2}%)`;
    orienYSliderTrack.style.background = `linear-gradient(to right, #dadae5 ${orienYPercent1}% , #3264fe ${orienYPercent1}% , #3264fe ${orienYPercent2}%, #dadae5 ${orienYPercent2}%)`;
    orienZSliderTrack.style.background = `linear-gradient(to right, #dadae5 ${orienZPercent1}% , #3264fe ${orienZPercent1}% , #3264fe ${orienZPercent2}%, #dadae5 ${orienZPercent2}%)`;
}

