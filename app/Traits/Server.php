<?php

namespace App\Traits;

use App\Models\Server as ServerModel;
use App\Helpers\QueryServer;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;

trait Server
{
    public function connectToServer(Request $request, int $id): JsonResponse
    {
        $server = ServerModel::findOrFail($id);
        $query = new QueryServer($id, $server->ip, $server->port, $server->rcon);

        if ($request->boolean('getPlayers')) {
            return response()->json([
                $query->getServerData(),
                $query->getPlayerData()
            ]);
        }

        return response()->json([
            $query->getServerData()
        ]);
    }

    public function getServerAttributes($id, array $attrs)
    {
        return ServerModel::where('id', $id)->get($attrs);
    }

    public function getServersIds(int $limit = 10, bool $getAll = false): array
    {
        $servers = ServerModel::where('enabled', true)->pluck('id')->toArray();

        if ($getAll) {
            return ServerModel::pluck('id')->toArray();
        }

        return array_slice($servers, 0, $limit);
    }

    public function removeServerFromCache($id)
    {
        if (Cache::has('server.' . $id)) {
            Cache::forget('server.' . $id);
        }
    }
}
