// ----------------------------------------------------------------------------------
// map renders the map tool including a recent or chosen set of scooter trips. 
// This file contains methods to render the trip routes and dynamically load sensor data for selected trips.
// Authors: Buddhi Ashan M. K., Christina Duthie
// Start date: 02/01/2023


//This version only renders trips. The other sensor data are pulled dynamically as per user request 
// ----------------------------------------------------------------------------------

// global variables
var gminx, gminy, gmaxx, gmaxy;
var trips;


window.onload = function() {
    fetchTripsAndRender();
};

// ----------------------------------------------------------------------------------
// Requests trip GPS data and renders them on the Map
// ----------------------------------------------------------------------------------
async function fetchTripsAndRender() {
    // var response=await fetch(url+'/trips') // used to retriev all trip data
    var response=await fetch(url+'/tripsGPS') // used to retrieve only gps data
    .catch((error) => console.error("Error fetching data:", error));

    trips = await response.json();
    // Call renderScooterTrips with fetched data
    renderScooterTrips(trips);
}

// ----------------------------------------------------------------------------------
//fetches trip data and renders them on the map.
// ----------------------------------------------------------------------------------
function renderScooterTrips(trips) { 
    require([
        "esri/config",
        "esri/Map",
        "esri/views/MapView",
        "esri/widgets/Search",
        "esri/Graphic",
        "esri/layers/GraphicsLayer",
        "esri/geometry/Extent",

        "esri/geometry/SpatialReference",
    
        "esri/widgets/BasemapToggle",
        "esri/widgets/BasemapGallery",
        "esri/widgets/Expand",

        "esri/widgets/Sketch",
        "esri/geometry/support/webMercatorUtils",
        "esri/geometry/geometryEngine"
    
        ], function(esriConfig, Map, MapView, Search, Graphic, GraphicsLayer, Extent, SpatialReference, BasemapToggle, BasemapGallery, Expand, Sketch, webMercatorUtils, geometryEngine) {
            esriConfig.apiKey="AAPK7c7d215fcd9848cb80732ee818643c4dup3DhD1dsH1W--DI1Mh8vEFyp0faPvPhi2POkUdUUpPBjP8HcEzkxwKimIOeFngf";
    
        const loadingDiv = document.getElementById("loading");

        // Function to show loading indicator
        function showLoading() {
            loadingDiv.style.display = "block";
        }
    
        // Function to hide loading indicator
        function hideLoading() {
            loadingDiv.style.display = "none";
        }
        
        const map = new Map({
            basemap: "streets-navigation-vector"
        });
    
        const graphicsLayer = new GraphicsLayer();
        map.add(graphicsLayer);
    
        // Separate graphics layer for the rectangle
        const rectangleLayer = new GraphicsLayer();
        map.add(rectangleLayer);
    
        // Add polylines for each trip to the polylineLayer
        trips.forEach((trip, i) => {
            if (typeof trip.sensor_data.longitude[0] === 'number' && typeof trip.sensor_data.latitude[0] === 'number') {
                graphicsLayer.add(getScooterTripAllCont(Graphic, trip, trips.length, i, first=true));
            }
        });

        let startSymbol = {
            type: "simple-marker",
            color: "green",
            size: "10px"
          };
        
        // let endSymbol = {
        //     type: "simple-marker",
        //     color: "red",
        //     size: "10px"
        // };

        let endSymbol = {
            type: "picture-marker",
            url: locationPin, // location pin icon
            width: "24px",
            height: "24px",
            color: "red",
            yoffset: "12px" // Adjust to align the pin properly
        };

        // add points for start of each trip
        trips.forEach((trip, i) => {
            if (typeof trip.sensor_data.longitude[0] === 'number' && typeof trip.sensor_data.latitude[0] === 'number') {
                lid=trip.sensor_data.longitude.length-1;
                graphicsLayer.add(getTripEndPoint(Graphic, startSymbol, trip.sensor_data.longitude[0], trip.sensor_data.latitude[0]));
                graphicsLayer.add(getTripEndPoint(Graphic, endSymbol, trip.sensor_data.longitude[lid], trip.sensor_data.latitude[lid]));
            }
        });

        // find global MBR 
        findGlobalMBR(trips);

        const view = new MapView({
            map: map,
            container: "viewDiv"
        });
        // console.log(gminx, gminy, gmaxx, gmaxy)
        // the projection engine must be loaded in the app if the spatial reference
        // of the view does not match the spatial reference of the extent
        const extent = new Extent({
            ymin:  gminy,
            xmin:  gminx,
            ymax:  gmaxy,
            xmax:  gmaxx,
            // spatialReference: new SpatialReference({wkid:3857})
            // spatialReference: SpatialReference.WGS84
        });
        view.extent = extent;  // Updates the view without animation                                      

        // Adding map utilities
        // places the logo div in the bottom right corner of the view
        view.ui.add("logoDiv", "bottom-right");

        view.popup = {
           
        };
    
        const search = new Search({
            view: view
        });
        // place basemap toggle selection widget
        view.ui.add(search, "top-left");
    
        const basemapToggle = new BasemapToggle({
            view: view,
            nextBasemap: "arcgis-imagery"
        });
        // place basemap selection widget
        view.ui.add(basemapToggle,"bottom-right");
    
        const basemapGallery = new BasemapGallery({
            view: view,
            container: document.createElement("div"),
            source: {
                query: {
                title: '"World Basemaps for Developers" AND owner:esri'
                }
            }
        });
        // view.ui.add(basemapGallery,"bottom-left");
        const bgExpand = new Expand({
            view: view,
            content: basemapGallery
        });
    
        view.ui.add(bgExpand, "top-left");

        // Initialize Sketch widget for drawing the rectangle
        const sketch = new Sketch({
            view: view,
            layer: rectangleLayer, // Use the rectangleLayer for sketching
            creationMode: "update",
            visibleElements: {
                createTools: { point: false, polyline: false, polygon: false, circle: false, rectangle: true }
            }
        });
        view.ui.add(sketch, "top-left");

        // Listen for the create event to capture the rectangle's extent
        sketch.on("create", function(event) {
            if (event.state === "complete") {
                const geometry = event.graphic.geometry;

                // Calculate and log the extent
                const extent = geometry.extent;
                // console.log('Extent:', extent); 
                updateExtentInputs(extent);
            }
        });

        // Function to update extent input fields
        function updateExtentInputs(extent) {
            // Convert min and max points to lat/lon
            const minPoint = webMercatorUtils.xyToLngLat(extent.xmin, extent.ymin);
            const maxPoint = webMercatorUtils.xyToLngLat(extent.xmax, extent.ymax);

            // console.log(minPoint, maxPoint);

            document.getElementById('extent1').value = minPoint[1];
            document.getElementById('extent2').value = maxPoint[1];
            document.getElementById('extent3').value = minPoint[0];
            document.getElementById('extent4').value = maxPoint[0];

            // open search box
            var searchForm = document.getElementById('searchForm');
            if (searchForm.style.display === 'none' || searchForm.style.display === '') {
                searchForm.style.display = 'block'; 
            }
        }

        // Show loading animation when the view is updating
        view.watch("updating", function (isUpdating) {
            if (!isUpdating) {
                hideLoading();
            } 
            // else {
            //     showLoading();
            // }
        });

        // // Show loading animation when layers are loading
        // view.on("layerview-create", function (event) {
        //     const layerView = event.layerView;
        //     if (layerView) {
        //         layerView.watch("updating", function (isUpdating) {
        //             if (isUpdating) {
        //                 showLoading();
        //             } else {
        //                 hideLoading();
        //             }
        //         });
        //     }
        // });
    });
}

