<?php

namespace App\Modules\User;

use App\Modules\User\UserFormRequest;
use App\Models\User;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Mail;
use App\Mail\MailNotify;

class Registration 
{
    public function log($string, UserFormRequest $request){
        echo($request);
        echo("Registration: ".$string);
    }
    public function register(RegistrationFormRequest $request){
        $url = $request->url;

        $user = User::create([
            'name' => $request['name'],
            'email' => $request['email'],
            'password' => bcrypt($request['password'])
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
}
