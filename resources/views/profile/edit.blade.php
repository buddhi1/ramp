<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Profile') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="w-full mx-auto sm:px-6 lg:px-8 space-y-6">
            <div class="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                <div class="max-w-xl">
                    @include('profile.partials.update-profile-information-form')
                </div>
            </div>

            <div class="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                <div class="max-w-xl">
                    @include('profile.partials.update-password-form')
                </div>
            </div>

            <div class="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                @if ($user->google2fa_secret)
                    <div class="max-w-xl">
                        <form class="form-horizontal" method="POST" action="{{ route('profile.disable2FA', $user->id) }}">
                            @csrf
                            <x-primary-button>{{ __('Disable 2FA') }}</x-primary-button>
                        </form>
                    </div>
                @else
                    <div class="max-w-xl">
                        <a href="/profile/enable2fa"><x-primary-button>{{ __('Enable 2FA') }}</x-primary-button></a>
                    </div>
                @endif
                
            </div>
        </div>
    </div>
</x-app-layout>