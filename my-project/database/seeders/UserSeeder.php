<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
class UserSeeder extends Seeder
{
    public function run()
    {
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'contact' => '1234567890',
            'password' => Hash::make('adminpassword'),
            'role' => 'admin', // Set role to admin
        ]);
        
    }
}
