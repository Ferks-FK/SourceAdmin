<?php

namespace App\Http\Middleware;

use App\Models\User;
use App\Settings\GeneralSettings;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * Sets the root template that's loaded on the first page visit.
     *
     * @param Request $request
     *
     * @return string
     */
    public function rootView(Request $request): string
    {
        return 'layouts.' . $this->defineLayout($request);
    }

    protected function defineLayout(Request $request)
    {
        if ($request->is(['admin', 'admin/*'])) {
            return 'admin';
        }

        return 'app';
    }

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $generalSettings = new GeneralSettings();
        $layout = $this->defineLayout($request);

        if ($request->user()) {
            $userAuth = User::with(['roles', 'roles.permissions', 'permissions'])->findOrFail($request->user()->id);
        }

        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $userAuth ?? null
            ],
            'ziggy' => function () use ($request, $layout) {
                return array_merge((new Ziggy($layout))->toArray(), [
                    'location' => $request->url()
                ]);
            },
            'layout' => $layout,
            'locale' => config('app.locale'),
            'timeZone' => $generalSettings->time_zone ?? config('app.timezone'),
            'appSettings' => $generalSettings,
            'flash' => function () use ($request) {
                return [
                    'success' => $request->session()->get('success'),
                    'info' => $request->session()->get('info'),
                    'warning' => $request->session()->get('warning'),
                    'error' => $request->session()->get('error')
                ];
            },
        ]);
    }
}