// Utility functions
//Converts GPS data points into a format suitable for polyline creation in ArcGIS.
function getGpsPath(gpsData, first) {
    const gpsPath = [];
    // console.log("test data")
    // console.log(gpsData.latitude, gpsData.longitude)
    valCount=gpsData.longitude.length;
    if(valCount>gpsData.latitude.length)
        valCount=gpsData.latitude.length;

    // var minx=(gpsData.longitude[0]), miny=(gpsData.latitude[0]);
    // var maxx=(gpsData.longitude[0]), maxy=(gpsData.latitude[0]);
    for (let i = 0; i < valCount; i++) {
        gpsPath.push([gpsData.longitude[i], gpsData.latitude[i]]);

        // //remove in the production. This data will be provided from the API
        // if(minx>gpsPath[i][0])
        //     minx=gpsPath[i][0];
        // if(miny>gpsPath[i][1])
        //     miny=gpsPath[i][1];
        // if(maxx<gpsPath[i][0])
        //     maxx=gpsPath[i][0];
        // if(maxy<gpsPath[i][1])
        //     maxy=gpsPath[i][1];
    }

    // // if first entry
    // if(first){
    //     gminx=minx;
    //     gminy=miny;
    //     gmaxx=maxx;
    //     gmaxy=maxy;
    // }else{
    //     if(gminx>minx)
    //         gminx=minx;
    //     if(gminy>miny)
    //         gminy=miny;
    //     if(gmaxx<maxx)
    //         gmaxx=maxx;
    //     if(gmaxy<maxy)
    //         gmaxy=maxy;
    // }
    // first=false
    // console.log(gpsPath)
    return gpsPath;
}

