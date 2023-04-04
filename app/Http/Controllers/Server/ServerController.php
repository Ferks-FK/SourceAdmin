<?php

namespace App\Http\Controllers\Server;

use Illuminate\Http\Request;
use App\Http\Controllers\MainController;
use App\Models\Server;
use App\Helpers\QueryServer;

class ServerController extends MainController
{
    protected array $ALLOWED_INCLUDES = ['players'];

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $limit = $request->get('limit', 10);

        if (is_null($limit)) $limit = 10;

        return response()->json(
            $this->getServersIds($limit)
        );
    }

    public function connectToServer(int $id)
    {
        $server = Server::findOrFail($id);
        $query = new QueryServer($id, $server->ip, $server->port, $server->rcon);
        $includes = $this->validateIncludes($this->ALLOWED_INCLUDES);

        if (in_array($this->ALLOWED_INCLUDES[0], $includes)) {
            return response()->json([
                $query->getServerData(),
                $query->getPlayerData()
            ]);
        }

        return response()->json([
            $query->getServerData()
        ]);
    }

    public function getServersIds(string $limit)
    {
        $servers = Server::query()
            ->limit($limit)
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
            return $this->connectToServer($server->id);
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
