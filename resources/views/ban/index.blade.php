@extends('layouts.main')

@section('breadcrumb')
  <x-breadcrumb-text text="Bans"/>
@endsection

@section('content')
  <x-bans :bans="$bans"/>
@endsection
