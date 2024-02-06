@php
   $projectProps = [];

foreach ($projects as $project) {
    $projectProps[] = [
        'name' => $project->name,
        'type' => $project->type,
        'status' => $project->status,
        'action' => '<a href="'.route('projects.edit', $project->id).'"><x-primary-button>Edit</x-primary-button></a>',
    ];
}
@endphp
<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Current Projects') }} &nbsp; <a class="float-end" href="{{route('projects.create')}}"><x-primary-button>{{ __('Create New Project') }}</x-primary-button></a>
        </h2>
    </x-slot>
    <div class="py-12">
    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
            <div class="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                <div class="max-w-xl">
                <x-table :data="$projectProps" :headers="['Name', 'Type', 'Status', 'Actions']" />
                </div>
            </div>
        </div>
    </div>

</x-app-layout>
