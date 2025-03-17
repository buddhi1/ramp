@php
   $userProps = [];
   $currentuser = Auth::user();

foreach ($users as $user) {
    if($currentuser->email !== $user->email){
        // Start the 'project' field with the initial dropdown HTML structure
            $projectSelect = '<div class="mb-3">
                <label for="projectSelect" class="form-label">Assi projects:</label>
                <select id="projectSelect" name="project_ids[]" class="form-select" multiple>';

            // Loop through projects and append each option dynamically
            foreach ($projects as $project) {
                $projectSelect .= '<option value="' . $project->id . '">' . $project->name . '</option>';
            }

            // Close the select element
            $projectSelect .= '</select></div>';

    $userProps[] = [
        'name' => $user->name,
        'type' => $user->email,
        'role' => $user->roles[0]->name ?? 'USER',
        'status' => $user->email_verified_at ? 'Verified' : 'Unverified',
        'action' => '<a href="'.route('users.edit', $user->id).'"><x-primary-button>Edit</x-primary-button></a>',
        'project' => $projectSelect,
    ];
}
}
@endphp
<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Current Users') }} &nbsp; <a class="float-end" href="{{route('register')}}"><x-primary-button>{{ __('Create New User') }}</x-primary-button></a>
        </h2>
    </x-slot>
    
    <div class="py-12">
    <div class="w-full mx-auto lg:px-8 space-y-6">
            <div class="sm:p-0 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                <!-- <div class="max-w-xl"> -->
                <x-table :data="$userProps" :headers="['Name', 'Email', 'Role', 'Status', 'Actions', 'Projects']" />
                <!-- </div> -->
            </div>
        </div>
    </div>

</x-app-layout>
