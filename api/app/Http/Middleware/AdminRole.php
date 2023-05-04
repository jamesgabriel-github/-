<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $role = $request->header('Role');
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
