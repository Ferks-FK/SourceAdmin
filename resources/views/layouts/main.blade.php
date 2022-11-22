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
    {{-- <div class="flex h-screen">
      @include('layouts.parts.sidebar')
      <div class="flex flex-col w-100">
        <div class="w-100">
          @include('layouts.parts.header')
        </div>
        @yield('content')
      </div>
    </div> --}}

    {{-- @include('layouts.parts.sidebar') --}}
    <div class="md:flex md:flex-row-reverse h-screen">
        @include('layouts.parts.header_test')
      @yield('content')
    </div>
</body>
