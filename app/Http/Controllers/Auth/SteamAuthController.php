<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Ilzrv\LaravelSteamAuth\SteamAuth;
use Ilzrv\LaravelSteamAuth\SteamData;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RedirectResponse;

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
        if (!$this->steamAuth->validate()) {
            return redirect('/auth/login?error=steam_validate_failed');
        }

        $data = $this->getUserBySteamId($this->steamAuth->getUserData());

        if (is_null($data)) {
            return redirect('/auth/login?error=steam_user_not_found');
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
        return User::where('steam_id', $data->getSteamId())->get()->first();
    }
}
