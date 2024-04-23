
// JavaScript to toggle the search's visibility when the icon is clicked
 document.getElementById('toggleForm').addEventListener('click', function () {
    var searchForm = document.getElementById('searchForm');
    if (searchForm.style.display === 'none' || searchForm.style.display === '') {
        searchForm.style.display = 'block'; // Show the form
    } else {
        searchForm.style.display = 'none'; // Hide the form
    }
});

// date picker icon setting and functionality
$(function () {
    $('#st-datetimepicker').datetimepicker({
        icons: {
            time: "fa-solid fa-clock",
            date: "fa-solid fa-calendar-days",
            up: "fa fa-arrow-up",
            down: "fa fa-arrow-down"
        }
    });
});
$(function () {
    $('#st-datetimepicker').datetimepicker();
});
$(function () {
    $('#et-datetimepicker').datetimepicker({
        icons: {
            time: "fa-solid fa-clock",
            date: "fa-solid fa-calendar-days",
            up: "fa fa-arrow-up",
            down: "fa fa-arrow-down"
        }
    });
});
$(function () {
    $('#et-datetimepicker').datetimepicker();
});