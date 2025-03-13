

let tripsData = [];

// For pagination:
let currentPage = 1; 
const pageSize   = 19; 

// HTML references for the columns
// We'll store booleans for each main column (checked or not).
const columnVisibility = {
  sNoCol:         true,  // S. No. is always included but never toggled off
  tripIdCol:      true,
  scooterIdCol:   true,
  startTimeCol:   true,
  endTimeCol:     true,
  tripDistanceCol:true,
  avgSpeedCol:    true,
  maxSpeedCol:    true,
  minSpeedCol:    true,
  batteryStartCol:true,
  batteryEndCol:  true,

  // sensor columns
  tempCol:        false,
  pressureCol:    false,
  humidityCol:    false,
  accelCol:       false,
  gyroCol:        false,
  magCol:         false,
  orientCol:      false
};

// For controlling sensor columns displayed or not:
let sensorDataDisplayed = false; // hide by default

// Arrays for sensor fields
const ACC_FIELDS = ["acc_x","acc_y","acc_z"];
const GYR_FIELDS = ["gyro_x","gyro_y","gyro_z"];
const MAG_FIELDS = ["mag_x","mag_y","mag_z"];
const ORI_FIELDS = ["pitch","roll","yaw"];

// "Plot" logic references
const scooterIdSelect = document.getElementById("scooterIdSelect");
const tripIdSelect    = document.getElementById("tripIdSelect");
const sensorSelect    = document.getElementById("sensorSelect");
const plotButton      = document.getElementById("plotButton");
const tableContainer  = d3.select("#table-container");

// Show/hide loading spinner
function showLoading() {
  const loadingDiv = document.getElementById("loading");
  if (loadingDiv) loadingDiv.style.display = "block";
}
function hideLoading() {
  const loadingDiv = document.getElementById("loading");
  if (loadingDiv) loadingDiv.style.display = "none";
}

/** 1) Fetch data from your FC API endpoint (or local JSON if you prefer) */
function loadData() {
  showLoading();
  fetch(url + '/trips') // or '/tripsGPS' depending on your server
    .then(res => res.json())
    .then(data => {
      tripsData = data;
      // Build initial table
      createTable(tripsData);
      // Populate scooter & sensor dropdowns
      populateScooterDropdown(tripsData);
      populateSensorDropdown();
      // Listen on scooter changes
      scooterIdSelect.addEventListener("change", handleScooterChange);
      // Initialize
      handleScooterChange();
    })
    .catch(err => console.error("Error fetching data:", err))
    .finally(() => hideLoading());
}

/** 2) Populate <select> for scooters & sensorSelect */
function populateScooterDropdown(data) {
  // unique scooter IDs
  const scooters = Array.from(new Set(data.map(d => d.scooter_id)));
  scooters.forEach(id => {
    const opt = document.createElement("option");
    opt.value = id;
    opt.text  = id;
    scooterIdSelect.appendChild(opt);
  });
  scooterIdSelect.selectedIndex = 0; // default
}

const sensorOptions = [
  { label: 'All Sensors',    value: 'all' },
  { label: 'Acceleration',   value: 'accel' },
  { label: 'Gyroscope',      value: 'gyro' },
  { label: 'Magnetometer',   value: 'mag' },
  { label: 'Orientation',    value: 'orient' },
  { label: 'Latitude',       value: 'latitude' },
  { label: 'Longitude',      value: 'longitude' },
  { label: 'Temperature',    value: 'temperature' },
  { label: 'Pressure',       value: 'pressure' },
  { label: 'Humidity',       value: 'humidity' },
];

function populateSensorDropdown() {
  sensorOptions.forEach(s => {
    const opt = document.createElement("option");
    opt.value = s.value;
    opt.text  = s.label;
    sensorSelect.appendChild(opt);
  });
  sensorSelect.value = 'all';
}

/** 3) On scooter change => fill trip dropdown */
function handleScooterChange() {
  tripIdSelect.innerHTML = "";
  const selectedScooter = scooterIdSelect.value;
  const filtered = tripsData.filter(d => d.scooter_id === selectedScooter);
  const uniqueTrips = Array.from(new Set(filtered.map(d => d.trip_id)));
  uniqueTrips.forEach(tripID => {
    const opt = document.createElement("option");
    opt.value = tripID;
    opt.text  = tripID;
    tripIdSelect.appendChild(opt);
  });
  if (tripIdSelect.options.length > 0) {
    tripIdSelect.selectedIndex = 0;
  }
}

/** 
 * 4) Build Table with relevant columns shown or hidden based on our columnVisibility object.
 */
