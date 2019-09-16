<?php

use Illuminate\Database\Seeder;
use App\User;
use Illuminate\Support\Facades\DB;

class ModelHasRolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $userDB = DB::table('users')->where('name', 'admin')->first();
        $user = User::find($userDB->id);
        $user->assignRole('admin');
    }
}
