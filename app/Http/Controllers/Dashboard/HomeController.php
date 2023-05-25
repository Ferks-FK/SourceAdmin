<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Ban;
use App\Models\Server as ServerModel;
use App\Traits\Server;
use Illuminate\Http\Request;
use Inertia\Inertia;


class HomeController extends Controller
{
    use Server;

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $serversCount = ServerModel::query()
            ->limit(10)
            ->count();
        $bansCount = Ban::query()
            ->limit(10)
            ->count();

        return Inertia::render('dashboard/DashboardContainer', [
            'serversCount' => $serversCount,
            'bansCount' => $bansCount,
            'serversIds' => $this->getServersIds(5),
            'bansData' => $this->getBansData(10)
        ]);
    }

    public function getBansData(string $limit)
    {
        return Ban::query()
            ->leftJoin('users AS A', 'A.id', 'bans.admin_id')
            ->leftJoin('users AS B', 'B.id', 'bans.removed_by')
            ->join('time_bans', 'time_bans.id', 'bans.time_ban_id')
            ->join('servers', 'servers.id', 'bans.server_id')
            ->join('mods', 'mods.id', 'mod_id')
            ->select('bans.id', 'mods.icon as mod_icon', 'A.name as admin_name', 'player_name', 'bans.ip', 'bans.created_at', 'time_bans.name as time_ban_name', 'time_bans.value as time_ban_value', 'bans.end_at', 'bans.flag_url', 'B.name as removed_by')
            ->limit($limit)
            ->get();
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
        //
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
}
