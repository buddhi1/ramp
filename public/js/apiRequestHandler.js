// document.addEventListener('DOMContentLoaded', function() {
//     document.getElementById('searchboxForm').addEventListener('submit', function(event) {
//         event.preventDefault();  // This prevents the default form submission
//         console.log("Form Submitted");
//         const zip = document.getElementById('zip').value;
//         console.log('Zip Code:', zip);
//     });
// });
// var url='http://localhost:8008/fcapi'
document.addEventListener("DOMContentLoaded", function () {
  // Fetch initial data from the API
  fetch(url+'/initData')
    .then((response) => response.json())
    // .then((data) => {
    //   console.log("Initial Data:", data);
    // })
    .catch((error) => console.error("Error fetching initial data:", error));

});

// Get trips filtered by sensor data
document.getElementById("searchboxForm").addEventListener("submit", function (event) {
    event.preventDefault();

    let extentData = gatherExtentData();
    let startTime = document.getElementById("start-time").value;
    let endTime = document.getElementById("end-time").value;
    let scooterModel = [];
    let tripIds = [];
    let attributeIds = gatherAttributeIds();
    let measures = gatherMeasures();
    let values = gatherValues();
    let sortOrders = gatherSortOrders();

    // console.log(extentData);
    // console.log(startTime);
    // console.log(endTime);
    // console.log(attributeIds);
    // console.log(measures);
    // console.log(values);
    // console.log(sortOrders);

    // API request URL
    let apiUrl =
      `${yourApiUrl}/trips?` +
      new URLSearchParams({
        extent: JSON.stringify(extentData),
        scooter_model: scooterModel,
        trip_ids: JSON.stringify(tripIds),
        attribute_ids: JSON.stringify(attributeIds),
        measures: JSON.stringify(measures),
        values: JSON.stringify(values),
        sort_orders: JSON.stringify(sortOrders),
        start_time: startTime,
        end_time: endTime,
      });

    // Send request
    fetch(apiUrl)
      .then((response) => response.json())
      //.then((data) => console.log(data))
      .catch((error) => console.error("Error fetching data:", error));
  });

function gatherExtentData() {
  let extent = [];
  if (document.getElementById("extent").checked) {
    extent.push(document.getElementById("extent1").value);
    extent.push(document.getElementById("extent2").value);
    extent.push(document.getElementById("extent3").value);
    extent.push(document.getElementById("extent4").value);
  } else {
    extent.push(document.getElementById("zip").value);
  }
  return extent;
}

function gatherAttributeIds() {
  // Collect attribute IDs based on UI Search filters
  let attributes = [];
  if (document.getElementById("distance-check").checked) {
    attributes.push("distance");
  }
  if (document.getElementById("energy-spent-check").checked) {
    attributes.push("energy");
  }
  if (document.getElementById("speed-check").checked) {
    attributes.push("speed");
  }
  if (document.getElementById("temparature-check").checked) {
    attributes.push("temparature");
  }
  if (document.getElementById("pressure-check").checked) {
    attributes.push("pressure");
  }
  if (document.getElementById("humidity-check").checked) {
    attributes.push("humidity");
  }
  if (document.getElementById("acceleration-check").checked) {
    attributes.push("acc_x");
    attributes.push("acc_y");
    attributes.push("acc_z");
  }
  if (document.getElementById("gyroscope-check").checked) {
    attributes.push("gyro_x");
    attributes.push("gyro_y");
    attributes.push("gyro_z");
  }
  if (document.getElementById("magnetometer-check").checked) {
    attributes.push("mag_x");
    attributes.push("mag_y");
    attributes.push("mag_y");
  }
  if (document.getElementById("orientation-check").checked) {
    attributes.push("yaw");
    attributes.push("pitch");
    attributes.push("roll");
  }
  return attributes;
}

