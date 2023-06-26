<?php

namespace App\Http\Middleware;

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
        $layout = $this->defineLayout($request);

        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $request->user(),
            ],
            'ziggy' => function () use ($request, $layout) {
                return array_merge((new Ziggy($layout))->toArray(), [
                    'location' => $request->url()
                ]);
            },
            'layout' => $layout,
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
