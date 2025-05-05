<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class LocaleController extends Controller
{
    /**
     * Sets the locale of the current user in the session.
     *
     * @param \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function setLocale(Request $request)
    {
        $locale = $request->input('locale');

        if (in_array($locale, array_column(config('locales.locales'), 'code'))) {
            Session::put('locale', $locale);
        } else {
            Session::put('locale', config('app.locale'));
        }

        return response()->json([
            'message' => __('The language was set successfully.')
        ]);
    }

    /**
     * Get the available locales.
     *
     * @param \Illuminate\Http\Request  $request
     *
     * @return mixed
     */
    public function availableLocales(Request $request)
    {
        $locales = config('locales.locales');

        if ($request->ajax()) {
            return response()->json($locales);
        }

        return $locales;
    }
}
