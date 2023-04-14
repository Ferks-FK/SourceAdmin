<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class LocaleController extends Controller
{
    public function changeLocale(Request $request)
    {
        $request->validate([
            'locale' => "string|required"
        ]);

        $locale = $request->get('locale', config('app.locale'));

        if (!in_array($locale, config('locales.supported_locales'))) {
            return response()->json([
                "message" => __("The language '$locale' is not supported."),
                "supported_locales" => implode(', ', config('locales.supported_locales'))
            ], 404);
        }

        Session::put('locale', $locale);

        return response()->json([
            'locale' => $locale
        ]);
    }
}
