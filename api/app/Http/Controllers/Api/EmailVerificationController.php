<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Auth\Events\Verified;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Carbon\Carbon;
use Laravel\Sanctum\PersonalAccessToken;
use Mail;
use App\Mail\MailNotify;
use Illuminate\Support\Facades\View;


class EmailVerificationController extends Controller
{
    //
    public function sendVerificationEmail(Request $request){
        if($request->user()->hasVerifiedEmail()){
            return [
                'message' => 'Already Verfiied'
            ];
        }
        $request->user()->sendEmailVerificationNotification();

        return ['status' => 'verification-link-sent'];
    }

    public function verify(EmailVerificationRequest $request){
        if($request->user()->hasVerifiedEmail()){
            return [
                'message' => 'Email already verified'
            ];
        }

        if($request->user()->markEmailAsVerified()){
            event(new Verified($request->user()));
        }

        return[
            'message' => 'Email has been verified'
        ];
    }

    public function customVerify(Request $request){
        $unhashed_token = $request->token;
        if(!$unhashed_token){
            return response()->json([
                'status' => 500,
                'message' => 'Token must not be null'
            ], 500);
        }

        $token = PersonalAccessToken::findToken($unhashed_token);
        if(!$token){
            return response()->json([
                'status' => 500,
                'message' => 'Invalid Token'
            ], 500);
        }
        // $user = $token->tokenable;
        $id = $token->tokenable->id;
        $user = User::find($id);
        if(!$user){
            return response()->json([
                'status' => 404,
                'message' => 'No Such User Found!'
            ], 404);
        }
        if($user->email_verified_at){
            return response()->json([
                'status' => 200,
                'message' => 'Email already verified'
            ], 200);
        }
        $current_date_time = Carbon::now()->toDateTimeString();
        // echo($current_date_time);
        $user->update([
            'email_verified_at' => $current_date_time
        ]);
        return response()->json([
            'status' => 200,
            'message' => 'Email has been verified'
        ], 200);
        // return $next($request);
    }

    public function sendMail(Request $request){
        $data = [
            'subject' => 'Test send mail',
            'body' => 'Email Verification Testing',
            'url' => 'http://localhost:3000/'
        ];
        try{
            Mail::to('james.g@agentsofvalue.com')->send(new MailNotify($data));
            return response()->json(['Greate check you mail box']);
        } catch(Exception $th){
            return response()->json(['Something went wrong']);
        }
    }

    public function sendMailConfirmation(Request $request){
        $data = [
            'success' => 'true',
            'message' => 'SUCCESSFULLY VERIFIED',
        ];
        return view('emails.verified')->with('data', $data);;
    }
}
