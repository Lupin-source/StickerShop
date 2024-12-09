<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cart;
use App\Models\Product;

class CartController extends Controller
{
    /**
     * Add a product to the cart.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function addToCart(Request $request)
    {
        // Validate incoming request data
        $validatedData = $request->validate([
            'user_id' => 'required|integer|exists:users,id',
            'product_id' => 'required|integer|exists:products,id', 
            'name' => 'required|string',
            'amount' => 'required|numeric',
            'quantity' => 'required|integer|min:1',
        ]);

        // Check if the product already exists in the cart
        $cartItem = Cart::where('product_id', $validatedData['product_id'])
                    ->where('user_id', $validatedData['user_id'])
                    ->first();

        if ($cartItem) {
            // Update the quantity if the product is already in the cart
            $cartItem->quantity += $validatedData['quantity'];
            $cartItem->save();
        } else {
            // Add the new product to the cart
            Cart::create([
                'user_id' => $validatedData['user_id'],
                'product_id' => $validatedData['product_id'],
                'name' => $validatedData['name'],
                'amount' => $validatedData['amount'],
                'quantity' => $validatedData['quantity'],
            ]);
        }
        
        return response()->json(['status' => 200, 'message' => 'Product added to cart successfully.']);
    }

    public function getCartCount($user_id)

    {

        $uniqueProductCount = Cart::where('user_id', $user_id)->distinct('product_id')->count('product_id');


        return response()->json(['count' => $uniqueProductCount]);

    }

    /**
     * Get the current cart.
     *
     * @return \Illuminate\Http\Response
     */
    public function getCart($user_id)
    {
        // Retrieve the cart items for the authenticated user
        $cart = Cart::where('user_id', $user_id)->get();

        return response()->json(['status' => 200, 'cart' => $cart]);
    }

    /**
     * Remove a product from the cart.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function removeFromCart($user_id, $id)
    {
        // Find the cart item for the authenticated user
        $cartItem = Cart::where('id', $id)->where('user_id', $user_id)->first();

        if ($cartItem) {
            $cartItem->delete(); // Remove the product from the cart
        }

        return response()->json([
            'status' => 200,
            'message' => 'Product removed from cart successfully.',
            'cart' => Cart::where('user_id', $user_id)->get(),
        ]);
    }

    public function clearCart($user_id)
    {
        // Find and delete all cart items for the user
        $deleted = Cart::where('user_id', $user_id)->delete();

        if ($deleted) {
            return response()->json([
                'status' => 200,
                'message' => 'Cart cleared successfully.',
            ]);
        }

        return response()->json([
            'status' => 404,
            'message' => 'No items found in cart to clear.',
        ]);
    }

    /**
     * Update the quantity of a product in the cart.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function updateCart(Request $request, $user_id, $id)
    {
        // Validate incoming request data
        $validatedData = $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        // Find the cart item for the authenticated user
        $cartItem = Cart::where('id', $id)->where('user_id', $user_id)->first();

        if ($cartItem) {
            $cartItem->quantity = $validatedData['quantity']; // Update the quantity
            $cartItem->save(); // Save changes
        }

        return response()->json([
            'status' => 200,
            'message' => 'Cart updated successfully.',
            'cart' => Cart::where('user_id', $user_id)->get(),
        ]);
    }
}