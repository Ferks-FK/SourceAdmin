<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LocaleController;

Route::post('/locale', [LocaleController::class, 'changeLocale']);
