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
                    <div>
                        {!! $QR_Image !!}
                    </div>
                    <p>Scan the QR code with your Google Authenticator App</p>
                    <div><a href="{{ route('profile.edit') }}"><x-primary-button>Complete</x-primary-button></a></div>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>