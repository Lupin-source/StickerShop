<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use Illuminate\Validation\ValidationException;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $products = Product::all();
        return response()->json([
            'status' => 200,
            'products' => $products, 
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try{
            /* Validating the data being sent to the Create Operation */
            $validatedProduct = $request->validate([
                'product_name' => ['required', 'max:255'],
                'product_description' => ['required'],
                'product_category' => ['required'],
                'product_amount' => ['required', 'numeric', 'regex:/^\d{1,8}(\.\d{1,2})?$/'],
                'product_available_quantity' => ['required', 'numeric'],
                'product_barcode' => ['required'],
            ], [
                'product_name.required' => 'Please enter a name for the product.',
                'product_name.max' =>  'The name of the product cannot exceed 255 characters.',
                'product_description.required' => 'Please enter a description for the product.',
                'product_category.required' => 'Please enter a category for the product',
                'product_amount.required' => 'Please enter a price for the product.',
                'product_amount.numeric' => 'The price of the product should be a numerical value',
                'product_amount.regex' => 'The price of the product should not exceed 8 digits or exceed 2 decimal places',
                'product_barcode.required' => 'Please enter a barcode for the product',
            ]);

            /* After validating the data, it will now proceed to add a product to the database. */
            Product::create($validatedProduct);
            return response()->json($validatedProduct, 201);

        } catch (ValidationException $e) { /* If the data that has been sent has not been validated, the catch block will proceed to send error to the frontend. */
            return response()->json([
                'validationErrors' => $e->errors(),
            ], 422);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $viewProduct = Product::find($id);

        return response()->json($viewProduct, 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
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
        try{
                /* Validating Data being sent to the Backend */
            $validatedData = $request->validate([
                'product_description' => ['required'],
                'product_amount' => ['required', 'numeric', 'regex:/^\d{1,8}(\.\d{1,2})?$/'],
                'product_available_quantity' => ['required', 'numeric'],
            ], [
                'product_description.required' => 'Please enter a description for the product.',
                'product_amount.required' => 'Please enter a price for the product.',
                'product_amount.numeric' => 'The price of the product should be a numerical value',
                'product_amount.regex' => 'The price of the product should not exceed 8 digits or exceed 2 decimal places', 
                'product_available_quantity.required' => 'Please enter a quantity of the product.',
                'product_available_quantity.numeric' => 'The quantity of the product should be a numerical value',
            ]);
            
            /* 
                After validating the data, the code below will find the row with the same id and it will replace
                the product's name, description, amount, and its quantity.
            */
            $updateItem = Product::find($id);
            $updateItem->product_description = $validatedData['product_description'];
            $updateItem->product_amount = $validatedData['product_amount'];
            $updateItem->product_available_quantity = $validatedData['product_available_quantity'];
            $updateItem->save();

            return response()->json($updateItem, 200);

        } catch(ValidationException $e){ /* If the data that has been sent is not accepted, the catch block would send errors to the front-end. */
            return response()->json([
                'validationErrors' => $e->errors(),
            ], 422);
        }

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $productToDelete = Product::find($id);
        $productToDelete->delete();

        return response()->json(200);
    }
}
