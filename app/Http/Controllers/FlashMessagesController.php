<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FlashMessagesController extends Controller
{
    public function index(Request $request)
    {
        $messages = $request->session()->all();
        $flashMessages = [];
        foreach ($messages as $key => $value) {
            if (strpos($key, 'flash_') === 0) {
                $flashMessages[substr($key, 6)] = $value;
                //$request->session()->forget($key);
            }
        }
        return response()->json($flashMessages);
    }
}
