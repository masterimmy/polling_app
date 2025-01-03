<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Admin One',
            'email' => 'admin1@gmail.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
        ]);

        User::create([
            'name' => 'Admin Two',
            'email' => 'admin2@gmail.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
        ]);

        $users = [
            [
                'name' => 'User One',
                'email' => 'user1@gmail.com',
            ],
            [
                'name' => 'User Two',
                'email' => 'user2@gmail.com',
            ],
            [
                'name' => 'User Three',
                'email' => 'user3@gmail.com',
            ],
            [
                'name' => 'User Four',
                'email' => 'user4@gmail.com',
            ],
            [
                'name' => 'User Five',
                'email' => 'user5@gmail.com',
            ],
        ];

        foreach ($users as $user) {
            User::create([
                'name' => $user['name'],
                'email' => $user['email'],
                'password' => Hash::make('password'),
                'role' => 'user',
            ]);
        }
    }
}
