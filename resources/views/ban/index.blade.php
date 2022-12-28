@extends('layouts.main')

@section('breadcrumb')
  <x-breadcrumb-text text="Bans"/>
@endsection

@section('content')
  {{-- {{ $html->table(['class' => "w-full text-sm text-left text-gray-500 dark:text-gray-400"]) }} --}}
  <x-bans/>
@endsection
