<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class AttachRoleToUser
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (Auth::check()) {
            $user = Auth::user();

            // Check if the role is not already attached
            if (!isset($user->role)) {
                // Get the user's role (assuming roles relationship exists)
                $user->role = $user->roles[0]; // Attach the first role to the user object

                // Optionally store the role in the session for later use
                session(['user_role' => $user->role->name]);
            }
        }

        // Proceed with the request
        return $next($request);
    }
}
