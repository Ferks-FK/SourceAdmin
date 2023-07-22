<?php

namespace App\Http\Requests\Appeal;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class AppealCreateRequest extends FormRequest
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
            'player_steam_id' => ['nullable', 'string', 'regex:/^(STEAM_[0-5]:[0-1]:\d+|\d{17})$/'],
            'player_ip' => ['string', 'nullable', 'ipv4'],
            'player_name' => ['required', 'string', 'min:4', 'max:32'],
            'player_email' => ['required', 'string', 'email'],
            'reason' => ['required', 'string', 'max:1024']
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
