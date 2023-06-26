<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" style="background-color: #212529"> {{-- hack for "quick white flash" xD --}}
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Roboto" rel="stylesheet">
  <link rel="icon" type="image/png" href="{{ asset('favicon.png') }}">

  @yield('routes')
  @viteReactRefresh
  @vite(['resources/js/app.jsx', "resources/js/components/pages/{$page['component']}.jsx"])
  @inertiaHead
  </head>
<body style="margin-bottom: 0px">
  @inertia
</body>
