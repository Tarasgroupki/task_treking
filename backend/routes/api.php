<?php

use Illuminate\Http\Request;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::resource('index', 'API\ClientsController')->middleware(['auth:api']);
Route::resource('tasks', 'API\TasksController')->middleware(['auth:api', 'scope:create-tasks,edit-tasks,delete-tasks']);
Route::resource('leads', 'API\LeadsController')->middleware(['auth:api', 'scope:create-tasks,edit-tasks,delete-tasks']);
//Route::resource('users', 'API\UsersController')->middleware(['auth:api', 'scope:create-users,edit-users,delete-users']);
Route::get('users', 'API\UsersController@index')->middleware('auth:api');
Route::get('profile/{id}', 'API\UsersController@showProfile')->middleware('auth:api');
Route::get('users/{id}', 'API\UsersController@show')->where(['id' => '[0-9]'])->middleware('auth:api');
Route::post('users', 'API\UsersController@store')->middleware(['auth:api', 'scope:create-users']);
Route::put('profile/{id}', 'API\UsersController@profileUpdate')->middleware('auth:api');
Route::put('users/{id}', 'API\UsersController@update')->middleware(['auth:api', 'scope:edit-users']);
Route::delete('users/{id}', 'API\UsersController@destroy')->middleware(['auth:api', 'scope:delete-users']);
Route::resource('rules', 'API\RulesController')->middleware('auth:api');
//Route::post('roles', 'API\RulesController@checkToken');
//Route::post('roles', );
Route::get('users/logout/{id}', 'API\UsersController@actionLogout');
Route::post('users/assign/{id}', 'API\UsersController@AssignRoles')->middleware(['auth:api', 'scope:create-roles']);
Route::get('users/add_roles/{id}', 'API\UsersController@getUserRoles')->middleware(['auth:api', 'scope:create-roles']);
Route::get('rules/add_permissions/{id}', 'API\RulesController@getRolesPermissions')->middleware(['auth:api', 'scope:create-roles']);
Route::get('permissions', 'API\RulesController@permissions')->middleware(['auth:api', 'scope:create-roles']);
Route::post('fileUpload', 'API\UsersController@FileUpload');
Route::post('auth', 'API\UsersController@actionLogin');


//Route::get('/store/{id}/{name}/{email}/{primary_number}/{secondary_number}/{address}/{zipcode}/{city}/{company_name}/{vat}/{industry}/{company_type}/{user_id}/{industry_id}', 'API\ClientsController@store');
