<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

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
            return redirect()->route('auth')->with('error', __('Could not find a user with these credentials.'));
        }

        $user = Auth::getProvider()->retrieveByCredentials($credentials);

        Auth::login($user, true);

        return redirect()->route('admin.index')->with('success', __('Welcome again :attribute!', ['attribute' => $user->name]));
    }

    public function logout(Request $request): RedirectResponse
    {
        auth()->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect()->route('home.index');
    }
}
