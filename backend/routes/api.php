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

Route::middleware(['auth:api','swfix'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::resource('index', 'API\ClientsController')->middleware(['auth:api','swfix']);
Route::resource('tasks', 'API\TasksController');
Route::resource('leads', 'API\LeadsController')->middleware(['auth:api', 'scope:create-tasks,edit-tasks,delete-tasks']);
Route::resource('sprints', 'API\SprintsController')->middleware(['auth:api', 'scope:create-sprints,edit-sprints,delete-sprints']);

Route::get('vote_count/{id}','API\TasksController@votes');
Route::get('vote_counter/{id}','API\TasksController@voter');
Route::get('pointses/{id}', 'API\SprintsController@storyPoints')->where(['id' => '[0-9]']);
Route::get('users', 'API\UsersController@index')->middleware(['auth:api', 'scope:create-users']);
Route::get('profile/{id}', 'API\UsersController@showProfile')->middleware('auth:api');
Route::get('users/{id}', 'API\UsersController@show')->where(['id' => '[0-9]'])->middleware('auth:api');
Route::post('users', 'API\UsersController@store')->middleware(['auth:api', 'scope:create-users']);
Route::post('votes', 'API\TasksController@addVotes')->middleware('auth:api');
Route::put('votes/{id}', 'API\TasksController@voteUpdate')->middleware('auth:api');
Route::put('profile/{id}', 'API\UsersController@profileUpdate')->middleware('auth:api');
Route::put('users/{id}', 'API\UsersController@update')->middleware(['auth:api', 'scope:edit-users']);
Route::delete('users/{id}', 'API\UsersController@destroy')->middleware(['auth:api', 'scope:delete-users']);
Route::resource('rules', 'API\RulesController')->middleware('auth:api');

Route::get('users/logout/{id}', 'API\UsersController@actionLogout');
Route::post('users/assign/{id}', 'API\UsersController@assignRoles')->middleware(['auth:api', 'scope:create-roles']);
Route::get('users/add_roles/{id}', 'API\UsersController@getUserRoles')->middleware(['auth:api', 'scope:create-roles']);
Route::get('rules/add_permissions/{id}', 'API\RulesController@getRolesPermissions')->middleware(['auth:api', 'scope:create-roles']);
Route::get('permissions', 'API\RulesController@permissions')->middleware(['auth:api', 'scope:create-roles']);
Route::post('fileUpload', 'API\UsersController@fileUpload');
Route::post('auth', 'API\UsersController@actionLogin');

Route::get('usersForm', 'API\UsersController@index');
Route::get('leadsForm', 'API\LeadsController@index');
Route::get('sprintsForm', 'API\SprintsController@index');
