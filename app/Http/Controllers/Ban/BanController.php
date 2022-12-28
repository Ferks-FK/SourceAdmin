<?php

namespace App\Http\Controllers\Ban;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\Ban;
use App\Models\Server;
use App\Services\RconService;
use Exception;

class BanController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if ($request->ajax()) {
            return $this->dataTableQueryData();
        }

        return view('ban.index');
    }

    public function dataTableQueryData()
    {
        $bans = DB::table('bans')
            ->join('users', 'users.id', '=', 'bans.admin_id')
            ->join('time_bans', 'time_bans.id', '=', 'bans.time_ban_id')
            ->join('servers', 'servers.id', '=', 'bans.server_id')
            ->join('mods', 'mods.id', '=', 'mod_id')
            ->select('bans.id', 'mods.icon as mod_icon', 'users.name as admin_name', 'player_name', 'bans.ip', 'bans.created_at', 'time_bans.name as time_ban_name', 'time_bans.value as time_ban_value', 'bans.end_at')
            ->limit(10)
            ->get();

        return $bans->toJson();
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
    public function show(Ban $ban)
    {
        return view('ban.show', compact('ban'));
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

    public function KickPlayer($player_id, $server_id)
    {
        $server = Server::findOrFail($server_id);
        $rconService = new RconService($server->ip, $server->port, $server->rcon);

        try {
            $player = $rconService->addActionToPlayer($player_id);

            return redirect()->route('servers.show', $server_id)->with('success', __("The player $player was successfully kicked."));
        }
        catch (Exception $error) {
            return redirect()->route('servers.show', $server_id)->with('error', $error->getMessage());
        }
    }
}
