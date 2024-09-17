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
        $this->url = '192.168.214.103:5000';
    }

    // method to retrieve initial data dump
    public function initData(){
        $user = Auth::user();
        if($user){
            $response = Http::get($this->url.'/initData');
            return $response;
        }
        abort(404);
    }

    // method to retrieve trips data
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
}
