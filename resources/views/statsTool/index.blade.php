{{-- resources/views/statsTool/index.blade.php --}}
<x-app-layout>
    <div class="">
        <div class="">
            <div class="bg-white sm:rounded-lg">

                {{-- Main container --}}
                <div class="container" style="position: relative;">
                    <!-- LOADING SPINNER OVERLAY (FULL PAGE) -->
                    <div id="loading"
                         style="display: none; position: absolute; top: 170; left: -200;
                                width: 80%; height: 75%; background: rgba(57,57,57,0.39);
                                z-index: 10; text-align: center;">
                        <div class="spinner"
                             style="position: absolute; top: 45%; left: 45%;
                                    transform: translate(-50%, -50%);">
                        </div>
                    </div>

                    <!-- Left Column -->
                    <div class="left-column">
                        <h1 class="left-column-heading">Scooter Trip Data Dashboard</h1>

                        <!-- COLUMN SELECTORS BAR (above the table) -->
                        <p class="column-selection-text">Select Columns:</p>
                        <div class="column-selectors-wrapper">
                           
                            <div class="column-selectors-main">
                                <!-- Main Columns checkboxes -->
                                <label><input type="checkbox" class="col-toggle" data-col="tripIdCol" checked/> Trip ID</label>
                                <label><input type="checkbox" class="col-toggle" data-col="scooterIdCol" checked/> Scooter ID</label>
                                <label><input type="checkbox" class="col-toggle" data-col="startTimeCol" checked/> Start Time</label>
                                <label><input type="checkbox" class="col-toggle" data-col="endTimeCol" checked/> End Time</label>
                                <label><input type="checkbox" class="col-toggle" data-col="tripDistanceCol" checked/> Trip Distance</label>
                                <label><input type="checkbox" class="col-toggle" data-col="avgSpeedCol" checked/> Avg Speed</label>
                                <label><input type="checkbox" class="col-toggle" data-col="maxSpeedCol" checked/> Max Speed</label>
                                <label><input type="checkbox" class="col-toggle" data-col="minSpeedCol" checked/> Min Speed</label>
                                <label><input type="checkbox" class="col-toggle" data-col="batteryStartCol" checked/> Battery Start</label>
                                <label><input type="checkbox" class="col-toggle" data-col="batteryEndCol" checked/> Battery End</label>
                            </div>

                            <!-- Sensor Data dropdown + sensor checkboxes -->
                            <div class="sensor-data-selectors">
                                <label for="sensorDataDisplaySelect" style="margin-right: 8px;">Sensor Data:</label>
                                <select id="sensorDataDisplaySelect">
                                    <option value="hide">Hide</option>
                                    <option value="show">Show</option>
                                </select>
                                <!-- Sensor Checkboxes -->
                                <label class="sensor-ck"><input type="checkbox" class="sensor-col-toggle" data-col="tempCol" disabled/> Temperature</label>
                                <label class="sensor-ck"><input type="checkbox" class="sensor-col-toggle" data-col="pressureCol" disabled/> Pressure</label>
                                <label class="sensor-ck"><input type="checkbox" class="sensor-col-toggle" data-col="humidityCol" disabled/> Humidity</label>
                                <label class="sensor-ck"><input type="checkbox" class="sensor-col-toggle" data-col="accelCol" disabled/> Accelerometer</label>
                                <label class="sensor-ck"><input type="checkbox" class="sensor-col-toggle" data-col="gyroCol" disabled/> Gyroscope</label>
                                <label class="sensor-ck"><input type="checkbox" class="sensor-col-toggle" data-col="magCol" disabled/> Magnetometer</label>
                                <label class="sensor-ck"><input type="checkbox" class="sensor-col-toggle" data-col="orientCol" disabled/> Orientation</label>
                            </div>
                        </div>

                        <!-- Table container (populated by script.js) -->
                        <div id="table-container"></div>
                    </div>

                    <!-- Right Column -->
                    <div class="right-column">
                        <!-- TABS at the top -->
                        <div class="tabs-container">
                            <!-- 1) Sensor Stats (default active) -->
                            <div class="tab active" id="sensorTab" onclick="switchTab('sensorTab')">
                                Sensor Stats
                            </div>

                            <!-- 2) Scooter Stats -->
                            <div class="tab" id="scooterStatsTab" onclick="switchTab('scooterStatsTab')">
                                Scooter Stats
                            </div>

                            <!-- 3) Project Summary -->
                            <div class="tab" id="summaryTab" onclick="switchTab('summaryTab')">
                                Project Summary
                            </div>
                        </div>

                        <!-- TAB CONTENT #1: Sensor Stats -->
                        <div id="sensorTabContent" class="tab-content" style="display: block;">
                            <h2>Visualization</h2>

                            <!-- Input Row -->
                            <div class="input-row">
                                <div class="tripInputContainer">
                                    <!-- Scooter ID Select -->
                                    <div class="tripInputBox">
                                        <label for="scooterIdSelect">Scooter ID:</label>
                                        <select id="scooterIdSelect"></select>
                                    </div>

                                    <!-- Trip ID Select -->
                                    <div class="tripInputBox">
                                        <label for="tripIdSelect">Trip ID:</label>
                                        <select id="tripIdSelect"></select>
                                    </div>
                                </div>

                                <!-- Sensor Select -->
                                <div class="sensorType">
                                    <label for="sensorSelect">Sensor:</label>
                                    <select id="sensorSelect"></select>
                                </div>
                            </div>

                            <!-- Buttons row -->
                            <div style="margin-bottom: 20px;">
                                <button id="plotButton">Plot</button>
                                <button id="downloadChartsButton" style="margin-left: 10px;">Download Charts</button>
                            </div>

                            <!-- The D3 charts get appended into #chart-container -->
                            <div id="chart-container" style="margin-top:20px;"></div>
                        </div>

                        <!-- TAB CONTENT #2: Scooter Stats -->
                        <div id="scooterStatsTabContent" class="tab-content" style="display: none;">
                            <h2>Scooter Stats</h2>
                            <!-- We'll fill analytics (text and chart) in script.js -->
                            <div id="scooter-stats-container" style="padding: 8px;"></div>
                            <div id="scooter-stats-chart" style="margin-top: 20px;"></div>

                            <!-- Additional new charts for scooter stats -->
                            <div id="scooter-stats-chart2" style="margin-top: 20px;"></div>
                            <div id="scooter-stats-chart3" style="margin-top: 20px;"></div>
                            <div id="scooter-stats-chart4" style="margin-top: 20px;"></div>
                            <div id="scooter-stats-chart5" style="margin-top: 20px;"></div>
                        </div>

                        <!-- TAB CONTENT #3: Project Summary -->
                        <div id="summaryTabContent" class="tab-content" style="display: none;">
                            <h2>Project Summary</h2>
                            <!-- We'll fill analytics (text and chart) in script.js -->
                            <div id="project-summary-container" style="padding: 8px;"></div>
                            <div id="project-summary-chart" style="margin-top: 20px;"></div>

                            <!-- Additional new summary charts -->
                            <div id="project-summary-chart2" style="margin-top: 20px;"></div>
                            <div id="project-summary-chart3" style="margin-top: 20px;"></div>
                            <div id="project-summary-chart4" style="margin-top: 20px;"></div>
                            <div id="project-summary-chart5" style="margin-top: 20px;"></div>
                        </div>
                    </div>
                </div>

                {{-- Load your CSS & scripts --}}
                <link rel="stylesheet" href="{{ asset('css/statsTool/style.css') }}">

                {{-- 1) 'url' variable for fetch(url + '/tripsGPS') (or /trips) --}}
                <script>
                     //var url = 'http://172.20.215.102:8008/fcapi-open';
                </script>

                {{-- 2) Load D3 & your custom logic (pagination, multi-line charts, toggling, etc.) --}}
                <script src="https://d3js.org/d3.v7.min.js"></script>
                <script src="{{ asset('js/statsTool/script.js') }}"></script>

                {{-- 3) Add libs for PDF generation (MUST load BEFORE we call them) --}}
                <!-- html2canvas -->
                <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"
                        integrity="sha512-BFrVxaZuT4r5F+NCf3k4rF9KdCemUWvch4E/44QLD/+ZHw02AHfRYA6qXHQYTZbPgHfIQ=="
                        crossorigin="anonymous" referrerpolicy="no-referrer">
                </script>
                <!-- jsPDF -->
                <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"
                        integrity="sha512-NaZcE5wIl+Qv/HEwV/X7tVkmmMpkcHc+LRez7FLEg0NRUh8r39mLjtc+BFtYVIMOmAyHZuiwaTqHs8f2bdRhsA=="
                        crossorigin="anonymous" referrerpolicy="no-referrer">
                </script>

                <!-- small inline script to handle tab switching + simpler PDF creation + stats display calls -->
                <script>
                    /**
                     * Switch which tab is active + show/hide content
                     */
                    function switchTab(tab) {
                        const sensorTab       = document.getElementById('sensorTab');
                        const scooterStatsTab = document.getElementById('scooterStatsTab');
                        const summaryTab      = document.getElementById('summaryTab');

                        const sensorTabContent       = document.getElementById('sensorTabContent');
                        const scooterTabContent      = document.getElementById('scooterStatsTabContent');
                        const summaryTabContent      = document.getElementById('summaryTabContent');

                        // Remove "active" from all
                        sensorTab.classList.remove('active');
                        scooterStatsTab.classList.remove('active');
                        summaryTab.classList.remove('active');

                        // Hide all content
                        sensorTabContent.style.display  = 'none';
                        scooterTabContent.style.display = 'none';
                        summaryTabContent.style.display = 'none';

                        // Show chosen one
                        if (tab === 'sensorTab') {
                            sensorTab.classList.add('active');
                            sensorTabContent.style.display = 'block';
                        } else if (tab === 'scooterStatsTab') {
                            scooterStatsTab.classList.add('active');
                            scooterTabContent.style.display = 'block';
                            renderScooterStats();   // load stats
                        } else {
                            summaryTab.classList.add('active');
                            summaryTabContent.style.display = 'block';
                            renderProjectSummary(); // load summary
                        }
                    }

                    /**
                     * Download #chart-container as PDF
                     */
                    document.getElementById('downloadChartsButton').addEventListener('click', function() {
                        try {
                            const scooterVal = document.getElementById('scooterIdSelect').value || 'N/A';
                            const tripVal    = document.getElementById('tripIdSelect').value || 'N/A';
                            const sensorVal  = document.getElementById('sensorSelect').value || 'N/A';

                            // We directly capture the existing chart-container
                            const container  = document.getElementById('chart-container');
                            if (!container) {
                                alert('No charts to download!');
                                return;
                            }

                            // 1) Convert it to canvas
                            html2canvas(container, { scale: 2 })
                              .then((canvas) => {
                                  const imgData = canvas.toDataURL('image/png');

                                  // 2) Build PDF
                                  const { jsPDF } = window.jspdf;
                                  const pdf = new jsPDF({ unit: 'px', format: 'a4' });
                                  const pdfWidth = pdf.internal.pageSize.getWidth() - 40;
                                  const ratio = canvas.height / canvas.width;
                                  const pdfHeight = pdfWidth * ratio;

                                  // Some heading text with user selections
                                  pdf.setFontSize(14);
                                  pdf.text(`Scooter: ${scooterVal} | Trip: ${tripVal} | Sensor: ${sensorVal}`, 20, 30);

                                  // Then place chart image lower
                                  pdf.addImage(imgData, 'PNG', 20, 60, pdfWidth, pdfHeight);

                                  // 3) Download
                                  pdf.save('charts.pdf');
                              })
                              .catch((err) => {
                                  console.error('Failed to generate PDF canvas:', err);
                                  alert('Failed to download charts as PDF.');
                              });

                        } catch (err) {
                            console.error('PDF download error:', err);
                            alert('Failed to download charts as PDF.');
                        }
                    });
                </script>
            </div>
        </div>
    </div>
</x-app-layout>
