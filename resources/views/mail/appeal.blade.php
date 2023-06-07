@component('vendor.mail.html.message')
  <h1>Hello {{ $userName }}!</h1>
  <p>A player has appealed a ban!</p>
  <div>
    <h2>Appeal Info:</h2>
    <ul style="display: flex; flex-direction: column;">
      <li>Player Name: {{ $content->player_name }}</li>
      <li>Player Email: {{ $content->player_email }}</li>
      @if (!is_null($content->player_steam_id))
        <li>Player Steam-ID: {{ $content->player_steam_id }}</li>
        <li>Player Steam Profile: <a href="{{ $steamIDUrl }}" target="_blank">Profile</a></li>
      @endif
      @if (!is_null($content->player_ip))
        <li>Player IP: {{ $content->player_ip }}</li>
      @endif
      <li style="word-break: break-word;">Reason: {{ $content->reason }}</li>
    </ul>
  </div>
  <div>
    <p style="word-break: break-word;">
      Please keep in mind that the above data may not be correct, or may simply be a troll appeal.
      This is because appeals are made by anyone who has access to the panel, without any login.
    </p>
  </div>
@endcomponent
