var url='http://localhost:8008/fcapi'

window.onload = function() {
    fetchTripsAndRender();
};

async function fetchTripsAndRender() {
    try {
        // Path to the JSON file which contains the trip data
        const response = await fetch('/data/trips.json'); 
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const trips = await response.json();
        console.log(trips)
        // Call renderScooterTrips with fetched data
        renderScooterTrips(trips); 
    } 
    //Error handling is implemented to log issues if the fetch request fails.
    catch (error) {
        console.error('Could not fetch trips:', error);
    }

    // var response=await fetch(url+'/trips')
    // // .then((response) => renderScooterTrips(response.json()))
    // // //.then((data) => console.log(data))
    // // .catch((error) => console.error("Error fetching data:", error));

    // const trips = await response.json();
    // console.log(trips)
    // // Call renderScooterTrips with fetched data
    // renderScooterTrips(trips);

    
}
//take the fetched trip data and visualize it on the map.
function renderScooterTrips(trips) {
    require([
        "esri/config",
        "esri/Map",
        "esri/views/MapView",
        "esri/widgets/Search",
        "esri/Graphic",
        "esri/layers/GraphicsLayer",
    
        "esri/widgets/BasemapToggle",
        "esri/widgets/BasemapGallery",
        "esri/widgets/Expand"
    
        ], function(esriConfig, Map, MapView, Search, Graphic, GraphicsLayer, BasemapToggle, BasemapGallery, Expand) {
            esriConfig.apiKey="AAPK7c7d215fcd9848cb80732ee818643c4dup3DhD1dsH1W--DI1Mh8vEFyp0faPvPhi2POkUdUUpPBjP8HcEzkxwKimIOeFngf";
    
        const map = new Map({
            basemap: "streets-navigation-vector"
        });
    
        const view = new MapView({
            map: map,
            center: [-98.61947, 29.58553], //Longitude, latitude
            zoom: 15,
            container: "viewDiv"
        });
    
        const graphicsLayer = new GraphicsLayer();
        map.add(graphicsLayer);
    
        trips.forEach((trip, i) => {
            let deltaX = 0;
            let deltaY = 0;
            let b = 140 + i * 20; // Change the color slightly for each trip
    
            graphicsLayer.add(getScooterTripAllCont(Graphic, trip, deltaX, deltaY, b));
        });
        // Adding map utilities
        // places the logo div in the bottom right corner of the view
        view.ui.add("logoDiv", "bottom-right");
    
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
    
        view.ui.add(bgExpand, "top-right");
    });
}

// Utility functions
//Converts GPS data points into a format suitable for polyline creation in ArcGIS.
function getGpsPath(gpsData, deltaX = 0, deltaY = 0) {
    const gpsPath = [];

    for (let i = 0; i < gpsData.latitude.length; i++) {
        gpsPath.push([gpsData.longitude[i] + deltaX, gpsData.latitude[i] + deltaY]);
    }
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
    console.log(intervals);
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
        Trip_distance: trip.trip_distance + " m",
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

function getScooterTripAllCont(Graphic, trip, deltaX, deltaY, b) {
    const attributes = getScooterTripInfo(trip);
    console.log(trip.sensor_data.acc_x)
    //a polyline graphic is created and added to the map.
    const polylineGraphic = new Graphic({
        geometry: {
            type: "polyline",
            paths: getGpsPath(trip.sensor_data, deltaX, deltaY)
        },
        symbol: {
            type: "simple-line",
            color: [200, 119, b], // Orange
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
                        { fieldName: "Stops", label: "Stops" },
                        { fieldName: "Video", label: "Video Link", format: { hyperlink: true } },
                        { fieldName: "Audio", label: "Audio Link", format: { hyperlink: true } }
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
                }
            ]
        }
    });

    return polylineGraphic;
}
