<?php

namespace App\Http\Requests\Report;

use App\Traits\Server;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Http\Exceptions\HttpResponseException;

class ReportCreateRequest extends FormRequest
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

        return [
            'player_steam_id' => ['nullable', 'string', 'regex:/^(STEAM_[0-5]:[0-1]:\d+|\d{17})$/'],
            'player_ip' => ['string', 'nullable', 'ipv4'],
            'player_name' => ['required', 'string', 'min:4', 'max:32'],
            'comments' => ['required', 'string', 'max:1024'],
            'reporter_name' => ['required', 'string', 'min:4', 'max:32'],
            'reporter_email' => ['required', 'string', 'email'],
            'server_id' => ['required', Rule::in($servers_ids)],
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

    public function attributes()
    {
        return [
            trans('validation.attributes')
        ];
    }
}
