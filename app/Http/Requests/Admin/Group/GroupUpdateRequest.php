<?php

namespace App\Http\Requests\Admin\Group;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Rule;
use App\Enums\Group;
use App\Models\Permission;

class GroupUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'name' => [
                'required',
                'string',
                Rule::unique('groups', 'name')->ignore($this->id, 'id')
            ],
            'description' => ['nullable', 'string'],
            'type' => [
                'required',
                'string',
                Rule::in(Group::SERVER->value, Group::SERVER_ADMIN->value, Group::WEB->value)
            ],
            'group_permissions' => ['nullable', 'array'],
            'group_permissions.*' => ['exists:permissions,id']
        ];
    }

    protected function prepareForValidation()
    {
        $permissions = $this->input('group_permissions');

        $perms = Permission::whereIn('id', $permissions)->pluck('name')->toArray();

        // Remove all other permissions if the 'All Permissions' option is sent.
        if (in_array('*', $perms)) {
            $permissions = [1];
        }

        $this->merge([
            'group_permissions' => $permissions,
        ]);
    }

    protected function failedValidation(Validator $validator)
    {
        if ($validator->fails()) {
            throw new HttpResponseException (
                redirect()->back()->withInput()->withErrors($validator->errors(), 'errors')
            );
        }

        parent::failedValidation($validator);
    }
}
