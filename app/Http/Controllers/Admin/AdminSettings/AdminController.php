<?php

namespace App\Http\Controllers\Admin\AdminSettings;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Role;
use App\Models\Group as GroupModel;
use App\Http\Requests\Admin\AdminCreateRequest;
use App\Http\Requests\Admin\AdminUpdateRequest;
use App\Traits\Group;
use Inertia\Inertia;
use Spatie\QueryBuilder\QueryBuilder;

class AdminController extends Controller
{
    use Group;

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $this->authorize('index', User::class);

        return Inertia::render('admin/AdminSettings/AdminIndex', [
            'data' => $this->getUsersData()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $this->authorize('create', User::class);

        return Inertia::render('admin/AdminSettings/AdminCreate', [
            'roles' => Role::all(),
            'groups' => GroupModel::all()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(AdminCreateRequest $request)
    {
        $this->authorize('create', User::class);

        $user = User::create($request->except(['password_confirmation', 'role', 'groups']));
        $user->assignRole($request->role);

        $groups = $request->groups;

        if ($groups) {
            $user->groups()->sync($groups);
        }

        return redirect()->route('admin.settings.index')->with('success', __('The :attribute has been successfully :action.', ['attribute' => __('administrator'), 'action' => __('created')]));
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $this->authorize('show', User::class);

        $user = User::with(['roles', 'groups'])->findOrFail($id);

        return Inertia::render('admin/AdminSettings/AdminShow', [
            'user' => $user,
            'roles' => Role::all(),
            'groups' => GroupModel::all()
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(AdminUpdateRequest $request, $id)
    {
        $this->authorize('show', User::class);

        $data = $request->except(['new_password_confirmation', 'role', 'groups']);
        $user = User::findOrFail($id);

        if ($request->input('new_password')) {
            unset($data['new_password']);
            $data['password'] = $request->input('new_password');

            // Force user to login again with new credentials.
            if (!$user->should_re_login) {
                $user->should_re_login = true;
            }
        }

        if ($request->role) {
            if ($user->roles->count() >= 1) {
                $user->removeRole($user->roles[0]);
            }

            $user->assignRole($request->role);
        }

        $user->groups()->sync($request->groups);

        $this->syncGroupPermissions($user);

        $user->fill($data);
        $user->save();

        return redirect()->route('admin.settings.index')->with('success', __('The :attribute has been successfully :action.', ['attribute' => __('administrator'), 'action' => __('updated')]));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $this->authorize('destroy', User::class);

        $user = User::findOrFail($id);

        $user->delete();

        return redirect()->route('admin.settings.index')->with('success', __('The :attribute has been successfully :action.', ['attribute' => __('administrator'), 'action' => __('deleted')]));
    }

    protected function getUsersData()
    {
        return QueryBuilder::for(User::class)
            ->with('roles')
            ->paginate(10)->appends(request()->query());
    }
}
