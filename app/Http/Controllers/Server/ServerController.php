<?php

namespace App\Http\Controllers\Server;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Server;
use App\Helpers\QueryServers;

class ServerController extends Controller
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

        $serverCount = Server::query()
            ->limit(10)
            ->count();

        return view('server.index', compact('serverCount'));
    }

    public function connectToServer(int $id, bool $returnPlayers = false)
    {
        $server = Server::findOrFail($id);
        $query = new QueryServers($id, $server->ip, $server->port, $server->rcon);

        if ($returnPlayers) {
            return [$query->getServerData(), $query->getplayerData()];
        }
        return $query->getServerData();
    }

    public function dataTableQueryData()
    {
        $servers = Server::query()
            ->limit(10)
            ->get();

        $server_ids = [];

        foreach($servers as $server) {
            array_push($server_ids, $server->id);
        }

        return $server_ids;
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
    public function show(Request $request, Server $server)
    {
        if ($request->ajax()) {
            return $this->connectToServer($server->id, returnPlayers: true);
        }

        return view('server.show', compact('server'));
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
