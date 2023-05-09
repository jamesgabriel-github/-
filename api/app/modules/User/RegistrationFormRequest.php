<?php

namespace App\Modules\User;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\User;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Mail;
use App\Mail\MailNotify;
use App\Modules\User\Registration;

class RegistrationFormRequest extends FormRequest
{
    public function __construct(
        protected Registration $registration) { }
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }
    public function prepareForValidation()
    {
        $this->merge([
            // "content_type" => $this->headers->get("Content-type"),
            "url" => $this->url,
        ]);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        $rules = [
            'name' => 'required|string',
            'password' => 'required|string|confirmed',
            'email' => 'required|string|unique:users,email',
            'url' => 'required|string'
        ];

        // if($this->getMethod() == "POST"){
        //     $rules += [
        //         'email' => 'required|string|unique:users,email',
        //         'url' => 'required|string'
        //     ];
        // }
        // echo($this->getMethod());
        // $rules = [];
        return $rules;
    }

    public function register(){
        return $this->registration->register($this);
    }
}
