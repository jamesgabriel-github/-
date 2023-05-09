<?php

namespace App\Modules\User;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Response;

class Authentication 
{
    public function log($string){
        echo("Authentication: ".$string);
    }
    public function login(LoginFormRequest $request){
        $user = User::where('email',$request['email'])->first();

        if(!$user || !Hash::check($request['password'], $user->password)){
            return response([
                'message' => 'Bad Credential'
            ], 401);
        }

        // $token = $user->createToken('myapptoken')->plainTextToken;
        $token = $this->create_token($user);

        $response = [
            'user' => $user,
            'token' => $token,
            // 'message' => 'from dependency injection'
        ];

        return response($response, 201);
    }
    private function create_token(User $user){
        if($user)
            return $user->createToken('myapptoken')->plainTextToken;

        return null;
    }
    public function logout(AuthenticationFormRequest $request){
        auth()->user()->tokens()->delete();
        return [
            'message' => 'Logged out'
        ];
    }
}
