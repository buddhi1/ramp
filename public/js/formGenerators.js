// Utility to capitalize the first letter

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Method to get short ID for multi-axis metrics
function getShortId(metricId) {
  switch (metricId) {
    case "acceleration": return "acc";
    case "gyroscope": return "gyro";
    case "magnetometer": return "mag";
    case "orientation": return "orien";
    case "temperature": return "temp"; // Add temperature here
    default: return metricId;
  }
}


// Method to update the slider track background
function updateSliderTrack(metricId, axis = "") {
  let slider1Id, slider2Id, trackId;
  if (metricId === 'temperature') {
    slider1Id = 'temp-slider-1';
    slider2Id = 'temp-slider-2';
    trackId = 'temperature-track';
  } else {
    const config = fieldMapping[metricId];
    if (config && config.axis.length > 1) { // Check if it's a multi-axis metric
      const shortId = getShortId(metricId);
      slider1Id = `${shortId}${axis}-slider-1`;
      slider2Id = `${shortId}${axis}-slider-2`;
      trackId = `${shortId}${axis}-track`;
    } else { // It's another single-axis metric
      slider1Id = `${metricId}-slider-1`;
      slider2Id = `${metricId}-slider-2`;
      trackId = `${metricId}-track`;
    }
  }

  const slider1 = document.getElementById(slider1Id);
  const slider2 = document.getElementById(slider2Id);
  const track = document.getElementById(trackId);

  if (!slider1 || !slider2 || !track) {
    return;
  }

  const min = parseInt(slider1.min);
  const max = parseInt(slider1.max);
  const percent1 = ((slider1.value - min) / (max - min)) * 100;
  const percent2 = ((slider2.value - min) / (max - min)) * 100;

  track.style.background = `linear-gradient(to right, #dadae5 ${percent1}%, #3264fe ${percent1}%, #3264fe ${percent2}%, #dadae5 ${percent2}%)`;
}

function handleSlideOne(event, metricId, axis = "") {
  let slider1Id, slider2Id, range1Id;
  if (metricId === 'temperature') {
    slider1Id = 'temp-slider-1';
    slider2Id = 'temp-slider-2';
    range1Id = 'temp-range1';
  } else {
    const config = fieldMapping[metricId];
    if (config && config.axis.length > 1) { // Check if it's a multi-axis metric
      const shortId = getShortId(metricId);
      slider1Id = `${shortId}${axis}-slider-1`;
      slider2Id = `${shortId}${axis}-slider-2`;
      range1Id = `${shortId}${axis}-range1`;
    } else { // It's another single-axis metric
      slider1Id = `${metricId}-slider-1`;
      slider2Id = `${metricId}-slider-2`;
      range1Id = `${metricId}-range1`;
    }
  }

  const slider1 = document.getElementById(slider1Id);
  const slider2 = document.getElementById(slider2Id);
  const range1 = document.getElementById(range1Id);

  if (!slider1 || !slider2 || !range1) {
    return;
  }

  let value1 = parseInt(slider1.value);
  const value2 = parseInt(slider2.value);

  if (value1 > value2) {
    slider1.value = value2;
    value1 = value2;
  }

  range1.textContent = value1;
  updateSliderTrack(metricId, axis);
}

function handleSlideTwo(event, metricId, axis = "") {
  let slider1Id, slider2Id, range2Id;
  if (metricId === 'temperature') {
    slider1Id = 'temp-slider-1';
    slider2Id = 'temp-slider-2';
    range2Id = 'temp-range2';
  } else {
    const config = fieldMapping[metricId];
    if (config && config.axis.length > 1) { // Check if it's a multi-axis metric
      const shortId = getShortId(metricId);
      slider1Id = `${shortId}${axis}-slider-1`;
      slider2Id = `${shortId}${axis}-slider-2`;
      range2Id = `${shortId}${axis}-range2`;
    } else { // It's another single-axis metric
      slider1Id = `${metricId}-slider-1`;
      slider2Id = `${metricId}-slider-2`;
      range2Id = `${metricId}-range2`;
    }
  }

  const slider1 = document.getElementById(slider1Id);
  const slider2 = document.getElementById(slider2Id);
  const range2 = document.getElementById(range2Id);

  if (!slider1 || !slider2 || !range2) {
    return;
  }

  const value1 = parseInt(slider1.value);
  let value2 = parseInt(slider2.value);

  if (value2 < value1) {
    slider2.value = value1;
    value2 = value1;
  }

  range2.textContent = value2;
  updateSliderTrack(metricId, axis);
}


