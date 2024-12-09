<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Http\Controllers\Log;

class LoginController extends Controller
{
    /**
     * Handle an incoming authentication request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request)
    {
    // Validate the request data
        $request->validate([
            'name' => 'required|string',
            'password' => 'required|string',
        ]);

    

        // Retrieve the user by name
        $user = User::where('name', $request->name)->first();
    

        // Check if the user exists and the password is correct
        if ($user && Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Login successful',
                'user' => $user,
            ], 200);
        }

        // Return an error response if authentication fails
        return response()->json([
            'message' => 'Invalid username or password',
        ], 401);
    }


    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\Response
     */
    public function logout(Request $request)
    {
        // Perform logout logic (if using token-based auth)
        Auth::logout();

        return response()->json(['message' => 'Logged out successfully'], 200);
    }
}
