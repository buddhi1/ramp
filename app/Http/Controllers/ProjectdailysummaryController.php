<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProjectdailysummaryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return "index";
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        return "storing";
        // // Validate the incoming JSON data
        // $request->validate([
        //     'trips' => 'required|array', // Ensure 'trips' is an array
        //     'trips.*.date' => 'required|date', // Each trip must have a valid date
        //     'trips.*.trip_count' => 'required|integer', // Each trip must have a trip_count
        //     'trips.*.total_trip_distance' => 'required|numeric', // Each trip must have a total_trip_distance
        // ]);

        // // Loop through each trip and store the data
        // foreach ($request->input('trips') as $trip) {
        //     ProjectDailySummary::create([
        //         'date' => $trip['date'],
        //         'trip_count' => $trip['trip_count'],
        //         'total_trip_distance' => $trip['total_trip_distance'],
        //     ]);
        // }

        // return response()->json(['message' => 'Trips stored successfully'], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        return $request;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
