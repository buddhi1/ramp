@php
   $attrbsProps = [];

foreach ($attributes as $attrb) {
    $dataDivs = ''; // Initialize a string to store the div elements for each data item

       // Check if the data is not empty and loop through it
       if (!empty($attrb->data)) {
           $dataItems = json_decode($attrb->data); // Decode the JSON data
           foreach ($dataItems as $dataItem) {
               // Create a div for each data item
               $dataDivs .= '<div class="data-item">' . htmlspecialchars($dataItem) . '</div>';
           }
       }
    $attrbsProps[] = [
        'name' => $attrb->name,
        'description' => $attrb->description,
        'data' => $dataDivs,
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