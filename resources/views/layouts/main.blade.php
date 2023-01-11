<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" style="background-color: #212529"> {{-- hack for "quick white flash" xD --}}
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
  <script src="https://unpkg.com/flowbite@1.5.5/dist/flowbite.js"></script>

  <!-- SweetAlert -->
  <link href="//cdn.jsdelivr.net/npm/@sweetalert2/theme-dark@4/dark.css" rel="stylesheet">
  <script src="//cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.js"></script>

  @section('user-data')
    @if(!is_null(Auth::user()))
      <script>
        window.SourceAdminUser = {!! json_encode(Auth::user()) !!};
      </script>
    @endif
  @show

  @viteReactRefresh
  {{-- @vite(['resources/css/app.css', 'resources/js/app.js']) --}}
  @vite(['resources/scripts/index.tsx'])

  {{-- @livewireStyles --}}
  </head>
<body>
  <div id="app"></div>
  {{-- @include('layouts.parts.header')
  <div class="flex w-screen h-screen" style="height: calc(100vh - 3.6rem);">
    <div id="mobile-menu-items" class="w-full h-full z-10 md:w-1/4 md:left-0 md:static md:max-w-sm bg-dark fixed menu-mobile-hidden transition-all ease-in-out duration-300">
      @include('layouts.parts.sidebar')
    </div>
    <div class="flex flex-col w-full h-full bg-[#1a1e22] p-5">
      @hasSection('breadcrumb')
        <x-breadcrumb/>
      @endif
      @yield('content')
    </div>
  </div>
  @livewire('livewire-ui-modal')
  @livewireScripts
  @stack('scripts') --}}
</body>
