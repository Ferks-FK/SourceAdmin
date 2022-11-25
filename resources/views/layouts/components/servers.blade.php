<div class="flex  flex-wrap overflow-x-auto">
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
      @foreach($servers as $server)
        <tr class="cursor-pointer bg-[#1a1e22] border-b dark:border-gray-700 hover:bg-[#2e3338]">
          <th class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            <img src="{{ asset("images/games/csgo.png") }}" alt="Mod Image" class="w-5">
          </th>
          <td class="py-4 px-6">
            @if ($server->os == "N/A")
              {{ $server->os }}
            @else
              <img src="{{ asset("images/{$server->os}.png") }}" alt="Os Image" class="w-5">
            @endif
          </td>
          <td class="py-4 px-6">
            @if ($server->vac == "N/A")
              {{ $server->vac }}
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
            @if ($server->total_players_online == "N/A" || $server->max_players == "N/A")
              N/A
            @else
              {{ $server->total_players_online }}/{{ $server->max_players }}
            @endif
          </td>
          <td class="py-4 px-6">
            {{ $server->map }}
          </td>
        </tr>
      @endforeach
    </tbody>
  </table>
</div>
<div class="w-full flex justify-end my-2">
  {{ $servers->links() }}
</div>
