<?php

namespace App\Http\Controllers\Server;

use App\Http\Controllers\Controller;
use App\Models\Server;
use App\Helpers\QueryServer;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

abstract class AbstractServerController extends Controller
{
    public function connectToServer(Request $request, int $id): JsonResponse
    {
        $server = Server::findOrFail($id);
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

    public function getServersIds(string $limit): array
    {
        $servers = Server::pluck('id')->toArray();

        return array_slice($servers, 0, $limit);
    }
}
