<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Ilzrv\LaravelSteamAuth\SteamAuth;
use Ilzrv\LaravelSteamAuth\SteamData;
use Symfony\Component\HttpFoundation\JsonResponse;
use Exception;

class SteamAuthController extends Controller
{
    /**
     * The SteamAuth instance.
     *
     * @var SteamAuth
     */
    protected $steamAuth;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;

    /**
     * SteamAuthController constructor.
     *
     * @param SteamAuth $steamAuth
     */
    public function __construct(SteamAuth $steamAuth)
    {
        $this->steamAuth = $steamAuth;
    }

    public function login()
    {
        if (!$this->steamAuth->validate()) {
            return $this->getSteamAuthUrlJson();
        }

        $user = $this->getUserBySteamId($this->steamAuth->getUserData());

        if (is_null($user)) {
            $response = response()->json([
                'complete' => false,
                'message' => __("We could not find a user related to your steam account.")
            ]);

            return redirect('/auth/login')->with('flash_error', $response->getContent());
        }

        $user = Auth::getProvider()->retrieveByCredentials(['steam_id' => $user->steam_id]);

        if (is_null($user)) {
            return response()->json([
                'complete' => false,
                'message' => __("We could not find a user related to your steam account.")
            ]);
        }

        Auth::login($user);

        // return redirect("/auth/login");
    }

    protected function getSteamAuthUrlJson(): JsonResponse
    {
        return response()->json([
            'url' => $this->steamAuth->getAuthUrl()
        ]);
    }

    protected function getUserBySteamId(SteamData $data)
    {
        return User::where('steam_id', $data->getSteamId())->get()->first();
    }
}
