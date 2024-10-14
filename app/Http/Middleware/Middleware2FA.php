<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class Middleware2FA
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (auth()->check() && auth()->user()->google2fa_secret) {

            // Check if the user has already verified 2FA
            if (!$request->session()->get('2fa_verified', false)) {
                // Redirect to the 2FA verification page if not verified
                return redirect()->route('profile.show2FAVerifyForm');
            }
        }
        return $next($request);
    }
}
