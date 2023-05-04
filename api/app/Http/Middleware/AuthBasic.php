<?php

namespace App\Http\Middleware;

use App\Models\people;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;
use App\Models\personal_access_tokens;

class AuthBasic
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $personal_access_tokens = personal_access_tokens::all()->last();
        echo($personal_access_tokens);
        if(Auth::onceBasic()){

            return response()->json(['message' => 'Auth Failed'], 401);
        }else{
            return $next($request);
        }
        // return $next($request);
    }
}
