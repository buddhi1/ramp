<?php

use App\Http\Controllers\admin\AttributeController;
use App\Http\Controllers\admin\UsersController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\admin\ProjectController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Http;
use App\Http\Controllers\DownloadController;
use App\Http\Controllers\InterfcapiController;

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
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile/{user}', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware('admin')->group(function () {
    Route::apiResource('users', 'UserController');          
    Route::resource('projects', ProjectController::class);
    Route::resource('attributes', AttributeController::class);
    Route::resource('users', UsersController::class);

    // remove this and use the download controller
    Route::post('/download', [ProjectController::class, 'download'])->name('projects.download');
});



//map tool view
Route::middleware('auth')->group(function () {
    Route::get('/mapTool', function () {
        return view('mapTool/index');
    });

    // trip data downloading using a seperate module
    Route::post('/downloadTrips', [DownloadController::class, 'trips'])->name('download.trips');
});

// intermediery FC API
Route::middleware('auth')->group(function () {
    Route::get('fcapi/{method}', function ($method) {
        $controller = app(InterfcapiController::class);

        if (method_exists($controller, $method)) {
            return app()->call([$controller, $method]);
        }

        abort(404); // Method not found
    });
});


// Route::get('fcapi/initData', function () {
//     $response = Http::get('192.168.214.103:5000/initData');
//     return $response;
// });

// // temp solution to handle FC api calls
// Route::get('fcapi/trips', function () {
//     $response = Http::get('192.168.214.103:5000/trips');
//     return $response;
// });


require __DIR__ . '/auth.php';
