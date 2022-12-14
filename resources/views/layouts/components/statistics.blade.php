<div class="flex flex-wrap justify-center my-5">
  <a href="#" class="flex bg-dark hover:bg-lightDark w-36 text-center items-center justify-center rounded m-3">
    {{-- <ion-icon name="layers-outline" class="w-8 h-8 text-neutral-100"></ion-icon> --}}
    <div class="flex flex-col justify-between p-2 leading-normal">
      <p class="text-sm font-bold tracking-tight text-gray-900 dark:text-white">{{__('Total Servers')}}</p>
      <span class="text-lg font-bold text-gray-900 dark:text-white">{{ $servers->count() }}</span>
    </div>
  </a>
  <a href="#" class="flex bg-dark hover:bg-lightDark w-36 text-center items-center justify-center rounded m-3">
    {{-- <ion-icon name="layers-outline" class="w-8 h-8 text-neutral-100"></ion-icon> --}}
    <div class="flex flex-col justify-between p-2 leading-normal">
      <p class="text-sm font-bold tracking-tight text-gray-900 dark:text-white">{{__('Total Bans')}}</p>
      <span class="text-lg font-bold text-gray-900 dark:text-white">5</span>
    </div>
  </a>
  <a href="#" class="flex bg-dark hover:bg-lightDark w-36 text-center items-center justify-center rounded m-3">
    {{-- <ion-icon name="layers-outline" class="w-8 h-8 text-neutral-100"></ion-icon> --}}
    <div class="flex flex-col justify-between p-2 leading-normal">
      <p class="text-sm font-bold tracking-tight text-gray-900 dark:text-white">{{__('Total Comm Blocks')}}</p>
      <span class="text-lg font-bold text-gray-900 dark:text-white">5</span>
    </div>
  </a>
  <a href="#" class="flex bg-dark hover:bg-lightDark w-36 text-center items-center justify-center rounded m-3">
    {{-- <ion-icon name="layers-outline" class="w-8 h-8 text-neutral-100"></ion-icon> --}}
    <div class="flex flex-col justify-between p-2 leading-normal">
      <p class="text-sm font-bold tracking-tight text-gray-900 dark:text-white">{{__('Total Blocked Connections')}}</p>
      <span class="text-lg font-bold text-gray-900 dark:text-white">5</span>
    </div>
  </a>
</div>

