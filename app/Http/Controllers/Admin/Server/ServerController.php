<?php

namespace App\Http\Controllers\Admin\Server;

use App\Http\Controllers\Controller;
use App\Traits\Server;
use App\Models\Mod;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServerController extends Controller
{
    use Server;

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render('admin/ServerSettings/ServerIndex', [
            'serversIds' => $this->getServersIds(getAll: true)
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
     * @param Request $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id)
    {
        $serverAttrs = $this->getServerAttributes($id, ['created_at', 'updated_at', 'mod_id']);
        $serverData = $this->connectToServer($request, $id)->getData();
        $serverData[0]->Created_At = $serverAttrs[0]->created_at;
        $serverData[0]->Updated_At = $serverAttrs[0]->updated_at;
        $serverData[0]->ModId = $serverAttrs[0]->mod_id;

        $mods = Mod::where('enabled', true)->get(['id', 'name']);

        return Inertia::render('admin/ServerSettings/ServerShow', [
            'server' => $serverData,
            'mods' => $mods
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
}