function generateSingleAxisMetric(config) {
  const container = document.getElementById("dynamic-form-sections");
  const row = document.createElement("div");
  row.className = "mb-3 row";
  const unit = config.unit || '';
  if (config.id === 'light') {
    const hr = document.createElement('hr');
    hr.style.borderColor = '#ccc'; // Adjust color to match your existing line
    hr.style.margin = '5px 15px';   // Adjust margin to match your existing spacing
    container.appendChild(hr);
  }

  row.innerHTML = `
    <div class="form-check ms-2">
      <input class="form-check-input" type="checkbox" id="${config.checkId}" />
      <label class="form-check-label">${capitalize(config.label)}:</label>
    </div>
    <div class="col-4">
      <div id="${config.box1Id}" style="display: none">
        <div class="values">
          <span id="${config.range1Id}">${config.min} ${unit}</span><span> &dash; </span>
          <span id="${config.range2Id}">${config.max} ${unit}</span>
        </div>
        <div class="container1">
          <div class="${config.trackClass}" id="${config.id}-track"></div>
          <input type="range" min="${config.min} ${unit}" max="${config.max}" value="${config.min}" id="${config.slider1Id}" data-metric-id="${config.id}" oninput="handleSlideOne(event, '${config.id}')">
          <input type="range" min="${config.min}" max="${config.max}" value="${config.max}" id="${config.slider2Id}" data-metric-id="${config.id}" oninput="handleSlideTwo(event, '${config.id}')">
        </div>
      </div>
    </div>
    <div class="col-4">
      <div id="${config.boxId}" style="display: none; margin-left: 15px;">
        <div class="input-group mb-3">
          <select class="form-select" id="${config.sortId}">
            <option value="NONE">No Sort</option>
            <option value="ASC">Asc</option>
            <option value="DSC">Desc</option>
          </select>
        </div>
      </div>
    </div>
    <div class="col-4">
      <div id="${config.box2Id}" style="display: none;">
        <div class="input-group mb-3">
          <select class="form-select measures-select" id="${config.selectId}">
            <option>Value</option>
            <option>Average</option>
            <option>Max</option>
            <option>Min</option>
          </select>
        </div>
      </div>
    </div>
  `;

  container.appendChild(row);

  document.getElementById(config.checkId).addEventListener("change", function () {
    const checked = this.checked;
    document.getElementById(config.box1Id).style.display = checked ? "block" : "none";
    document.getElementById(config.boxId).style.display = checked ? "block" : "none";
    document.getElementById(config.box2Id).style.display = checked ? "block" : "none";
    if (checked) updateSliderTrack(config.id, '');
  });
}

// Method to generate the HTML for a multi-axis metric
function generateMultiAxisMetric(config) {
  const container = document.getElementById("dynamic-form-sections");
  const row = document.createElement("div");
  row.className = "mb-3 row";

  const shortId = getShortId(config.id);
  const axisLabels = {
    "X": "Yaw",
    "Y": "Pitch",
    "Z": "Roll"
  };

  const axisColumns = config.axis.map(axis => {
    const axisLower = axis.toLowerCase();
    let selectId = `select-${config.id}${axisLower}`;
    if (config.id === "acceleration") {
      selectId = `select-acceleration${axisLower}`;
    } else if (config.id === "gyroscope") {
      selectId = `select-gyroscope${axisLower}`;
    } else if (config.id === "magnetometer") {
      selectId = `select-magnetometer${axisLower}`;
    } else if (config.id === "orientation") {
      selectId = `select-orientation${axisLower}`;
    }

    const labelText = config.id === "orientation" ? axisLabels[axis] : `${axis} axis`;

    return `
      <div class="col">
        <label>${labelText}: <span class="values-inline" id="${shortId}${axis}-range1">${config.min}</span> &dash; <span class="values-inline" id="${shortId}${axis}-range2">${config.max}</span></label>
        <div class="container1">
          <div class="slider-track" id="${shortId}${axis}-track"></div>
          <input type="range" min="${config.min}" max="${config.max}" value="${config.min}" id="${shortId}${axis}-slider-1" data-metric-id="${config.id}" data-axis="${axis}" oninput="handleSlideOne(event, '${config.id}', '${axis}')">
          <input type="range" min="${config.min}" max="${config.max}" value="${config.max}" id="${shortId}${axis}-slider-2" data-metric-id="${config.id}" data-axis="${axis}" oninput="handleSlideTwo(event, '${config.id}', '${axis}')">
        </div>
        <div class="mt-2">
          <select class="form-select measures-select" id="${selectId}">
            <option>Value</option>
            <option>Average</option>
            <option>Max</option>
            <option>Min</option>
          </select>
        </div>
      </div>
    `;
  }).join("");

  row.innerHTML = `
    <div class="form-check ms-2">
      <input class="form-check-input" type="checkbox" id="${config.id}-check" />
      <label class="form-check-label">${capitalize(config.label)}:</label>
    </div>
    <div class="col-12">
      <div id="${config.id}-box-1" style="display: none;">
        <div class="row gx-3">
          ${axisColumns}
        </div>
      </div>
    </div>
    <div class="col-4"> <div id="${config.id}-box" style="display: none; margin-left: 15px;">
        </div>
    </div>
    <div class="col-4"> <div id="${config.id}-box-2" style="display: none;">
        </div>
    </div>
  `;

  container.appendChild(row);

  const checkBox = document.getElementById(`${config.id}-check`);
  const box1 = document.getElementById(`${config.id}-box-1`);
  const box = document.getElementById(`${config.id}-box`);
  const box2 = document.getElementById(`${config.id}-box-2`);

  if (checkBox) {
    checkBox.addEventListener("change", function () {
      const checked = this.checked;
      if (box1) box1.style.display = checked ? "block" : "none";
      if (box) box.style.display = checked ? "block" : "none";
      if (box2) box2.style.display = checked ? "block" : "none";
      config.axis.forEach(axis => {
        updateSliderTrack(config.id, axis);
      });
    });
  }
}
function updateMultiAxisSliders(cachedData) {
  if (typeof apiHandler !== 'undefined' && cachedData) {
    apiHandler.updateMultiAxisSlidersWithData(cachedData);
  }
}


