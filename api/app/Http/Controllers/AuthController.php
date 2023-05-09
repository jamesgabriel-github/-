<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Mail;
use App\Mail\MailNotify;

use App\Modules\User\RegistrationFormRequest;
use App\Modules\User\Authentication;
use App\Modules\User\AuthenticationFormRequest;
use App\Modules\User\LoginFormRequest;

class AuthController extends Controller
{
    // public function __construct(
    //     protected Authentication $authentication) { }
    //
    public function register(RegistrationFormRequest $request){
        return $request->register();
        // return $this->registration->register($request);

        // $url = $request->url;
        // $fields = $request->validate([
        //     'name' => 'required|string',
        //     'email' => 'required|string|unique:users,email',
        //     'password' => 'required|string|confirmed'
        // ]);

        // $user = User::create([
        //     'name' => $fields['name'],
        //     'email' => $fields['email'],
        //     'password' => bcrypt($fields['password'])
        // ]);

        // $token = $user->createToken('myapptoken')->plainTextToken;

        // $data = [
        //     'subject' => 'Test send mail',
        //     'body' => 'Email Verification Testing',
        //     'url' => $url.'?token='.$token
        // ];
        // try{
        //     Mail::to('james.g@agentsofvalue.com')->send(new MailNotify($data));
        //     // return response()->json(['Greate check you mail box']);
        // } catch(Exception $th){
        //     // return response()->json(['Something went wrong']);
        // }

        // $response = [
        //     'user' => $user,
        //     'token' => $token
        // ];
        // $response = [
        //     "url" => $request->url
        // ];

        // return response("OK", 201);
    }
    public function logout(AuthenticationFormRequest $request){
        // auth()->user()->tokens()->delete();
        // return [
        //     'message' => 'Logged out'
        // ];
        return $request->logout();
    }
    public function login(LoginFormRequest $request){
        // $fields = $request->validate([
        //     'email' => 'required|string',
        //     'password' => 'required|string'
        // ]);

        // $user = User::where('email',$request['email'])->first();

        // if(!$user || !Hash::check($request['password'], $user->password)){
        //     return response([
        //         'message' => 'Bad Credential'
        //     ], 401);
        // }

        // $token = $user->createToken('myapptoken')->plainTextToken;

        // $response = [
        //     'user' => $user,
        //     'token' => $token
        // ];

        // return response($response, 201);
        return $request->login();
    }
}
