<?php

namespace App\Http\Controllers\Admin\Server;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Server\ServerUpdateRequest;
use App\Http\Requests\Admin\Server\ServerCreateRequest;
use App\Traits\Server;
use App\Models\Mod;
use App\Models\Region;
use App\Models\Server as ServerModel;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Inertia\Inertia;
use Spatie\QueryBuilder\QueryBuilder;

class ServerController extends Controller
{
    use Server;

    private Collection $mods;
    private Collection $regions;

    public function __construct()
    {
        $this->mods = Mod::where('enabled', true)->get(['id', 'name']);
        $this->regions = Region::where('enabled', true)->get(['id', 'region']);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $this->authorize('index', Server::class);

        return Inertia::render('admin/ServerSettings/ServerIndex', [
            'serversIds' => $this->getServersIds(getAll: true),
            'data' => $this->getServerData()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $this->authorize('create', Server::class);

        return Inertia::render('admin/ServerSettings/ServerCreate', [
            'mods' => $this->mods,
            'regions' => $this->regions
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ServerCreateRequest $request)
    {
        $this->authorize('create', Server::class);

        ServerModel::create($request->except('rcon_confirmation'));

        return redirect()->route('admin.servers.index')->with('success', __('The :attribute has been successfully :action.', ['attribute' => __('server'), 'action' => __('created')]));
    }

    /**
     * Display the specified resource.
     *
     * @param Request $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id)
    {
        $this->authorize('show', Server::class);

        $serverAttrs = $this->getServerAttributes($id, ['created_at', 'updated_at', 'mod_id', 'region_id', 'enabled']);
        $serverData = $this->connectToServer($request, $id)->getData();
        $serverData->server->Created_At = $serverAttrs[0]->created_at;
        $serverData->server->Updated_At = $serverAttrs[0]->updated_at;
        $serverData->server->ModId = $serverAttrs[0]->mod_id;
        $serverData->server->RegionId = $serverAttrs[0]->region_id;
        $serverData->server->Enabled = $serverAttrs[0]->enabled;

        return Inertia::render('admin/ServerSettings/ServerShow', [
            'server' => $serverData->server,
            'mods' => $this->mods,
            'regions' => $this->regions
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(ServerUpdateRequest $request, $id)
    {
        $this->authorize('show', Server::class);

        $data = $request->except('new_rcon_confirmation');
        $server = ServerModel::findOrFail($id);

        if ($request->input('new_rcon')) {
            unset($data['new_rcon']);
            $data['rcon'] = $request->input('new_rcon');
        }

        $server->fill($data);
        $server->save();

        $this->removeServerFromCache($id);

        return redirect()->route('admin.servers.index')->with('success', __('The :attribute has been successfully :action.', ['attribute' => __('server'), 'action' => __('updated')]));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $this->authorize('destroy', Server::class);

        $server = ServerModel::findOrFail($id);

        $server->delete();

        $this->removeServerFromCache($id);

        return redirect()->route('admin.servers.index')->with('success', __('The :attribute has been successfully :action.', ['attribute' => __('server'), 'action' => __('deleted')]));
    }

    protected function getServerData()
    {
        $query = QueryBuilder::for(ServerModel::class);

        return $query->paginate(10)->appends(request()->query());
    }
}
