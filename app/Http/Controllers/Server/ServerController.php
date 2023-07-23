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
     * @return \Illuminate\Http\Response
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
     * @return \Illuminate\Http\JsonResponse
     */
    public function getServer(Request $request, int $id): JsonResponse
    {
        return $this->connectToServer($request, $id);
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
    public function show(Request $request)
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

    protected function getServerData(Request $request)
    {
        $query = QueryBuilder::for(ServerModel::class)
            ->where('enabled', true);

        return $request->boolean('all') ? $query->get() : $query->paginate(10)->appends(request()->query());
    }
}
