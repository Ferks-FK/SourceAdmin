<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class LocaleController extends Controller
{
    public function setLocale(Request $request)
    {
        $locale = $request->input('locale');

        if (in_array($locale, array_column(config('locales.locales'), 'code'))) {
            Session::put('locale', $locale);
        }

        Session::put('locale', config('app.locale'));

        return response()->json([
            'message' => __('The language was set successfully.')
        ]);
    }

    public function availableLocales(Request $request)
    {
        $locales = [
            [
                "name" => "English (United States)",
                "code" => "en",
                "flag" => "us"
            ],
            [
                "name" => "Portuguese (Brazil)",
                "code" => "pt",
                "flag" => "br"
            ],
            [
                "name" => "Spanish (Spain)",
                "code" => "es",
                "flag" => "es"
            ]
        ];

        if ($request->ajax()) {
            return response()->json($locales);
        }

        return $locales;
    }
}
