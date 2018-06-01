<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Support\Facades\DB;
use Laravel\Passport\Token;
use App\Http\Controllers\API\APIBaseController as APIBaseController;

class RulesController extends APIBaseController
{
	 public function __construct()
    {
        //$this->middleware('auth');
		//$this->middleware('role_admin');
		//$this->middleware('lang');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
       $roles = Role::get();
	  // print_r($roles);die;
        return $this->sendResponse($roles->toArray(), 'Roles retrieved successfully.');
    }

    public function permissions()
    {
        $permission = Permission::get();

        return $this->sendResponse($permission->toArray(), 'Permissions retrieved successfully.');
    }

    public function getRolesPermissions($id) {
        $permissions_all = Permission::get();
        foreach($permissions_all as $key => $permission):
            $permissions[$key] = $permissions_all[$key]->getOriginal();
        endforeach;
        $permissions_ids = DB::select('select * from role_has_permissions where role_id = ?',[$id]);
        foreach($permissions_ids as $key => $ids):
            $permissions_id[$ids->permission_id] = $ids;
        endforeach;
        $user_permissions['permissions'] = $permissions;
        if(isset($permissions_id)):
            $user_permissions['permissions_id'] = $permissions_id;
        endif;
        return $this->sendResponse($user_permissions, 'Permission added successfully.');
    }

	public function indexCreate($locale,$id = null)
	{
		$permissions = Permission::get();
		foreach($permissions as $key => $permission):
		$perms[$key] = $permissions[$key]->getOriginal();
		endforeach;
		$rules = null;
		if($id != null):
		$rules = DB::select('select * from role_has_permissions where role_id = ?',[$id]);
		endif;
		//print_r($perms);die;
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
		foreach(request('permissions') as $key => $perms):
		$role->givePermissionTo($perms);
		endforeach;
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

       /* $this->validate($input,[
            'name' => 'string',
        ]);*/

        $role = Role::create(['name' => $roles[0][0]['name'], 'guard_name' => 'web']);
        foreach ($roles[1] as $key => $rl){
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
        //print_r($role);die;
        $permissions = Permission::get();
		foreach($permissions as $key => $permission):
		$perms[$key] = $permissions[$key]->getOriginal();
		endforeach;
        $perms_ids = DB::select('select * from role_has_permissions where role_id = ?',[$id]);
        foreach($perms_ids as $key => $ids):
        $perms_id[$ids->permission_id] = $ids;
        endforeach;        
//print_r($perms_id);die;
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
        if(isset($permissions[0])):
            foreach ($permissions[0] as $key => $permission) {
                Permission::find($permission)->assignRole($permissions[2][0]);
            }
        endif;
        if(isset($permissions[1])):
            foreach ($permissions[1] as $key => $permission) {
                Permission::find($permission)->removeRole($permissions[2][0]);
            }
        endif;
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
