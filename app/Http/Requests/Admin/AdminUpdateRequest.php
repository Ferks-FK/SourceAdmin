<?php

namespace App\Http\Requests\Admin;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Routing\Route;

class AdminUpdateRequest extends FormRequest
{
    private User $user;

    public function __construct(Route $route)
    {
        $this->user = User::findOrFail($route->id);
    }

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
            'name' => ['required', 'string'],
            'email' => [
                'required',
                'string',
                'email',
                Rule::unique('users', 'email')->ignore($this->user->id, 'id')
            ],
            'steam_id' => [
                'required',
                'string',
                'regex:/^(STEAM_[0-5]:[0-1]:\d+|\d{17})$/',
                Rule::unique('users', 'steam_id')->ignore($this->user->steam_id, 'steam_id'),
            ],
            'role' => ['nullable', 'numeric', 'exists:roles,id'],
            'current_password' => [
                'required',
                'min:8'
            ],
            'new_password' => ['nullable', 'min:8', 'confirmed', 'regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/'],
        ];
    }

    public function withValidator(Validator $validator)
    {
        $validator->after(function ($validator) {
            if (!Hash::check($this->current_password, $this->user->password) ) {
                $validator->errors()->add('current_password', __('The current password is incorrect.'));
            }
        });
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
