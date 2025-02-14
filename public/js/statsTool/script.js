/************************************
 * script.js
 *  --> Now uses fetch(url + '/tripsGPS') 
 ************************************/

let tripsData = [];
let sensorColumnsVisible = false;

// Full list of sensor keys
const allSensors = [
  "acc_x", "acc_y", "acc_z",
  "gyro_x", "gyro_y", "gyro_z",
  "mag_x", "mag_y", "mag_z",
  "latitude", "longitude",
  "temperature", "pressure", "humidity"
];

// HTML references
const scooterIdSelect = document.getElementById("scooterIdSelect");
const tripIdSelect    = document.getElementById("tripIdSelect");
const sensorSelect    = document.getElementById("sensorSelect");
const tableContainer  = d3.select("#table-container");
const toggleButton    = document.getElementById("sensor-toggle");
const plotButton      = document.getElementById("plotButton");

// 1) FETCH DATA from FC API endpoint (like mapTool).
fetch(url + '/tripsGPS')
  .then(res => res.json())
  .then(data => {
    tripsData = data;

    // Build the table once, for all data
    createTable(tripsData);

    // Populate scooter & sensor dropdowns
    populateScooterDropdown(tripsData);
    populateSensorDropdown();

    // Listen for user picking a scooter
    scooterIdSelect.addEventListener("change", handleScooterChange);

    // Optionally trigger once
    handleScooterChange();
  })
  .catch(err => console.error("Error fetching data from FC:", err));

// 2) POPULATE SCOOTER & SENSOR DROPDOWNS
function populateScooterDropdown(data) {
  // Unique scooter IDs
  const scooters = Array.from(new Set(data.map(d => d.scooter_id)));
  scooters.forEach(id => {
    let opt = document.createElement("option");
    opt.value = id;
    opt.text  = id;
    scooterIdSelect.appendChild(opt);
  });
  scooterIdSelect.selectedIndex = 0; // default first
}

function populateSensorDropdown() {
  // "All Sensors" option
  let allOpt = document.createElement("option");
  allOpt.value = "all";
  allOpt.text  = "All Sensors";
  sensorSelect.appendChild(allOpt);

  // Then each sensor
  allSensors.forEach(sensor => {
    let opt = document.createElement("option");
    opt.value = sensor;
    opt.text  = sensor;
    sensorSelect.appendChild(opt);
  });

  sensorSelect.value = "all";
}

// 3) DYNAMIC TRIP DROPDOWN (WHEN SCOOTER CHANGES)
function handleScooterChange() {
  // Clear old trips
  tripIdSelect.innerHTML = "";

  // Always add "All Trips" first
  let optAll = document.createElement("option");
  optAll.value = "all";
  optAll.text  = "All Trips";
  tripIdSelect.appendChild(optAll);

  // Filter data to selected scooter
  const selectedScooter = scooterIdSelect.value;
  const filtered = tripsData.filter(d => d.scooter_id === selectedScooter);

  // Unique trip IDs
  const uniqueTrips = Array.from(new Set(filtered.map(d => d.trip_id)));

  // Populate
  uniqueTrips.forEach(tripID => {
    let opt = document.createElement("option");
    opt.value = tripID;
    opt.text  = tripID;
    tripIdSelect.appendChild(opt);
  });

  // Default to "all"
  tripIdSelect.value = "all";
}

// 4) CREATE TABLE (ALWAYS SHOWING ALL TRIPS)
function createTable(data) {
  // Clear any old table
  tableContainer.selectAll("*").remove();

  const table = tableContainer.append("table").attr("class", "trip-table");

  const headers = [
    "Trip ID", "Scooter ID", "Rider ID",
    "Start Time", "End Time", "Trip Distance",
    "Avg Speed", "Max Speed", "Min Speed",
    "Battery Start", "Battery End", "Stops",
    "Video Link", "Audio Link"
  ];

  // Table Head
  const thead = table.append("thead");
  const headerRow = thead.append("tr");
  headers.forEach(h => headerRow.append("th").text(h));

  // If sensor columns visible, add them
  if (sensorColumnsVisible) {
    allSensors.forEach(field => {
      headerRow.append("th")
        .attr("class", "sensor-data-header")
        .text(field);
    });
  }

  // Table Body
  const tbody = table.append("tbody");
  data.forEach(trip => {
    const row = tbody.append("tr");
    row.append("td").text(trip.trip_id);
    row.append("td").text(trip.scooter_id);
    row.append("td").text(trip.rider_id);
    row.append("td").text(trip.start_time);
    row.append("td").text(trip.end_time);
    row.append("td").text(trip.trip_distance);
    row.append("td").text(trip.avg_speed);
    row.append("td").text(trip.max_speed);
    row.append("td").text(trip.min_speed);
    row.append("td").text(trip.start_battery_status);
    row.append("td").text(trip.end_battery_status);
    row.append("td").text(trip.stops);

    // video link
    row.append("td")
      .append("a")
      .attr("href", trip.video_link)
      .text("Video");

    // audio link
    row.append("td")
      .append("a")
      .attr("href", trip.audio_link)
      .text("Audio");

    // If sensor columns are visible, add them
    if (sensorColumnsVisible) {
      allSensors.forEach(field => {
        const valArray = trip.sensor_data[field];
        const str = (valArray && Array.isArray(valArray)) ? valArray.join(", ") : "N/A";
        row.append("td").attr("class","sensor-data").text(str);
      });
    }
  });
}

