<?php

namespace App\Http\Controllers\Ban;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Ban;
use Inertia\Inertia;
use Spatie\QueryBuilder\QueryBuilder;

class BanController extends Controller
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
        return Inertia::render('bans/BansContainer', [
          	'data' => $this->getBansData($request)
        ]);
    }

    /**
     * Get the bans.
     *
     * @param \Illuminate\Http\Request  $request
     */
    protected function getBansData(Request $request)
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
            ->select('bans.id', 'bans.server_id', 'mods.mod as mod_icon', 'A.name as admin_name', 'bans.player_name', 'bans.ip', 'bans.created_at', 'time_bans.name as time_ban_name', 'time_bans.value as time_ban_value', 'bans.end_at', 'bans.flag_url', 'B.name as removed_by');

        return $request->boolean('all') ? $query->get() : $query->paginate(10)->appends(request()->query());
    }
}