function gatherMeasures() {
  let measures = [];

  let distanceMeasure = document.getElementById("select-distance");
  let energySpentMeasure = document.getElementById("select-energy");
  let speedMeasure = document.getElementById("select-speed");
  let temparatureMeasure = document.getElementById("select-temparature");
  let pressureMeasure = document.getElementById("select-pressure");
  let humidityMeasure = document.getElementById("select-humidity");
  let accelerationXMeasure = document.getElementById("select-accelerationx");
  let accelerationYMeasure = document.getElementById("select-accelerationy");
  let accelerationZMeasure = document.getElementById("select-accelerationz");
  let gyroscopeXMeasure = document.getElementById("select-gyroscopex");
  let gyroscopeYMeasure = document.getElementById("select-gyroscopey");
  let gyroscopeZMeasure = document.getElementById("select-gyroscopez");
  let magnetometerXMeasure = document.getElementById("select-magnetometerx");
  let magnetometerYMeasure = document.getElementById("select-magnetometery");
  let magnetometerZMeasure = document.getElementById("select-magnetometerz");
  let orientationYawMeasure = document.getElementById("select-orientationx");
  let orientationPitchMeasure = document.getElementById("select-orientationy");
  let orientationRollMeasure = document.getElementById("select-orientationz");

  if (document.getElementById("distance-check").checked) {
    measures.push(distanceMeasure.value);
  }
  if (document.getElementById("energy-spent-check").checked) {
    measures.push(energySpentMeasure.value);
  }
  if (document.getElementById("speed-check").checked) {
    measures.push(speedMeasure.value);
  }
  if (document.getElementById("temparature-check").checked) {
    measures.push(temparatureMeasure.value);
  }
  if (document.getElementById("pressure-check").checked) {
    measures.push(pressureMeasure.value);
  }
  if (document.getElementById("humidity-check").checked) {
    measures.push(humidityMeasure.value);
  }
  if (document.getElementById("acceleration-check").checked) {
    measures.push(accelerationXMeasure.value);
    measures.push(accelerationYMeasure.value);
    measures.push(accelerationZMeasure.value);
  }
  if (document.getElementById("gyroscope-check").checked) {
    measures.push(gyroscopeXMeasure.value);
    measures.push(gyroscopeYMeasure.value);
    measures.push(gyroscopeZMeasure.value);
  }
  if (document.getElementById("magnetometer-check").checked) {
    measures.push(magnetometerXMeasure.value);
    measures.push(magnetometerYMeasure.value);
    measures.push(magnetometerZMeasure.value);
  }
  if (document.getElementById("orientation-check").checked) {
    measures.push(orientationYawMeasure.value);
    measures.push(orientationPitchMeasure.value);
    measures.push(orientationRollMeasure.value);
  }

  return measures;
}

