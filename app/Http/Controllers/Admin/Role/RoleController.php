<?php

namespace App\Http\Controllers\Admin\Role;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Role\RoleCreateRequest;
use App\Http\Requests\Admin\Role\RoleUpdateRequest;
use App\Models\Role;
use Spatie\Permission\Models\Permission;
use Inertia\Inertia;
use Spatie\QueryBuilder\QueryBuilder;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        $this->authorize('index', Role::class);

        $data = QueryBuilder::for(Role::withCount(['users', 'permissions']))
            ->paginate(10)->appends(request()->query());

        return Inertia::render('admin/RoleSettings/RoleIndex', [
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
        $this->authorize('create', Role::class);

        return Inertia::render('admin/RoleSettings/RoleCreate', [
            'permissions' => Permission::all()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\Admin\Role\RoleCreateRequest  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(RoleCreateRequest $request)
    {
        $this->authorize('create', Role::class);

        $role = Role::create($request->except('permissions'));

        $role->givePermissionTo($request->permissions);

        return redirect()->route('admin.roles.index')->with('success', __('The :attribute has been successfully :action.', ['attribute' => __('role'), 'action' => __('created')]));
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Inertia\Response
     */
    public function show($id)
    {
        $this->authorize('show', Role::class);

        $role = Role::with('permissions')->findOrFail($id);
        $permissions = Permission::all();

        return Inertia::render('admin/RoleSettings/RoleShow', [
            'role' => $role,
            'permissions' => $permissions
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\Admin\Role\RoleUpdateRequest  $request
     * @param  int  $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(RoleUpdateRequest $request, $id)
    {
        $this->authorize('show', Role::class);

        $data = $request->except('permissions');
        $role = Role::findById($id);

        $role->syncPermissions($request->permissions);
        $role->fill($data);
        $role->save();

        return redirect()->route('admin.roles.index')->with('success', __('The :attribute has been successfully :action.', ['attribute' => __('role'), 'action' => __('updated')]));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy($id)
    {
        $this->authorize('destroy', Role::class);

        $role = Role::findById($id);
        $role->delete();

        return redirect()->route('admin.roles.index')->with('success', __('The :attribute has been successfully :action.', ['attribute' => __('role'), 'action' => __('deleted')]));
    }
}
