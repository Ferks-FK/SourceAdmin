<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Helpers\GetAppVersion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(GetAppVersion $version)
    {
        $isLatestVersion = $version->isLastestVersion();
        $data = DB::select("SELECT (SELECT COUNT(*) FROM users) as usersCount, (SELECT COUNT(*) FROM servers) as serversCount, (SELECT COUNT(*) FROM bans) as bansCount, (SELECT COUNT(*) FROM appeals) as appealsCount, (SELECT COUNT(*) FROM reports) as reportsCount")[0];

        return Inertia::render('admin/AdminOverview', [
            'versionData' => [
                'isLatestVersion' => $isLatestVersion,
                'currentVersion' => $version->getCurrentVersion(),
                'latestVersion' => $version->getLatestVersion()
            ],
            'usersCount' => $data->usersCount,
            'serversCount' => $data->serversCount,
            'bansCount' => $data->bansCount,
            'appealsCount' => $data->appealsCount,
            'reportsCount' => $data->reportsCount,
            'demosCount' => $this->getTotalDemosCount(),
            'totalDemoSize' => $this->calculateTotalDemosSize()
        ]);
    }

    private function getTotalDemosCount(): int
    {
        $demoPath = "public/upload_demos";

        $files = Storage::allFiles($demoPath);

        return count($files);
    }

    private function calculateTotalDemosSize(): float
    {
        $demoPath = "public/upload_demos";
        $folderSize = 0;

        $files = Storage::allFiles($demoPath);

        foreach ($files as $file) {
            $folderSize += Storage::size($file);
        }

        return (float) $folderSize;
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
}