document.addEventListener("DOMContentLoaded", function () {
  // Loop through fieldMapping and generate metrics
  for (const key in fieldMapping) {
    const config = fieldMapping[key];
    if (config.axis.length === 1) {
      generateSingleAxisMetric(config);
    } else {
      generateMultiAxisMetric(config);
    }
  }





  // Call updateMultiAxisSliders if cached data is available immediately
  if (typeof apiHandler !== 'undefined' && apiHandler.cachedData) {
    updateMultiAxisSliders(apiHandler.cachedData);
  }
});





const fieldMapping = {
  energy: {
    sliderPrefix: "energy",
    axis: [""], // No axis (single-axis)
    boxId: "energy-spent-box",
    box1Id: "energy-spent-box-1",
    box2Id: "energy-spent-box-2",
    range1Id: "energy-range1",
    range2Id: "energy-range2",
    slider1Id: "energy-slider-1", // Match searchbox.js
    slider2Id: "energy-slider-2", // Match searchbox.js
    checkId: "energy-spent-check",
    sortId: "sortEnergy",
    selectId: "select-energy",
    trackClass: "slider-track1",
    min: 0,
    max: 100,
    label: "Energy Spent",
    id: "energy",
    unit:''

  },
  distance: {
    sliderPrefix: "distance",
    axis: [""], // Single-axis
    boxId: "distance-box",
    box1Id: "distance-box-1",
    box2Id: "distance-box-2",
    range1Id: "distance-range1",
    range2Id: "distance-range2",
    slider1Id: "distance-slider-1", // Match searchbox.js
    slider2Id: "distance-slider-2", // Match searchbox.js
    checkId: "distance-check",
    sortId: "sortdistance",
    selectId: "select-distance",
    trackClass: "slider-track2",
    min: 0,
    max: 1000,
    label: "Distance",
    id: "distance",
    unit:'m'

  },
  speed: {
    sliderPrefix: "speed",
    axis: [""], // Single-axis
    boxId: "speed-box",
    box1Id: "speed-box-1",
    box2Id: "speed-box-2",
    range1Id: "speed-range1",
    range2Id: "speed-range2",
    slider1Id: "speed-slider-1", // Match searchbox.js
    slider2Id: "speed-slider-2", // Match searchbox.js
    checkId: "speed-check",
    sortId: "sortSpeed",
    selectId: "select-speed",
    trackClass: "slider-track3",
    min: 0,
    max: 500,
    label: "Speed",
    id: "speed",
    unit:'kmph'

  },

  temperature: {
    sliderPrefix: "temperature",
    axis: [""], // Single-axis
    boxId: "temperature-box",
    box1Id: "temperature-box-1",
    box2Id: "temperature-box-2",
    range1Id: "temp-range1",     // Match searchbox.js
    range2Id: "temp-range2",     // Match searchbox.js
    slider1Id: "temp-slider-1",   // Match searchbox.js
    slider2Id: "temp-slider-2",   // Match searchbox.js
    checkId: "temperature-check",
    sortId: "sortTemp",
    selectId: "select-temperature",
    trackClass: "slider-track4",
    min: -50,
    max: 50,
    label: "Temperature",
    id: "temperature",
     unit: '°F'

  },
  pressure: {
    sliderPrefix: "pressure",
    axis: [""], // Single-axis
    boxId: "pressure-box",
    box1Id: "pressure-box-1",
    box2Id: "pressure-box-2",
    range1Id: "pressure-range1", // Match searchbox.js
    range2Id: "pressure-range2", // Match searchbox.js
    slider1Id: "pressure-slider-1", // Match searchbox.js
    slider2Id: "pressure-slider-2", // Match searchbox.js
    checkId: "pressure-check",
    sortId: "sortPressure",
    selectId: "select-pressure",
    trackClass: "slider-track5",
    min: 0,
    max: 2000,
    label: "Pressure",
    id: "pressure",
    unit:"psi"

  },

  humidity: {
    sliderPrefix: "humidity",
    axis: [""], // Single-axis
    boxId: "humidity-box",
    box1Id: "humidity-box-1",
    box2Id: "humidity-box-2",
    range1Id: "humidity-range1", // Match searchbox.js
    range2Id: "humidity-range2", // Match searchbox.js
    slider1Id: "humidity-slider-1", // Match searchbox.js
    slider2Id: "humidity-slider-2", // Match searchbox.js
    checkId: "humidity-check",
    sortId: "sortHumidity",
    selectId: "select-humidity",
    trackClass: "slider-track6",
    min: 0,
    max: 100,
    label: "Humidity",
    id: "humidity"

  },
  light: {
    sliderPrefix: "light",
    axis: [""], // Single-axis
    boxId: "light-box",
    box1Id: "light-box-1",
    box2Id: "light-box-2",
    range1Id: "light-range1",   // Match searchbox.js
    range2Id: "light-range2",   // Match searchbox.js
    slider1Id: "light-slider-1", // Match searchbox.js
    slider2Id: "light-slider-2", // Match searchbox.js
    checkId: "light-check",
    sortId: "sortLight",
    selectId: "select-light",
    trackClass: "slider-track7",
    min: 0,
    max: 100,
    label: "Light",
    id: "light",
    unit:"lux"

  },
  acceleration: {
    sliderPrefix: "acceleration",
    axis: ["X", "Y", "Z"], // Multi-axis (X, Y, Z)
    boxId: "acceleration-box",
    box1Id: "acceleration-box-1",
    box2Id: "acceleration-box-2",
    range1Id: "accX-range1",   // Match searchbox.js
    range2Id: "accX-range2",   // Match searchbox.js
    slider1Id: "accX-slider-1", // Match searchbox.js
    slider2Id: "accX-slider-2", // Match searchbox.js
    checkId: "acceleration-check",
    sortId: "sortAcceleration",
    selectId: "select-acceleration",
    trackClass: "slider-track8",
    min: 0,
    max: 100,
    label: "Acceleration",
    id: "acceleration"

  },
  gyroscope: {
    sliderPrefix: "gyroscope",
    axis: ["X", "Y", "Z"], // Multi-axis (X, Y, Z)
    boxId: "gyroscope-box",
    box1Id: "gyroscope-box-1",
    box2Id: "gyroscope-box-2",
    range1Id: "gyroX-range1",   // Match searchbox.js
    range2Id: "gyroX-range2",   // Match searchbox.js
    slider1Id: "gyroX-slider-1", // Match searchbox.js
    slider2Id: "gyroX-slider-2", // Match searchbox.js
    checkId: "gyroscope-check",
    sortId: "sortGyroscope",
    selectId: "select-gyroscope",
    trackClass: "slider-track9",
    min: 0,
    max: 100,
    label: "Gyroscope",
    id: "gyroscope"

  },
  magnetometer: {
    sliderPrefix: "magnetometer",
    axis: ["X", "Y", "Z"], // Multi-axis (X, Y, Z)
    boxId: "magnetometer-box",
    box1Id: "magnetometer-box-1",
    box2Id: "magnetometer-box-2",
    range1Id: "magX-range1",     // Match searchbox.js
    range2Id: "magX-range2",     // Match searchbox.js
    slider1Id: "magX-slider-1",   // Match searchbox.js
    slider2Id: "magX-slider-2",   // Match searchbox.js
    checkId: "magnetometer-check",
    sortId: "sortMagnetometer",
    selectId: "select-magnetometer",
    trackClass: "slider-track10",
    min: 0,
    max: 100,
    label: "Magnetometer",
    id: "magnetometer"
  },
  orientation: {
    sliderPrefix: "orientation",
    axis: ["X", "Y", "Z"], // Multi-axis (X, Y, Z)
    boxId: "orientation-box",
    box1Id: "orientation-box-1",
    box2Id: "orientation-box-2",
    range1Id: "orienX-range1",   // Match searchbox.js
    range2Id: "orienX-range2",   // Match searchbox.js
    slider1Id: "orienX-slider-1", // Match searchbox.js
    slider2Id: "orienX-slider-2", // Match searchbox.js
    checkId: "orientation-check",
    sortId: "sortOrientation",
    selectId: "select-orientation",
    trackClass: "slider-track11",
    min: 0,
    max: 100,
    label: "Orientation",
    id: "orientation"
  },
};
