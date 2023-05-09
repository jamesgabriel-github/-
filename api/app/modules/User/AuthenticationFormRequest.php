<?php

namespace App\Modules\User;

use Illuminate\Foundation\Http\FormRequest;

class AuthenticationFormRequest extends FormRequest
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

    public function prepareForValidation()
    {
        $this->merge([
            // "content_type" => $this->headers->get("Content-type"),
            "token" => $this->bearerToken(),
        ]);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        // echo($this->bearerToken());
        return [
            "token" => "required",
        ];
    }
    public function logout(){
        return $this->authentication->logout($this);
    }
}
