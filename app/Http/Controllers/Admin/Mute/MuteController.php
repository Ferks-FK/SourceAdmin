<?php

namespace App\Http\Controllers\Admin\Mute;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Mute\MuteCreateRequest;
use App\Http\Requests\Admin\Mute\MuteUpdateRequest;
use App\Models\Mute;
use App\Models\User;
use App\Models\TimeBan;
use App\Models\Reason;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Spatie\QueryBuilder\QueryBuilder;
use Carbon\Carbon;

class MuteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render('admin/MuteSettings/MuteIndex', [
            'data' => $this->getCommsData()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $reasons = Reason::all(['id', 'reason']);
        $time_bans = TimeBan::all(['id', 'name']);
        $admins = User::orderBy('name', 'ASC')->get(['id', 'name']);

        return Inertia::render('admin/MuteSettings/MuteCreate', [
            'reasons' => $reasons,
            'timeBans' => $time_bans,
            'admins' => $admins
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(MuteCreateRequest $request)
    {
        Mute::create($request->all());

        return redirect()->route('admin.mutes.index')->with('success', __('The mute has been successfully created.'));
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $ban = Mute::where('id', $id)->get(['ip', 'steam_id'])->first();

        if ($ban->ip) {
            $muteCount = Mute::where('ip', $ban->ip)->count();
        } else {
            $muteCount = Mute::where('steam_id', $ban->steam_id)->count();
        }

        $muteInfo = $this->getCommsData($id);
        $muteInfo->ban_count = $muteCount;
        $muteInfo->player_is_muted = $this->playerIsMuted($muteInfo);

        $reasons = Reason::all(['id', 'reason']);
        $timeBans = TimeBan::all(['id', 'name']);

        return Inertia::render('admin/MuteSettings/MuteShow', [
            'mute' => $muteInfo,
            'muteCount' => $muteCount,
            'reasons' => $reasons,
            'timeBans' => $timeBans
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(MuteUpdateRequest $request, $id)
    {
        $mute = Mute::findOrFail($id);
        $mute->fill($request->all());
        $mute->save();

        return redirect()->route('admin.mutes.index')->with('success', __('The mute has been successfully updated.'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $mute = Mute::findOrFail($id);
        $mute->delete();

        return redirect()->route('admin.mutes.index')->with('success', __('The mute has been successfully deleted.'));
    }

    /**
     * Remute the specified player.
     *
     * @param Request $request
     * @param int $id
     */
    public function remute(Request $request, $id)
    {
        $admin = User::where('id', $request->removed_by)->first() ?? Auth::user();
        $mute = Mute::findOrFail($id);
        $data = [];

        if ($mute->removed_by || $mute->removed_on) {
            $data['removed_by'] = null;
            $data['removed_on'] = null;
        }

        $data['admin_id'] = $admin->id;

        $mute->fill($data);

        $mute->save();

        return redirect()->route('admin.mutes.index')->with('success', __('The mute has been successfully re-applied.'));
    }

    /**
     * Unmute the specified player.
     *
     * @param Request $request
     * @param int $id
     */
    public function unmute(Request $request, $id)
    {
        $admin = User::where('id', $request->removed_by)->first() ?? Auth::user();
        $mute = Mute::findOrFail($id);

        $mute->fill([
            'removed_by' => $admin->id,
            'removed_on' => $request->removed_on ? Carbon::createFromTimestamp($request->removed_on)->toDateTimeString() : Carbon::now(config('app.timezone'))->toDateTimeString()
        ]);

        $mute->save();

        return redirect()->route('admin.mutes.index')->with('success', __('The mute has been successfully undone.'));
    }

    protected function getCommsData(int $getById = null)
    {
        $query = QueryBuilder::for(Mute::class)
            ->leftJoin('users AS A', function ($join) {
                $join->on('A.id', 'mutes.admin_id');
            })
            ->leftJoin('users AS B', function ($join) {
                $join->on('B.id', 'mutes.removed_by');
            })
            ->leftJoin('servers', function ($join) {
                $join->on('servers.id', 'mutes.server_id');
            })
            ->leftJoin('time_bans', 'time_bans.id', 'mutes.time_ban_id')
            ->leftJoin('mods', 'mods.id', 'servers.mod_id')
            ->leftJoin('reasons', 'reasons.id', 'mutes.reason_id')
            ->where(function ($query) {
                $query->orWhere(function ($subquery) {
                    $subquery->whereNotNull('mutes.admin_id')
                        ->whereNotNull('mutes.removed_by')
                        ->whereNotNull('mutes.server_id');
                })
                    ->orWhereNull('mutes.admin_id')
                    ->orWhereNull('mutes.removed_by')
                    ->orWhereNull('mutes.server_id');
            })
            ->select('mutes.id', 'mutes.server_id', 'mods.mod as mod_icon', 'reasons.reason', 'reasons.id as reason_id', 'A.name as admin_name', 'mutes.player_name', 'mutes.ip as player_ip', 'mutes.steam_id as player_steam_id', 'mutes.created_at', 'time_bans.id as time_ban_id', 'time_bans.name as time_ban_name', 'time_bans.value as time_ban_value', 'mutes.end_at', 'B.name as removed_by');
        if ($getById) {
            return $query->where('mutes.id', $getById)->get()->first();
        }

        return $query->paginate(10)->appends(request()->query());
    }

    protected function playerIsMuted(mixed $banInfo)
    {
        if ($banInfo->removed_by || $banInfo->removed_on) {
            return false;
        }

        if ($banInfo->time_ban_value == 0) {
            return true;
        }

        $end_at = Carbon::parse($banInfo->end_at, config('app.timezone'));

        return !$end_at->isPast();
    }
}