// 
function getAccSamplingIntervals(sensorData, n, label) {
    const intervals = [];
    const timestamps = sensorData.acc_timestamp;
    const chk = (timestamps[timestamps.length - 1] - timestamps[0]) / n;

    for (let i = 0; i < n; ++i) {
        const intervalTime = timestamps[0] + i * chk;
        intervals.push(intervalTime + label);
    }
    // console.log(intervals);
    return intervals;
}

// creates a dictonary for sensor data
function getSampleDataDict(data, label) {
    dict=[];
    for (let i=0; i<data.length; ++i) {
        dict[i+label]=data[i];
    }
    return dict;
}

//Extracts and formats trip information for display in the map popups.
function getScooterTripInfo(trip) {

    tripInfo = {
        Name: "Trip " + trip.trip_id + " (Scooter " + trip.scooter_id + ")",
        Date: new Date(trip.start_time).toLocaleDateString(),
        Start_time: new Date(trip.start_time).toLocaleTimeString(),
        End_time: new Date(trip.end_time).toLocaleTimeString(),
        Trip_distance: trip.distance + " mi",
        Average_speed: trip.avg_speed + " kmph",
        Max_speed: trip.max_speed + " kmph",
        Min_speed: trip.min_speed + " kmph",
        Start_battery_status: trip.start_battery_status + " %",
        End_battery_status: trip.end_battery_status + " %",
        Stops: trip.stops,
        Video: trip.video_link,
        Audio: trip.audio_link
    };

    tripInfo=Object.assign({}, tripInfo, getSampleDataDict(trip.sensor_data.acc_x, "ax"));
    tripInfo=Object.assign({}, tripInfo, getSampleDataDict(trip.sensor_data.acc_y, "ay"));
    tripInfo=Object.assign({}, tripInfo, getSampleDataDict(trip.sensor_data.acc_z, "az"));

    tripInfo=Object.assign({}, tripInfo, getSampleDataDict(trip.sensor_data.gyro_x, "gx"));
    tripInfo=Object.assign({}, tripInfo, getSampleDataDict(trip.sensor_data.gyro_y, "gy"));
    tripInfo=Object.assign({}, tripInfo, getSampleDataDict(trip.sensor_data.gyro_z, "gz"));

    tripInfo=Object.assign({}, tripInfo, getSampleDataDict(trip.sensor_data.mag_x, "mx"));
    tripInfo=Object.assign({}, tripInfo, getSampleDataDict(trip.sensor_data.mag_y, "my"));
    tripInfo=Object.assign({}, tripInfo, getSampleDataDict(trip.sensor_data.mag_z, "mz"));

    tripInfo=Object.assign({}, tripInfo, getSampleDataDict(trip.sensor_data.temperature, "temp"));
    tripInfo=Object.assign({}, tripInfo, getSampleDataDict(trip.sensor_data.pressure, "pres"));
    tripInfo=Object.assign({}, tripInfo, getSampleDataDict(trip.sensor_data.humidity, "humi"));
    tripInfo=Object.assign({}, tripInfo, getSampleDataDict(trip.sensor_data.altitude, "alti"));


    return tripInfo;
}

// populate sampling rate with sensor label
function getSamplingRate(size, label) {
    arr=[];
    for(let i=0; i<size; ++i) {
        arr[i]=i+label;
    }
    return arr;
}

// generate color for heat map
function getHeatMapColor(value) {
    // Normalize the value between 0 and 1
    let t = Math.min(Math.max(value, 0), 1);

    // Define colors
    let colors = [
        [128, 0, 0],
        [255, 0, 128],
        [255, 0, 255]   
    ];

    // Determine the two colors to interpolate between
    let i = Math.floor(t * (colors.length - 1));
    let startColor = colors[i];
    let endColor = colors[i + 1] || colors[i];

    // Interpolate between the two selected colors
    let f = t * (colors.length - 1) - i;
    let color = [
        Math.round((1 - f) * startColor[0] + f * endColor[0]),
        Math.round((1 - f) * startColor[1] + f * endColor[1]),
        Math.round((1 - f) * startColor[2] + f * endColor[2])
    ];

    return color;
}

// Reneders line charts and returns the html object. Works for multi-axis data
// function renderLineChart(data, lineNames, title, y_label, x_label) {
//     // Create the chart container div
//     const chartDiv = document.createElement('div');
//     chartDiv.classList.add('chart-container');