function gatherValues() {
  let values = [];
  let distslider1 = document.getElementById("distance-slider-1");
  let distslider2 = document.getElementById("distance-slider-2");
  let energyslider1 = document.getElementById("energy-slider-1");
  let energyslider2 = document.getElementById("energy-slider-2");
  let sppedslider1 = document.getElementById("speed-slider-1");
  let sppedslider2 = document.getElementById("speed-slider-2");
  let tempslider1 = document.getElementById("temp-slider-1");
  let tempslider2 = document.getElementById("temp-slider-2");
  let pressureslider1 = document.getElementById("pressure-slider-1");
  let pressureslider2 = document.getElementById("pressure-slider-2");
  let humidityslider1 = document.getElementById("humidity-slider-1");
  let humidityslider2 = document.getElementById("humidity-slider-2");
  let accxslider1 = document.getElementById("accX-slider-1");
  let accxslider2 = document.getElementById("accX-slider-2");
  let accyslider1 = document.getElementById("accY-slider-1");
  let accyslider2 = document.getElementById("accY-slider-2");
  let acczslider1 = document.getElementById("accZ-slider-1");
  let acczslider2 = document.getElementById("accZ-slider-2");
  let gyroxslider2 = document.getElementById("gyroX-slider-1");
  let gyroxslider1 = document.getElementById("gyroX-slider-2");
  let gyroyslider1 = document.getElementById("gyroY-slider-1");
  let gyroyslider2 = document.getElementById("gyroY-slider-2");
  let gyrozslider1 = document.getElementById("gyroZ-slider-1");
  let gyrozslider2 = document.getElementById("gyroZ-slider-2");
  let magxslider1 = document.getElementById("magX-slider-1");
  let magxslider2 = document.getElementById("magX-slider-2");
  let magyslider1 = document.getElementById("magY-slider-1");
  let magyslider2 = document.getElementById("magY-slider-2");
  let magzslider1 = document.getElementById("magZ-slider-1");
  let magzslider2 = document.getElementById("magZ-slider-2");
  let orienxslider1 = document.getElementById("orienX-slider-1");
  let orienxslider2 = document.getElementById("orienX-slider-2");
  let orienyslider1 = document.getElementById("orienY-slider-1");
  let orienyslider2 = document.getElementById("orienY-slider-2");
  let orienzslider1 = document.getElementById("orienZ-slider-1");
  let orienzslider2 = document.getElementById("orienZ-slider-2");

  if (document.getElementById("distance-check").checked) {
    values.push([distslider1.value, distslider2.value]);
  }
  if (document.getElementById("energy-spent-check").checked) {
    values.push([energyslider1.value, energyslider2.value]);
  }
  if (document.getElementById("speed-check").checked) {
    values.push([sppedslider1.value, sppedslider2.value]);
  }
  if (document.getElementById("temparature-check").checked) {
    values.push([tempslider1.value, tempslider2.value]);
  }
  if (document.getElementById("pressure-check").checked) {
    values.push([pressureslider1.value, pressureslider2.value]);
  }
  if (document.getElementById("humidity-check").checked) {
    values.push([humidityslider1.value, humidityslider2.value]);
  }
  if (document.getElementById("acceleration-check").checked) {
    values.push([accxslider1.value, accxslider2.value]);
    values.push([accyslider1.value, accyslider2.value]);
    values.push([acczslider1.value, acczslider2.value]);
  }
  if (document.getElementById("gyroscope-check").checked) {
    values.push([gyroxslider1.value, gyroxslider2.value]);
    values.push([gyroyslider1.value, gyroyslider2.value]);
    values.push([gyrozslider1.value, gyrozslider2.value]);
  }

  if (document.getElementById("magnetometer-check").checked) {
    values.push([magxslider1.value, magxslider2.value]);
    values.push([magyslider1.value, magyslider2.value]);
    values.push([magzslider1.value, magzslider2.value]);
  }

  if (document.getElementById("orientation-check").checked) {
    values.push([orienxslider1.value, orienxslider2.value]);
    values.push([orienyslider1.value, orienyslider2.value]);
    values.push([orienzslider1.value, orienzslider2.value]);
  }

  return values;
}

function gatherSortOrders() {
  let sortOrders = [];
  let distanceSort = document.getElementById("sortdistance");
  if (document.getElementById("distance-check").checked) {
    sortOrders.push(distanceSort.value);
  }
  let energySort = document.getElementById("sortEnergy");
  if (document.getElementById("energy-spent-check").checked) {
    sortOrders.push(energySort.value);
  }
  let speedSort = document.getElementById("sortSpeed");
  if (document.getElementById("speed-check").checked) {
    sortOrders.push(speedSort.value);
  }
  let temparatureSort = document.getElementById("sortTemp");
  if (document.getElementById("temparature-check").checked) {
    sortOrders.push(temparatureSort.value);
  }
  let pressureSort = document.getElementById("sortPressure");
  if (document.getElementById("pressure-check").checked) {
    sortOrders.push(pressureSort.value);
  }
  let humiditySort = document.getElementById("sortHumidity");
  if (document.getElementById("humidity-check").checked) {
    sortOrders.push(humiditySort.value);
  }

  return sortOrders;
}
