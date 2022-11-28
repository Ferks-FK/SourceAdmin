<div class="flex justify-center sm:justify-start mb-5">
  <nav class="overvlow-x-auto w-fit px-5 py-3 text-gray-700 rounded-lg bg-dark" aria-label="Breadcrumb">
    <ol class="inline-flex items-center space-x-1">
      <li class="inline-flex items-center">
        <a href="{{ route('home') }}" class="inline-flex items-center text-sm font-medium text-gray-400 hover:text-white">
          <ion-icon class="w-4 h-4 mr-2" name="home"></ion-icon>
          {{ __('Home') }}
        </a>
      </li>
      @yield('breadcrumb')
    </ol>
  </nav>
</div>
