@extends('layouts.main')

@section('breadcrumb')
  <x-breadcrumb-link route="servers.index" text="Servers"/>
  <x-breadcrumb-text :text="$server->id"/>
@endsection

@section('content')
<div class="flex flex-col max-h-[500px] whitespace-nowrap md:whitespace-normal">
  <div class="overflow-x-auto">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400" id="table_server">
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
        <tr class="cursor-not-allowed bg-[#1a1e22] border-b dark:border-gray-700 hover:bg-lightDark">
          <td class="py-3 px-6">{{ __('N/A') }}</td>
          <td class="py-3 px-6">{{ __('N/A') }}</td>
          <td class="py-3 px-6">{{ __('N/A') }}</td>
          <td id="loading" class="py-3 px-6">{{ __('Quering server data...') }}</td>
          <td class="py-3 px-6">{{ __('N/A') }}</td>
          <td class="py-3 px-6">{{ __('N/A') }}</td>
        </tr>
        {{-- <tr id="players_table" class="cursor-pointer bg-[#191c1e] border-b dark:border-gray-700 hover:bg-lightDark">
          <th class="py-4 px-6 font-medium text-gray-900 dark:text-white">
            <img src="{{ asset("images/games/{$server->mod->icon}.png") }}" alt="Mod Image" class="w-5">
          </th>
          <td class="py-4 px-6">
            @if ($server->server_data['Os'] !== "N/A")
              <img src="{{ asset("images/{$server->server_data['Os']}.png") }}" alt="Os Image" class="w-5">
            @else
              {{ __('N/A') }}
            @endif
          </td>
          <td class="py-4 px-6">
            @if ($server->server_data['Secure'] !== "N/A")
              @if ($server->server_data['Secure'])
                <img src="{{ asset("images/shield.png") }}" alt="Shield" class="w-5">
              @else
                <img src="{{ asset("images/smac.png") }}" alt="Shield" class="w-5">
              @endif
            @else
              {{ __('N/A') }}
            @endif
          </td>
          <td class="py-4 px-6">
            {{ $server->server_data['HostName'] }}
          </td>
          <td class="py-4 px-6">
            @if ($server->server_data['Players'] !== "N/A")
              {{ $server->server_data['Players'] }}/{{ $server->server_data['MaxPlayers'] }}
            @else
              {{ __('N/A') }}
            @endif
          </td>
          <td class="py-4 px-6">
            {{ $server->server_data['Map'] }}
          </td>
        </tr> --}}
      </tbody>
    </table>
  </div>
  <div id="players_table_items" class="flex overflow-x-auto max-h-[75%]">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400" id="table_players">
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
        {{-- @foreach ($server->player_data as $player)
          <tr class="hover:bg-lightDark">
            <td class="py-4 px-6">
              {{ is_array($player) ? $player['Name'] : $player }}
            </td>
            <td class="py-4 px-6">
              {{ is_array($player) ? $player['Frags'] : $player }}
            </td>
            <td class="py-4 px-6">
              {{ is_array($player) ? $player['TimeF'] : $player }}
            </td>
            @if (is_array($player) && $player['Name'] !== "N/A")
              <td data-dropdown-toggle="dropdownPlayerActions-{{ $player['Name'] }}" class="w-fit py-4 px-6 flex items-center cursor-pointer">
                <p>{{ __('Actions') }}</p>
                <ion-icon name="chevron-down-sharp" class="mx-1.5"></ion-icon>
              </td>
              <x-dropdown-actions :id="$player['Id']" :server="$server" :player="$player['Name']"/>
            @else
              <td class="w-fit py-4 px-6 flex items-center cursor-not-allowed">
                <p>{{ __('Actions') }}</p>
                <ion-icon name="chevron-down-sharp" class="mx-1.5"></ion-icon>
              </td>
              @break
            @endif
          </tr>
        @endforeach --}}
      </tbody>
    </table>
  </div>
</div>
@endsection

@push('scripts')
  @if(session('success'))
    <script defer>
      Swal.fire({
        icon: 'success',
        text: "{{session('success')}}",
        color: '#fff'
      }).then(function(){
        location.reload();
      })
    </script>
  @elseif (session('error'))
    <script defer>
      Swal.fire({
        icon: 'error',
        title: "Whoops!",
        text: "{{session('error')}}",
        color: '#fff'
      }).then(function(){
        location.reload();
      })
    </script>
  @endif
@endpush
