<?php

namespace App\Http\Controllers\Admin\Mod;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Mod\ModCreateRequest;
use App\Http\Requests\Admin\Mod\ModUpdateRequest;
use App\Models\Mod;
use Inertia\Inertia;
use Spatie\QueryBuilder\QueryBuilder;


class ModController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = QueryBuilder::for(Mod::class)
            ->paginate(10)->appends(request()->query());

        return Inertia::render('admin/ModSettings/ModIndex', [
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
        return Inertia::render('admin/ModSettings/ModCreate', [
            'mods' => Mod::all()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ModCreateRequest $request)
    {
        if ($request->hasFile('upload_mod_icon')) {
            $file = $request->file('upload_mod_icon');
            $file_name = $request->mod . '.' . $file->extension();
            $file->move(public_path('images/games'), $file_name);
        }

        Mod::create($request->except('upload_mod_icon'));

        return redirect()->route('admin.mods.index')->with('success', __('The :attribute has been successfully :action.', ['attribute' => __('mod'), 'action' => __('created')]));
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Inertia::render('admin/ModSettings/ModShow', [
            'mods' => Mod::all(),
            'mod' => Mod::findOrFail($id)
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(ModUpdateRequest $request, $id)
    {
        $mod = Mod::findOrFail($id);

        $mod->fill($request->except('icon_id'));
        $mod->save();

        return redirect()->route('admin.mods.index')->with('success', __('The :attribute has been successfully :action.', ['attribute' => __('mod'), 'action' => __('updated')]));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $mod = Mod::findOrFail($id);

        $mod->delete();

        return redirect()->route('admin.mods.index')->with('success', __('The :attribute has been successfully :action.', ['attribute' => __('mod'), 'action' => __('deleted')]));
    }
}
