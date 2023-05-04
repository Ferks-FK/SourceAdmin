<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" style="background-color: #212529"> {{-- hack for "quick white flash" xD --}}
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

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
  @routes
  @viteReactRefresh
  @vite(['resources/js/app.jsx', "resources/js/components/pages/{$page['component']}.jsx"])
  @inertiaHead
  </head>
<body style="margin-bottom: 0px">
  @inertia
</body>
