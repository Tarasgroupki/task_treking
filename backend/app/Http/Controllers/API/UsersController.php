<?php
namespace App\Http\Controllers\API;

use Illuminate\Support\Facades\Auth;
use App\User;
use Spatie\Permission\Models\Role;
use Validator;
use App;
use App\Http\Requests;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
//use Spatie\Permission\Models\Role;
//use Spatie\Permission\Models\Permission;
use Illuminate\Http\UploadedFile;
use App\Http\Controllers\API\APIBaseController as APIBaseController;

/**
 * Class ClientsController
 * @package App\Http\Controllers\API
 *
 *
 *
 *  * @SWG\Get(
 *      path="/users",
 *      tags={"Users"},
 *      summary="Get list of users",
 *      description="Returns list of users",
 *      @SWG\Response(
 *          response=200,
 *          description="successful operation"
 *       ),
 *       @SWG\Response(response=400, description="Bad request"),
 *       security={
 *           {
 *              "Bearer":{}
 *          }
 *       }
 *     )
 *
 * Returns list of users
 *
 *  * @SWG\Get(
 *      path="/users/{id}",
 *      operationId="getIndexById",
 *      tags={"Users"},
 *      summary="Get users information",
 *      description="Returns users data",
 *      @SWG\Parameter(
 *          name="id",
 *          description="Project id",
 *          required=true,
 *          type="integer",
 *          in="path"
 *      ),
 *      @SWG\Response(
 *          response=200,
 *          description="successful operation"
 *       ),
 *      @SWG\Response(response=400, description="Bad request"),
 *      @SWG\Response(response=404, description="Resource Not Found"),
 *      security={
 *         {
 *              "Bearer":{}
 *          }
 *     },
 * )
 *
 * * @SWG\Post(
 *   path="/users",
 *   tags={"Users"},
 *   summary="Create new user",
 *    @SWG\Parameter(
 *          name="user",
 *  description="User object that needs to be added to the store",@SWG\Schema(
 *     @SWG\Property(property="id", type="integer"),
 *     @SWG\Property(property="name", type="string"),
 *     @SWG\Property(property="email", type="string"),
 *     @SWG\Property(property="password", type="string")
 *     ),
 *          in="body"
 *      ),
 *   @SWG\Response(response=200, description="successful operation"),
 *       security={
 *           {
 *              "Bearer":{}
 *          }
 *       }
 * )
 *)
 *
 * *
 * * @SWG\Put(
 *   path="/users/{id}",
 *   tags={"Users"},
 *   summary="Update new user",
 *    @SWG\Parameter(
 *          name="user",
 *  description="User object that needs to be added to the store",@SWG\Schema(
 *     @SWG\Property(property="id", type="integer"),
 *     @SWG\Property(property="name", type="string"),
 *     @SWG\Property(property="email", type="string"),
 *     @SWG\Property(property="password", type="string")
 *     ),
 *          in="body",
 *      ),
 *   @SWG\Response(response=200, description="successful operation"),
 *       security={
 *           {
 *              "Bearer":{}
 *          }
 *       }
 * )
 *)
 **
 *  * @SWG\Get(
 *      path="/users/add_roles/{id}",
 *      operationId="getIndexById",
 *      tags={"Users"},
 *      summary="Get user roles",
 *      description="Returns users data",
 *      @SWG\Parameter(
 *          name="id",
 *          description="Project id",
 *          required=true,
 *          type="integer",
 *          in="path"
 *      ),
 *      @SWG\Response(
 *          response=200,
 *          description="successful operation"
 *       ),
 *      @SWG\Response(response=400, description="Bad request"),
 *      @SWG\Response(response=404, description="Resource Not Found"),
 *      security={
 *         {
 *              "Bearer":{}
 *          }
 *     },
 * )
 *
 *  * @SWG\Post(
 *      path="/users/assign/{id}",
 *      operationId="getIndexById",
 *      tags={"Users"},
 *      summary="Set roles to users",
 *      description="Returns users data",
 *      @SWG\Parameter(
 *          name="id",
 *          description="Project id",
 *          required=true,
 *          type="integer",
 *          in="path"
 *      ),
 *      @SWG\Response(
 *          response=200,
 *          description="successful operation"
 *       ),
 *      @SWG\Response(response=400, description="Bad request"),
 *      @SWG\Response(response=404, description="Resource Not Found"),
 *      security={
 *         {
 *              "Bearer":{}
 *          }
 *     },
 * )
 *
 * *   @SWG\Delete(
 *      path="/users/{id}",
 *      tags={"Users"},
 *      operationId="ApiV1DeleteUser",
 *      summary="Delete User",
 *      @SWG\Parameter(
 *          name="id",
 *          description="Delete User",
 *          in="path",
 *          required=true,
 *          type="string"
 *      ),
 *      @SWG\Response(
 *          response=200,
 *          description="Success"
 *      ),
 *     )
 *
 * *  @SWG\Post(
 *   path="/fileUpload",
 *   tags={"Users"},
 *   summary="Upload Image",
 *    @SWG\Parameter(
 *          name="file",
 *  description="Uploading image",@SWG\Schema(),
 *          in="body"
 *      ),
 *     @SWG\Parameter(
             name="additionalMetadata",
 *     description="Additional data to pass to server",@SWG\Schema(),
 *     in="body"
 *     ),
 *   @SWG\Response(response=200, description="successful operation")
 * )
 *)
 * *   @SWG\Definition(
 *     definition="User",
 *     type="object",
 *     description="User",
 *     properties={
 *     @SWG\Property(property="id", type="integer",format="int64"),
 *     @SWG\Property(property="name", type="string"),
 *     @SWG\Property(property="email", type="string"),
 *     @SWG\Property(property="password", type="string")
 *     }
 * )
 */

