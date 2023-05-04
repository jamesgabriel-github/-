<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\personal_access_tokens;
use Laravel\Sanctum\PersonalAccessToken;

class AdminRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $unhashed_token = $request->header('Token');
        $token = PersonalAccessToken::findToken($unhashed_token);
        $user = $token->tokenable;
        $role = $user->role;
        // echo("user:");
        // echo($role);

        if($role != 'admin'){
            // return response()->json(['message' => 'Unauthorized'], 401);
            return response()->json([
                'status' => 401,
                'message' => 'Unauthorized'
            ], 401);
        }else{
            return $next($request);
        }
        // return $next($request);
    }
}
