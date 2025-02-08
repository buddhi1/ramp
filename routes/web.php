<?php

use App\Http\Controllers\admin\AttributeController;
use App\Http\Controllers\admin\UsersController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\admin\ProjectController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Http;
use App\Http\Controllers\DownloadController;
use App\Http\Controllers\InterfcapiController;
use App\Http\Controllers\Auth\RegisteredUserController;

use Illuminate\Http\Request;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('auth/login');
});


Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified', 'attachrole', '2fa'])->name('dashboard');

Route::middleware(['auth', 'attachrole'])->group(function () {
    Route::get('/profile/verify2fa', [ProfileController::class, 'show2FAVerifyForm'])->name('profile.show2FAVerifyForm');
    Route::post('/profile/verify2fa', [ProfileController::class, 'verify2fa'])->name('profile.verify2FA');
});

Route::middleware(['auth', 'attachrole', '2fa'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::get('/profile/enable2fa', [ProfileController::class, 'enable2fa'])->name('profile.enable2FA');
    Route::post('/profile/disable2fa/{user}', [ProfileController::class, 'disable2fa'])->name('profile.disable2FA');
    Route::put('/profile', [ProfileController::class, 'update'])->name('profile.update');

    Route::post('/download', [ProjectController::class, 'download'])->name('projects.download');
    Route::middleware('admin')->group(function () {
        Route::resource('attributes', AttributeController::class);
        Route::resource('projects', ProjectController::class);
        Route::resource('users', UsersController::class);

        Route::get('register', [RegisteredUserController::class, 'create'])
            ->name('register');
        Route::post('register', [RegisteredUserController::class, 'store']);
        Route::delete('/profile/{user}', [ProfileController::class, 'destroy'])->name('profile.destroy');
    });
});



//map tool view
Route::middleware('auth')->group(function () {
    Route::get('/mapTool', function () {
        return view('mapTool/index');
    });

    // trip data downloading using a seperate module
    Route::post('/downloadTrips', [DownloadController::class, 'trips'])->name('download.trips');
});
// statsTool view
Route::get('/statsTool', function () {
    return view('statsTool.index');
})->middleware(['auth', 'attachrole', '2fa']);

// intermediery FC API
Route::middleware('auth')->group(function () {
    Route::get('fcapi/{method}', function ($method) {
        $controller = app(InterfcapiController::class);

        // Get all the query parameters from the GET request
        $requestData = request()->query();
        // dd($requestData);

        if (method_exists($controller, $method)) {
            // Check if the method exists, then call it with the request data
            return app()->call([$controller, $method], $requestData);
        }

        abort(404); // Method not found
    });
});


// Route::get('fcapi/initData', function () {
//     $response = Http::get('192.168.214.103:5000/initData');
//     return $response;
// });

// CORS enabled temp solution to handle FC api calls. This is used by the front-end developer for his local dev workflow
Route::middleware(['cors'])->group(function () {
    // http://172.20.215.102:8008/fcapi-open/tripsGPS
    Route::get('fcapi-open/tripsGPS', function () {
        // $response = Http::get('192.168.214.103:5000/trips');
        $response = Http::get('192.168.214.103:5000/tripsGPS');
        return $response;
    });
    Route::get('fcapi-open/initData', function () {
        // $response = Http::get('192.168.214.103:5000/trips');
        $response = Http::get('192.168.214.103:5000/initData');
        return $response;
    });
    Route::get('fcapi-open/tripData', function (Request $request) {
        $response = Http::get('192.168.214.103:5000/trips?ids=["'.$request->get('id').'"]');
        return $response;
    });
});

require __DIR__ . '/auth.php';