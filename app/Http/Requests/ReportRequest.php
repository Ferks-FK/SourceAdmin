<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ReportRequest extends FormRequest
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
            'steam_id' => function($attribute, $value, $fail) {
                if (!preg_match('/^(STEAM_[0-5]:[0-1]:\d+|\d{17})$/', $value)) {
                    $fail(__('The :attribute field must be a valid SteamID or SteamID64.', ['attribute' => $attribute]));
                }
            },
            'ip_address' => ['string', 'nullable', 'ipv4'],
            'player_name' => ['required', 'string', 'min:4', 'max:32'],
            'comments' => ['required', 'string', 'max:255'],
            'reporter_name' => ['required', 'string', 'min:4', 'max:32'],
            'reporter_email' => ['required', 'string', 'email'],
            'server' => [
                'required',
                Rule::in(['1', '2', 'other_server']), // TODO: Support the IDS of the servers dynamically.
                Rule::notIn(['default_value'])
            ],
            'upload_demo' => ['required', 'mimes:zip,rar,dem', 'size:25000']
        ];

    }
}
