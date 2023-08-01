<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class AdminCreateRequest extends FormRequest
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
            'name' => ['required', 'string'],
            'email' => ['required', 'string', 'email', 'unique:users,email'],
            'steam_id' => [
                'required',
                'string',
                'unique:users,steam_id',
                'regex:/^(STEAM_[0-5]:[0-1]:\d+|\d{17})$/'
            ],
            'role' => ['nullable', 'numeric', 'exists:roles,id'],
            'groups' => ['nullable', 'array'],
            'groups.*' => ['exists:groups,id'],
            'password' => [
                'required',
                'confirmed',
                'min:8',
                'regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/'
            ]
        ];
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
