<?php

namespace App\Http\Requests\Admin\Server;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class ServerCreateRequest extends FormRequest
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
            'ip' => ['required', 'regex:/^(?:(?:https?|http):\/\/)?(?:[a-zA-Z0-9]+\.[a-zA-Z]{2,}|(?:\d{1,3}\.){3}\d{1,3})(?:\/\S*)?$/'],
            'port' => ['required', 'regex:/^(?:[1-9]\d{0,3}|[1-5]\d{4}|6(?:[0-4]\d{3}|5(?:[0-4]\d{2}|5(?:[0-2]\d|3[0-5]))))$/'],
            'rcon' => ['required', 'min:8', 'confirmed'],
            'mod_id' => ['required', 'numeric', 'exists:mods,id'],
            'region_id' => ['required', 'numeric', 'exists:regions,id'],
            'enabled' => ['required', 'boolean']
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
