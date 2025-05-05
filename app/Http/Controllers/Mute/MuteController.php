<?php

namespace App\Http\Controllers\Mute;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Mute;
use Inertia\Inertia;
use Spatie\QueryBuilder\QueryBuilder;

class MuteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param \Illuminate\Http\Request  $request
     *
     * @return \Inertia\Response
     */
    public function index(Request $request)
    {
        return Inertia::render('mutes/MutesContainer', [
            'data' => $this->getMutesData($request)
        ]);
    }

    /**
     * Get the mutes.
     *
     * @param \Illuminate\Http\Request  $request
     */
    protected function getMutesData(Request $request)
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
            ->select('mutes.id', 'mutes.server_id', 'mods.mod as mod_icon', 'A.name as admin_name', 'mutes.player_name', 'mutes.ip', 'mutes.created_at', 'time_bans.name as time_ban_name', 'time_bans.value as time_ban_value', 'mutes.end_at', 'mutes.type', 'B.name as removed_by');

        return $request->boolean('all') ? $query->get() : $query->paginate(10)->appends(request()->query());
    }
}
