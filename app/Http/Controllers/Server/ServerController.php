<?php

namespace App\Http\Controllers\Server;

use App\Http\Controllers\Controller;
use App\Models\Server as ServerModel;
use App\Traits\Server;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Inertia\Inertia;
use Spatie\QueryBuilder\QueryBuilder;

class ServerController extends Controller
{
    use Server;

    /**
     * Display a listing of the resource.
     *
     * @param \Illuminate\Http\Request  $request
     * @return \Inertia\Response
     */
    public function index(Request $request)
    {
        return Inertia::render('servers/ServersContainer', [
            'serversIds' => $this->getServersIds(),
            'data' => $this->getServerData($request)
        ]);
    }

    /**
     * Get a connection to a server.
     *
     * @param \Illuminate\Http\Request  $request
     * @param int $id
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getServer(Request $request, int $id)
    {
        return $this->connectToServer($request, $id);
    }

    /**
     * Get the servers.
     *
     * @param \Illuminate\Http\Request  $request
     */
    protected function getServerData(Request $request)
    {
        $query = QueryBuilder::for(ServerModel::class)
            ->where('enabled', true);

        return $request->boolean('all') ? $query->get() : $query->paginate(10)->appends(request()->query());
    }
}
