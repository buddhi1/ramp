// ----------------------------------------------------------------------------------
// map renders the map tool including a recent or chosen set of scooter trips. 
// This file contains methods to render the trip routes and dynamically load sensor data for selected trips.
// Authors: Buddhi Ashan M. K., Christina Duthie
// Start date: 02/01/2023


//This version renders trips along with the sensor data for each trip 
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
        "esri/geometry/geometryEngine"
    
        ], function(esriConfig, Map, MapView, Search, Graphic, GraphicsLayer, Extent, SpatialReference, BasemapToggle, BasemapGallery, Expand, Sketch, geometryEngine) {
            esriConfig.apiKey="AAPK7c7d215fcd9848cb80732ee818643c4dup3DhD1dsH1W--DI1Mh8vEFyp0faPvPhi2POkUdUUpPBjP8HcEzkxwKimIOeFngf";
    
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
            document.getElementById('extent1').value = extent.xmin.toFixed(4);
            document.getElementById('extent2').value = extent.ymin.toFixed(4);
            document.getElementById('extent3').value = extent.xmax.toFixed(4);
            document.getElementById('extent4').value = extent.ymax.toFixed(4);
        }
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

    var minx=(gpsData.longitude[0]), miny=(gpsData.latitude[0]);
    var maxx=(gpsData.longitude[0]), maxy=(gpsData.latitude[0]);
    for (let i = 0; i < valCount; i++) {
        gpsPath.push([gpsData.longitude[i], gpsData.latitude[i]]);

        //remove in the production. This data will be provided from the API
        if(minx>gpsPath[i][0])
            minx=gpsPath[i][0];
        if(miny>gpsPath[i][1])
            miny=gpsPath[i][1];
        if(maxx<gpsPath[i][0])
            maxx=gpsPath[i][0];
        if(maxy<gpsPath[i][1])
            maxy=gpsPath[i][1];
    }

    // if first entry
    if(first){
        gminx=minx;
        gminy=miny;
        gmaxx=maxx;
        gmaxy=maxy;
    }else{
        if(gminx>minx)
            gminx=minx;
        if(gminy>miny)
            gminy=miny;
        if(gmaxx<maxx)
            gmaxx=maxx;
        if(gmaxy<maxy)
            gmaxy=maxy;
    }
    first=false
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

function getScooterTripAllCont(Graphic, trip, tripCount, tid, first) {
    const attributes = getScooterTripInfo(trip);
    let genColor = getHeatMapColor((tid)/(tripCount-1));  // Normalize by line index
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
        attributes: attributes,
        popupTemplate: {
            title: "{Name}",
            content: [
                {
                    type: "fields",
                    fieldInfos: [
                        { fieldName: "Date", label: "Date" },
                        { fieldName: "Start_time", label: "Start Time" },
                        { fieldName: "End_time", label: "End Time" },
                        { fieldName: "Trip_distance", label: "Trip Distance" },
                        { fieldName: "Average_speed", label: "Average Speed" },
                        { fieldName: "Max_speed", label: "Max Speed" },
                        { fieldName: "Min_speed", label: "Min Speed" },
                        { fieldName: "Start_battery_status", label: "Start Battery" },
                        { fieldName: "End_battery_status", label: "End Battery" },
                        { fieldName: "Stops", label: "Stops" }
                        // { fieldName: "Video", label: "Video Link", format: { hyperlink: true } },
                        // { fieldName: "Audio", label: "Audio Link", format: { hyperlink: true } }
                    ]
                },
                // plots single axis sensor data
                {
                    type: "media",
                    title: "Sensor Data",
                    mediaInfos: [
                        {
                            title: "<b>Temperature</b>",
                            type: "line-chart",
                            value: {
                                fields: getSamplingRate(trip.sensor_data.acc_x.length, "temp")
                            }
                        },
                        {
                            title: "<b>Pressure</b>",
                            type: "line-chart",
                            value: {
                              fields: getSamplingRate(trip.sensor_data.acc_x.length, "pres"),
                            }
                        },
                        {
                            title: "<b>Humidity</b>",
                            type: "line-chart",
                            value: {
                              fields: getSamplingRate(trip.sensor_data.acc_x.length, "humi"),
                            }
                        }
                    ],
                },
                // plots for multi axis data
                {
                    type: "media",
                    title: "Accelerometer Data",
                    mediaInfos: [
                        {
                            title: "<b>Accelerometer X</b>",
                            type: "line-chart",
                            value: {
                                fields: getSamplingRate(trip.sensor_data.acc_x.length, "ax")
                            }
                        },
                        {
                            title: "<b>Accelerometer Y</b>",
                            type: "line-chart",
                            value: {
                              fields: getSamplingRate(trip.sensor_data.acc_x.length, "ay"),
                            }
                        },
                        {
                            title: "<b>Accelerometer Z</b>",
                            type: "line-chart",
                            value: {
                              fields: getSamplingRate(trip.sensor_data.acc_x.length, "az"),
                            }
                        }
                    ],
                },
                {
                    type: "media",
                    title: "Gyroscope Data",
                    mediaInfos: [
                        // charts for multi axis data
                        {
                            title: "<b>Gyroscope X</b>",
                            type: "line-chart",
                            value: {
                                fields: getSamplingRate(trip.sensor_data.acc_x.length, "gx")
                            }
                        },
                        {
                            title: "<b>Gyroscope Y</b>",
                            type: "line-chart",
                            value: {
                              fields: getSamplingRate(trip.sensor_data.acc_x.length, "gy"),
                            }
                        },
                        {
                            title: "<b>Gyroscope Z</b>",
                            type: "line-chart",
                            value: {
                              fields: getSamplingRate(trip.sensor_data.acc_x.length, "gz"),
                            }
                        }
                    ],
                },
                {
                    type: "media",
                    title: "Magnetometer Data",
                    mediaInfos: [
                        // charts for multi axis data
                        {
                            title: "<b>Magnetometer X</b>",
                            type: "line-chart",
                            value: {
                                fields: getSamplingRate(trip.sensor_data.acc_x.length, "mx")
                            }
                        },
                        {
                            title: "<b>Magnetometer Y</b>",
                            type: "line-chart",
                            value: {
                              fields: getSamplingRate(trip.sensor_data.acc_x.length, "my"),
                            }
                        },
                        {
                            title: "<b>Magnetometer Z</b>",
                            type: "line-chart",
                            value: {
                              fields: getSamplingRate(trip.sensor_data.acc_x.length, "mz"),
                            }
                        }
                    ],
                },
                {
                    type: "text",
                    text: `
                        <b>Video:</b><br>
                        <video width="300" controls>
                            <source src="{Video}" type="video/mp4">
                            Your browser does not support the video tag.
                        </video><br>
                        <b>Audio:</b><br>
                        <audio controls>
                            <source src="{Audio}" type="audio/mpeg">
                            Your browser does not support the audio element.
                        </audio>
                    `
                },
            ]
        }
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