function createTable(data) {
  tableContainer.selectAll("*").remove();

  // Pagination
  const totalPages = Math.ceil(data.length / pageSize);
  if (totalPages < 1) return;
  if (currentPage < 1) currentPage = 1;
  if (currentPage > totalPages) currentPage = totalPages;

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex   = startIndex + pageSize;
  const pageData   = data.slice(startIndex, endIndex);

  // Build table
  const table = tableContainer.append("table").attr("class", "trip-table");
  const thead = table.append("thead");
  const headerRow = thead.append("tr");

  // HEADERS (only those that are "true")
  // No always included:
  headerRow.append("th").text("No.");
  if (columnVisibility.tripIdCol) {
    headerRow.append("th").text("Trip ID");
  }
  if (columnVisibility.scooterIdCol) {
    headerRow.append("th").text("Scooter ID");
  }
  if (columnVisibility.startTimeCol) {
    headerRow.append("th").text("Start Time");
  }
  if (columnVisibility.endTimeCol) {
    headerRow.append("th").text("End Time");
  }
  if (columnVisibility.tripDistanceCol) {
    headerRow.append("th").text("Trip Distance");
  }
  if (columnVisibility.avgSpeedCol) {
    headerRow.append("th").text("Avg Speed");
  }
  if (columnVisibility.maxSpeedCol) {
    headerRow.append("th").text("Max Speed");
  }
  if (columnVisibility.minSpeedCol) {
    headerRow.append("th").text("Min Speed");
  }
  if (columnVisibility.batteryStartCol) {
    headerRow.append("th").text("Battery Start");
  }
  if (columnVisibility.batteryEndCol) {
    headerRow.append("th").text("Battery End");
  }

  // If sensorDataDisplayed => only then do we consider sensor columns
  if (sensorDataDisplayed) {
    if (columnVisibility.tempCol) {
      headerRow.append("th").text("Temperature");
    }
    if (columnVisibility.pressureCol) {
      headerRow.append("th").text("Pressure");
    }
    if (columnVisibility.humidityCol) {
      headerRow.append("th").text("Humidity");
    }
    if (columnVisibility.accelCol) {
      headerRow.append("th").text("Accelerometer");
    }
    if (columnVisibility.gyroCol) {
      headerRow.append("th").text("Gyroscope");
    }
    if (columnVisibility.magCol) {
      headerRow.append("th").text("Magnetometer");
    }
    if (columnVisibility.orientCol) {
      headerRow.append("th").text("Orientation");
    }
  }

  // BODY
  const tbody = table.append("tbody");
  pageData.forEach((trip, i) => {
    const row = tbody.append("tr");
    const rowNumber = startIndex + i + 1;
    // S. No.
    row.append("td").text(rowNumber);

    // Main columns
    if (columnVisibility.tripIdCol) {
      row.append("td").text(trip.trip_id);
    }
    if (columnVisibility.scooterIdCol) {
      row.append("td").text(trip.scooter_id);
    }
    if (columnVisibility.startTimeCol) {
      row.append("td").text(trip.start_time);
    }
    if (columnVisibility.endTimeCol) {
      row.append("td").text(trip.end_time);
    }
    if (columnVisibility.tripDistanceCol) {
      row.append("td").text(trip.distance);
    }
    if (columnVisibility.avgSpeedCol) {
      row.append("td").text(trip.avg_speed);
    }
    if (columnVisibility.maxSpeedCol) {
      row.append("td").text(trip.max_speed);
    }
    if (columnVisibility.minSpeedCol) {
      row.append("td").text(trip.min_speed);
    }
    if (columnVisibility.batteryStartCol) {
      row.append("td").text(trip.start_battery_status);
    }
    if (columnVisibility.batteryEndCol) {
      row.append("td").text(trip.end_battery_status);
    }

    // Sensor columns (only if sensorDataDisplayed is true)
    if (sensorDataDisplayed) {
      if (columnVisibility.tempCol) {
        const tempStr = buildCommaString(trip, "temperature");
        row.append("td").html(`<div class="sensor-data-cell">${tempStr}</div>`);
      }
      if (columnVisibility.pressureCol) {
        const pressStr = buildCommaString(trip, "pressure");
        row.append("td").html(`<div class="sensor-data-cell">${pressStr}</div>`);
      }
      if (columnVisibility.humidityCol) {
        const humStr = buildCommaString(trip, "humidity");
        row.append("td").html(`<div class="sensor-data-cell">${humStr}</div>`);
      }
      if (columnVisibility.accelCol) {
        const accelStr = buildXYZString(trip, ACC_FIELDS);
        row.append("td").html(`<div class="sensor-data-cell">${accelStr}</div>`);
      }
      if (columnVisibility.gyroCol) {
        const gyroStr = buildXYZString(trip, GYR_FIELDS);
        row.append("td").html(`<div class="sensor-data-cell">${gyroStr}</div>`);
      }
      if (columnVisibility.magCol) {
        const magStr = buildXYZString(trip, MAG_FIELDS);
        row.append("td").html(`<div class="sensor-data-cell">${magStr}</div>`);
      }
      if (columnVisibility.orientCol) {
        const oriStr = buildOrientationString(trip);
        row.append("td").html(`<div class="sensor-data-cell">${oriStr}</div>`);
      }
    }
  });

  // PAGINATION controls
  const paginationDiv = tableContainer.append("div")
    .attr("class", "pagination-controls")
    .style("margin", "8px 0")
    .style("display","flex")
    .style("align-items","center")
    .style("justify-content","center");

  if (totalPages > 1) {
    // Left arrow
    if (currentPage>1) {
      paginationDiv.append("span")
        .text("«")
        .style("margin-right","8px")
        .style("cursor","pointer")
        .style("border","1px solid #ccc")
        .style("border-radius","4px")
        .style("padding","4px 8px")
        .on("click", () => {
          currentPage--;
          createTable(data);
        });
    }
    // numeric pages
    let startPage = currentPage - 1;
    let endPage   = currentPage + 1;
    if (startPage<1) startPage=1;
    if (endPage>totalPages) endPage=totalPages;
    while ((endPage - startPage)>2) {
      endPage--;
    }
    for (let p=startPage; p<=endPage; p++){
      const pageNum = paginationDiv.append("span")
        .text(p)
        .style("margin","0 5px")
        .style("padding","4px 8px")
        .style("cursor","pointer")
        .style("border","1px solid #ccc")
        .style("border-radius","4px");

      if (p===currentPage) {
        pageNum.style("background","#0078d7")
               .style("color","white");
      }
      pageNum.on("click", () => {
        currentPage=p;
        createTable(data);
      });
    }
    // Right arrow
    if (currentPage<totalPages) {
      paginationDiv.append("span")
        .text("»")
        .style("margin-left","8px")
        .style("cursor","pointer")
        .style("border","1px solid #ccc")
        .style("border-radius","4px")
        .style("padding","4px 8px")
        .on("click", () => {
          currentPage++;
          createTable(data);
        });
    }
  }
}

