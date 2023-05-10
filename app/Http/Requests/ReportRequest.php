<?php

namespace App\Http\Requests;

use App\Traits\Server;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Http\Exceptions\HttpResponseException;

class ReportRequest extends FormRequest
{
    use Server;

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
        $servers_ids = $this->getServersIds(getAll: true); // Allow only the server ID's registered in the DB.
        $servers_ids[] = 'other_server'; // Sometimes the user may not know which server is which.

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
            'server' => ['required', Rule::in($servers_ids)],
            'upload_demo' => ['nullable', 'file', 'mimes:zip,rar,dem', 'max:25000']
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
