@extends('layouts.main')

@section('breadcrumb')
  <x-breadcrumb-link route="servers.index" text="Servers"/>
  <x-breadcrumb-text :text="$server->id"/>
@endsection

@section('content')
<div class="flex flex-col max-h-[500px] whitespace-nowrap md:whitespace-normal">
  <div class="overflow-x-auto">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-300 uppercase bg-dark">
        <tr>
          <td scope="col" class="py-3 px-6">
            {{__('MOD')}}
          </td>
          <td scope="col" class="py-3 px-6">
            {{__('OS')}}
          </td>
          <td scope="col" class="py-3 px-6">
            {{__('VAC')}}
          </td>
          <td scope="col" class="py-3 px-6">
            {{__('Hostname')}}
          </td>
          <td scope="col" class="py-3 px-6">
            {{__('Players')}}
          </td>
          <td scope="col" class="py-3 px-6">
            {{__('Map')}}
          </td>
        </tr>
      </thead>
      <tbody>
        <tr id="players_table" class="cursor-pointer bg-[#191c1e] border-b dark:border-gray-700 hover:bg-lightDark">
          <th class="py-4 px-6 font-medium text-gray-900 dark:text-white">
            <img src="{{ asset("images/games/{$server->mod->icon}.png") }}" alt="Mod Image" class="w-5">
          </th>
          <td class="py-4 px-6">
            @if ($server->os === "N/A")
              {{ __('N/A') }}
            @else
              <img src="{{ asset("images/{$server->os}.png") }}" alt="Os Image" class="w-5">
            @endif
          </td>
          <td class="py-4 px-6">
            @if ($server->vac === "N/A")
              {{ __('N/A') }}
            @else
                @if($server->vac)
                  <img src="{{ asset("images/shield.png") }}" alt="Shield" class="w-5">
                @else
                  <img src="{{ asset("images/smac.png") }}" alt="Shield" class="w-5">
                @endif
            @endif
          </td>
          <td class="py-4 px-6">
            {{ $server->host_name }}
          </td>
          <td class="py-4 px-6">
            @if ($server->total_players_online === "N/A" || $server->max_players === "N/A")
              {{ __('N/A') }}
            @else
              {{ $server->total_players_online }}/{{ $server->max_players }}
            @endif
          </td>
          <td class="py-4 px-6">
            {{ $server->map }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div id="players_table_items" class="flex overflow-x-auto max-h-[75%]">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-300 uppercase bg-dark">
        <tr>
          <td scope="col" class="py-3 px-6">
            {{__('Player')}}
          </td>
          <td scope="col" class="py-3 px-6">
            {{__('Score')}}
          </td>
          <td scope="col" class="py-3 px-6">
            {{__('Time')}}
          </td>
          <td scope="col" class="py-3 px-6">
            {{__('Actions')}}
          </td>
        </tr>
      </thead>
      <tbody>
        @php
          $player_id = 0
        @endphp
        @foreach ($server->players as $player)
          @php
            $player['Id'] = $player_id
          @endphp
          <tr class="hover:bg-lightDark">
            <td class="py-4 px-6">
              {{ is_array($player) ? $player['Name'] : "N/A" }}
            </td>
            <td class="py-4 px-6">
              {{ is_array($player) ? $player['Frags'] : "N/A" }}
            </td>
            <td class="py-4 px-6">
              {{ is_array($player) ? $player['TimeF'] : "N/A" }}
            </td>
            <td data-dropdown-toggle="dropdownPlayerActions-{{ $player['Name'] }}" class="w-fit py-4 px-6 flex items-center cursor-pointer">
              <p>{{ __('Actions') }}</p>
              <ion-icon name="chevron-down-sharp" class="mx-1.5"></ion-icon>
            </td>
          </tr>
          @php
            $player_id++
          @endphp
          <x-dropdown-actions :id="$player_id" :server="$server" :player="$player['Name']"/>
        @endforeach
      </tbody>
    </table>
  </div>
</div>
@endsection
