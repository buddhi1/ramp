// API Field Mapping: Form field names to API field names
const apiFieldMapping = {
    "energy": "batt", // energy uses batt from API
    "distance": "distance", // distance uses gpsspeedkph from API
    "speed": "gpsspeedkph", // speed uses gpsspeedkph from API
    "temperature": "temperature", // temperature uses temperature from API
    "pressure": "pressure", // pressure uses pressure from API
    "humidity": "humidity", // humidity uses humidity from API
    "light": "lux", // light uses light from API
    "acceleration-x": "accx", // acceleration-x uses accx from API
    "acceleration-y": "accy", // acceleration-y uses accy from API
    "acceleration-z": "accz", // acceleration-z uses accz from API
    "gyroscope-x": "gyrox", // gyroscope-x uses gyrox from API
    "gyroscope-y": "gyroy", // gyroscope-y uses gyroy from API
    "gyroscope-z": "gyroz", // gyroscope-z uses gyroz from API
    "magnetometer-x": "magx", // magnetometer-x uses magx from API
    "magnetometer-y": "magy", // magnetometer-y uses magy from API
    "magnetometer-z": "magz", // magnetometer-z uses magz from API
    "orientation-x": "yaw", // orientation-x uses orientationX from API
    "orientation-y": "pitch", // orientation-y uses orientationY from API
    "orientation-z": "roll",// orientation-z uses orientationZ from API
  };


  const apiHandler = {
    cachedData: null, // Add this at the top of apiHandler

    async fetchData() {
      try {
        const response = await fetch(url + "/initData"); // Replace with actual API URL
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        apiHandler.cachedData = data; // Cache the data
        apiHandler.updateSlidersWithAPIData(data);
      } catch (error) {
      }
    },

    updateSlidersWithAPIData(data) {
        const baseMetrics = Object.keys(fieldMapping);
  
        baseMetrics.forEach(baseMetric => {
          const config = fieldMapping[baseMetric];
  
          if (config.axis.length === 1 && config.axis[0] === "") {
            const apiMetric = apiFieldMapping[baseMetric];
            if (data[apiMetric]) {
              this.updateSingleAxisSlider(data[apiMetric], baseMetric);
            }
          } else if (config.axis.length > 1) {
            config.axis.forEach(axis => {
              const apiMetric = apiFieldMapping[`${baseMetric}-${axis.toLowerCase()}`];
              if (data[apiMetric]) {
                this.updateMultiAxisSlider(data[apiMetric], baseMetric, axis);
              }
            });
          }
        });
      },
  
      updateSingleAxisSlider(apiData, metricId) {
          const min = apiData.value.min;
          const max = apiData.value.max;
          const unit = fieldMapping[metricId].unit || ''; // Get the unit from fieldMapping
  
          let range1Id = `${metricId}-range1`;
          let range2Id = `${metricId}-range2`;
          let slider1Id = `${metricId}-slider-1`;
          let slider2Id = `${metricId}-slider-2`;
  
          if (metricId === 'temperature') {
            range1Id = 'temp-range1';
            range2Id = 'temp-range2';
            slider1Id = 'temp-slider-1';
            slider2Id = 'temp-slider-2';
          }
  
          const range1 = document.getElementById(range1Id);
          const range2 = document.getElementById(range2Id);
          const slider1 = document.getElementById(slider1Id);
          const slider2 = document.getElementById(slider2Id);
          const dropdown = document.getElementById(`select-${metricId}`);
  
          if (slider1 && slider2 && range1 && range2 && dropdown) {
            slider1.min = min;
            slider1.max = max;
            slider2.min = min;
            slider2.max = max;
            slider1.value = min;
            slider2.value = max;
            range1.textContent = `${min} ${unit}`; // Display value with unit
            range2.textContent = `${max} ${unit}`; // Display value with unit
            updateSliderTrack(metricId);
            dropdown.addEventListener("change", function () {
              const selectedValue = this.value;
              updateRangeDisplay(selectedValue, metricId, apiData);
            });
          }
      },
  
      updateMultiAxisSlider(apiData, baseMetricId, axis) {
          const getShortId = (metricId) => {
              switch (metricId) {
                  case "acceleration": return "acc";
                  case "gyroscope": return "gyro";
                  case "magnetometer": return "mag";
                  case "orientation": return "orien";
                  default: return metricId;
              }
          };
          const shortId = getShortId(baseMetricId);
          const unit = fieldMapping[baseMetricId].unit || ''; // Get the unit from fieldMapping
  
          const range1Id = `${shortId}${axis}-range1`;
          const range2Id = `${shortId}${axis}-range2`;
          const slider1Id = `${shortId}${axis}-slider-1`;
          const slider2Id = `${shortId}${axis}-slider-2`;
          const selectId = `select-${baseMetricId}${axis.toLowerCase()}`;
  
          const range1 = document.getElementById(range1Id);
          const range2 = document.getElementById(range2Id);
          const slider1 = document.getElementById(slider1Id);
          const slider2 = document.getElementById(slider2Id);
          const dropdown = document.getElementById(selectId);
  
          if (slider1 && slider2 && range1 && range2 && dropdown) {
            const min = apiData.value.min;
            const max = apiData.value.max;
  
            slider1.min = min;
            slider1.max = max;
            slider2.min = min;
            slider2.max = max;
  
            slider1.value = min;
            slider2.value = max;
  
            range1.textContent = `${min} ${unit}`; // Display value with unit
            range2.textContent = `${max} ${unit}`; // Display value with unit
            updateSliderTrack(baseMetricId, axis);
            dropdown.addEventListener("change", function () {
              const selectedValue = this.value;
              const metricId = `${baseMetricId}-${axis.toLowerCase()}`;
              updateRangeDisplay(selectedValue, metricId, apiData);
            });
          }
      },
  };
  
  // Method to update range display based on dropdown (Min, Max, Average, Value)
  function updateRangeDisplay(option, metric, data) {
      let range1Id;
      let range2Id;
  
      if (metric === 'temperature') {
        range1Id = 'temp-range1';
        range2Id = 'temp-range2';
      } else if (metric.includes('-')) {
        const parts = metric.split('-');
        const base = parts[0];
        const ax = parts[1].toUpperCase();
        const getShortId = (metricId) => {
          switch (metricId) {
            case "acceleration": return "acc";
            case "gyroscope": return "gyro";
            case "magnetometer": return "mag";
            case "orientation": return "orien";
            default: return metricId;
          }
        };
        const shortId = getShortId(base);
        range1Id = `${shortId}${ax}-range1`;
        range2Id = `${shortId}${ax}-range2`;
      } else {
        range1Id = `${metric}-range1`;
        range2Id = `${metric}-range2`;
      }
  
      const range1 = document.getElementById(range1Id);
      const range2 = document.getElementById(range2Id);
  
      if (!range1 || !range2) {
        return;
      }
  
      let minValue, maxValue;
  
      switch (option) {
        case "Min":
          minValue = data.min ? data.min.min : "N/A";
          maxValue = data.min ? data.min.max : "N/A";
          break;
  
        case "Max":
          minValue = data.max ? data.max.min : "N/A";
          maxValue = data.max ? data.max.max : "N/A";
          break;
  
        case "Average":
          minValue = data.average ? data.average.min : "N/A";
          maxValue = data.average ? data.average.max : "N/A";
          break;
  
        case "Value":
          minValue = data.value ? data.value.min : "N/A";
          maxValue = data.value ? data.value.max : "N/A";
          break;
  
        default:
          minValue = data.value ? data.value.min : "N/A";
          maxValue = data.value ? data.value.max : "N/A";
      }
  
      const unit = fieldMapping[metric].unit || ''; // Get the unit from fieldMapping
      range1.textContent = `${minValue} ${unit}`; // Display value with unit
      range2.textContent = `${maxValue} ${unit}`; // Display value with unit
  
      const baseMetricId = metric.split('-')[0];
      const axis = metric.includes('-') ? metric.split('-')[1].toUpperCase() : '';
      updateSliderTrack(baseMetricId, axis); // Update the track background based on values
  }
  // Method to update slider track based on values
  function updateSliderTrack(id, axis = "") {
    let slider1Id, slider2Id, trackId;

    if (axis) { // Multi-axis
      const getShortId = (metricId) => {
        switch (metricId) {
          case "acceleration": return "acc";
          case "gyroscope": return "gyro";
          case "magnetometer": return "mag";
          case "orientation": return "orien";
          default: return metricId;
        }
      };
      const shortId = getShortId(id);
      slider1Id = `${shortId}${axis}-slider-1`;
      slider2Id = `${shortId}${axis}-slider-2`;
      trackId = `${shortId}${axis}-track`;
    } else if (id === 'temperature') { // Special handling for temperature
      slider1Id = `temp-slider-1`;
      slider2Id = `temp-slider-2`;
      trackId = `temperature-track`; // Assuming track ID is 'temperature-track'
    } else { // Single-axis (other than temperature)
      slider1Id = `${id}-slider-1`;
      slider2Id = `${id}-slider-2`;
      trackId = `${id}-track`;
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
  // Initialize data on page load
  document.addEventListener("DOMContentLoaded", function () {
    apiHandler.fetchData();
  });







