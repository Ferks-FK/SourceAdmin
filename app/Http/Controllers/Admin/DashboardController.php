<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Helpers\GetAppVersion;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Inertia\Response
     */
    public function index(GetAppVersion $version)
    {
        $data = DB::select("SELECT (SELECT COUNT(*) FROM users) as usersCount, (SELECT COUNT(*) FROM servers) as serversCount, (SELECT COUNT(*) FROM bans) as bansCount, (SELECT COUNT(*) FROM appeals) as appealsCount, (SELECT COUNT(*) FROM reports) as reportsCount")[0];

        return Inertia::render('admin/AdminOverview/AdminOverview', [
            'versionData' => [
                'isLatestVersion' => $version->isLastestVersion(),
                'currentVersion' => $version->getCurrentVersion()
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

    /**
     * Get total file demos.
     *
     * @return int
     */
    private function getTotalDemosCount(): int
    {
        $demoPath = "public/upload_demos";

        $files = Storage::allFiles($demoPath);

        return count($files);
    }

    /**
     * Get the total size of the demos files.
     *
     * @return float
     */
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
}
