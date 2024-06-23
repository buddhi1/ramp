<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Role;

class AssignAdminRoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Find the Admin role (assuming it exists in the roles table)
        $adminRole = Role::where('name', 'ADMIN')->first();

        if (!$adminRole) {
            $this->command->error('Admin role not found. Make sure to create it first.');
            return;
        }

        // Assign Admin role to existing users
        $users = User::all();
        foreach ($users as $user) {
            $user->roles()->syncWithoutDetaching($adminRole->id);
        }

        $this->command->info('Admin role assigned to all existing users successfully.');
    }
}