/** Build {x,y,z} array as JSON string for columns like accelerometer, gyro, magnetometer */
function buildXYZString(trip, fields) {
  // e.g. fields=["acc_x","acc_y","acc_z"]
  const arrX = trip.sensor_data[ fields[0] ] || [];
  const arrY = trip.sensor_data[ fields[1] ] || [];
  const arrZ = trip.sensor_data[ fields[2] ] || [];
  const maxLen = Math.max(arrX.length, arrY.length, arrZ.length);
  if (maxLen===0) return "[]";

  const objects = [];
  for (let i=0; i<maxLen; i++){
    const xVal = (arrX[i] !== undefined) ? arrX[i] : null;
    const yVal = (arrY[i] !== undefined) ? arrY[i] : null;
    const zVal = (arrZ[i] !== undefined) ? arrZ[i] : null;
    objects.push({ x:xVal, y:yVal, z:zVal });
  }
  return JSON.stringify(objects);
}

/** For orientation => {pitch,roll,yaw} array as JSON string */
function buildOrientationString(trip) {
  const arrP = trip.sensor_data["pitch"]   || [];
  const arrR = trip.sensor_data["roll"]    || [];
  const arrY = trip.sensor_data["yaw"]     || [];
  const maxLen = Math.max(arrP.length, arrR.length, arrY.length);
  if (maxLen===0) return "[]";

  const objects = [];
  for (let i=0; i<maxLen; i++){
    const pVal = (arrP[i] !== undefined) ? arrP[i] : null;
    const rVal = (arrR[i] !== undefined) ? arrR[i] : null;
    const yVal = (arrY[i] !== undefined) ? arrY[i] : null;
    objects.push({ pitch:pVal, roll:rVal, yaw:yVal });
  }
  return JSON.stringify(objects);
}

/** For temperature/pressure/humidity => comma-separated string. e.g. "66.4, 67.8, 68.0" */
function buildCommaString(trip, field) {
  const arr = trip.sensor_data[field] || [];
  return arr.join(", ");
}

/** 5) Plot logic */
plotButton.addEventListener("click", plotRequestedData);

function createTimeSeriesData(trip, sensorField) {
  const start = new Date(trip.start_time);
  const end   = new Date(trip.end_time);
  const durationSec = (end - start)/1000;
  const values = trip.sensor_data[sensorField];
  if (!Array.isArray(values)) return [];

  if (values.length===1) {
    return [{ timeInSec:0, value:values[0] }];
  }
  return values.map((val, i) => {
    const fraction = (values.length-1)>0 ? i/(values.length-1) : 0;
    return { timeInSec: fraction*durationSec, value: val };
  });
}

