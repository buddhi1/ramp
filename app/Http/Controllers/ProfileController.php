<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Redirect;
use Illuminate\View\View;
use PragmaRX\Google2FALaravel\Google2FA;

class ProfileController extends Controller
{

    public function show2FAVerifyForm()
    {
        return view('profile.partials.verify-2fa');
    }

    public function verify2FA(Request $request)
    {
        $user = auth()->user();
        $google2fa = app('pragmarx.google2fa');

        // Verify the code the user entered
        $valid = $google2fa->verifyKey($user->google2fa_secret, $request->input('one_time_password'));

        if ($valid) {
            // Mark 2FA as verified for this session
            $request->session()->put('2fa_verified', true);

            return redirect()->intended('/dashboard');
        }

        return redirect()->back()->withErrors(['2fa_code' => 'The provided 2FA code is invalid.']);
    }

    public function enable2FA(Request $request)
    {
        $user = auth()->user();

        // Generate a new secret key
        $google2fa = app('pragmarx.google2fa');
        $user->google2fa_secret = $google2fa->generateSecretKey();
        $user->save();

        // Generate the QR code URL for Google Authenticator
        $qrCodeImage = $google2fa->getQRCodeInline(
            config('Scooter Lab'),
            $user->email,
            $user->google2fa_secret
        );

        return view('profile.partials.enable-2fa', ['QR_Image' => $qrCodeImage, 'secret' => $user->google2fa_secret]);
    }

    public function disable2FA(Request $request, $userId)
    {
        $user = auth()->user();
        $userToDisable = User::findOrFail($userId);
        if ($user->id !== $userId) {
            if (Gate::denies('create-user')) {
                abort(401, 'Unauthotized');
            } else {
                $userToDisable->google2fa_secret = null;
                $userToDisable->save();
                return Redirect::to('/users');
            }
        } else {
            $user->google2fa_secret = null;
            $user->save();
            $request->session()->forget('2fa_verified');

            return redirect()->route('profile.edit')->with('success', 'Two-factor authentication disabled.');
        }
    }

    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): View
    {
        return view('profile.edit', [
            'user' => $request->user(),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit')->with('status', 'profile-updated');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request, $userId): RedirectResponse
    {
        $request->validateWithBag('userDeletion', [
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();
        $userToDelete = User::findOrFail($userId);

        if ($user->id !== $userToDelete->id) {
            // Check if the current user is an admin
            if (Gate::denies('create-user')) {
                abort(401, 'Unauthotized');
            } else {
                $userToDelete->delete();
                return Redirect::to('/dashboard');
            }
        } else {
            Auth::logout();

            $userToDelete->delete();

            $request->session()->invalidate();
            $request->session()->regenerateToken();

            return Redirect::to('/');
        }
    }
}
