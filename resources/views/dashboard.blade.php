<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Dashboard') }}
        </h2>
    </x-slot>

    @foreach($projects as $project)
    @php
        $start_time = $project->start_time; // Milliseconds timestamp
        $start_time_seconds = $start_time / 1000; // Convert to seconds
        $formatted_start_date = date('Y-m-d H:i:s', $start_time_seconds); // Format as 'YYYY-MM-DD HH:MM:SS'

        $end_time = $project->end_time; // Milliseconds timestamp
        $end_time_seconds = $end_time / 1000; // Convert to seconds
        $formatted_end_date = date('Y-m-d H:i:s', $end_time_seconds); // Format as 'YYYY-MM-DD HH:MM:SS'

        $start_date= new DateTime("@$start_time_seconds"); // Convert to DateTime
        $end_date= new DateTime("@$end_time_seconds"); // Convert to DateTime
        $today = new DateTime("today"); // Today's date

        $interval = $start_date->diff($today);
        $project_days = $interval->days; 

        $interval = $end_date->diff($today);
        $left_days = $interval->days; 
    @endphp
    <div class="container mt-4 p-4 rounded shadow-lg main-container">
        <div class="row">
            <div class="col">
                <ul class="list-unstyled">
                    <li><h3>Project Name: {{ $project->name }}</h3></li>
                    <li>Project ID: {{ $project->id }}</li>
                    <li>Start date: {{ $formatted_start_date }}</li>
                    <li>End date: {{ $formatted_end_date }}</li>
                    @if ($end_date < $today)
                    <li>Project completed</li>
                    @else
                    <li>Data collectd for <b>{{ $project_days }}</b> days. <b>{{ $left_days }}</b> days to complete the experiment.</li>
                    @endif
                    <li>
                        List of sensor data:
                        @foreach($project->attributes as $attribute)
                        @if($loop->last)
                        {{$attribute->name}} 
                        @else
                        {{$attribute->name}}, 
                        @endif
                        @endforeach
                    </li>
                    <li>Total trips: 600</li>
                    <li>Total distance: 129.34 miles</li>
                </ul>
            </div>
        </div>

        <!-- <div class="row d-flex justify-content-between">
            <div class="col-md-6 col-lg-4 custom-box">Plot: Distance completed per day</div>
            <div class="col-md-6 col-lg-4 custom-box">Plot: Trip count per day</div>
            <div class="col-md-12 col-lg-4 custom-box">Plot: </div>
        </div> -->
        <div class="d-flex justify-content-center mt-3">
            <a href="/mapTool"><button class="btn text-dark me-2" style="background-color: #FFD700;">Map Tool</button></a>
            <a href="/statsTool"><button class="btn text-dark" style="background-color:rgb(0, 183, 255);">Stats Tool</button></a>
        </div>
    </div>
    @endforeach

</x-app-layout>
