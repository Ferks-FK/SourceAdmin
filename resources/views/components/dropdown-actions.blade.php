<div id="dropdownPlayerActions-{{ $player }}" class="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
  <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownInformationButton">
    <li onclick='Livewire.emit("openModal", "modal", {{ json_encode(["action" => "kick", "player_id" => $id, "player_name" => $player, "server_id" => $server->id]) }})'>
      <a href="#" class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{{ __('Kick') }}</a>
    </li>
    <li onclick='Livewire.emit("openModal", "modal", {{ json_encode(["action" => "ban", "player_id" => $id, "player_name" => $player, "server_id" => $server->id]) }})'>
      <a href="#" class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{{ __('Ban') }}</a>
    </li>
    <li>
      <a href="#" class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{{ __('Block Comms') }}</a>
    </li>
  </ul>
  <div class="py-1">
    <a href="#" class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">{{ __('View Profile') }}</a>
    <a href="#" class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">{{ __('Send Message') }}</a>
  </div>
</div>
