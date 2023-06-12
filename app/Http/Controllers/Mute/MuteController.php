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
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return Inertia::render('mutes/MutesContainer', [
            'data' => $this->getCommsData($request)
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

    protected function getCommsData(Request $request)
    {
        $query = QueryBuilder::for(Mute::class)
            ->leftJoin('users AS A', 'A.id', 'mutes.admin_id')
            ->leftJoin('users AS B', 'B.id', 'mutes.removed_by')
            ->join('time_bans', 'time_bans.id', 'mutes.time_ban_id')
            ->join('servers', 'servers.id', 'mutes.server_id')
            ->join('mods', 'mods.id', 'mod_id')
            ->select('mutes.id', 'mods.mod as mod_icon', 'A.name as admin_name', 'player_name', 'mutes.ip', 'mutes.created_at', 'time_bans.name as time_ban_name', 'time_bans.value as time_ban_value', 'mutes.end_at', 'mutes.type', 'B.name as removed_by');

        return $request->boolean('all') ? $query->get() : $query->paginate(10)->appends(request()->query());
    }
}
