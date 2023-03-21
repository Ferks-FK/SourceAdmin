<?php


namespace App\Http\Controllers\Base;

use App\Http\Controllers\Controller;

class IndexController extends Controller
{
    public function index()
    {
        return view('base.core');
    }
}
