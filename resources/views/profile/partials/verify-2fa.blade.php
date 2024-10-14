<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Set Up Google Authenticator') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="w-full mx-auto sm:px-6 lg:px-8 space-y-6">
            <div class="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                <div class="max-w-xl">
                    <form class="form-horizontal" method="POST" action="{{ route('profile.verify2FA') }}">
                        {{ csrf_field() }}

                        <div class="form-group">
                            <p>Please enter the <strong>OTP</strong> generator on your Authenticator App
                                <br>Ensure you submit the current one because it refreshes every 30 seconds
                            </p>
                            <label for="one_time_password" class="col-md-4 control-label">One Time Password</label>
                            <div class="col-md-6">
                                <input id="one_time_password" type="number" class="form-control"
                                    name="one_time_password" required autofocus>
                            </div>
                        </div>
                        @if ($errors->has('2fa_code'))
                            <div class="alert alert-danger">
                                {{ $errors->first('2fa_code') }}
                            </div>
                        @endif

                        <button type="submit" class="btn btn-primary">
                            Verify
                        </button>
                    </form>
                    <div>
                    </div>
                </div>
            </div>
        </div>
</x-app-layout>