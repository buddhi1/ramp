<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminRoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        // Check if the authenticated user has the "ADMIN" role
        if (Auth::check() && Auth::user()->hasRole('ADMIN')) {
            return $next($request);
        }

        // If not authorized, redirect or return an error response
        return abort(403, 'Unauthorized action.');
    }
}