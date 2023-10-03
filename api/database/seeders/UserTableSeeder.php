<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Ashish',
            'email' => 'ashish@gmail.com',
            'password' => '$2y$10$5oeZ1yfK0Mx7DQjUaLvbWuqz27FD0MgzmEyigcQm0xD4D9cdRn/.K',
        ]);
    }
}