function createMultiLineChart(trip, fields, titleText) {
  const dataArrays = fields.map(f => createTimeSeriesData(trip, f));
  const validData  = dataArrays.filter(a => a.length>0);
  if (validData.length===0) return;

  const allValues = validData.flat();
  const w=400, h=200, margin={ top:20, right:30, bottom:40, left:50 };
  const color = d3.scaleOrdinal()
    .domain(fields)
    .range(["steelblue","orange","green","purple","red","brown","gray","teal","magenta","lime"]);

  const wrapper = d3.select("#chart-container")
    .append("div")
    .attr("class","chart-wrapper");
  wrapper.append("h3").text(titleText);

  const svg = wrapper.append("svg")
    .attr("width", w+margin.left+margin.right)
    .attr("height",h+margin.top+margin.bottom);

  const g = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const x = d3.scaleLinear()
    .domain(d3.extent(allValues, d=>d.timeInSec))
    .range([0, w]);
  const y = d3.scaleLinear()
    .domain([
      d3.min(allValues, d=>d.value),
      d3.max(allValues, d=>d.value)
    ])
    .nice()
    .range([h, 0]);

  const lineGen = d3.line()
    .x(d=>x(d.timeInSec))
    .y(d=>y(d.value));

  // clipping
  const linesGroup = g.append("g").attr("clip-path","url(#clip)");
  g.append("defs").append("clipPath")
    .attr("id","clip")
    .append("rect")
    .attr("width", w)
    .attr("height", h);

  // lines
  validData.forEach((arr, idx) => {
    const fieldName = fields[idx];
    linesGroup.append("path")
      .datum(arr)
      .attr("fill","none")
      .attr("stroke", color(fieldName))
      .attr("stroke-width",2)
      .attr("d", lineGen);
  });

  // axes
  const xAxis = g.append("g")
    .attr("transform", `translate(0,${h})`)
    .call(d3.axisBottom(x).ticks(5));
  const yAxis = g.append("g")
    .call(d3.axisLeft(y));

  // labels
  g.append("text")
    .attr("x", w/2).attr("y", h+30)
    .attr("text-anchor","middle")
    .style("font-size","14px")
    .text("Time (sec)");
  g.append("text")
    .attr("text-anchor","middle")
    .attr("transform", `rotate(-90) translate(${-h/2}, -40)`)
    .style("font-size","14px")
    .text("Sensor Value");

  // brush
  const brush = d3.brushX()
    .extent([[0,0],[w,h]])
    .on("end", brushed);
  const brushG = g.append("g")
    .attr("class","brush")
    .call(brush);

  function brushed(event) {
    const sel = event.selection;
    if (!sel) return;
    const [x0,x1] = sel;
    const newDomain = [ x.invert(x0), x.invert(x1) ];
    x.domain(newDomain);

    linesGroup.selectAll("path")
      .transition().duration(500)
      .attr("d", d=>lineGen(d));
    xAxis.transition().duration(500)
      .call(d3.axisBottom(x).ticks(5));

    // remove brush
    brushG.call(brush.move, null);
  }

  // double-click reset with small animation
  svg.on("dblclick", function(){
    x.domain(d3.extent(allValues, d=>d.timeInSec));
    xAxis.transition().duration(500).call(d3.axisBottom(x).ticks(5));
    linesGroup.selectAll("path")
      .transition().duration(500)
      .attr("d", lineGen);
  });
}

function plotRequestedData() {
  d3.select("#chart-container").selectAll("*").remove();
  const sScooter = scooterIdSelect.value;
  const sTrip    = tripIdSelect.value;
  const sSensor  = sensorSelect.value;

  let filtered = tripsData.filter(d=> d.scooter_id===sScooter);
  filtered     = filtered.filter(d=> d.trip_id===sTrip);
  if (filtered.length===0) {
    alert("No matching data for those selections.");
    return;
  }

  filtered.forEach(trip => {
    switch(sSensor) {
      case "accel":
        createMultiLineChart(trip, ACC_FIELDS, `Trip ${trip.trip_id} - Acceleration (X,Y,Z)`);
        break;
      case "gyro":
        createMultiLineChart(trip, GYR_FIELDS, `Trip ${trip.trip_id} - Gyroscope (X,Y,Z)`);
        break;
      case "mag":
        createMultiLineChart(trip, MAG_FIELDS, `Trip ${trip.trip_id} - Magnetometer (X,Y,Z)`);
        break;
      case "orient":
        createMultiLineChart(trip, ORI_FIELDS, `Trip ${trip.trip_id} - Orientation (Pitch,Roll,Yaw)`);
        break;
      case "latitude":
        createMultiLineChart(trip, ["latitude"], `Trip ${trip.trip_id} - Latitude`);
        break;
      case "longitude":
        createMultiLineChart(trip, ["longitude"], `Trip ${trip.trip_id} - Longitude`);
        break;
      case "temperature":
        createMultiLineChart(trip, ["temperature"], `Trip ${trip.trip_id} - Temperature`);
        break;
      case "pressure":
        createMultiLineChart(trip, ["pressure"], `Trip ${trip.trip_id} - Pressure`);
        break;
      case "humidity":
        createMultiLineChart(trip, ["humidity"], `Trip ${trip.trip_id} - Humidity`);
        break;
      case "all":
        createMultiLineChart(trip, ACC_FIELDS,    `Trip ${trip.trip_id} - Acceleration`);
        createMultiLineChart(trip, GYR_FIELDS,    `Trip ${trip.trip_id} - Gyroscope`);
        createMultiLineChart(trip, MAG_FIELDS,    `Trip ${trip.trip_id} - Magnetometer`);
        createMultiLineChart(trip, ORI_FIELDS,    `Trip ${trip.trip_id} - Orientation`);
        createMultiLineChart(trip, ["latitude"],  `Trip ${trip.trip_id} - Latitude`);
        createMultiLineChart(trip, ["longitude"], `Trip ${trip.trip_id} - Longitude`);
        createMultiLineChart(trip, ["temperature"], `Trip ${trip.trip_id} - Temperature`);
        createMultiLineChart(trip, ["pressure"],    `Trip ${trip.trip_id} - Pressure`);
        createMultiLineChart(trip, ["humidity"],    `Trip ${trip.trip_id} - Humidity`);
        break;
      default:
        createMultiLineChart(trip, [sSensor], `Trip ${trip.trip_id} - ${sSensor}`);
    }
  });
}