//     const margin = { top: 20, right: 30, bottom: 70, left: 40 };
//     const width = 400 - margin.left - margin.right;
//     const height = 220 - margin.top - margin.bottom;

//     const svg = d3.select(chartDiv).append('svg')
//         .attr('width', width + margin.left + margin.right)
//         .attr('height', height + margin.top + margin.bottom)
//         .append('g')
//         .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

//     const x = d3.scaleLinear()
//         .domain([0, data[0].length - 1])
//         .range([0, width]);

//     const y = d3.scaleLinear()
//         .domain([d3.min(data.flat()), d3.max(data.flat())])  // Flatten 2D array to get the min/max values
//         .range([height, 0]);

//     const line = d3.line()
//         .x((d, i) => x(i))
//         .y(d => y(d));

//     // Generate a unique color for each line
//     const colors = d3.schemeCategory10;

//     // Draw lines for each data array in the 2D array
//     const paths = data.map((lineData, index) => {
//         return svg.append('path')
//             .data([lineData])
//             .attr('class', 'line')
//             .attr('d', line)  // Initial path generation
//             .attr('fill', 'none')
//             .attr('stroke', colors[index % colors.length])  // Use color from d3.schemeCategory10
//             .attr('stroke-width', 2);
//     });

//     const xAxis = svg.append('g')
//         .attr('transform', 'translate(0,' + height + ')')
//         .call(d3.axisBottom(x).ticks(5));

//     const yAxis = svg.append('g')
//         .call(d3.axisLeft(y));

//     svg.append('text')
//         .attr('transform', 'translate(' + (width / 2) + ',' + (height + margin.bottom - 10) + ')')
//         .style('text-anchor', 'middle')
//         .text(x_label);

//     svg.append('text')
//         .attr('transform', 'rotate(-90)')
//         .attr('x', -height / 2)
//         .attr('y', -30)
//         .style('text-anchor', 'middle')
//         .text(y_label);

//     svg.append('text')
//         .attr('x', width / 2)
//         .attr('y', 0)
//         .attr('text-anchor', 'middle')
//         .style('font-size', '18px')
//         .text(title);

//     // Create a brush for zooming functionality
//     const brush = d3.brushX()
//         .extent([[0, 0], [width, height]]) // Set the extent of the brush
//         .on('end', brushed);  // Change from 'brush' to 'end' event for smoother operation

//     svg.append('g')
//         .attr('class', 'brush')
//         .call(brush);

//     // Brush event handler (triggered when selection ends)
//     function brushed(event) {
//         const selection = event.selection;

//         if (!selection) return;

//         // Get the new domain based on the brush selection
//         const [x0, x1] = selection;
//         const newDomain = [x.invert(x0), x.invert(x1)];

//         // Update the x-axis domain to snap to integers
//         const newXDomain = [Math.floor(newDomain[0]), Math.ceil(newDomain[1])];

//         // Ensure that the domain is not smaller than the data range
//         x.domain([Math.max(0, newXDomain[0]), Math.min(data[0].length - 1, newXDomain[1])]);

//         // Update each line path with the new domain
//         paths.forEach((path, index) => {
//             path.transition() // Add a smooth transition
//             .duration(500) // Set the duration of the transition in milliseconds
//             .attr('d', line(data[index]));  // Update path data for each line
//         });

//         // Dynamically calculate ticks based on the current zoom level
//         const tickSpacing = Math.max(1, Math.floor(x.domain()[1] - x.domain()[0]) / 5);
//         const numTicks = Math.max(3, Math.floor((x.domain()[1] - x.domain()[0]) / tickSpacing));

//         // Update the x-axis with the new scale and dynamically calculated ticks
//         xAxis.transition() // Add a smooth transition to the axis
//         .duration(500)
//         .call(d3.axisBottom(x).ticks(numTicks).tickFormat(d3.format('~s')));
//     }

//     // Double click reset to restore the full view
//     svg.on('dblclick', function() {
//         // Reset x-axis domain to show the full data range
//         x.domain([0, data[0].length - 1]);

//         // Reset the brush
//         d3.select('.brush').call(brush.move, null);

//         // Update the chart
//         paths.forEach((path, index) => {
//             path.transition() // Add a smooth transition
//             .duration(500) // Set the duration of the transition in milliseconds
//             .attr('d', line(data[index]));  // Reset path data for each line
//         });

//         xAxis.transition() // Add a smooth transition to the axis
//         .duration(500)
//         .call(d3.axisBottom(x).ticks(5));  // Show default 5 ticks for full view
//     });

