<div class="flex flex-wrap overflow-x-auto whitespace-nowrap md:whitespace-normal">
  <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400" id="table_servers">
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
      {{-- @foreach($servers as $server)
        <tr data-href="{{ route('servers.show', $server->id) }}" class="cursor-pointer bg-[#191c1e] border-b dark:border-gray-700 hover:bg-lightDark">
          <th class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
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
        </tr>
      @endforeach --}}
    </tbody>
  </table>
</div>
{{-- <div class="w-full flex justify-end my-2">
  {{ $servers->links() }}
</div> --}}