/*****************************************************************
 * SCOOTER STATS TAB
 ****************************************************************/
function renderScooterStats() {
  const container = d3.select("#scooter-stats-container");
  container.selectAll("*").remove();
  const grouped = d3.group(tripsData, d=>d.scooter_id);

  const stats=[];
  grouped.forEach((arr, scooterId) => {
    const tripCount = arr.length;
    let totalDistance=0, totalSpeed=0, maxSpeed=0, totalDuration=0;
    let totalStops=0;  // to track # of stops across all trips
    let totalBatteryUsed=0;

    arr.forEach(d => {
      const dist= parseFloat(d.trip_distance)||0;
      totalDistance+=dist;
      const spd= parseFloat(d.avg_speed)||0;
      totalSpeed+=spd;
      const ms= parseFloat(d.max_speed)||0;
      if(ms>maxSpeed) maxSpeed=ms;

      // Duration
      const st=new Date(d.start_time);
      const et=new Date(d.end_time);
      totalDuration+=(et-st)/60000; // min

      // stops
      const s = parseInt(d.stops)||0;
      totalStops+= s;

      // battery
      const bStart = parseFloat(d.start_battery_status)||0;
      const bEnd   = parseFloat(d.end_battery_status)||0;
      const used   = bStart - bEnd; 
      totalBatteryUsed += used;
    });

    const avgSpeed= tripCount>0?(totalSpeed/tripCount):0;
    const avgDist = tripCount>0?(totalDistance/tripCount):0;
    const avgDur  = tripCount>0?(totalDuration/tripCount):0;
    const avgStops= tripCount>0?(totalStops/tripCount):0;
    const avgBatteryUsed= tripCount>0?(totalBatteryUsed/tripCount):0;

    stats.push({
      scooterId,
      tripCount,
      totalDistance: totalDistance.toFixed(2),
      avgSpeed: avgSpeed.toFixed(2),
      maxSpeed: maxSpeed.toFixed(2),
      avgDist:  avgDist.toFixed(2),
      avgDurationMin: avgDur.toFixed(2),
      avgStops: avgStops.toFixed(2),
      avgBatteryUsed: avgBatteryUsed.toFixed(2)
    });
  });

  // Basic table of stats
  const table = container.append("table")
    .style("border-collapse","collapse")
    .style("width","100%");
  const headerRow = table.append("tr");
  [
    "Scooter",
    "Trips",
    "Total Dist",
    "Avg Speed",
    "Max Speed",
    "Avg Dist",
    "Avg Duration (min)",
    "Avg Stops",
    "Avg Battery Used"
  ].forEach(h => {
    headerRow.append("th")
      .style("border","1px solid #aaa")
      .style("padding","4px 8px")
      .style("text-align","center")
      .style("font-size","12px")
      .text(h);
  });

  stats.forEach(s => {
    const r = table.append("tr");
    [
      s.scooterId,
      s.tripCount,
      s.totalDistance,
      s.avgSpeed,
      s.maxSpeed,
      s.avgDist,
      s.avgDurationMin,
      s.avgStops,
      s.avgBatteryUsed
    ].forEach(val => {
      r.append("td")
        .style("border","1px solid #aaa")
        .style("padding","4px 8px")
        .style("text-align","center")
        .style("font-size","12px")
        .text(val);
    });
  });
  container.style("overflow-x","auto");

  //-----------
  // CHART #1: Bar chart of average speed
  //-----------
  d3.select("#scooter-stats-chart").selectAll("*").remove();
  const barW=300, barH=200, margin={top:20,right:20,bottom:40,left:50};
  const svg = d3.select("#scooter-stats-chart").append("svg")
    .attr("width", barW+margin.left+margin.right)
    .attr("height",barH+margin.top+margin.bottom);
  const g = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const xScale = d3.scaleBand()
    .domain(stats.map(d=>d.scooterId))
    .range([0, barW])
    .padding(0.2);
  const yMax = d3.max(stats, d=>+d.avgSpeed)||1;
  const yScale = d3.scaleLinear()
    .domain([0,yMax])
    .nice()
    .range([barH,0]);

  g.append("g")
    .attr("transform", `translate(0,${barH})`)
    .call(d3.axisBottom(xScale));
  g.append("g").call(d3.axisLeft(yScale));

  g.selectAll(".bar")
    .data(stats)
    .enter().append("rect")
      .attr("class","bar")
      .attr("x", d=>xScale(d.scooterId))
      .attr("y", d=>yScale(+d.avgSpeed))
      .attr("width", xScale.bandwidth())
      .attr("height", d=>barH - yScale(+d.avgSpeed))
      .attr("fill","steelblue");

  g.append("text")
    .attr("text-anchor","middle")
    .attr("x", barW/2)
    .attr("y", barH+30)
    .text("Scooter ID");
  g.append("text")
    .attr("text-anchor","middle")
    .attr("transform", `rotate(-90) translate(${-barH/2}, -40)`)
    .text("Avg Speed");

  //-----------
  // CHART #2: Bar chart of total distance
  //-----------
  d3.select("#scooter-stats-chart2").selectAll("*").remove();
  const svg2 = d3.select("#scooter-stats-chart2").append("svg")
    .attr("width", barW+margin.left+margin.right)
    .attr("height", barH+margin.top+margin.bottom);

  const g2 = svg2.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const distMax = d3.max(stats, d=> +d.totalDistance )||1;
  const yScale2 = d3.scaleLinear()
    .domain([0, distMax])
    .range([barH,0])
    .nice();
  g2.append("g")
    .attr("transform", `translate(0,${barH})`)
    .call(d3.axisBottom(xScale));
  g2.append("g").call(d3.axisLeft(yScale2));
  g2.selectAll(".bar2")
    .data(stats)
    .enter().append("rect")
      .attr("class","bar2")
      .attr("x", d=>xScale(d.scooterId))
      .attr("y", d=> yScale2(+d.totalDistance))
      .attr("width", xScale.bandwidth())
      .attr("height", d=> barH - yScale2(+d.totalDistance))
      .attr("fill","darkorange");

  g2.append("text")
    .attr("text-anchor","middle")
    .attr("x", barW/2)
    .attr("y", barH+30)
    .text("Scooter ID");
  g2.append("text")
    .attr("text-anchor","middle")
    .attr("transform", `rotate(-90) translate(${-barH/2}, -40)`)
    .text("Total Distance");

  //-----------
  // CHART #3: Bar chart of average battery used
  //-----------
  d3.select("#scooter-stats-chart3").selectAll("*").remove();
  const svg3 = d3.select("#scooter-stats-chart3").append("svg")
    .attr("width", barW+margin.left+margin.right)
    .attr("height", barH+margin.top+margin.bottom);

  const g3 = svg3.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const batteryMax = d3.max(stats, d=> +d.avgBatteryUsed )||1;
  const yScale3 = d3.scaleLinear()
    .domain([0, batteryMax])
    .range([barH,0])
    .nice();
  g3.append("g")
    .attr("transform", `translate(0,${barH})`)
    .call(d3.axisBottom(xScale));
  g3.append("g").call(d3.axisLeft(yScale3));
  g3.selectAll(".bar3")
    .data(stats)
    .enter().append("rect")
      .attr("class","bar3")
      .attr("x", d=>xScale(d.scooterId))
      .attr("y", d=> yScale3(+d.avgBatteryUsed))
      .attr("width", xScale.bandwidth())
      .attr("height", d=> barH - yScale3(+d.avgBatteryUsed))
      .attr("fill","green");

  g3.append("text")
    .attr("text-anchor","middle")
    .attr("x", barW/2)
    .attr("y", barH+30)
    .text("Scooter ID");
  g3.append("text")
    .attr("text-anchor","middle")
    .attr("transform", `rotate(-90) translate(${-barH/2}, -40)`)
    .text("Avg Battery Used");

 

  //-----------
  // CHART #5: Bar chart of avg Duration
  //-----------
  d3.select("#scooter-stats-chart5").selectAll("*").remove();
  const svg5 = d3.select("#scooter-stats-chart5").append("svg")
    .attr("width", barW+margin.left+margin.right)
    .attr("height", barH+margin.top+margin.bottom);

  const g5 = svg5.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const durMax = d3.max(stats, d=> +d.avgDurationMin )||1;
  const yScale5 = d3.scaleLinear()
    .domain([0, durMax])
    .range([barH,0])
    .nice();
  g5.append("g")
    .attr("transform", `translate(0,${barH})`)
    .call(d3.axisBottom(xScale));
  g5.append("g").call(d3.axisLeft(yScale5));

  g5.selectAll(".bar5")
    .data(stats)
    .enter().append("rect")
      .attr("class","bar5")
      .attr("x", d=>xScale(d.scooterId))
      .attr("y", d=> yScale5(+d.avgDurationMin))
      .attr("width", xScale.bandwidth())
      .attr("height", d=> barH - yScale5(+d.avgDurationMin))
      .attr("fill","purple");

  g5.append("text")
    .attr("text-anchor","middle")
    .attr("x", barW/2)
    .attr("y", barH+30)
    .text("Scooter ID");
  g5.append("text")
    .attr("text-anchor","middle")
    .attr("transform", `rotate(-90) translate(${-barH/2}, -40)`)
    .text("Avg Duration (min)");
}

