@php
   $attrbsProps = [];

foreach ($attributes as $attrb) {
    $attrbsProps[] = [
        'name' => $attrb->name,
        'description' => $attrb->description,
        'data' => $attrb->data,
        'action' => '<a href="'.route('attributes.edit', $attrb->id).'"><x-primary-button>Edit</x-primary-button></a>',
    ];
}
@endphp
<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Current Attribute') }} &nbsp; <a class="float-end" href="{{route('attributes.create')}}"><x-primary-button>{{ __('Create New Attribute') }}</x-primary-button></a>
        </h2>
    </x-slot>
    <div class="py-12">
    <div class="w-full mx-auto lg:px-8 space-y-6">
            <div class="sm:p-0 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                <!-- <div class="max-w-xl"> -->
                <x-table :data="$attrbsProps" :headers="['Name', 'Description', 'Data', 'Actions']" />
                <!-- </div> -->
            </div>
        </div>
    </div>

</x-app-layout>