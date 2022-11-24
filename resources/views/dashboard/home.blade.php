@extends('layouts.main')

@section('content')
  <div class="flex flex-col bg-[#1a1e22] h-full p-5">
    {{-- @include('layouts.components.statistics') --}}
    @include('layouts.components.servers')
  </div>
@endsection


