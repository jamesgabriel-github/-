<?php

namespace App\Modules\User;

use Illuminate\Foundation\Http\FormRequest;
use App\Modules\User\Authentication;

class LoginFormRequest extends FormRequest
{
    public function __construct(
        protected Authentication $authentication) { }
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        $rules = [
            'email' => 'required|string',
            'password' => 'required|string'
        ];

        return $rules;
    }
    public function login(){
        return $this->authentication->login($this);
    }
}
