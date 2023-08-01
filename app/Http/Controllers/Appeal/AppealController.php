<?php

namespace App\Http\Controllers\Appeal;

use App\Http\Controllers\Controller;
use App\Http\Requests\Appeal\AppealCreateRequest;
use App\Jobs\Appeal as AppealJob;
use App\Models\Appeal;
use Inertia\Inertia;

class AppealController extends Controller
{
    /**
     * Show the form for creating a new resource.
     *
     * @return \Inertia\Response
     */
    public function create()
    {
        return Inertia::render('appeal/AppealContainer');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\Appeal\AppealCreateRequest  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(AppealCreateRequest $request)
    {
        $appeal = Appeal::create($request->all());

        AppealJob::dispatch($appeal);

        return redirect()->route('appeal.create')->with('success', __('Your :attribute has been sent to the administrators.', ['attribute' => __('appeal')]));
    }
}
