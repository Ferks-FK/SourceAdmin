<?php

namespace App\Http\Controllers\Report;

use App\Http\Controllers\Controller;
use App\Http\Requests\Report\ReportCreateRequest;
use App\Traits\Server;
use App\Jobs\ReportPlayer;
use App\Models\Report as ReportModel;
use Inertia\Inertia;

class ReportController extends Controller
{
    use Server;

    /**
     * Show the form for creating a new resource.
     *
     * @return \Inertia\Response
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
     * @param  \App\Http\Requests\Report\ReportCreateRequest  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(ReportCreateRequest $request)
    {
        if ($request->hasFile('upload_demo')) {
            $file = $request->file('upload_demo');
            $file_name = 'demo_' . $file->getClientOriginalName();
            $file->storeAs('public/upload_demos', $file_name);

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

        return redirect()->route('report.create')->with('success', __('Your :attribute has been sent to the administrators.', ['attribute' => __('report')]));
    }
}
