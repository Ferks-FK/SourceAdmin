<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;
use Illuminate\Http\Client\ConnectionException;

class GetAppVersion
{
    const GITHUB_URL = "https://api.github.com/repos/Ferks-FK/SourceAdmin/releases/latest";

    protected function getVersionFromGithub(): string
    {
        if (!Cache::has('version')) {
            $version = 'unknown';

            try {
                $response = Http::timeout(3)->get($this::GITHUB_URL);

                if ($response->successful()) {
                    $version = $response->object()->tag_name;

                    Cache::put('version', $version, now()->addDay());

                    return $version;
                }

                Cache::put('version', $version, now()->addHour());

                return 'unknown';
            } catch (ConnectionException $e) {
                Cache::put('version', $version, now()->addHour());

                return 'unknown';
            }
        }

        return Cache::get('version', 'unknown');
    }

    public function isLastestVersion(): bool
    {
        return $this->getCurrentVersion() === $this->getLatestVersion();
    }

    public function getCurrentVersion()
    {
        return config('app.version');
    }

    protected function getLatestVersion()
    {
        return $this->getVersionFromGithub();
    }
}
