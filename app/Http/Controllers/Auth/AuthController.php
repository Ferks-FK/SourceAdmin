<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\Auth\LoginRequest;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Session;

class AuthController extends Controller
{
    public function index()
    {
        return Inertia::render('auth/LoginContainer');
    }

    public function login(LoginRequest $request)
    {
        $credentials = $request->getCredentials();

        if (!Auth::validate($credentials)) {
            return redirect()->route('auth')->withErrors(['error' => 'Could not find a user with these credentials.']);
        }

        $user = Auth::getProvider()->retrieveByCredentials($credentials);

        Auth::login($user, true);

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
