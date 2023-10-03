<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Product;
use App\Models\ProductCategory;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class ProductTest extends TestCase
{

    /**
     * Test product create correctly
     *
     */
    public function testProductCreateCorrectly()
    {
        $catId = ProductCategory::get()->random()->id;
        Storage::fake('avatars');
        $payload = [
            "name" => rand(),
            "price" => rand(1,90000),
            "description" => rand(),
            "file" => UploadedFile::fake()->image('avatar.jpg'),
            "category" => $catId,
        ];

        
 
        $this->json('POST', 'api/addproduct', $payload)
            ->assertStatus(200)
            ->assertJsonStructure(
                [
                    'success',
                    'message',
                    'data' =>   [
                        "name",
                        "price",
                        "description",
                        "file_path",
                        "category_id",
                        "updated_at",
                        "created_at",
                        "id"
                    ]                    
                ]
            );        
       
    }

    /**
     * Test product update correctly
     *
     */
    public function testProductUpdateCorrectly()
    {
        $id = Product::get()->random()->id;
        $catId = ProductCategory::get()->random()->id;

        Storage::fake('avatars');
        $payload = [
            "name" => rand(),
            "price" => rand(1,90000),
            "description" => rand(),
            "file" => UploadedFile::fake()->image('avatar.jpg'),
            "category" => $catId,
        ];
 
        $this->json('POST', 'api/updateproduct/'.$id, $payload)
            ->assertStatus(200)
            ->assertJsonStructure(
                [
                    'success',
                    'message',
                    'data' =>   [
                        "id",
                        "name",
                        "file_path",
                        "description",
                        "price",
                        "category_id",
                        "updated_at",
                        "created_at"
                    ]                    
                ]
            );        
       
    }

    /**
     * Test product details correctly
     *
     */
    public function testProductDetailCorrectly()
    {
        $id = Product::get()->random()->id;

        $response = $this->get('/api/product/'.$id)
            ->assertStatus(200)
            ->assertJsonStructure(
                [
                    'success',
                    'message',
                    'data' =>   [
                        "id",
                        "name",
                        "file_path",
                        "description",
                        "price",
                        "category_id",
                        "updated_at",
                        "created_at"
                    ]                    
                ]
            );
       
    }

    /**
     * Test product listed correctly
     *
     */
    public function testProductAreListedCorrectly()
    {
        $response = $this->get('/api/list')
            ->assertStatus(200)
            ->assertJsonStructure(
                [
                    'success',
                    'message',
                    'data' =>  [
                        '*' => [
                            "id",
                            "name",
                            "file_path",
                            "description",
                            "price",
                            "category_id",
                            "updated_at",
                            "created_at"
                        ],
                    ],
                ]
            );
    }

    /**
     * Test product delete correctly
     *
     */
    public function testProductDeleteCorrectly()
    {
        $id = Product::get()->random()->id;

        $response = $this->json('DELETE', '/api/delete/'.$id)
            ->assertStatus(200)
            ->assertJsonStructure(
                [
                    'success',
                    'message',
                ]
            );
       
    }

}
