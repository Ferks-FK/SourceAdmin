<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>{{config('app.name', 'Laravel')}}</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto" rel="stylesheet">

    <!-- Icons Bootstrap -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.2/font/bootstrap-icons.css">

    <!-- Ionicons -->
    <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
    <script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>

    <!-- FlowBite -->
    <script src="https://unpkg.com/flowbite@1.5.4/dist/flowbite.js"></script>

    @vite(['resources/css/app.css', 'resources/js/app.js', 'resources/js/custom.js'])

  </head>
<body>
    @include('layouts.parts.header_test')
    <div class="flex w-screen h-screen" style="height: calc(100vh - 3.6rem);">
      <div id="mobile-menu-items" class="w-full h-full z-10 md:w-1/4 md:left-0 md:static md:max-w-sm bg-dark fixed menu-mobile-hidden transition-all ease-in-out duration-300">
        @include('layouts.parts.sidebar_mobile')
      </div>
      <div class="w-full h-full bg-[#1a1e22] p-5">
        @yield('content')
      </div>
    </div>
</body>