//     // Create the legend
//     const legend = svg.append('g')
//         .attr('transform', 'translate(0,' + (height + 20) + ')');

//     data.forEach((lineData, index) => {
//         legend.append('rect')
//             .attr('x', index * 100)
//             .attr('width', 20)
//             .attr('height', 10)
//             .attr('fill', colors[index % colors.length]);

//         legend.append('text')
//             .attr('x', index * 100 + 25)
//             .attr('y', 10)
//             .text(lineNames[index])
//             .style('font-size', '12px')
//             .attr('alignment-baseline', 'middle');
//     });

//     return chartDiv;
// }

// generate x-axis time labels for a given smapling rate and data size
// samplingRate is in hertz
function generateXAxis(samplingRate, numPoints, unit='s') {
    const timeInterval = 1 / samplingRate; // Time interval in seconds
    const xAxis = [];
    let multiplier = 1; // Default is seconds

    // Set multiplier based on the unit
    switch (unit.toLowerCase()) {
        case "ms":
            multiplier = 1000;
            break;
        case "micros":
            multiplier = 1e6;
            break;
        case "s":
            multiplier = 1;
            break;
        default:
            throw new Error("Invalid unit. Use 'seconds', 'milliseconds', or 'microseconds'.");
    }
    // console.log(samplingRate+' '+timeInterval+' '+multiplier+' '+numPoints)

    for (let i = 0; i < numPoints; i++) {
        xAxis.push(i * timeInterval * multiplier);
    }
    
    return xAxis;
}

// render line chart for a given array of values
function renderLineChart(data, lineNames, samplingRate, unit, title, y_label, x_label) {
    // Create the chart container div
    const chartDiv = document.createElement('div');
    chartDiv.classList.add('chart-container');

    const margin = { top: 20, right: 30, bottom: 70, left: 40 };
    const width = 400 - margin.left - margin.right;
    const height = 220 - margin.top - margin.bottom;

    const svg = d3.select(chartDiv).append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // Generate x-values based on the sampling rate and value count
    const xValues = generateXAxis(samplingRate, data[0].length, unit);
    // console.log(xValues);
    // console.log(xValues.length);
    // console.log(width)

    // Define D3 scale using the x-values
    const x = d3.scaleLinear()
        .domain([xValues[0], xValues[xValues.length - 1]]) // Use the range of generated x-values
        .range([0, width]);
    
    // const x = d3.scaleLinear()
    //     .domain([0, data[0].length - 1])
    //     .range([0, width]);

    const y = d3.scaleLinear()
        .domain([d3.min(data.flat()), d3.max(data.flat())])  // Flatten 2D array to get the min/max values
        .range([height, 0]);

    const line = d3.line()
        .x((d, i) => x(i))
        .y(d => y(d));

    // Generate a unique color for each line
    const colors = d3.schemeCategory10;

    // Create the clip path to restrict the lines to the chart area
    const clip = svg.append("defs").append("clipPath")
        .attr("id", "clip")
        .append("rect")
        .attr("width", width)
        .attr("height", height)
        .attr("x", 0)
        .attr("y", 0); // Ensures lines are clipped at x=0

    // Group for the lines with clipPath applied
    const linesGroup = svg.append('g')
        .attr('class', 'lines-group')
        .attr('clip-path', 'url(#clip)'); // Apply clipPath to the lines group

    // Draw lines for each data array in the 2D array
    const paths = data.map((lineData, index) => {
        return linesGroup.append('path')
            .data([lineData])
            .attr('class', 'line')
            .attr('d', line)  // Initial path generation
            .attr('fill', 'none')
            .attr('stroke', colors[index % colors.length])  // Use color from d3.schemeCategory10
            .attr('stroke-width', 2);
    });

    const xAxis = svg.append('g')
        .attr('transform', 'translate(0,' + height + ')')
        .call(d3.axisBottom(x).ticks(5));

    const yAxis = svg.append('g')
        .call(d3.axisLeft(y));

    svg.append('text')
        .attr('transform', 'translate(' + (width / 2) + ',' + (height + margin.bottom - 10) + ')')
        .style('text-anchor', 'middle')
        .text(x_label);

    svg.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('x', -height / 2)
        .attr('y', -30)
        .style('text-anchor', 'middle')
        .text(y_label);

    svg.append('text')
        .attr('x', width / 2)
        .attr('y', 0)
        .attr('text-anchor', 'middle')
        .style('font-size', '18px')
        .text(title);

    // Create a brush for zooming functionality
    const brush = d3.brushX()
        .extent([[0, 0], [width, height]]) // Set the extent of the brush
        .on('end', brushed);  // Change from 'brush' to 'end' event for smoother operation

    svg.append('g')
        .attr('class', 'brush')
        .call(brush);

    // Brush event handler (triggered when selection ends)
    function brushed(event) {
        const selection = event.selection;

        if (!selection) return;

        // Get the new domain based on the brush selection
        const [x0, x1] = selection;
        const newDomain = [x.invert(x0), x.invert(x1)];

        // Update the x-axis domain to snap to integers
        const newXDomain = [Math.floor(newDomain[0]), Math.ceil(newDomain[1])];

        // Ensure that the domain is not smaller than the data range
        x.domain([Math.max(0, newXDomain[0]), Math.min(data[0].length - 1, newXDomain[1])]);

        // Smooth transition for axis and lines
        xAxis.transition().duration(1000).call(d3.axisBottom(x));
        
        // Smooth transition for line paths
        paths.forEach((path, index) => {
            path.transition()
                .duration(1000)
                .attr('d', line(data[index]));  // Update path data for each line
        });

        // Dynamically calculate ticks based on the current zoom level
        const tickSpacing = Math.max(1, Math.floor(x.domain()[1] - x.domain()[0]) / 5);
        const numTicks = Math.max(3, Math.floor((x.domain()[1] - x.domain()[0]) / tickSpacing));

        // Update the x-axis with the new scale and dynamically calculated ticks
        xAxis.call(d3.axisBottom(x).ticks(numTicks).tickFormat(d3.format('~s')));
    }

    // Double click reset to restore the full view
    svg.on('dblclick', function() {
        // Reset x-axis domain to show the full data range
        // x.domain([0, data[0].length - 1]);
        x.domain([xValues[0], xValues[xValues.length - 1]]) // Use the range of generated x-values

        // Reset the brush
        d3.select('.brush').call(brush.move, null);

        // Smooth transition to reset the chart
        paths.forEach((path, index) => {
            path.transition()
                .duration(1000)
                .attr('d', line(data[index]));  // Reset path data for each line
        });

        xAxis.transition().duration(1000).call(d3.axisBottom(x).ticks(5));  // Show default 5 ticks for full view
    });

    // Create the legend
    const legend = svg.append('g')
        .attr('transform', 'translate(0,' + (height + 20) + ')');

    data.forEach((lineData, index) => {
        legend.append('rect')
            .attr('x', index * 100)
            .attr('width', 20)
            .attr('height', 10)
            .attr('fill', colors[index % colors.length]);

        legend.append('text')
            .attr('x', index * 100 + 25)
            .attr('y', 10)
            .text(lineNames[index])
            .style('font-size', '12px')
            .attr('alignment-baseline', 'middle');
    });

    return chartDiv;
}

