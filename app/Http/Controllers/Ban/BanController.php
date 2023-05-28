<?php

namespace App\Http\Controllers\Ban;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Ban;
use App\Models\Server;
use App\Services\RconService;
use Inertia\Inertia;
use Exception;
use Spatie\QueryBuilder\QueryBuilder;

class BanController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return Inertia::render('bans/BansContainer', [
            'data' => $this->getBansData($request)
        ]);
    }

    public function getBansData(Request $request)
    {
        $query = QueryBuilder::for(Ban::class)
            ->leftJoin('users AS A', 'A.id', 'bans.admin_id')
            ->leftJoin('users AS B', 'B.id', 'bans.removed_by')
            ->join('time_bans', 'time_bans.id', 'bans.time_ban_id')
            ->join('servers', 'servers.id', 'bans.server_id')
            ->join('mods', 'mods.id', 'mod_id')
            ->select('bans.id', 'mods.icon as mod_icon', 'A.name as admin_name', 'player_name', 'bans.ip', 'bans.created_at', 'time_bans.name as time_ban_name', 'time_bans.value as time_ban_value', 'bans.end_at', 'bans.flag_url', 'B.name as removed_by');

        return $request->boolean('all') ? $query->get() : $query->paginate(10)->appends(request()->query());
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
}
