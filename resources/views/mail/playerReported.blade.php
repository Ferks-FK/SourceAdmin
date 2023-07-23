@component('vendor.mail.html.message')
  <h1>Hello {{ $userName }}!</h1>
  <p>A player was reported on one of your servers!</p>
  <div>
    <h2>Reported Player Info:</h2>
    <ul style="display: flex; flex-direction: column">
      <li>Player Name: {{ $content->player_name }}</li>
      @if (!is_null($content->player_steam_id))
        <li>Player Steam-ID: {{ $content->player_steam_id }}</li>
        <li>Player Steam Profile: <a href="{{ $steamIDUrl }}" target="_blank">Profile</a></li>
      @endif
      @if (!is_null($content->player_ip))
        <li>Player IP: {{ $content->player_ip }}</li>
      @endif
    </ul>
  </div>
  <div>
    <h2>Reporter Info:</h2>
    <ul style="display: flex; flex-direction: column">
      <li>Reporter Name: {{ $content->reporter_name }}</li>
      <li>Reporter Email: {{ $content->reporter_email }}</li>
      <li style="word-break: break-word;">Comments: {{ $content->comments }}</li>
    </ul>
  </div>
  <div>
    <p style="word-break: break-word;">
      Please keep in mind that the above data may not be correct, or may simply be a troll report.
      This is because reports are made by anyone who has access to the panel, without any login.
    </p>
  </div>
@endcomponent
