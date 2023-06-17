<?php

namespace App\Http\Controllers\Admin\Ban;

use App\Http\Controllers\Controller;
use App\Models\Ban;
use App\Models\Reason;
use App\Models\TimeBan;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\QueryBuilder\QueryBuilder;
use Carbon\Carbon;

class BanController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render('admin/BanSettings/BanIndex', [
            'data' => $this->getBansData()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $ban = Ban::where('id', $id)->get(['ip', 'steam_id'])->first();

        if ($ban->ip) {
            $banCount = Ban::where('ip', $ban->ip)->count();
        } else {
            $banCount = Ban::where('steam_id', $ban->steam_id)->count();
        }

        $banInfo = $this->getBansData($id);
        $banInfo->ban_count = $banCount;
        $banInfo->remains_banned = $this->playerRemainsBanned($banInfo);

        $reasons = Reason::all(['id', 'reason']);
        $timeBans = TimeBan::all(['id', 'name']);

        return Inertia::render('admin/BanSettings/BanShow', [
            'ban' => $banInfo,
            'banCount' => $banCount,
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
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    protected function getBansData($getById = null)
    {
        $query = QueryBuilder::for(Ban::class)
            ->leftJoin('users AS A', function ($join) {
                $join->on('A.id', 'bans.admin_id');
            })
            ->leftJoin('users AS B', function ($join) {
                $join->on('B.id', 'bans.removed_by');
            })
            ->leftJoin('servers', function ($join) {
                $join->on('servers.id', 'bans.server_id');
            })
            ->leftJoin('time_bans', 'time_bans.id', 'bans.time_ban_id')
            ->leftJoin('mods', 'mods.id', 'servers.mod_id')
            ->leftJoin('reasons', 'reasons.id', 'bans.reason_id')
            ->where(function ($query) {
                $query->orWhere(function ($subquery) {
                    $subquery->whereNotNull('bans.admin_id')
                            ->whereNotNull('bans.removed_by')
                            ->whereNotNull('bans.server_id');
                })
                ->orWhereNull('bans.admin_id')
                ->orWhereNull('bans.removed_by')
                ->orWhereNull('bans.server_id');
            })
            ->select('bans.id', 'bans.server_id', 'mods.mod as mod_icon', 'reasons.reason', 'reasons.id as reason_id', 'A.name as admin_name', 'bans.player_name', 'bans.ip', 'bans.created_at', 'time_bans.id as time_ban_id', 'time_bans.name as time_ban_name', 'time_bans.value as time_ban_value', 'bans.end_at', 'bans.flag_url', 'B.name as removed_by');

        if ($getById) {
            return $query->where('bans.id', $getById)->get()->first();
        }

        return $query->paginate(10)->appends(request()->query());
    }

    protected function playerRemainsBanned(mixed $banInfo)
    {
        if ($banInfo->time_ban_value == 0) {
            return true;
        }

        $end_at = Carbon::parse($banInfo->end_at, config('app.timezone'));

        // Maybe this is not really accurate in relation to hours or minutes.
        return !$end_at->isPast();
    }
}
