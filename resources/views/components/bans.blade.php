<div class="flex flex-wrap overflow-x-auto whitespace-nowrap md:whitespace-normal">
  <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
    <thead class="text-xs text-gray-300 uppercase bg-dark">
      <tr>
        <td scope="col" class="py-3 px-6">
          {{__('MOD/Country')}}
        </td>
        <td scope="col" class="py-3 px-6">
          {{__('Date')}}
        </td>
        <td scope="col" class="py-3 px-6">
          {{__('Player')}}
        </td>
        <td scope="col" class="py-3 px-6">
          {{__('Admin')}}
        </td>
        <td scope="col" class="py-3 px-6">
          {{__('Length')}}
        </td>
      </tr>
    </thead>
    <tbody>
      @foreach($bans as $ban)
        <tr data-href="{{ route('bans.show', $ban->id) }}" class="cursor-pointer bg-[#1a1e22] border-b dark:border-gray-700 hover:bg-[#2e3338]">
          <th class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            @if (!$ban->getLocation($ban->ip))
              <img src="{{ asset('images/unknown.svg') }}" class="w-6" alt="Country Image">
            @else
              <img src="https://flagcdn.com/{{$ban->getLocation($ban->ip)}}.svg" class="w-6" alt="Country Image">
            @endif
          </th>
          {{-- <td class="py-4 px-6">
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
          </td> --}}
        </tr>
      @endforeach
    </tbody>
  </table>
</div>
