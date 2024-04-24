@php
$selectedAttributeIds = $project->attributes->pluck('id')->toArray();
    $attributes = App\Models\Attribute::all(); // Fetch all users from the database
    $attributeProps = [];
    foreach ($attributes as $attribute) {
        $attributeProps[$attribute->id] = $attribute->name;
    }
    $start_time = $project->start_time; // Example epoch timestamp
    $end_time = $project->end_time; // Example epoch timestamp
    $selectedStatus = $project->status;
    echo "<script>console.log('Debug Objects: " . $start_time . "' );</script>";
    $statusProps = [
    'ACTIVE' => 'ACTIVE',
    'INACTIVE' => 'INACTIVE',
    'PENDING' => 'PENDING',
    'COMPLETE' => 'COMPLETE',
    // and so on...
];

$typeProps = [
    'PUBLIC' => 'PUBLIC',
    'PRIVATE' => 'PRIVATE',
    // and so on...
];
@endphp
<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __($project->name) }}
        </h2>
    </x-slot>
    <div class="py-12">
        
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-2">
            <div class="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                <div class="max-w-xl">
                <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Edit your project
        </h2>
    <form method="post" action="{{ route('projects.update', $project->id) }}" class="mt-6 space-y-6">
        @csrf
        @method('PUT')

        <div>
            <x-input-label for="name" :value="__('Name')" />
            <x-text-input id="name" name="name" type="text" class="mt-1 block w-full" value="{{ $project->name }}" required autofocus autocomplete="name" />
            <x-input-error class="mt-2" :messages="$errors->get('name')" />
        </div>

        <div>
            <x-input-label for="type" :value="__('Type')" />
            <x-select-input name="type" id="type" class="mt-1 block w-full" :options="$typeProps" :selected="$project->type" />
            <x-input-error class="mt-2" :messages="$errors->get('type')" />
        </div>

        <div>
            <x-input-label for="select_attrbs[]" :value="__('Select Attributes')" />
            <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
                {{ __('Define data policy for a project. Which data are available for a project..') }}
            </p>
            <x-custom-select-input name="select_attrbs[]" class="mt-1 block w-full" id="select_attrbs[]" :options="$attributeProps" :selected="$selectedAttributeIds" />
            <x-input-error :messages="$errors->get('select_attrbs[]')" class="mt-2" />
        </div>

        <div>
            <x-input-label for="irb_data" :value="__('Irb Data')"  />
            <x-text-input id="irb_data" name="irb_data" type="text" class="mt-1 block w-full" value="{{ $project->irb_data }}" />
            <x-input-error :messages="$errors->get('irb_data')" class="mt-2" />
        </div>

        <div class="grid grid-cols-2 gap-2">
        <div>
            <x-input-label for="start_time" :value="__('Start Time')" />
            <x-date-input id="start_time" name="start_time" :defaultValue="$start_time" class="mt-1 block w-full" />
            <x-input-error :messages="$errors->get('start_time')" class="mt-2" />
        </div>
        <div>
            <x-input-label for="end_time" :value="__('End Time')" />
            <x-date-input id="end_time" name="end_time" :defaultValue="$end_time" class="mt-1 block w-full" />
            <x-input-error :messages="$errors->get('end_time')" class="mt-2" />
        </div>
        </div>

        <div>
            <x-input-label for="status" :value="__('Project Status')" />
            <x-select-input name="status" id="status" class="mt-1 block w-full" :options="$statusProps" :selected="$selectedStatus" />
            <x-input-error :messages="$errors->get('status')" class="mt-2" />
        </div>

        <div class="flex items-center">
        <form method="post" action="{{ route('projects.edit', $project->id) }}" class="">
        @csrf
            @method('put')
            <x-primary-button>{{ __('Save') }}</x-primary-button>
</form>
            <form method="post" action="{{ route('projects.destroy', $project->id) }}" class="p-6">
            @csrf
            @method('delete')
            <x-danger-button type="submit">{{ __('Delete') }}</x-primary-button>
            </form>

            @if (session('status') === 'project-updated')
                <p
                    x-data="{ show: true }"
                    x-show="show"
                    x-transition
                    x-init="setTimeout(() => show = false, 2000)"
                    class="text-sm text-gray-600 dark:text-gray-400"
                >{{ __('Saved') }}</p>
            @endif
        </div>
    </form>

</div>
            </div>
        </div>
    </div>
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-2 pb-12">
            <div class="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                <div class="max-w-xl">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Map tool
        </h2>
        <div class="bg-gray-50 h-56 w-full mt-3">
</div>
</div>
</div>
</div>
</x-app-layout>
