<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AuthController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Inertia\Response
    */
    public function index()
    {
        return Inertia::render('auth/LoginContainer');
    }

    /**
     * Login the user in with their credentials.
     *
     * @param \App\Http\Requests\Auth\LoginRequest  $request
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function login(LoginRequest $request)
    {
        $credentials = $request->getCredentials();

        if (!Auth::validate($credentials)) {
            return redirect()->route('auth')->with('error', __('Could not find a user with these credentials.'));
        }

        $user = Auth::getProvider()->retrieveByCredentials($credentials);

        Auth::login($user, true);

        return redirect()->route('home.index');
    }

    /**
     * Make the user logout of the system.
     *
     * @param \Illuminate\Http\Request  $request
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function logout(Request $request)
    {
        auth()->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect()->route('home.index');
    }
}
