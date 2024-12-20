<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>{{ config('app.name', 'Laravel') }}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!-- Scripts -->
        @vite(['resources/css/app.css', 'resources/js/app.js'])
    </head>
    <body class="font-sans text-gray-900 antialiased">
        <div class="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100 dark:bg-gray-900">
            <div>
                <a href="/">
                    <x-application-logo class="w-20 h-20 fill-current text-gray-500" />
                </a>
            </div>

            <div class="w-full sm:max-w-lg mt-6 px-6 py-4 bg-white dark:bg-gray-800 shadow-md overflow-hidden sm:rounded-lg">
            <form class="" method="POST" action="{{ route('profile.verify2FA') }}">
                        {{ csrf_field() }}
                        @if ($errors->has('2fa_code'))
                            <div class="alert alert-danger my-2">
                                {{ $errors->first('2fa_code') }}
                            </div>
                        @endif
                        <div class="form-group">
                            <p class="text-center pb-2">Please enter the <strong>OTP</strong> generated on your Authenticator App
                                <!-- <br>Ensure you submit the current one because it refreshes every 30 seconds -->
                            </p>
                            <div class="flex items-center justify-center flex-col">
                            <label for="one_time_password" class="col-md-4 control-label">One Time Password</label>
                            <div class="col-md-6 flex items-center">
                                <input id="one_time_password" type="number" class="form-control rounded"
                                    name="one_time_password" required autofocus>
                            </div>
                            </div>
                        </div>
                        <div class="flex justify-center items-center pt-2">
                        <button type="submit" class="btn btn-primary text-center">
                            Verify
                        </button>
                        </div>
                    </form>
                    <p class="text-center mt-2">If you are having problem logging in, contact <strong>scooterlab@utsa.edu</strong></p>
            </div>
        </div>
    </body>
</html>