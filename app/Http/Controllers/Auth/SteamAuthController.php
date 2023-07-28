<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use App\Models\User;
use App\Helpers\SteamHelper;
use Illuminate\Support\Facades\Auth;
use Ilzrv\LaravelSteamAuth\SteamAuth;
use Ilzrv\LaravelSteamAuth\SteamData;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;

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

    /**
     * Steam callback, used to check the user's steam account.
     */
    public function steamCallback(): RedirectResponse
    {
        if (empty(config('steam-auth.api_keys'))) {
            return redirect()->route('auth')->with('error', __('Steam API key has not been configured.'));
        }

        if (!$this->steamAuth->validate()) {
            return redirect()->route('auth')->with('error', __('Failed to validate your steam account.'));
        }

        $data = $this->getUserBySteamId($this->steamAuth->getUserData());

        if (is_null($data)) {
            return redirect()->route('auth')->with('error', __('We could not find a user related to your steam account.'));
        }

        $user = Auth::getProvider()->retrieveByCredentials(['steam_id' => $data->steam_id]);

        Auth::login($user, true);

        return redirect($this->redirectTo);
    }

    /**
     * Get the steam URL used for verification.
     *
     * @return JsonResponse
     */
    public function getSteamAuthUrlJson(): JsonResponse
    {
        return response()->json([
            'url' => $this->steamAuth->getAuthUrl()
        ]);
    }

    /**
     * Get the user from DB by steam_id.
     *
     * @param SteamData $data
     */
    protected function getUserBySteamId(SteamData $data)
    {
        $steamId = $data->getSteamId();

        return User::where('steam_id', $steamId)->orWhere('steam_id', SteamHelper::convertSteam64ToID($steamId))->get()->first();
    }
}
