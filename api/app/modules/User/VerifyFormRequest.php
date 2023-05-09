<?php

namespace App\Modules\User;

use Illuminate\Foundation\Http\FormRequest;

class VerifyFormRequest extends FormRequest
{
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
            "token" => $this->token,
        ]);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            "token" => "required",
        ];
    }
}
