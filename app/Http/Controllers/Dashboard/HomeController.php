<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Ban;
use App\Models\Mute;
use App\Models\Server as ServerModel;
use App\Traits\Server;
use Inertia\Inertia;
use Spatie\QueryBuilder\QueryBuilder;

class HomeController extends Controller
{
    use Server;

    /**
     * Display a listing of the resource.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        $serversCount = ServerModel::query()
            ->where('enabled', true)
            ->limit(10)
            ->count();
        $bansCount = Ban::query()
            ->limit(10)
            ->count();
        $mutesCount = Mute::query()
            ->limit(10)
            ->count();

        return Inertia::render('dashboard/DashboardContainer', [
            'serversCount' => $serversCount,
            'bansCount' => $bansCount,
            'mutesCount' => $mutesCount,
            'serversIds' => $this->getServersIds(),
            'bansData' => $this->getBansData(),
            'mutesData' => $this->getMutesData()
        ]);
    }

    /**
     * Get the bans.
     *
     * @param \Illuminate\Http\Request  $request
     */
    protected function getBansData()
    {
        return QueryBuilder::for(Ban::class)
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
            ->select('bans.id', 'mods.mod as mod_icon', 'A.name as admin_name', 'bans.player_name', 'bans.ip', 'bans.created_at', 'time_bans.name as time_ban_name', 'time_bans.value as time_ban_value', 'bans.end_at', 'bans.flag_url', 'B.name as removed_by')
            ->orderBy('bans.created_at', 'DESC')
            ->limit(10)
            ->get();
    }

    /**
     * Get the mutes.
     */
    protected function getMutesData()
    {
        return QueryBuilder::for(Mute::class)
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
            ->select('mutes.id', 'mods.mod as mod_icon', 'A.name as admin_name', 'mutes.player_name', 'mutes.ip', 'mutes.created_at', 'time_bans.name as time_ban_name', 'time_bans.value as time_ban_value', 'mutes.end_at', 'mutes.type', 'B.name as removed_by')
            ->orderBy('mutes.created_at', 'DESC')
            ->limit(10)
            ->get();
    }
}
