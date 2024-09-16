@php
   $userProps = [];
   $currentuser = Auth::user();

foreach ($users as $user) {
    if($currentuser->email !== $user->email){
    $userProps[] = [
        'name' => $user->name,
        'type' => $user->email,
        'role' => $user->roles[0]->name ?? 'USER',
        'status' => "ACTIVE",
        'action' => '<a href="'.route('users.edit', $user->id).'"><x-primary-button>Edit</x-primary-button></a>',
    ];
}
}
@endphp
<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Current Users') }} &nbsp; <a class="float-end" href="{{route('users.create')}}"><x-primary-button>{{ __('Create New User') }}</x-primary-button></a>
        </h2>
    </x-slot>
    <div class="py-12">
    <div class="w-full mx-auto lg:px-8 space-y-6">
            <div class="sm:p-0 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                <!-- <div class="max-w-xl"> -->
                <x-table :data="$userProps" :headers="['Name', 'Email', 'Role', 'Status', 'Actions']" />
                <!-- </div> -->
            </div>
        </div>
    </div>

</x-app-layout>
