<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Api\PeopleController;
use App\Http\Controllers\Api\EmailVerificationController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Auth::routes(['verify' => true]);

Route::middleware('auth:sanctum', 'verified')->get('/user', function (Request $request) {
    return $request->user();
});


//Public Routes
Route::get('people',[PeopleController::class,'index']);
Route::get('people/{id}',[PeopleController::class,'show']);
Route::post('register',[AuthController::class,'register']);
Route::post('login',[AuthController::class,'login']);

Route::get('authbasic',[PeopleController::class,'index'])->middleware('AuthBasic');
Route::get('authrole',[PeopleController::class,'index'])->middleware('AuthRole');
Route::get('adminrole',[PeopleController::class,'index'])->middleware('AdminRole');

// Route::post('email/verification-notification', [EmailVerificationController::class, 'sendVerificationEmail'])->middleware('auth:sanctum');
// Route::get('verify-email/{id}/{hash}', [EmailVerificationController::class, 'verify'])->name('verification.verify')->middleware('auth:sanctum');
Route::get('customverify-email', [EmailVerificationController::class, 'customVerify']);
// Route::get('send-email', [EmailVerificationController::class, 'sendMail']);
// Route::get('send-emailconfirm', [EmailVerificationController::class, 'sendMailConfirmation']);

// Route::post('logout',[AuthController::class,'logout']);

//Protected Routes
// Route::get('people',[PeopleController::class,'index']);
Route::group(['middleware' => ['auth:sanctum']], function() {
    Route::get('authorized',[PeopleController::class,'index']);
    Route::post('people',[PeopleController::class,'store']);
    Route::get('people/{id}/edit',[PeopleController::class,'edit']);
    Route::put('people/{id}/edit',[PeopleController::class,'update']);
    Route::delete('people/{id}/delete',[PeopleController::class,'destroy']);

    Route::post('logout',[AuthController::class,'logout']);
});
// Route::get('people',[PeopleController::class,'index']);


