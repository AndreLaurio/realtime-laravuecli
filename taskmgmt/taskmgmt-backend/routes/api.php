<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Broadcast::channel('chat', function ($user) {
//     return $user;
// });

// Broadcast::routes(['middleware' => 'auth:sanctum']);
// Broadcast::channel('chat', function ($user) {
//     return $user;
// });

// Broadcast::channel('chat', function ($user) {
//     return $user;
// });

Route::get('/messages', 'ChatsController@fetchMessages');
Route::post('/messages', 'ChatsController@sendMessage');
