<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Spatie\Permission\Models\Role;

class AdminUserSeeder extends Seeder
{
    public function run()
    {
        // Check if the role exists, if not create it
        $role = Role::firstOrCreate(['name' => 'admin']);

        // Create an admin user
        $admin = User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com', // Change this to your desired admin email
            'password' => bcrypt('password'), // Use a secure password or environment variable
        ]);
        $admin->assignRole($role);
    }
}
