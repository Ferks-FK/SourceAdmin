<?php

namespace App\Http\Controllers\Admin\Group;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Group\GroupCreateRequest;
use App\Http\Requests\Admin\Group\GroupUpdateRequest;
use App\Models\Group as GroupModel;
use App\Models\Permission;
use App\Models\User;
use App\Traits\Group;
use Inertia\Inertia;
use Spatie\QueryBuilder\QueryBuilder;

class GroupController extends Controller
{
    use Group;

    /**
     * Display a listing of the resource.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        $this->authorize('index', GroupModel::class);

        $data = QueryBuilder::for(GroupModel::withCount('users', 'permissions'))
            ->paginate(10)->appends(request()->query());

        return Inertia::render('admin/GroupSettings/GroupIndex', [
            'data' => $data
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Inertia\Response
     */
    public function create()
    {
        $this->authorize('create', GroupModel::class);

        return Inertia::render('admin/GroupSettings/GroupCreate', [
            'permissions' => Permission::all()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\Admin\Group\GroupCreateRequest  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(GroupCreateRequest $request)
    {
        $this->authorize('create', GroupModel::class);

        $group = GroupModel::create($request->except('group_permissions'));

        $group->permissions()->sync($request->group_permissions);

        return redirect()->route('admin.groups.index')->with('success', __('The :attribute has been successfully :action.', ['attribute' => __('group'), 'action' => __('created')]));
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Inertia\Response
     */
    public function show($id)
    {
        $this->authorize('show', GroupModel::class);

        $group = GroupModel::with('permissions')->findOrFail($id);

        return Inertia::render('admin/GroupSettings/GroupShow', [
            'group' => $group,
            'permissions' => Permission::all()
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\Admin\Group\GroupUpdateRequest  $request
     * @param  int  $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(GroupUpdateRequest $request, $id)
    {
        $this->authorize('show', GroupModel::class);

        $group = GroupModel::findOrFail($id);

        $group->fill($request->except('group_permissions'));
        $group->save();

        $group->permissions()->sync($request->group_permissions);

        $usersIds = $group->users()->pluck('id')->all();
        $users = User::whereIn('id', $usersIds)->get();

        foreach ($users as $user) {
            $this->syncGroupPermissions($user);
        }

        return redirect()->route('admin.groups.index')->with('success',__('The :attribute has been successfully :action.', ['attribute' => __('group'), 'action' => __('updated')]));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy($id)
    {
        $this->authorize('destroy', GroupModel::class);

        $group = GroupModel::findOrFail($id);

        $this->removeAllPermissions($group);

        $group->delete();

        return redirect()->route('admin.groups.index')->with('success', __('The :attribute has been successfully :action.', ['attribute' => __('group'), 'action' => __('deleted')]));
    }
}