// Function to convert "YYYY-MM-DD HH:MM:SS" format to a Date object
function parseDate(dateStr) {
    const isoDateStr = dateStr.trim().replace(" ", "T");
    return new Date(isoDateStr);
}

// ------------------------------------------------------------------------------
// Find global MBR of the trips
// ------------------------------------------------------------------------------
function findGlobalMBR(trips) {
    gminx=trips[0].mbr.min_lon;
    gminy=trips[0].mbr.min_lat;
    gmaxx=trips[0].mbr.max_lon;
    gmaxy=trips[0].mbr.max_lat;

    // Add polylines for each trip to the polylineLayer
    trips.forEach((trip, i) => {
        if (typeof trip.sensor_data.longitude[0] === 'number' && typeof trip.sensor_data.latitude[0] === 'number') {
            if(gminx>trip.mbr.min_lon)
                gminx=trip.mbr.min_lon;
            if(gminy>trip.mbr.min_lat)
                gminy=trip.mbr.min_lat;
            if(gmaxx<trip.mbr.max_lon)
                gmaxx=trip.mbr.max_lon;
            if(gmaxy<trip.mbr.max_lat)
                gmaxy=trip.mbr.max_lat;
        }
        // console.log(trip.mbr.min_lon+" "+trip.mbr.min_lat+" "+trip.mbr.max_lon+" "+trip.mbr.max_lat);
    });
    // console.log(gminx+" "+gminy+" "+gmaxx+" "+gmaxy);
}

// ------------------------------------------------------------------------------
// Loads a start or end point of a trip
// ------------------------------------------------------------------------------
function getTripEndPoint(Graphic, symbol, lon, lat) {
    // Create graphics for end point
    return endGraphic = new Graphic({
        geometry: { type: "point", longitude: lon, latitude: lat },
        symbol: symbol
    });
}

