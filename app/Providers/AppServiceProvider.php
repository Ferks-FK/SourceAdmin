<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Paginator\Paginator;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Contracts\Pagination\LengthAwarePaginator as LengthAwarePaginatorContract;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        app()->useLangPath(public_path('locales/laravel'));

        $this->app->alias(Paginator::class, LengthAwarePaginator::class);
        $this->app->alias(Paginator::class, LengthAwarePaginatorContract::class);
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
