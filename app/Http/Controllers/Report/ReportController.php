<?php

namespace App\Http\Controllers\Report;

use App\Http\Controllers\Server\AbstractServerController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Http\JsonResponse;
use Inertia\Inertia;

class ReportController extends AbstractServerController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render('report/ReportContainer', [
            'serversIds' => $this->getServersIds('10')
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'steam_id' => function($attribute, $value, $fail) {
                if (!preg_match('/^(STEAM_[0-5]:[0-1]:\d+|\d{17})$/', $value)) {
                    $fail(__('The :attribute field must be a valid SteamID or SteamID64.', ['attribute' => $attribute]));
                }
            },
            'ip_address' => 'string|nullable|ipv4',
            'player_name' => 'required|string',
            'comments' => 'required|string',
            'reporter_name' => 'required|string',
            'reporter_email' => 'required|string|email',
            'server' => 'required|' . Rule::in([1, 2, 'other_server']) . '|' . Rule::notIn(['default_value']), // TODO: Support the IDS of the servers dynamically.
            'upload_demo' => 'required|mimes:zip,rar,dem|size:25000'
        ]);

        if ($validator->fails()) {
            return redirect()->route('report.index')->withErrors($validator->errors(), 'errors');
        }

        return redirect()->route('report.index')->with('success', __('Your report has been sent to the administrators.'));
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
}
