<?php

namespace App\Http\Controllers\Admin\AdminSettings;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Http\Requests\Admin\AdminCreateRequest;
use App\Http\Requests\Admin\AdminUpdateRequest;
use Inertia\Inertia;
use Spatie\QueryBuilder\QueryBuilder;

class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
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
        return Inertia::render('admin/AdminSettings/AdminCreate');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(AdminCreateRequest $request)
    {
        User::create($request->except('password_confirmation'));

        return redirect()->route('admin.settings.index')->with('success', __('The user has been successfully created.'));
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = User::findOrFail($id);

        return Inertia::render('admin/AdminSettings/AdminShow', [
            'user' => $user
        ]);
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
    public function update(AdminUpdateRequest $request, $id)
    {
        $data = $request->except('new_password_confirmation');
        $user = User::findOrFail($id);

        if ($request->input('new_password')) {
            unset($data['new_password']);
            $data['password'] = $request->input('new_password');

            // Force user to login again with new credentials.
            if (!$user->should_re_login) {
                $user->should_re_login = true;
            }
        }

        $user->fill($data);
        $user->save();

        return redirect()->back()->with('success', __('The user has been successfully updated.'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user = User::findOrFail($id);

        $user->delete();

        return redirect()->route('admin.settings.index')->with('success', __('The administrator has been successfully deleted.'));
    }

    protected function getUsersData()
    {
        return QueryBuilder::for(User::class)->paginate(10)->appends(request()->query());
    }
}
