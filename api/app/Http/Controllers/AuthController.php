<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Mail;
use App\Mail\MailNotify;

class AuthController extends Controller
{
    //
    public function register(Request $request){
        $url = $request->url;
        $fields = $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|unique:users,email',
            'password' => 'required|string|confirmed'
        ]);

        $user = User::create([
            'name' => $fields['name'],
            'email' => $fields['email'],
            'password' => bcrypt($fields['password'])
        ]);

        $token = $user->createToken('myapptoken')->plainTextToken;

        $data = [
            'subject' => 'Test send mail',
            'body' => 'Email Verification Testing',
            'url' => $url.'?token='.$token
        ];
        try{
            Mail::to('james.g@agentsofvalue.com')->send(new MailNotify($data));
            // return response()->json(['Greate check you mail box']);
        } catch(Exception $th){
            // return response()->json(['Something went wrong']);
        }

        $response = [
            'user' => $user,
            'token' => $token
        ];
        // $response = [
        //     "url" => $request->url
        // ];

        return response($response, 201);
    }
    public function logout(Request $request){
        auth()->user()->tokens()->delete();
        return [
            'message' => 'Logged out'
        ];
    }
    public function login(Request $request){
        $fields = $request->validate([
            'email' => 'required|string',
            'password' => 'required|string'
        ]);

        $user = User::where('email',$fields['email'])->first();

        if(!$user || !Hash::check($fields['password'], $user->password)){
            return response([
                'message' => 'Bad Credential'
            ], 401);
        }

        $token = $user->createToken('myapptoken')->plainTextToken;

        $response = [
            'user' => $user,
            'token' => $token
        ];

        return response($response, 201);
    }
}
