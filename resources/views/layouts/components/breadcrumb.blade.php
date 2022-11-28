<div>
  <nav class="overvlow-x-auto w-fit px-5 py-3 mb-5 text-gray-700 rounded-lg bg-dark" aria-label="Breadcrumb">
    <ol class="inline-flex items-center space-x-1">
      <li class="inline-flex items-center">
        <a href="{{ route('home') }}" class="inline-flex items-center text-sm font-medium text-gray-400 hover:text-white">
          <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
          {{ __('Home') }}
        </a>
      </li>
      @yield('breadcrumb')
    </ol>
  </nav>
</div>