// ------------------------------------------------------------------------------
// Dynamically loads sensor data for a selected trip.
// ------------------------------------------------------------------------------
function getScooterTripAllCont(Graphic, trip, tripCount, tid, first) {
    // set trip trajectory color
    let genColor = [
        [128],
        [230],
        [230]   
    ];
    if (tripCount>1) {
        genColor = getHeatMapColor((tid)/(tripCount-1));  // Normalize by line index
    }

    // set extent


    //a polyline graphic is created and added to the map.
    const polylineGraphic = new Graphic({
        geometry: {
            type: "polyline",
            paths: getGpsPath(trip.sensor_data, first)
        },
        symbol: {
            type: "simple-line",
            join: "round",
            // color: [200, 119, b], // Orange
            color: genColor, 
            width: 5
        },
        popupTemplate: {
        // title: "Polyline Chart",
        content: () => {
        // Dynamically fetch data for the chart
        tripID = trip.trip_id;
        return fetch(url+'/tripData?id='+tripID)
            .then(response => response.json())
            .then(data => {
                // console.log(data[0])
                timeDiffSeconds=(parseDate(data[0].end_time)-parseDate(data[0].start_time))/1000
                // console.log(timeDiffSeconds)

                const chartAcc = renderLineChart([data[0].sensor_data.acc_x, data[0].sensor_data.acc_y, data[0].sensor_data.acc_z], ['x', 'y', 'z'],  (data[0].sensor_data.acc_x.length/timeDiffSeconds), 's', 'Accelerometer', 'Amplitude', 'Time (s)');
                const chartGyro = renderLineChart([data[0].sensor_data.gyro_x, data[0].sensor_data.gyro_y, data[0].sensor_data.gyro_z], ['x', 'y', 'z'],  (data[0].sensor_data.gyro_x.length/timeDiffSeconds), 's', 'Gyroscope', 'Amplitude', 'Time (s)');
                const chartMag = renderLineChart([data[0].sensor_data.mag_x, data[0].sensor_data.mag_y, data[0].sensor_data.mag_z], ['x', 'y', 'z'],  (data[0].sensor_data.mag_x.length/timeDiffSeconds), 's', 'Magnetometer', 'Amplitude', 'Amplitude (s)');
                const chartOri = renderLineChart([data[0].sensor_data.pitch, data[0].sensor_data.roll, data[0].sensor_data.yaw], ['pitch', 'roll', 'yaw'],  (data[0].sensor_data.pitch.length/timeDiffSeconds), 's', 'Orientation', 'Amplitude', 'Time (s)');
                const chartAlt = renderLineChart([data[0].sensor_data.altitude], ['x'],  (data[0].sensor_data.altitude.length/timeDiffSeconds), 's', 'Altitude', 'Altitude', 'Time (s)');
                const chartHumi = renderLineChart([data[0].sensor_data.humidity], ['x'],  (data[0].sensor_data.humidity.length/timeDiffSeconds), 's', 'Humidity', 'Humidity', 'Time (s)');
                const chartPress = renderLineChart([data[0].sensor_data.pressure], ['x'],  (data[0].sensor_data.pressure.length/timeDiffSeconds), 's', 'Pressure', 'Pressure', 'Time (s)');
                const chartTemp = renderLineChart([data[0].sensor_data.temperature], ['x'],  (data[0].sensor_data.temperature.length/timeDiffSeconds), 's', 'Temperature', 'Temperature', 'Time (s)');

                const textContent = `<h5>Trip ${tripID} (Scooter ${data[0].scooter_id})</h5>
                    <p><strong>Start Date:</strong> ${data[0].start_time}</p>
                    <p><strong>End Date:</strong> ${data[0].end_time}</p>
                    <p><strong>Trip Duration:</strong> ${Math.floor(timeDiffSeconds/60*10)/10} minutes</p>
                    <p><strong>Distance:</strong> ${data[0].distance} km</p>
                    <p><strong>Average Speed:</strong> ${data[0].avg_speed} kmph</p>
                    <p><strong>Max Speed:</strong> ${data[0].max_speed} kmph</p>
                    <p><strong>Min Speed:</strong> ${data[0].min_speed} kmph</p>
                    <p><strong>Start Battery:</strong> ${data[0].start_battery} W</p>
                    <p><strong>End Battery:</strong> ${data[0].end_battery} W</p>
                    `;
                // Append the text content (above charts)
                const textDiv = document.createElement('div');
                textDiv.innerHTML = textContent;

                const hr1 = document.createElement('hr');
                hr1.style.margin = '18px auto 0px auto';  // Add some spacing around the line
                hr1.style.width = '375px';

                // Wrap the two charts in a container for layout
                const containerDiv = document.createElement('div');
                containerDiv.style.display = 'block';  // Display charts side by side

                // Append both charts to the container
                containerDiv.appendChild(textDiv);
                containerDiv.appendChild(hr1.cloneNode(true));
                
                containerDiv.appendChild(chartAcc);
                containerDiv.appendChild(hr1.cloneNode(true));
                
                containerDiv.appendChild(chartGyro);
                containerDiv.appendChild(hr1.cloneNode(true));
                
                containerDiv.appendChild(chartMag);
                containerDiv.appendChild(hr1.cloneNode(true));
                
                containerDiv.appendChild(chartOri);
                containerDiv.appendChild(hr1.cloneNode(true));
                
                containerDiv.appendChild(chartAlt);
                containerDiv.appendChild(hr1.cloneNode(true));
                
                containerDiv.appendChild(chartHumi);
                containerDiv.appendChild(hr1.cloneNode(true));
                
                containerDiv.appendChild(chartPress);
                containerDiv.appendChild(hr1.cloneNode(true));
                
                containerDiv.appendChild(chartTemp);
                containerDiv.appendChild(hr1.cloneNode(true));
                
                return containerDiv;
            })
            .catch(err => {
                console.error("Error fetching chart data:", err);
                return "Failed to load chart data.";
            });
        }
    },
    });

    return polylineGraphic;
}
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// This front-end data downloading is deprecated functinality

