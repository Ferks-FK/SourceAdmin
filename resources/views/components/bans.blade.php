<div class="flex flex-wrap overflow-x-auto whitespace-nowrap md:whitespace-normal">
  <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
    <thead class="text-xs text-gray-300 uppercase bg-dark">
      <tr>
        <td scope="col" class="py-3 px-6">
          {{__('MOD/Country')}}
        </td>
        <td scope="col" class="py-3 px-6">
          {{__('Date/Time')}}
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
        <tr data-href="{{ route('bans.show', $ban->id) }}" class="cursor-pointer bg-[#1a1e22] border-b dark:border-gray-700 hover:bg-lightDark">
          <th class="flex py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            @if (!$ban->getLocation($ban->ip))
              <img src="{{ asset('images/unknown.svg') }}" class="w-6" alt="Country Image">
            @else
              <img src="{{ asset("images/games/{$ban->server->mod->icon}.png") }}" class="w-5 mr-1" alt="Mod Image">
              <img src="https://flagcdn.com/{{$ban->getLocation($ban->ip)}}.svg" class="w-7" alt="Country Image">
            @endif
          </th>
          <td class="py-4 px-6">
            {{ $ban->created_at }}
          </td>
          <td class="py-4 px-6">
            {{ $ban->player_name }}
          </td>
          <td class="py-4 px-6">
            {{ $ban->admin->name }}
          </td>
          <td class="py-4 px-6
          @if ($ban->time_ban->value == 0)
            text-red-700
          @elseif ($ban->end_at < now())
            text-green-700
          @else
            text-yellow-700
          @endif">
            {{ $ban->time_ban->name }}
            @if ($ban->end_at < now() && $ban->time_ban->value != 0)
              {{ __('(Expired)') }}
            @endif
          </td>
        </tr>
      @endforeach
    </tbody>
  </table>
</div>
