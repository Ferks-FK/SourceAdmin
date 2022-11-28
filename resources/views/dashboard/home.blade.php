@extends('layouts.main')

@section('content')
  <div>
    <x-servers :servers="$servers"/>
  </div>
@endsection


