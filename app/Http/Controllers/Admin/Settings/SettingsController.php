<?php

namespace App\Http\Controllers\Admin\Settings;

use App\Http\Controllers\Controller;
use App\Permissions\Permission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class SettingsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        $this->checkPermission(Permission::VIEW_SETTINGS);

        return Inertia::render('admin/PanelSettings/SettingsContainer');
    }

    /**
     * Display the specified resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Request $request)
    {
        $group = $request->string('group');

        $setting_classname = 'App\\Settings\\' . $group;

        $setting_class = (new $setting_classname())->toArray();

        return response()->json($setting_class);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request)
    {
        $setting_classname = 'App\\Settings\\' . $request->group;
        $setting_class = new $setting_classname();

        $this->checkPermission(Permission::EDIT_SETTINGS);

        if (method_exists($setting_class, 'validations')) {
            $validations = $setting_class::validations();
        } else {
            $validations = [];
        }

        $validator = Validator::make($request->all(), $validations, customAttributes: ['attributes' => __('validation.attributes')]);

        if ($validator->fails()) {
            return redirect()->back()->withInput()->withErrors($validator->errors(), 'errors');
        }

        foreach($setting_class->toArray() as $key => $value) {
            $setting = new \ReflectionProperty($setting_class, $key);
            $settingType = $setting->getType();

            if ($settingType == 'bool') {
                $setting_class->$key = $request->has($key);
                continue;
            }

            if ($setting->name == 'available') {
                $setting_class->$key = implode(",", $request->$key);
                continue;
            }

            if ($settingType->allowsNull()) {
                $setting_class->$key = $request->input($key) ?? null;
            } else {
                $setting_class->$key = $request->input($key);
            }

            $setting_class->save();
        }

        return redirect()->back()->with('success', __('The settings has been successfully updated'));
    }
}
