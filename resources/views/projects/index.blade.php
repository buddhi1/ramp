@php
   $projectProps = [];
   
foreach ($projects as $project) {
    $bgColor = $project->status === 'ACTIVE' ? 'bg-green-800' : 'bg-red-800';
    $projectProps[] = [
        'name' => $project->name,
        'type' => $project->type,
        'status' => '<div class="' . $bgColor . ' w-fit rounded-xl text-white px-2 lowercase">' . $project->status . '</div>',
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
    <div class="w-full mx-auto lg:px-8 space-y-6">
            <div class="sm:p-0 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                <!-- <div class="max-w-xl"> -->
                <x-table :data="$projectProps" :headers="['Name', 'Type', 'Status', 'Actions']" />
                <!-- </div> -->
                <div class="m-4">
                    {{ $projects->links() }}
                </div>
            </div>
        </div>
    </div>

</x-app-layout>
