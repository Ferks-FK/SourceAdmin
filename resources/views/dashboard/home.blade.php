@extends('layouts.main')

@section('content')

<div id="mobile-menu-items" class="w-full h-full md:w-1/4 md:left-0 md:static md:max-w-sm bg-dark fixed menu-mobile-hidden transition-all ease-in-out duration-300">
  @include('layouts.parts.sidebar_mobile')
</div>

    {{-- <div class="bg-black h-100 flex-1">
        @include('layouts.components.statistics')
        <h1>Main Content</h1>
    </div> --}}
    {{-- <x-app-layout>
      <div class="mt-3 mx-3">
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
          <strong>Holy guacamole!</strong> You should check in on some of those fields below.
          <button class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      </div>
    </x-app-layout> --}}
@endsection


