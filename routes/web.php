<?php

use App\Http\Controllers\admin\AttributeController;
use App\Http\Controllers\admin\UsersController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\admin\ProjectController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Http;
use App\Http\Controllers\DownloadController;
use App\Http\Controllers\Auth\RegisteredUserController;

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
    return view('welcome');
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified', 'attachrole'])->name('dashboard');

Route::middleware(['auth', 'attachrole'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::put('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile/{user}', [ProfileController::class, 'destroy'])->name('profile.destroy');
    // Route::apiResource('users', 'UserController');
    Route::resource('projects', ProjectController::class);
    Route::post('/download', [ProjectController::class, 'download'])->name('projects.download');
    Route::middleware('admin')->group(function () {
        Route::resource('attributes', AttributeController::class);
        Route::resource('users', UsersController::class);
        Route::get('register', [RegisteredUserController::class, 'create'])
                ->name('register');

                Route::post('register', [RegisteredUserController::class, 'store']);
    });
});

//temp map tool vies
Route::get('/mapTool', function () {
    return view('mapTool/index');
});

// temp solution to handle FC api calls
Route::get('fcapi/initData', function () {
    $response = Http::get('192.168.214.103:5000/initData');
    return $response;
});

// temp solution to handle FC api calls
Route::get('fcapi/trips', function () {
    $response = Http::get('192.168.214.103:5000/trips');
    return $response;
});


require __DIR__ . '/auth.php';
