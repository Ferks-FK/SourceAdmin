<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\Auth\LoginRequest;

class AuthController extends Controller
{
    public function index()
    {
        return view('base.core');
    }

    public function login(LoginRequest $request): JsonResponse
    {
        $credentials = $request->getCredentials();

        if (!Auth::validate($credentials)) {
            return response()->json([
                'complete' => false,
                'message' => __('Could not find a user with these credentials')
            ], 404);
        }

        $user = Auth::getProvider()->retrieveByCredentials($credentials);

        Auth::login($user);

        return response()->json([
            'complete' => true,
            'user' => Auth::user()
        ]);
    }

    public function logout(Request $request): JsonResponse
    {
        auth('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return response()->json([
            'message' => __('User logged out successfully'),
            'status' => Response::HTTP_OK
        ]);
    }
}
