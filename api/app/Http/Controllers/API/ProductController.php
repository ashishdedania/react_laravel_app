<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController as BaseController;
use App\Models\Product;
use App\Models\ProductCategory;
use Validator;
use Illuminate\Http\JsonResponse;

class ProductController extends BaseController
{
    /**
     * Add product function
     *
     * @param Request $request 
     * 
     * @return json Return data
     */
    public function addProduct(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name'        => 'required',
            'price'       => 'required|numeric|between:0,999999999.99',
            'description' => 'required',
            'file'        => 'required|mimes:jpg,jpeg,png',
            'category'    => 'required',
        ]);
     
        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());       
        }
        
        $product              = new Product;
        $product->name        = $request->input('name');
        $product->price       = $request->input('price');
        $product->description = $request->input('description');
        $product->file_path   = $request->file('file')->store('products');
        $product->category_id = $request->input('category');
        $product->save();

        if($product)
        {
            return $this->sendResponse($product, 'Product created successfully.');
        }
        else
        {
            return $this->sendError('Error in product saving.please try again.');
        }
    }

    /**
     * List product function
     *
     * @return json Return data
     */
    function list()
    {
        $products = Product::all();
        return $this->sendResponse($products, 'Product list successfully.');
    }

    /**
     * List product category function
     *
     * @return json Return data
     */
    function listCategory()
    {
        $products = ProductCategory::all();
        return $this->sendResponse($products, 'Product list successfully.');
    }

    /**
     * Update product function
     *
     * @param Request $request
     * @param Int $id 
     * 
     * @return json Return data
     */
    public function updateProduct(Request $request, $id)
    {  
        $validator = Validator::make($request->all(), [
            'name'        => 'required',
            'price'       => 'required',
            'description' => 'required',
            'category'    => 'required',
        ]);
     
        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());       
        }

        $result = Product::find($id);
        $result->name = $request->input('name');
        $result->price = $request->input('price');
        $result->description = $request->input('description');
        $result->file_path = $request->file('file') ? $request->file('file')->store('products') : '';
        $result->category_id = $request->input('category');
        $result->update();

        if($result)
        {
            return $this->sendResponse($result, 'Product created successfully.');
        }
        else
        {
            return $this->sendError('Error in product saving.please try again.');
        }
    }

    /**
     * Delete product function
     *
     * @param Int $id 
     * 
     * @return json Return data
     */
    function delete($id)
    {
        $result = Product::where('id',$id)->delete();

        if($result)
        {
            return $this->sendResponse($result, 'Product deleted successfully.');
        }
        else
        {
            return $this->sendError('Error in product deleted.please try again.');
        }
    }

    /**
     * Get product detail function
     *
     * @param Int $id 
     * 
     * @return json Return data
     */
    function getProduct($id)
    {
        $product = Product::find($id);

        if($product)
        {
            return $this->sendResponse($product, 'Product got successfully.');
        }
        else
        {
            return $this->sendError('Error in product getting.please try again.');
        }
    }
}
