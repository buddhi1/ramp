<?php

use App\Http\Controllers\admin\AttributeController;
use App\Http\Controllers\admin\UsersController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\admin\ProjectController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Http;

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
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::apiResource('users', 'UserController');
Route::resource('projects', ProjectController::class);
Route::resource('attributes', AttributeController::class);
Route::resource('users', UsersController::class);

//temp map tool vies
Route::get('/mapTool', function () {
    return view('mapTool/index');
});

// temp solution to handle FC api calls
Route::get('fcapi/initData', function() {
	$response = Http::get('192.168.214.103:5000/initData');
	return $response;
});


require __DIR__.'/auth.php';
