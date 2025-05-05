<?php

namespace App\Http\Requests\Admin\Mute;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class MuteCreateRequest extends FormRequest
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
            "ip" => ['string', 'nullable', 'ipv4'],
            "steam_id" => ['nullable', 'string', 'regex:/^(STEAM_[0-5]:[0-1]:\d+|\d{17})$/'],
            "player_name" => ['required', 'string', 'min:4', 'max:32'],
            "time_ban_id" => ['required', 'numeric', 'exists:time_bans,id'],
            "admin_id" => ['required', 'numeric', 'exists:users,id'],
            "reason_id" => ['required', 'numeric', 'exists:reasons,id']
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