/*****************************************************************
 * PROJECT SUMMARY TAB
 ****************************************************************/
function renderProjectSummary() {
  const container = d3.select("#project-summary-container");
  container.selectAll("*").remove();

  const totalTrips = tripsData.length;
  let sumDistance=0, sumSpeed=0, maxSpeed=0, sumDuration=0;
  let sumBatteryUsed=0, sumStops=0;

  tripsData.forEach(d => {
    const dist= parseFloat(d.trip_distance)||0;
    sumDistance+=dist;
    const spd= parseFloat(d.avg_speed)||0;
    sumSpeed+=spd;

    const ms= parseFloat(d.max_speed)||0;
    if(ms>maxSpeed) maxSpeed=ms;

    const st=new Date(d.start_time);
    const et=new Date(d.end_time);
    sumDuration+=(et-st)/60000; // in minutes

    // stops
    const s= parseInt(d.stops)||0;
    sumStops+=s;

    // battery used
    const bStart= parseFloat(d.start_battery_status)||0;
    const bEnd  = parseFloat(d.end_battery_status)||0;
    const used  = bStart - bEnd;
    sumBatteryUsed+= used;
  });

  const avgSpeed= totalTrips>0?(sumSpeed/ totalTrips):0;
  const totalDist= sumDistance.toFixed(2);
  const avgDuration= totalTrips>0?(sumDuration/ totalTrips).toFixed(2):0;
  const avgStops= totalTrips>0?(sumStops/ totalTrips).toFixed(2):0;
  const avgBatteryUsed= totalTrips>0?(sumBatteryUsed/ totalTrips).toFixed(2):0;

  container.append("p").text(`Total Trips: ${totalTrips}`);
  container.append("p").text(`Total Distance: ${totalDist}`);
  container.append("p").text(`Max Speed across dataset: ${maxSpeed.toFixed(2)}`);
  container.append("p").text(`Avg Speed across dataset: ${avgSpeed.toFixed(2)}`);
  container.append("p").text(`Avg Trip Duration (min): ${avgDuration}`);
  container.append("p").text(`Avg Stops: ${avgStops}`);
  container.append("p").text(`Avg Battery Used: ${avgBatteryUsed.toFixed(2)}`);

  // We can build a small dataset to bar-plot these summary stats
  const summaryData = [
    { label:'TotalDist', value: sumDistance },
    { label:'MaxSpeed',  value: maxSpeed },
    { label:'AvgSpeed',  value: avgSpeed },
    { label:'AvgDur(min)',value: +avgDuration },
    { label:'AvgStops',  value: +avgStops },
  ];

  //-----------
  // CHART #1: simple bar with summaryData
  //-----------
  d3.select("#project-summary-chart").selectAll("*").remove();
  const w=300, h=200, margin={top:20,right:20,bottom:40,left:50};
  const svg = d3.select("#project-summary-chart").append("svg")
    .attr("width", w+margin.left+margin.right)
    .attr("height",h+margin.top+margin.bottom);

  const g = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const xScale = d3.scaleBand()
    .domain(summaryData.map(d=>d.label))
    .range([0, w])
    .padding(0.2);
  const maxVal = d3.max(summaryData, d=>d.value)||1;
  const yScale = d3.scaleLinear()
    .domain([0, maxVal])
    .range([h,0])
    .nice();

  g.append("g")
    .attr("transform", `translate(0,${h})`)
    .call(d3.axisBottom(xScale).tickSizeOuter(0));
  g.append("g").call(d3.axisLeft(yScale));

  g.selectAll(".barSumm")
    .data(summaryData)
    .enter().append("rect")
      .attr("class","barSumm")
      .attr("x", d=> xScale(d.label))
      .attr("y", d=> yScale(d.value))
      .attr("width", xScale.bandwidth())
      .attr("height", d=> h - yScale(d.value))
      .attr("fill","steelblue");

  //-----------
  // CHART #2: battery usage single bar
  //-----------
  d3.select("#project-summary-chart2").selectAll("*").remove();
  const svg2 = d3.select("#project-summary-chart2").append("svg")
    .attr("width", w+margin.left+margin.right)
    .attr("height", h+margin.top+margin.bottom);

  const g2 = svg2.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const batteryData = [
    { label:'AvgBatteryUsed', value:+avgBatteryUsed }
  ];
  const x2 = d3.scaleBand()
    .domain(batteryData.map(d=>d.label))
    .range([0, w])
    .padding(0.2);
  const maxBat = d3.max(batteryData, d=>d.value)||1;
  const y2 = d3.scaleLinear()
    .domain([0,maxBat])
    .range([h,0])
    .nice();

  g2.append("g")
    .attr("transform", `translate(0,${h})`)
    .call(d3.axisBottom(x2));
  g2.append("g").call(d3.axisLeft(y2));

  g2.selectAll(".barBat")
    .data(batteryData)
    .enter().append("rect")
      .attr("class","barBat")
      .attr("x", d=>x2(d.label))
      .attr("y", d=>y2(d.value))
      .attr("width", x2.bandwidth())
      .attr("height", d=>h - y2(d.value))
      .attr("fill","darkred");

  //-----------
  // CHART #3: stops
  //-----------
  d3.select("#project-summary-chart3").selectAll("*").remove();
  const svg3 = d3.select("#project-summary-chart3").append("svg")
    .attr("width", w+margin.left+margin.right)
    .attr("height", h+margin.top+margin.bottom);
  const g3 = svg3.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);
  const stopsData = [
    { label: 'AvgStops', value: +avgStops }
  ];
  const x3 = d3.scaleBand()
    .domain(stopsData.map(d=>d.label))
    .range([0,w])
    .padding(0.2);
  const maxStops = d3.max(stopsData, d=>d.value)||1;
  const y3 = d3.scaleLinear()
    .domain([0,maxStops])
    .range([h,0])
    .nice();
  g3.append("g")
    .attr("transform", `translate(0,${h})`)
    .call(d3.axisBottom(x3));
  g3.append("g").call(d3.axisLeft(y3));

  g3.selectAll(".barStops")
    .data(stopsData)
    .enter().append("rect")
      .attr("class","barStops")
      .attr("x", d=>x3(d.label))
      .attr("y", d=>y3(d.value))
      .attr("width", x3.bandwidth())
      .attr("height", d=>h - y3(d.value))
      .attr("fill","limegreen");

  //-----------
  // CHART #4: simple line for total distance vs. totalTrips
  //-----------
  d3.select("#project-summary-chart4").selectAll("*").remove();
  const svg4 = d3.select("#project-summary-chart4").append("svg")
    .attr("width", w+margin.left+margin.right)
    .attr("height", h+margin.top+margin.bottom);

  const g4 = svg4.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);
  // We'll just do 2 points in a line: (0,0) -> (totalTrips, totalDistance)
  const lineData = [
    { x:0, y:0 },
    { x: totalTrips, y: sumDistance },
  ];
  const xMax4 = totalTrips;
  const yMax4 = sumDistance>1 ? sumDistance : 1;

  const x4 = d3.scaleLinear()
    .domain([0,xMax4])
    .range([0,w]);
  const y4 = d3.scaleLinear()
    .domain([0,yMax4])
    .range([h,0])
    .nice();

  g4.append("g")
    .attr("transform", `translate(0,${h})`)
    .call(d3.axisBottom(x4).ticks(5));
  g4.append("g").call(d3.axisLeft(y4).ticks(5));

  const lineGen4 = d3.line()
    .x(d=>x4(d.x))
    .y(d=>y4(d.y));
  g4.append("path")
    .datum(lineData)
    .attr("fill","none")
    .attr("stroke","blue")
    .attr("stroke-width",2)
    .attr("d", lineGen4);

  //-----------
  // CHART #5: a distribution approach: array of avg_speeds in a histogram
  //-----------
  d3.select("#project-summary-chart5").selectAll("*").remove();
  const speeds = tripsData.map(d=>parseFloat(d.avg_speed)||0);
  const svg5 = d3.select("#project-summary-chart5").append("svg")
    .attr("width", w+margin.left+margin.right)
    .attr("height",h+margin.top+margin.bottom);

  const g5 = svg5.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const x5 = d3.scaleLinear()
    .domain([0, d3.max(speeds)])
    .range([0,w]);
  const histogram = d3.histogram()
    .domain(x5.domain())
    .thresholds(x5.ticks(8));
  const bins = histogram(speeds);

  const yMax5 = d3.max(bins, d=> d.length );
  const y5 = d3.scaleLinear()
    .domain([0,yMax5])
    .range([h,0])
    .nice();

  // x-axis
  g5.append("g")
    .attr("transform", `translate(0,${h})`)
    .call(d3.axisBottom(x5).ticks(5));
  // y-axis
  g5.append("g")
    .call(d3.axisLeft(y5).ticks(5));

  g5.selectAll(".barHist")
    .data(bins)
    .enter().append("rect")
      .attr("x", d=> x5(d.x0))
      .attr("y", d=> y5(d.length))
      .attr("width", d=> x5(d.x1)- x5(d.x0)-1 )
      .attr("height", d=> h - y5(d.length))
      .attr("fill","goldenrod");

  // label
  g5.append("text")
    .attr("x", w/2)
    .attr("y", -5)
    .attr("text-anchor","middle")
    .style("font-size","12px")
    .text("Histogram of Avg Speeds");


}

