<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PollValidationRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'expires_at' => 'required|date|after:now',
            'options' => 'required|array|min:2',
            'options.*' => 'required|string|distinct|max:255',
        ];
    }

    public function attributes()
    {
        return [
            'options.*' => 'Options',
        ];
    }
}
