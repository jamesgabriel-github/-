<?php

namespace App\Modules\User;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePersonFormRequest extends FormRequest
{
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
            'first_name' => 'required|string|max:191',
            'middle_name' => 'string|max:191',
            'last_name' => 'required|string|max:191',
        ];

        return $rules;
    }
}