// Toggle sensor columns. Rebuild entire table with all trips
toggleButton.addEventListener("click", () => {
  sensorColumnsVisible = !sensorColumnsVisible;
  toggleButton.textContent = sensorColumnsVisible
    ? "Hide Sensor Data"
    : "View Sensor Data";
  createTable(tripsData);
});

// 5) PLOTTING LOGIC
plotButton.addEventListener("click", plotRequestedData);

// Build time-series data from sensor arrays
function createTimeSeriesData(trip, sensorField) {
  const start = new Date(trip.start_time);
  const end   = new Date(trip.end_time);
  const durationSec = (end - start) / 1000;

  const values = trip.sensor_data[sensorField];
  if (!Array.isArray(values)) return [];

  if (values.length === 1) {
    return [{ timeInSec: 0, value: values[0] }];
  }

  return values.map((val, i) => {
    const fraction = i / (values.length - 1);
    return { timeInSec: fraction * durationSec, value: val };
  });
}

// Create an SVG line chart
function createLineChart(dataArray, sensorName, tripId) {
  const w = 400, h = 200;
  const margin = { top: 20, right: 30, bottom: 40, left: 50 };

  // Chart wrapper
  const wrapper = d3.select("#chart-container")
    .append("div")
    .attr("class","chart-wrapper");

  // Title
  wrapper.append("h3")
    .text(`Trip ${tripId} - Sensor: ${sensorName}`);

  const svg = wrapper.append("svg")
    .attr("width",  w + margin.left + margin.right)
    .attr("height", h + margin.top  + margin.bottom);

  const g = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // X scale
  const x = d3.scaleLinear()
    .domain(d3.extent(dataArray, d => d.timeInSec))
    .range([0, w]);

  // Y scale
  const y = d3.scaleLinear()
    .domain([ d3.min(dataArray, d => d.value), d3.max(dataArray, d => d.value) ])
    .nice()
    .range([h, 0]);

  // line generator
  const lineGen = d3.line()
    .x(d => x(d.timeInSec))
    .y(d => y(d.value));

  // Path
  g.append("path")
    .datum(dataArray)
    .attr("fill","none")
    .attr("stroke","steelblue")
    .attr("stroke-width",2)
    .attr("d", lineGen);

  // Points
  g.selectAll(".point")
    .data(dataArray)
    .enter()
    .append("circle")
      .attr("class","point")
      .attr("r",3)
      .attr("cx", d => x(d.timeInSec))
      .attr("cy", d => y(d.value))
      .attr("fill","red");

  // X Axis
  g.append("g")
    .attr("transform", `translate(0, ${h})`)
    .call(d3.axisBottom(x).ticks(5));

  // Y Axis
  g.append("g")
    .call(d3.axisLeft(y));

  // X Axis Label
  g.append("text")
    .attr("x", w / 2)
    .attr("y", h + 30)
    .attr("text-anchor","middle")
    .text("Time (sec)");

  // Y Axis Label
  g.append("text")
    .attr("text-anchor","middle")
    .attr("transform", `rotate(-90) translate(${-h/2}, -35)`)
    .text("Sensor Value");
}

// Plot based on user’s dropdown selections
function plotRequestedData() {
  // Clear old charts
  d3.select("#chart-container").selectAll("*").remove();

  const sScooter = scooterIdSelect.value;
  const sTrip    = tripIdSelect.value;
  const sSensor  = sensorSelect.value;

  // Filter by chosen scooter
  let filtered = tripsData.filter(d => d.scooter_id === sScooter);

  // If trip != all, further filter
  if(sTrip !== "all") {
    filtered = filtered.filter(d => d.trip_id === sTrip);
  }

  if(filtered.length === 0) {
    alert("No matching data for those selections.");
    return;
  }

  // For each matched trip
  filtered.forEach(trip => {
    if(sSensor === "all") {
      // Plot all sensors
      allSensors.forEach(sensorField => {
        const arr = createTimeSeriesData(trip, sensorField);
        if(arr.length > 0) {
          createLineChart(arr, sensorField, trip.trip_id);
        }
      });
    } else {
      // Plot only the chosen sensor
      const arr = createTimeSeriesData(trip, sSensor);
      if(arr.length > 0) {
        createLineChart(arr, sSensor, trip.trip_id);
      } else {
        console.warn(`No data for sensor ${sSensor}, trip ${trip.trip_id}`);
      }
    }
  });
}
