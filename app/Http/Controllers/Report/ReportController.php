<?php

namespace App\Http\Controllers\Report;

use App\Http\Controllers\Controller;
use App\Http\Requests\ReportRequest;
use App\Traits\Server;
use Illuminate\Http\Request;
use App\Jobs\ReportPlayer;
use App\Models\Report as ReportModel;
use Inertia\Inertia;

class ReportController extends Controller
{
    use Server;

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('report/ReportContainer', [
            'serversIds' => $this->getServersIds(getAll: true)
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ReportRequest $request)
    {
        if ($request->hasFile('upload_demo')) {
            $file = $request->file('upload_demo');
            $file_name = 'demo_' . $file->getClientOriginalName();
            $file->storePubliclyAs('public/upload_demos', $file_name);

            $report = ReportModel::create([
                'player_steam_id' => $request->input('player_steam_id'),
                'player_ip' => $request->input('player_ip'),
                'player_name' => $request->input('player_name'),
                'comments' => $request->input('comments'),
                'reporter_name' => $request->input('reporter_name'),
                'reporter_email' => $request->input('reporter_email'),
                'server_id' => $request->input('server_id'),
                'upload_demo' => $file_name,
            ]);
        } else {
            $report = ReportModel::create($request->except('upload_demo'));
        }

        ReportPlayer::dispatch($report);

        return redirect()->route('report.create')->with('success', __('Your report has been sent to the administrators.'));
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
