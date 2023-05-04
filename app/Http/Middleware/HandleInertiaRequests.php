<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
<<<<<<< HEAD
use Tightenco\Ziggy\Ziggy;
=======
>>>>>>> 52a43c622b4a800ee064b80239a566894f271f3d

class HandleInertiaRequests extends Middleware
{
    /**
<<<<<<< HEAD
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'layouts.app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
=======
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     * @var string
     */
    protected $rootView = 'base.core';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    public function version(Request $request): ?string
>>>>>>> 52a43c622b4a800ee064b80239a566894f271f3d
    {
        return parent::version($request);
    }

    /**
<<<<<<< HEAD
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
=======
     * Defines the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     * @param  \Illuminate\Http\Request  $request
     * @return array
>>>>>>> 52a43c622b4a800ee064b80239a566894f271f3d
     */
    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
<<<<<<< HEAD
            'auth' => [
                'user' => $request->user(),
            ],
            'ziggy' => function () use ($request) {
                return array_merge((new Ziggy)->toArray(), [
                    'location' => $request->url(),
                ]);
            },
            'flash' => function () use ($request) {
                return [
                    'success' => $request->session()->get('success'),
                    'info' => $request->session()->get('info'),
                    'warning' => $request->session()->get('warning'),
                    'error' => $request->session()->get('error'),
                    'status' => $request->session()->get('status'),
                ];
            },
=======
            'flash' => function() use ($request) {
                return [
                    'success' => $request->session()->get('success'),
                    'error' => $request->session()->get('error'),
                    'all' => $request->session()->all()
                ];
            }
>>>>>>> 52a43c622b4a800ee064b80239a566894f271f3d
        ]);
    }
}
