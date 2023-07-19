<?php

namespace App\Http\Controllers\Admin\Group;

use App\Http\Controllers\Controller;
use App\Models\Group;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\QueryBuilder\QueryBuilder;

class GroupController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $this->authorize('index', Group::class);

        $data = QueryBuilder::for(Group::class)
            ->paginate(10)->appends(request()->query());

        return Inertia::render('admin/GroupSettings/GroupIndex', [
            'data' => $data
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $this->authorize('create', Group::class);

        return Inertia::render('admin/GroupSettings/GroupCreate');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->authorize('create', Group::class);

        Group::create($request->all());

        return redirect()->route('admin.groups.index')->with('success', __('The group has been successfully created.'));
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $this->authorize('show', Group::class);

        $group = Group::findOrFail($id);

        return Inertia::render('admin/GroupSettings/GroupShow', [
            'group' => $group
        ]);
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
        $this->authorize('show', Group::class);

        $group = Group::findOrFail($id);

        $group->fill($request->all());
        $group->save();

        return redirect()->route('admin.groups.index')->with('success', __('The group has been successfully updated.'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $this->authorize('destroy', Group::class);

        $group = Group::findOrFail($id);

        $group->delete();

        return redirect()->route('admin.groups.index')->with('success', __('The group has been successfully deleted.'));
    }
}
