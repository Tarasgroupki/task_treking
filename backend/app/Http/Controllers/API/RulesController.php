<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Support\Facades\DB;
use Laravel\Passport\Token;
use App\Http\Controllers\API\APIBaseController as APIBaseController;

/**
 * Class RulesController
 * @package App\Http\Controllers\API
 *
 *
 *
 *  * @SWG\Get(
 *      path="/rules",
 *      tags={"Rules"},
 *      summary="Get list of rules",
 *      description="Returns list of rules",
 *      @SWG\Response(
 *          response=200,
 *          description="successful operation"
 *       ),
 *       @SWG\Response(response=400, description="Bad request"),
 *       security={
 *              {"Bearer":{}}
 *          }
 *     )
 *
 * Returns list of rules
 *
 *  * @SWG\Get(
 *      path="/rules/{id}",
 *      operationId="getIndexById",
 *      tags={"Rules"},
 *      summary="Get rules information",
 *      description="Returns rules data",
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
 * * @SWG\Get(
 *      path="/rules/add_permissions/{id}",
 *      operationId="getIndexById",
 *      tags={"Rules"},
 *      summary="Set permissions to roles",
 *      description="Returns rules data",
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
 *   path="/rules",
 *   tags={"Rules"},
 *   summary="Create new rule",
 *    @SWG\Parameter(
 *          name="rule",
 *  description="Rule object that needs to be added to the store",@SWG\Schema(
 *     @SWG\Property(property="id", type="integer"),
 *     @SWG\Property(property="name", type="string"),
 *     @SWG\Property(property="guard_name", type="string")
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
 *  *@SWG\Put(
 *   path="/rules/{id}",
 *   tags={"Rules"},
 *   summary="Update new rule",
 *    @SWG\Parameter(
 *          name="rule",
 *  description="Rule object that needs to be added to the store",@SWG\Schema(
 *     @SWG\Property(property="id", type="integer"),
 *     @SWG\Property(property="name", type="string"),
 *     @SWG\Property(property="guard_name", type="string")
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
 *
 * *    @SWG\Delete(
 *      path="/api/rules/{id}",
 *      tags={"Rules"},
 *      operationId="ApiV1DeleteRule",
 *      summary="Delete Rule",
 *      @SWG\Parameter(
 *          name="id",
 *          description="Delete Rule",
 *          in="path",
 *          required=true,
 *          type="string"
 *      ),
 *      @SWG\Response(
 *          response=200,
 *          description="Success"
 *      ),
 *     )
 */

class RulesController extends APIBaseController
{
	 public function __construct(){}
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
       $roles = Role::get();

        return $this->sendResponse($roles->toArray(), 'Roles retrieved successfully.');
    }

    public function permissions()
    {
        $permission = Permission::get();

        return $this->sendResponse($permission->toArray(), 'Permissions retrieved successfully.');
    }

    public function getRolesPermissions($id) {
        $permissions_all = Permission::get();
        foreach($permissions_all as $key => $permission) {
            $permissions[$key] = $permissions_all[$key]->getOriginal();
        }
        $permissions_ids = DB::select('select * from role_has_permissions where role_id = ?',[$id]);
        foreach($permissions_ids as $key => $ids) {
            $permissions_id[$ids->permission_id] = $ids;
        }
        $user_permissions['permissions'] = $permissions;
        if(isset($permissions_id)) {
            $user_permissions['permissions_id'] = $permissions_id;
        }
        return $this->sendResponse($user_permissions, 'Permission added successfully.');
    }

	public function indexCreate($locale,$id = null)
	{
		$permissions = Permission::get();
		foreach($permissions as $key => $permission) {
            $perms[$key] = $permissions[$key]->getOriginal();
        }
		$rules = null;
		if($id != null) {
            $rules = DB::select('select * from role_has_permissions where role_id = ?', [$id]);
        }

		return view('rules.create',compact('perms','rules'));
	}
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $this->validate(request(),[
		     'name' => 'string|required',
		 ]);
		$role = Role::create(['name' => request('role_name')]);
		foreach(request('permissions') as $key => $perms) {
            $role->givePermissionTo($perms);
        }
		return back();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $roles = $request->all();

        $role = Role::create(['name' => $roles[0][0]['name'], 'guard_name' => 'web']);
        foreach ($roles[1] as $key => $rl) {
            Permission::find($rl)->assignRole($roles[0][0]['name']);
        }
        return $this->sendResponse($role->toArray(), 'Role added successfully.');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $role = Role::find($id);


        if (is_null($role)) {
            return $this->sendError('Task not found.');
        }


        return $this->sendResponse($role->toArray(), 'Role retrieved successfully.');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $role = Role::find($id);

        $permissions = Permission::get();
		foreach($permissions as $key => $permission) {
            $perms[$key] = $permissions[$key]->getOriginal();
        }
        $perms_ids = DB::select('select * from role_has_permissions where role_id = ?',[$id]);
        foreach($perms_ids as $key => $ids) {
            $perms_id[$ids->permission_id] = $ids;
        }

        return view('rules.update',compact('role','perms','perms_id'));
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
        $permissions = $request->all();

        $role = Role::find($id);
        if (is_null($role)) {
            return $this->sendError('Role not found.');
        }

        $role->name = $permissions[2][0];
        if(isset($permissions[0])) {
            foreach ($permissions[0] as $key => $permission) {
                Permission::find($permission)->assignRole($permissions[2][0]);
            }
        }
        if(isset($permissions[1])) {
            foreach ($permissions[1] as $key => $permission) {
                Permission::find($permission)->removeRole($permissions[2][0]);
            }
        }

        return $this->sendResponse($permissions, 'Role updated successfully.');
    }



    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        DB::table('roles')->where('id', '=', $id)->delete();
        DB::table('role_has_permissions')->where('role_id', '=', $id)->delete();
        DB::table('model_has_roles')->where('role_id', '=', $id)->delete();
        return back();
    }
}