/*****************************************************************
 * COLUMN CHECKBOX LOGIC
 ****************************************************************/
const mainColumnToggles    = document.querySelectorAll(".col-toggle");
const sensorDataSelect     = document.getElementById("sensorDataDisplaySelect");
const sensorColumnToggles  = document.querySelectorAll(".sensor-col-toggle");

// 1) For main columns
mainColumnToggles.forEach(ck => {
  ck.addEventListener("change", e => {
    const colKey = ck.getAttribute("data-col");
    columnVisibility[colKey] = e.target.checked;
    // re-draw
    createTable(tripsData);
  });
});

// 2) For sensor Data <select>
sensorDataSelect.addEventListener("change", (e) => {
  if (e.target.value==="show") {
    sensorDataDisplayed = true;
    // enable + check all sensor checkboxes
    sensorColumnToggles.forEach(ck => {
      ck.disabled = false;
      ck.checked  = true;
      const colKey = ck.getAttribute("data-col");
      columnVisibility[colKey] = true;
    });
  } else {
    sensorDataDisplayed = false;
    // disable all sensor checkboxes + set them false
    sensorColumnToggles.forEach(ck => {
      ck.disabled = true;
      ck.checked  = false;
      const colKey = ck.getAttribute("data-col");
      columnVisibility[colKey] = false;
    });
  }
  // re-draw
  createTable(tripsData);
});

// 3) For sensor checkboxes
sensorColumnToggles.forEach(ck => {
  ck.addEventListener("change", e => {
    const colKey = ck.getAttribute("data-col");
    columnVisibility[colKey] = e.target.checked;
    createTable(tripsData);
  });
});


loadData();