class UsersController extends APIBaseController
{
    public $successStatus = 200;

    public function __construct()
    {
       // $this->middleware('auth');
       // $this->middleware('lang');
    }

    public function actionLogin(Request $request) {
        $input = $request->all();
        //print_r($input);die;
        if(Auth::attempt(['email' => $input[0]['email'], 'password' => $input[0]['password']])) {
            $user = Auth::user();
            $success['permissions'] = $user->getAllPermissions();
            foreach ($success['permissions'] as $key => $permission) {
                $permissions[$key] = str_slug($permission['name']);
            }
            //$scopes = implode(",",$permissions);
            $success['token'] = $user->createToken('TaskTrack',  $permissions)->accessToken;
            $success['user'] = $user;
            $success['permissions'] = $permissions;

            return $this->sendResponse($success, 'User is authenticate successfully!');

        }
        else{
           //$error['message'] = 'Неправильний логін, або пароль!';
            return $this->sendResponse(NULL, 'Authentication error!');

        }
    }

    public function actionLogout($id) {
       // $user = User::find($id);

        DB::table('oauth_access_tokens')
            ->where('user_id', $id)
            ->update(['revoked' => true]);

        return $this->sendResponse(null, 'All tokens were revoked successfully!');
    }

    public function getUserRoles($id) {
        $roles_all = Role::get();
        foreach($roles_all as $key => $role):
            $roles[$key] = $roles_all[$key]->getOriginal();
        endforeach;
        $roles_ids = DB::select('select * from model_has_roles where model_id = ?',[$id]);
        foreach($roles_ids as $key => $ids):
            $roles_id[$ids->role_id] = $ids;
        endforeach;
        $user_roles['roles'] = $roles;
        if(isset($roles_id)):
        $user_roles['roles_id'] = $roles_id;
        endif;
        return $this->sendResponse($user_roles, 'Roles got successfully!');
    }

    public function AssignRoles($id,Request $request) {
        $input = $request->all();

        $user = User::find($id);
        $roles = $input;
        if(isset($roles[0])):
        foreach ($roles[0] as $key => $role) {
            $user->assignRole($role);
        }
        endif;
        if(isset($roles[1])):
        foreach ($roles[1] as $key => $role) {
            $user->removeRole($role);
        }
        endif;
      //  DB::table('oauth_access_tokens')
        //    ->where('user_id', $id)
       //     ->update(['revoked' => true]);
      //  $success['token'] = $user->createToken('TaskTrack',  $permissions)->accessToken;
        return $this->sendResponse($roles, 'Roles added to user successfully.');
    }

