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
          <div class="col-sm-4" style="position: relative">
            <label for="start-time" class="col-sm-6 col-form-label">Start Time</label>
            <input class="form-control" type="datetime-local" style="width: 100%" id="start-time" name="start-time"
              placeholder="Start Time" />
          </div>

          <!-- Search Button placed here -->
          <div class="col-sm-4 d-flex justify-content-center align-items-center">
            <button type="submit" class="btn btn-primary">Search</button>
          </div>

          <div class="col-sm-4" style="position: relative">
            <label for="end-time" class="col-sm-6 col-form-label">End Time</label>
            <input class="form-control" type="datetime-local" id="end-time" name="end-time" placeholder="End Time" />
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

        <!-- Dynamic Form Fields Will Be Injected Here -->
        <div id="dynamic-form-sections"></div>

        <!-- Original search button remains here -->
        <div class="search-button">
          <button type="submit" class="btn btn-primary">Search</button>
        </div>
      </form>
    </div>
  </div>

  <div id="viewDiv">
    <div id="loading"
      style="display: none; position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgb(57 57 57 / 39%); z-index: 10; text-align: center; line-height: 50;">
      <div class="spinner"></div>
    </div>
  </div>

  <div id="logoDiv" class="esri-widget">
    <img class="logo-img" src="{{ asset('img-icons/ScooterLabLogo.png') }}" alt="Scooter Lab">
    <div id="basemapGalleryDiv"></div>
  </div>

  <div class="legend">
    <div class="start-pin"></div>
    <p>Trip Start</p>
    <img src="{{ asset('img-icons/location-pin.png') }}" alt="trip end">
    <p>Trip End</p>
  </div>

  <script src="https://d3js.org/d3.v7.min.js"></script>
  <script src="https://js.arcgis.com/4.26/"></script>
  <script>
    var app_env = "{{config('app.env')}}"
    
    if(app_env === 'test-vm' || app_env === 'production') {
      // For production or test-vm, use the external fcapi endpoint
      var url = '{{ URL::asset('/fcapi') }}';
    } else {
      // For local or dev environment, use the local fcapi
      var url = "http://172.20.215.102:8008/fcapi-open";
    }

    var locationPin = "{{ asset('img-icons/location-pin.png') }}";
  </script>
  <script type="text/javascript" src="{{ asset('js/formGenerators.js') }}"></script>
  <script type="text/javascript" src="{{ asset('js/apiData.js') }}"></script>
  <script type="text/javascript" src="{{ asset('js/map.js') }}"></script>
  <script type="text/javascript" src="{{ asset('js/general.js') }}"></script>
  <script type="text/javascript" src="{{ asset('js/apiRequestHandler.js') }}"></script>
  <script>
    document.addEventListener('DOMContentLoaded', function () {
      const script = document.createElement('script');
      script.src = "{{ asset('js/searchbox.js') }}";
      document.body.appendChild(script);
    });
  </script>
</x-app-layout>