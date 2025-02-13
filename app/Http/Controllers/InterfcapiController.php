<?php
// This intermediate FC API autheticates the API calls to FC and make the communication between RAMP backend and FC API

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

use Illuminate\Support\Facades\Auth;


class InterfcapiController extends Controller
{
    protected $url;

    // Initialize the variable in the constructor
    public function __construct()
    {
        // initialize the FC local IP and the port
        $this->url = '192.168.214.103:5001';
    }

    // method to retrieve initial data dump
    public function initData(){
        $user = Auth::user();
        if($user){
            $response = Http::timeout(40)->get($this->url.'/initData');
            echo $response;
            return $response;
        }
        abort(404);
    }

    // method to retrieve trips with all sensor data
    public function trips(){
        $user = Auth::user();
        if($user){
            // use the following to check if the user has a certain role. Ex. admin
            // $isAdmin = $user->hasRole('ADMIN');
            $response = Http::get($this->url.'/trips');
            return $response;
        }
        // not found. Has not access to the trips
        abort(404);
    }

    // method to retrieve trips with only GPS data
    public function tripsGPS(Request $request){
        $user = Auth::user();
        if($user){
            // use the following to check if the user has a certain role. Ex. admin
            // $isAdmin = $user->hasRole('ADMIN');

            // // Get all the query parameters from the GET request
            // $requestData = request()->query();
            // // Initialize an empty string to hold the concatenated result
            // $concatenatedString = '';
            // // Loop through each element in the query data
            // foreach ($requestData as $key => $value) {
            //     // Concatenate key and value into the string
            //     $concatenatedString .= $key . '=' . $value . ' ';
            // }
            // dd($concatenatedString);
            // dd("test");
            // add scooter model, scooter ID, and trip lists if available from the table (this is only related to controlled experiments) 
            // dd($request->getQueryString());
            $response = Http::get($this->url.'/tripsGPS?'.$request->getQueryString());
            return $response;
        }
        // not found. Has not access to the trips
        abort(404);
    }

    // method to retrieve sensor data for a selected trip
    public function tripData(Request $request){
        // echo $request->get('id');
        // return;
        $user = Auth::user();
        if($user){
            // use the following to check if the user has a certain role. Ex. admin
            // $isAdmin = $user->hasRole('ADMIN');
            // $response = Http::get($this->url.'/tripsGPS');
            // $response = Http::get($this->url.'/tripsGPS?ids=["'.$request->get('id').'"]');
            $response = Http::get($this->url.'/trips?ids=["'.$request->get('id').'"]');
            return $response;
        }
        // not found. Has not access to the trips
        abort(404);
    }
}
