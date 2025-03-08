<x-app-layout>

  <div class="container">
    <!-- Icon to toggle the form -->
    <div class="icon" id="toggleForm">
      <i class="fa-solid fa-gear"></i>
    </div>

    <div class="search-form" id="searchForm" style="display: none">
      <h4>Search</h4>
      <button id="btnJSONDownload">Download JSON</button>
      <button id="btnCSVDownload">Download CSV</button>


      <form id="searchboxForm">
        <div class="row g-2">
          <div class="col-sm-6" style="position: relative">
            <label for="start-time" class="col-sm-6 col-form-label">Start Time</label>
            <input class="form-control" type="datetime-local" style="width: 100%" id="start-time"
              name="start-time" placeholder="Start Time" />
          </div>
          <div class="col-sm-6" style="position: relative">
            <label for="end-time" class="col-sm-6 col-form-label">End Time</label>
            <input class="form-control" type="datetime-local" id="end-time" name="end-time"
              placeholder="End Time" />
          </div>
        </div>
        <div class="mb-3 row g-2">
          <div class="col-sm-6">
            <input class="form-check-input" style="margin-top: 11px" type="radio" name="ziporextent" id="zipRadio" />
            <label for="zip" class="col-sm-4 col-form-label">Zip</label>
            <div>
              <input type="text" class="form-control" id="zip" name="zip" placeholder="Enter zip code" />
            </div>
          </div>
          <div class="col-sm-6">
            <!-- <input class="form-check-input" style="margin-top: 11px" type="radio" name="ziporextent" id="extent" /> -->
            <label class="col-sm-4 col-form-label">Extent</label>
            <div class="row">
              <div class="col-sm-3" id="extentbox1">
                <input type="text" class="form-control" id="extent1" name="extent" placeholder="x" />
              </div>
              <div class="col-sm-3" id="extentbox2">
                <input type="text" class="form-control" id="extent2" name="extent" placeholder="y" />
              </div>
              <div class="col-sm-3" id="extentbox3">
                <input type="text" class="form-control" id="extent3" name="extent" placeholder="x" />
              </div>
              <div class="col-sm-3" id="extentbox4">
                <input type="text" class="form-control" id="extent4" name="extent" placeholder="y" />
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="mb-3 row">
          <label for="pathType" class="col-sm-4 col-form-label">Path Type</label>
          <div class="col-sm-8">
            <input type="text" class="form-control" id="pathType" name="pathType" placeholder="Enter path type" />
          </div>
        </div> -->
        <br>
        <!-- Distance -->
        <div class="mb-3 row">
          <div class="form-check" style="margin-left: 12px;">
            <input class="form-check-input" type="checkbox" style="margin-right: 3px" value="" id="distance-check" />
            <label>Distance:</label>
          </div>
          <div class="col-4">
            <div id="distance-box-1" style="display: none">
              <div class="values">
                <span id="distance-range1">0</span><span> &dash; </span>
                <span id="distance-range2">100</span>
              </div>
              <!-- Slider -->
              <div class="container1">
                <div class="slider-track"></div>
                <input type="range" min="0" max="100" value="30" id="distance-slider-1" oninput="slideOne()">
                <input type="range" min="0" max="100" value="70" id="distance-slider-2" oninput="slideTwo()">
              </div>
            </div>
          </div>
          <div class="col-4">
            <div style="margin-left: 15px; display: none" id="distance-box">
              <div class="input-group  mb-3">
                <select class="form-select" id="sortdistance">
                  <option value="NONE">No Sort</option>
                  <option value="ASC">Asc</option>
                  <option value="DSC">Desc</option>
                </select>
                </div>
            </div>
          </div>
          <div class="col-4">
            <div id="distance-box-2" style="display: none;">
              <div class="input-group  mb-3">
              <select class="form-select measures-select" id="select-distance">
                <option>Value</option>
                <option>Average</option>
                <option>Max</option>
                <option>Min</option></select>
              </div> 
            </div>
          </div>
        </div>
        <!-- enerygy spent -->
        <div class="mb-3 row">
          <div class="form-check" style="margin-left: 12px;">
            <input class="form-check-input" type="checkbox" style="margin-right: 3px" value=""
              id="energy-spent-check" />
            <label>Energy Spent:</label>
          </div>
          <div class="col-4">
            <div id="energy-spent-box-1" style="display: none">
              <div class="values">
                <span id="energy-range1">0</span>
                <span> &dash; </span>
                <span id="energy-range2">100</span>
              </div>
              <!-- Slider -->
              <div class="container1">
                <div class="slider-track1"></div>
                <input type="range" min="0" max="100" value="30" id="energy-slider-1" oninput="slideOne()">
                <input type="range" min="0" max="100" value="70" id="energy-slider-2" oninput="slideTwo()">
              </div>
            </div>
          </div>
          <div class="col-4">
            <div style="margin-left: 15px; display: none" id="energy-spent-box">
              <div class="input-group  mb-3">
                <select class="form-select" id="sortEnergy">
                  <option value="NONE">No Sort</option>
                  <option value="ASC">Asc</option>
                  <option value="DSC">Desc</option>
                </select>
                </div>
            </div>
          </div>
          <div class="col-4">
            <div id="energy-spent-box-2" style="display: none;">
              <div class="input-group mb-3">
                <select class="form-select" id="select-energy">
                  <option>Value</option>
                  <option>Average</option>
                  <option>Max</option>
                  <option>Min</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <!-- speed range -->
        <div class="mb-3 row">
          <div class="form-check" style="margin-left: 12px;">
            <input class="form-check-input" type="checkbox" style="margin-right: 3px" value="" id="speed-check" />
            <label>Speed Range:</label>
          </div>
          <div class="col-4">
            <div id="speed-box" style="display: none">
              <div class="values">
                <span id="speed-range1">0</span><span> &dash; </span>
                <span id="speed-range2">100</span>
              </div>
              <!-- Slider -->
              <div class="container1">
                <div class="slider-track2"></div>
                <input type="range" min="0" max="100" value="30" id="speed-slider-1" oninput="slideOne()">
                <input type="range" min="0" max="100" value="70" id="speed-slider-2" oninput="slideTwo()">
              </div>
            </div>
          </div>
          <div class="col-4">
            <div style="margin-left: 15px; display: none" id="speed-box-1">
              <div class="input-group  mb-3">
                <select class="form-select" id="sortSpeed">
                  <option value="NONE">No Sort</option>
                  <option value="ASC">Asc</option>
                  <option value="DSC">Desc</option>
                </select>
                </div>
            </div>
          </div>
          <div class="col-4">
            <div id="speed-box-2" style="display: none;">
              <div class="input-group mb-3">
                <select class="form-select measures-select" id="select-speed">
                  <option>Value</option>
                  <option>Average</option>
                  <option>Max</option>
                  <option>Min</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <!-- speed range ends -->
        <!-- temperature -->
        <div class="mb-3 row">
          <div class="form-check" style="margin-left: 12px;">
            <input class="form-check-input" type="checkbox" style="margin-right: 3px" value="" id="temperature-check" />
            <label>Temperature:</label>
          </div>
          <div class="col-4">
            <div id="temperature-box" style="display: none">
              <div class="values">
                <span id="temp-range1">0</span><span> &dash; </span>
                <span id="temp-range2">100</span>
              </div>
              <!-- Slider -->
              <div class="container1">
                <div class="slider-track3"></div>
                <input type="range" min="0" max="100" value="30" id="temp-slider-1" oninput="slideOne()">
                <input type="range" min="0" max="100" value="70" id="temp-slider-2" oninput="slideTwo()">
              </div>
            </div>
          </div>
          <div class="col-4">
            <div style="margin-left: 15px; display: none" id="temperature-box-1">
              <div class="input-group  mb-3">
                <select class="form-select" id="sortTemp">
                  <option value="NONE">No Sort</option>
                  <option value="ASC">Asc</option>
                  <option value="DSC">Desc</option>
                </select>
                </div>
            </div>
          </div>
          <div class="col-4">
            <div id="temperature-box-2" style="display: none;">
              <div class="input-group mb-3">
                <select class="form-select" id="select-temperature">
                  <option>Value</option>
                  <option>Average</option>
                  <option>Max</option>
                  <option>Min</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <!-- temperature end -->
        <!-- pressure -->
        <div class="mb-3 row">
          <div class="form-check" style="margin-left: 12px;">
            <input class="form-check-input" type="checkbox" style="margin-right: 3px" value="" id="pressure-check" />
            <label>Pressure:</label>
          </div>
          <div class="col-4">
            <div id="pressure-box" style="display: none">
              <div class="values">
                <span id="pressure-range1">0</span><span> &dash; </span>
                <span id="pressure-range2">100</span>
              </div>
              <!-- Slider -->
              <div class="container1">
                <div class="slider-track4"></div>
                <input type="range" min="970" max="995" value="980" id="pressure-slider-1" oninput="slideOne()">
                <input type="range" min="970" max="995" value="990" id="pressure-slider-2" oninput="slideTwo()">
              </div>
            </div>
          </div>
          <div class="col-4">
            <div style="margin-left: 15px; display: none" id="pressure-box-1">
              <div class="input-group  mb-3">
                <select class="form-select" id="sortPressure">
                  <option value="NONE">No Sort</option>
                  <option value="ASC">Asc</option>
                  <option value="DSC">Desc</option>
                </select>
                </div>
            </div>
          </div>     
          <div class="col-4">
            <div id="pressure-box-2" style="display: none;">
              <div class="input-group mb-3">
                <select class="form-select" id="select-pressure">
                  <option>Value</option>
                  <option>Average</option>
                  <option>Max</option>
                  <option>Min</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <!-- pressure ends -->
        <!-- humidity -->
        <div class="mb-3 row">
          <div class="form-check" style="margin-left: 12px;">
            <input class="form-check-input" type="checkbox" style="margin-right: 3px" value="" id="humidity-check" />
            <label>Humidity:</label>
          </div>
          <div class="col-4">
            <div id="humidity-box" style="display: none">
              <div class="values">
                <span id="humidity-range1">0</span><span> &dash; </span>
                <span id="humidity-range2">100</span>
              </div>
              <!-- Slider -->
              <div class="container1">
                <div class="slider-track5"></div>
                <input type="range" min="0" max="100" value="30" id="humidity-slider-1" oninput="slideOne()">
                <input type="range" min="0" max="100" value="70" id="humidity-slider-2" oninput="slideTwo()">
              </div>         
            </div>
          </div>
          <div class="col-4">
            <div style="margin-left: 15px; display: none" id="humidity-box-1">
              <div class="input-group  mb-3">
                <select class="form-select" id="sortHumidity">
                <option value="NONE">No Sort</option>
                <option value="ASC">Asc</option>
                  <option value="DSC">Desc</option>
                </select>
                </div>
            </div>
          </div>       
          <div class="col-4">
            <div id="humidity-box-2" style="display: none;">
              <div class="input-group mb-3">
                <select class="form-select" id="select-humidity">
                  <option>Value</option>
                  <option>Average</option>
                  <option>Max</option>
                  <option>Min</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <!-- humidity ends -->
        <!-- light -->
        <div class="mb-3 row">
          <div class="form-check" style="margin-left: 12px;">
            <input class="form-check-input" type="checkbox" style="margin-right: 3px" value="" id="light-check" />
            <label>Light:</label>
          </div>
          <div class="col-4">
            <div id="light-box" style="display: none">
              <div class="values">
                <span id="light-range1">0</span><span> &dash; </span>
                <span id="light-range2">100</span>
              </div>
              <!-- Slider -->
              <div class="container1">
                <div class="slider-track6"></div>
                <input type="range" min="0" max="100" value="30" id="light-slider-1" oninput="slideOne()">
                <input type="range" min="0" max="100" value="70" id="light-slider-2" oninput="slideTwo()">
              </div>           
            </div>
          </div>
          <div class="col-4">
            <div style="margin-left: 15px; display: none" id="light-box-1">
              <div class="input-group  mb-3">
                <select class="form-select" id="sortLight">
                  <option value="NONE">No Sort</option>
                  <option value="ASC">Asc</option>
                  <option value="DSC">Desc</option>
                </select>
                </div>
            </div>
          </div>
          <div class="col-4">
            <div id="light-box-2" style="display: none;">
              <div class="input-group mb-3">
                <select class="form-control" id="select-light">
                  <option>Value</option>
                  <option>Average</option>
                  <option>Max</option>
                  <option>Min</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <!-- light ends -->
        <hr />
        <!-- acceleration -->
        <div class="form-group mb-3">
          <input class="form-check-input" type="checkbox" style="margin-right: 3px" value="" id="acceleration-check" />
          <label class="col-form-label">Acceleration Range</label>
            <div class="row g-4">
              <div class="col-sm-4"> 
                <div id="acceleration-box" style="display: none">
                  <div class="values">                  
                    <label>X axis: </label>
                    <span id="accX-range1">0</span><span> &dash; </span>
                    <span id="accX-range2">100</span>
                  </div>
                  <!-- Slider -->
                  <div class="container1">
                    <div class="slider-track7"></div>
                    <input type="range" min="0" max="100" value="30" id="accX-slider-1" oninput="slideOne()">
                    <input type="range" min="0" max="100" value="70" id="accX-slider-2" oninput="slideTwo()">
                  </div> 
                  <div class="input-group">
                    <select class="form-select" id="select-accelerationx">
                      <option>Value</option>
                      <option>Average</option>
                      <option>Max</option>
                      <option>Min</option>
                    </select>
                  </div> 
                </div>                                     
              </div>
              <div class="col-sm-4">
                <div id="acceleration-box-1" style="display: none">
                  <div class="values">                  
                    <label>Y axis: </label>
                    <span id="accY-range1">0</span><span> &dash; </span>
                    <span id="accY-range2">100</span>
                  </div>
                  <!-- Slider -->
                  <div class="container1">
                    <div class="slider-track8"></div>
                    <input type="range" min="0" max="100" value="30" id="accY-slider-1" oninput="slideOne()">
                    <input type="range" min="0" max="100" value="70" id="accY-slider-2" oninput="slideTwo()">
                  </div>
                  <div class="input-group">
                    <select class="form-select" id="select-accelerationy">
                      <option>Value</option>
                      <option>Average</option>
                      <option>Max</option>
                      <option>Min</option>
                    </select>
                  </div>
                </div>
         
              </div>
              <div class="col-sm-4">
                <div id="acceleration-box-2" style="display: none">
                  <div class="values">                  
                    <label>Z axis: </label>
                    <span id="accZ-range1">0</span><span> &dash; </span>
                    <span id="accZ-range2">100</span>
                  </div>
                  <!-- Slider -->
                  <div class="container1">
                    <div class="slider-track9"></div>
                    <input type="range" min="0" max="100" value="30" id="accZ-slider-1" oninput="slideOne()">
                    <input type="range" min="0" max="100" value="70" id="accZ-slider-2" oninput="slideTwo()">
                  </div>
                  <div class="input-group">
                    <select class="form-select" id="select-accelerationz">
                      <option>Value</option>
                      <option>Average</option>
                      <option>Max</option>
                      <option>Min</option>
                    </select>
                  </div>
                </div>        
              </div>
          </div>
        </div>
        <!-- Gyroscope -->
        <div class="form-group mb-3">
          <input class="form-check-input" type="checkbox" style="margin-right: 3px" id="gyroscope-check" />
          <label class="col-form-label">Gyroscope Range</label>
            <div class="row g-4">
              <div class="col-sm-4">
                <div id="gyroscope-box" style="display: none">
                  <div class="values">                  
                    <label>X axis: </label>
                    <span id="gyroX-range1">0</span><span> &dash; </span>
                    <span id="gyroX-range2">100</span>
                  </div>
                  <!-- Slider -->
                  <div class="container1">
                    <div class="slider-track10"></div>
                    <input type="range" min="0" max="100" value="30" id="gyroX-slider-1" oninput="slideOne()">
                    <input type="range" min="0" max="100" value="70" id="gyroX-slider-2" oninput="slideTwo()">
                  </div>
                  <div class="input-group">
                    <select class="form-select" id="select-gyroscopex">
                      <option>Value</option>
                      <option>Average</option>
                      <option>Max</option>
                      <option>Min</option>
                    </select>
                  </div>
                </div>
              
              </div>
              <div class="col-sm-4">
                <div id="gyroscope-box-1" style="display: none">
                  <div class="values">                  
                    <label>Y axis: </label>
                    <span id="gyroY-range1">0</span><span> &dash; </span>
                    <span id="gyroY-range2">100</span>
                  </div>
                  <!-- Slider -->
                  <div class="container1">
                    <div class="slider-track11"></div>
                    <input type="range" min="0" max="100" value="30" id="gyroY-slider-1" oninput="slideOne()">
                    <input type="range" min="0" max="100" value="70" id="gyroY-slider-2" oninput="slideTwo()">
                  </div>
                  <div class="input-group">
                    <select class="form-select" id="select-gyroscopey">
                      <option>Value</option>
                      <option>Average</option>
                      <option>Max</option>
                      <option>Min</option>
                    </select>
                  </div>
                </div>
              
              </div>
              <div class="col-sm-4">
                <div id="gyroscope-box-2" style="display: none">
                  <div class="values">                  
                    <label>Z axis: </label>
                    <span id="gyroZ-range1">0</span><span> &dash; </span>
                    <span id="gyroZ-range2">100</span>
                  </div>
                  <!-- Slider -->
                  <div class="container1">
                    <div class="slider-track12"></div>
                    <input type="range" min="0" max="100" value="30" id="gyroZ-slider-1" oninput="slideOne()">
                    <input type="range" min="0" max="100" value="70" id="gyroZ-slider-2" oninput="slideTwo()">
                  </div>
                  <div class="input-group">
                    <select class="form-select" id="select-gyroscopez">
                      <option>Value</option>
                      <option>Average</option>
                      <option>Max</option>
                      <option>Min</option>
                    </select>
                  </div>
                </div>
          
              
            </div>
          </div>
        </div>
        <!-- Gyroscope ends -->
        <!-- magnetometer -->
        <div class="form-group mb-3">
          <input class="form-check-input" type="checkbox" style="margin-right: 3px" value="" id="magnetometer-check" />
          <label class="col-form-label">Magnetometer Range</label>
            <div class="row g-4">
              <div class="col-sm-4">
                <div id="magnetometer-box" style="display: none">
                  <div class="values">                  
                    <label>X axis: </label>
                    <span id="magX-range1">0</span><span> &dash; </span>
                    <span id="magX-range2">100</span>
                  </div>
                  <!-- Slider -->
                  <div class="container1">
                    <div class="slider-track13"></div>
                    <input type="range" min="0" max="100" value="30" id="magX-slider-1" oninput="slideOne()">
                    <input type="range" min="0" max="100" value="70" id="magX-slider-2" oninput="slideTwo()">
                  </div>
                  <div class="input-group">
                    <select class="form-select" id="select-magnetometerx">
                      <option>Value</option>
                      <option>Average</option>
                      <option>Max</option>
                      <option>Min</option>
                    </select>
                  </div>
                </div>
                
              </div>
              <div class="col-sm-4">
                <div id="magnetometer-box-1" style="display: none">
                  <div class="values">                  
                    <label>Y axis: </label>
                    <span id="magY-range1">0</span><span> &dash; </span>
                    <span id="magY-range2">100</span>
                  </div>
                  <!-- Slider -->
                  <div class="container1">
                    <div class="slider-track14"></div>
                    <input type="range" min="0" max="100" value="30" id="magY-slider-1" oninput="slideOne()">
                    <input type="range" min="0" max="100" value="70" id="magY-slider-2" oninput="slideTwo()">
                  </div>
                  <div class="input-group">
                    <select class="form-select" id="select-magnetometery">
                      <option>Value</option>
                      <option>Average</option>
                      <option>Max</option>
                      <option>Min</option>
                    </select>
                  </div>
                </div>             
              </div>
              <div class="col-sm-4">
                <div id="magnetometer-box-2" style="display: none">
                  <div class="values">                  
                    <label >Z axis: </label>
                    <span id="magZ-range1">0</span><span> &dash; </span>
                    <span id="magZ-range2">100</span>
                  </div>
                  <!-- Slider -->
                  <div class="container1">
                    <div class="slider-track15"></div>
                    <input type="range" min="0" max="100" value="30" id="magZ-slider-1" oninput="slideOne()">
                    <input type="range" min="0" max="100" value="70" id="magZ-slider-2" oninput="slideTwo()">
                  </div>
                  <div class="input-group">
                    <select class="form-select" id="select-magnetometerz">
                      <option>Value</option>
                      <option>Average</option>
                      <option>Max</option>
                      <option>Min</option>
                    </select>
                  </div>
                </div>
               
              </div>
          </div>
        </div>
        <!-- magnetometer ends -->
        <!-- orientation -->
        <div class="form-group mb-3">
          <input class="form-check-input" type="checkbox" style="margin-right: 3px" value="" id="orientation-check" />
          <label class="col-form-label">Orientation Range</label>
            <div class="row g-4">
              <div class="col-sm-4">
                <div id="orientation-box" style="display: none">
                  <div class="values">                  
                    <label >X axis: </label>
                    <span id="orienX-range1">0</span><span> &dash; </span>
                    <span id="orienX-range2">100</span>
                  </div>
                  <!-- Slider -->
                  <div class="container1">
                    <div class="slider-track16"></div>
                    <input type="range" min="0" max="100" value="30" id="orienX-slider-1" oninput="slideOne()">
                    <input type="range" min="0" max="100" value="70" id="orienX-slider-2" oninput="slideTwo()">
                  </div>
                  <div class="input-group">
                    <select class="form-select" id="select-orientationx">
                      <option>Type</option>
                      <option>Value</option>
                      <option>Average</option>
                      <option>Max</option>
                      <option>Min</option>
                    </select>
                  </div>
                </div>      
              </div>
              <div class="col-sm-4">
                <div id="orientation-box-1" style="display: none">
                  <div class="values">                  
                    <label >Y axis: </label>
                    <span id="orienY-range1">0</span><span> &dash; </span>
                    <span id="orienY-range2">100</span>
                  </div>
                  <!-- Slider -->
                  <div class="container1">
                    <div class="slider-track17"></div>
                    <input type="range" min="0" max="100" value="30" id="orienY-slider-1" oninput="slideOne()">
                    <input type="range" min="0" max="100" value="70" id="orienY-slider-2" oninput="slideTwo()">
                  </div>
                  <div class="input-group">
                    <select class="form-select" id="select-orientationy">
                      <option>Type</option>
                      <option>Value</option>
                      <option>Average</option>
                      <option>Max</option>
                      <option>Min</option>
                    </select>
                  </div>
                </div>    
              </div>
              <div class="col-sm-4">
                <div id="orientation-box-2" style="display: none">
                  <div class="values">                  
                    <label >Z axis: </label>
                    <span id="orienZ-range1">0</span><span> &dash; </span>
                    <span id="orienZ-range2">100</span>
                  </div>
                  <!-- Slider -->
                  <div class="container1">
                    <div class="slider-track18"></div>
                    <input type="range" min="0" max="100" value="30" id="orienZ-slider-1" oninput="slideOne()">
                    <input type="range" min="0" max="100" value="70" id="orienZ-slider-2" oninput="slideTwo()">
                  </div>
                  <div class="input-group">
                    <select class="form-select" id="select-orientationz">
                      <option>Type</option>
                      <option>Value</option>
                      <option>Average</option>
                      <option>Max</option>
                      <option>Min</option>
                    </select>
                  </div>
                </div>
                          </div>
          </div>
        </div>
        <!-- orientation ends -->
        <div class="search-button">
          <button type="submit" class="btn btn-primary">Search</button>
        </div>
      </form>
      
    </div>
  </div>

  

  <div id="viewDiv">
  <div id="loading" style="display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; /*background: rgba(255, 255, 255, 0.8);*/ background: rgb(57 57 57 / 39%); z-index: 10; text-align: center; line-height: 50;">
    <div class="spinner"></div>
  </div>

  </div>
  <div id="logoDiv" class="esri-widget">
    <img class="logo-img" src="{{ asset('img-icons/ScooterLabLogo.png') }}" alt="Scooter Lab">
    <div id="basemapGalleryDiv"></div>
  </div>
  
  <div class="legend">
    <div class="start-pin"></div> <p>Trip Start</p>
    <img src="{{ asset('img-icons/location-pin.png') }}" alt="trip end"> <p>Trip End</p>
  </div>


    <script src="https://d3js.org/d3.v7.min.js"></script> 

    <!-- script loading -->
    <script src="https://js.arcgis.com/4.26/"></script>
    <script>
      var url = '{{ URL::asset('/fcapi') }}';
      var locationPin = '{{ asset('img-icons/location-pin.png') }}';
    </script>
   
    <script type="text/javascript" src="{{ asset('js/map.js') }}"></script>
    <script type="text/javascript" src="{{ asset('js/general.js') }}"></script>
    <script type="text/javascript" src="{{ asset('js/apiRequestHandler.js') }}"></script>
    <script type="text/javascript" src="{{ asset('js/searchbox.js') }}"></script>


    <!-- <script type="text/javascript" src="js/general.js"></script>
    <script type="text/javascript" src="js/apiRequestHandler.js"></script>
    <script type="text/javascript" src="js/searchbox.js"></script> -->


</x-app-layout>
