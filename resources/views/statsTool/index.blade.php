{{-- resources/views/statsTool/index.blade.php --}}

<x-app-layout>
    <div class="">
        <div class="w-full ">
            <div class="bg-white dark:bg-gray-800 overflow-hidden shadow sm:rounded-lg">
                
                {{-- Include your HTML structure here --}}
                <div class="container">
                    <!-- Left Column -->
                    <div class="left-column">
                        <h1>Scooter Trip Data Dashboard</h1>
                        <!-- Sensor Toggle Bookmark -->
                        <div class="bookmark-tab" id="sensor-toggle">
                            View Sensor Data
                        </div>
                        <!-- Table Container -->
                        <div id="table-container"></div>
                    </div>

                    <!-- Right Column -->
                    <div class="right-column">
                        <h2>Visualization</h2>
                        
                        <div class="input-row">
                            <!-- Scooter ID Select -->
                            <div class="tripInputBox">
                                <label for="scooterIdSelect">Scooter ID:</label>
                                <select id="scooterIdSelect">
                                    <!-- Populated dynamically -->
                                </select>
                            </div>

                            <!-- Trip ID Select -->
                            <div class="tripInputBox">
                                <label for="tripIdSelect">Trip ID:</label>
                                <select id="tripIdSelect">
                                    <!-- Populated dynamically -->
                                </select>
                            </div>

                            <!-- Sensor Select -->
                            <div class="sensorType">
                                <label for="sensorSelect">Sensor:</label>
                                <select id="sensorSelect">
                                    <!-- Populated dynamically -->
                                </select>
                            </div>
                        </div>

                        <!-- Plot Button -->
                        <button id="plotButton">Plot</button>

                        <!-- Chart Container (all charts appear here) -->
                        <div id="chart-container" style="margin-top:20px;"></div>
                    </div>
                </div>

                {{-- Load Styles & Scripts --}}
                <link rel="stylesheet" href="{{ asset('css/statsTool/style.css') }}">

                {{-- 1) Define the "url" variable so we can do fetch(url + '/tripsGPS') --}}
                <script>
                    var url = '{{ URL::asset('/fcapi') }}'; 
                    // var url = 'http://172.20.215.102:8008/fcapi-open';
                </script>

                {{-- 2) Load D3 & your custom script --}}
                <script src="https://d3js.org/d3.v7.min.js"></script>
                <script src="{{ asset('js/statsTool/script.js') }}"></script>
            </div>
        </div>
    </div>
</x-app-layout>