// ----------------------------------------------------------------------------------
// write to a JSON file
// deprecated method
// ----------------------------------------------------------------------------------
function downloadJSONFile(jsonArray) {
    const jsonString = JSON.stringify(jsonArray, null, 2); // Properly format JSON with indentation
    const blob = new Blob([jsonString], { type: 'application/json' });
    saveAs(blob, 'output.json'); // Use FileSaver.js to save the file
}

document.getElementById('btnJSONDownload').addEventListener('click', () => {
    console.log(trips[0])
    // const jsonString = JSON.stringify(trips);
    downloadJSONFile(trips);
});

// ----------------------------------------------------------------------------------
// save to a csv file 
// deprecated method
// ----------------------------------------------------------------------------------
function downloadCSVFile(jsonArray) {
    if (!jsonArray || !jsonArray.length) {
        console.error("Invalid data");
        return;
    }

    // Function to generate sensor data rows and group them
    function generateSensorDataRows(sensorData, numRows) {
        let rows = [];
        for (let i = 0; i < numRows; i++) {
            let row = {};
            for (let sensor in sensorData) {
                if (Array.isArray(sensorData[sensor])) {
                    row[sensor] = sensorData[sensor][i] !== undefined ? sensorData[sensor][i] : 'null';
                } else {
                    row[sensor] = 'null';
                }
            }
            rows.push(row);
        }
        return rows;
    }

    // Main loop to process JSON array
    const csvRows = [];
    const headers = [];

    jsonArray.forEach(item => {
        const { sensor_data, ...otherData } = item;

        // Get the number of rows based on sensor data arrays
        const numRows = Math.max(...Object.values(sensor_data).map(arr => arr.length));

        // Generate sensor data rows
        const sensorRows = generateSensorDataRows(sensor_data, numRows);

        // Add headers if they haven't been added yet
        if (csvRows.length === 0) {
            const nonSensorHeaders = Object.keys(otherData);
            const sensorHeaders = Object.keys(sensor_data);
            headers.push(...nonSensorHeaders, ...sensorHeaders);
            csvRows.push(headers.join(','));  // Add headers as the first row in the CSV
        }

        // Add the sensor rows combined with the non-sensor data
        sensorRows.forEach(sensorRow => {
            const nonSensorRow = Object.keys(otherData).map(key => 
                otherData[key] === null || otherData[key] === undefined ? 'null' : otherData[key]
            );
            const fullRow = [...nonSensorRow, ...Object.values(sensorRow)];
            csvRows.push(fullRow.join(','));
        });
    });

    // Create a CSV string
    const csvString = csvRows.join('\n');

    // Create a Blob object from the CSV string
    const blob = new Blob([csvString], { type: 'text/csv' });

    // Create a download link
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'data.csv';  // Name of the file

    // Append link, trigger download and then remove the link
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
   
}

// ----------------------------------------------------------------------------------
// deprecated method
// ----------------------------------------------------------------------------------
document.getElementById('btnCSVDownload').addEventListener('click', () => {
    downloadCSVFile(trips);
});
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++