    public function FileUpload(Request $request) {
        $input = $request->all();

        $file = $input['image_path'];
        $file_name = $file->getClientOriginalName();
        $destinationPath = 'images/';
        $filename = $file_name;
        $uploadSuccess = $file->move($destinationPath, $filename);

        return $this->sendResponse(null, 'File upload successfully.');
    }

    public function index()
    {
        $users = User::all();
        return $this->sendResponse($users->toArray(), 'Posts retrieved successfully.');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $input = $request->all();


       $validator = Validator::make($input, [
            'name' => 'string|max:255',
            'email' => 'string|email|max:255|unique:users',
            'password' => 'string|min:6|confirmed',
          //  'address' => 'string',
        //    'work_number' => 'string',
       //     'personal_number' => 'string'
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());
        }


       $user = User::create([
            'name' => $input[0]['name'],
            'email' => $input[0]['email'],
            'password' => bcrypt($input[0]['password']),
          //  'address' => $input[0]['address'],
           // 'work_number' => $input[0]['work_number'],
          //  'personal_number' => $input[0]['personal_number'],
          //  'image_path' => 'images/'.$input[0]['image_path']
        ]);
       // $user = User::create($input[0]);


        return $this->sendResponse($user->toArray(), 'User created successfully.');
    }


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = User::find($id);


        if (is_null($user)) {
            return $this->sendError('User not found.');
        }


        return $this->sendResponse($user->toArray(), 'User retrieved successfully.');
    }

    public function showProfile($id)
    {
        $user = User::find($id);


        if (is_null($user)) {
            return $this->sendError('User not found.');
        }


        return $this->sendResponse($user->toArray(), 'User retrieved successfully.');
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $input = $request->all();


        $validator = Validator::make($input, [
            'name' => 'string|max:255',
            'email' => 'string|email|max:255|unique:users',
            'password' => '',
            'address' => 'string',
            'work_number' => 'string',
            'personal_number' => 'string'
        ]);


        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());
        }


        $user = User::find($id);
        if (is_null($user)) {
            return $this->sendError('User not found.');
        }


        $user->name = $input[0]['name'];
        $user->email = $input[0]['email'];
        if(isset($input[0]['password'])): $user->password = bcrypt($input[0]['password']);
        endif;
        $user->address = $input[0]['address'];
        $user->work_number = $input[0]['work_number'];
        $user->personal_number = $input[0]['personal_number'];
        (isset($input[0]['image_path'])) ? $user->image_path = 'images/'.$input[0]['image_path'] : '';
        $user->save();


        return $this->sendResponse($user->toArray(), 'User updated successfully.');
    }

    public function profileUpdate(Request $request, $id)
    {
        $input = $request->all();


        $validator = Validator::make($input, [
            'name' => 'string|max:255',
            'email' => 'string|email|max:255|unique:users',
            'password' => '',
            'address' => 'string',
            'work_number' => 'string',
            'personal_number' => 'string'
        ]);


        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());
        }


        $user = User::find($id);
        if (is_null($user)) {
            return $this->sendError('User not found.');
        }


        $user->name = $input[0]['name'];
        $user->email = $input[0]['email'];
        if(isset($input[0]['password'])): $user->password = bcrypt($input[0]['password']);
        endif;
        $user->address = $input[0]['address'];
        $user->work_number = $input[0]['work_number'];
        $user->personal_number = $input[0]['personal_number'];
        (isset($input[0]['image_path'])) ? $user->image_path = 'images/'.$input[0]['image_path'] : '';
        $user->save();


        return $this->sendResponse($user->toArray(), 'User updated successfully.');
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user = User::find($id);


        if (is_null($user)) {
            return $this->sendError('User not found.');
        }


        $user->delete();


        return $this->sendResponse($id, 'Tag deleted successfully.');
    }
}
