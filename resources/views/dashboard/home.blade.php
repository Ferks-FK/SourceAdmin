@extends('layouts.main')

@section('content')
  <div>
    <x-servers :serverCount="$serverCount"/>
  </div>
@endsection


