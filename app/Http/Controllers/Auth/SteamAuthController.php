<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use App\Models\User;
use App\Settings\GeneralSettings;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Ilzrv\LaravelSteamAuth\SteamAuthenticator;
use Ilzrv\LaravelSteamAuth\SteamUserDto;
use Ilzrv\LaravelSteamAuth\Exceptions\Authentication\SteamResponseNotValidAuthenticationException;
use Ilzrv\LaravelSteamAuth\Exceptions\Validation\ValidationException;
use GuzzleHttp\Client;
use GuzzleHttp\Psr7\HttpFactory;
use GuzzleHttp\Psr7\Uri;


class SteamAuthController extends Controller
{
    /**
     * The SteamAuthenticator instance.
     *
     * @var SteamAuthenticator
     */
    protected $steamAuth;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;

    /**
     * The GeneralSettings instance.
     */
    protected GeneralSettings $generalSettings;

    /**
     * SteamAuthController constructor.
     *
     * @param SteamAuth $steamAuth
     */
    public function __construct(Request $request, Client $client, HttpFactory $httpFactory, GeneralSettings $generalSettings)
    {
        $steamAuth = new SteamAuthenticator(new Uri($request->getUri()), $client, $httpFactory);
        $this->generalSettings = $generalSettings;
        $this->steamAuth = $steamAuth;

        if ($this->generalSettings->steam_web_api_key) {
            $this->steamAuth->setCustomApiKey($generalSettings->steam_web_api_key);
        }
    }

    /**
     * Steam callback, used to check the user's steam account.
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function steamCallback()
    {
        try {
            $this->steamAuth->auth();
        } catch (ValidationException|SteamResponseNotValidAuthenticationException) {
            return redirect()->route('auth')->with('error', __('Failed to validate your steam account.'));
        }

        $user = $this->getUserBySteamId($this->steamAuth->getSteamUser());

        if (is_null($user)) {
            return redirect()->route('auth')->with('error', __('We could not find a user related to your steam account.'));
        }

        Auth::login($user, true);

        return redirect($this->redirectTo);
    }

    /**
     * Get the steam URL used for verification.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getSteamAuthUrlJson()
    {
        $apiKeys = config('steam-auth.api_keys');

        if (!$this->generalSettings->steam_web_api_key && (is_array($apiKeys) && count($apiKeys) > 0 && empty($apiKeys[0]))) {
            return response()->json([
                'url' => null,
                'isActive' => false
            ]);
        }

        return response()->json([
            'url' => $this->steamAuth->buildAuthUrl(),
            'isActive' => true
        ]);
    }

    /**
     * Get the user from DB by steam_id.
     *
     * @param ?SteamData $data
     *
     * @return mixed
     */
    protected function getUserBySteamId(?SteamUserDto $data)
    {
        if (is_null($data)) {
            return null;
        }

        $steamId = $data->getSteamId();

        return User::where('steam_id', $steamId)->get()->first();
    }
}
