<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Product::create([
            'name' => 'product1',
            'price' => '12.34',
            'description' => 'product1 desc',
            'file_path' => 'data',
            'category_id' => 2
        ]);
    }
}
