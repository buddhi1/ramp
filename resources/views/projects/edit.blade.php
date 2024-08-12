@php
    $selectedAttributeIds = $project->attributes->pluck('id')->toArray();
    $attributes = App\Models\Attribute::all(); // Fetch all users from the database
    $attributeProps = [];
    $fleet_number = $project->fleet_number;
    foreach ($attributes as $attribute) {
        $attributeProps[$attribute->id] = $attribute->name;
    }
    $start_time = $project->start_time; // Example epoch timestamp
    $end_time = $project->end_time; // Example epoch timestamp
    $selectedStatus = $project->status;
    echo "<script>
                                                                    console.log('Debug Objects: " . $start_time . "');
                                                                    </script>";
    $statusProps = [
        'ACTIVE' => 'ACTIVE',
        'INACTIVE' => 'INACTIVE',
        'PENDING' => 'PENDING',
        'COMPLETE' => 'COMPLETE',
        // and so on...
    ];

    $downloadTypes = [
        'CSV' => 'CSV',
        'JSON' => 'JSON'
        // and so on...
    ];

    $typeProps = [
        'PUBLIC' => 'PUBLIC',
        'PRIVATE' => 'PRIVATE',
        // and so on...
    ];
@endphp
<script>
    document.addEventListener("DOMContentLoaded", function () {
        function decrement(e) {
            const target = e.target.parentNode.querySelector('input[type="number"]');
            let value = Number(target.value);
            if (value > 0) {
                value--;
                target.value = value;
            }
        }

        function increment(e) {
            const target = e.target.parentNode.querySelector('input[type="number"]');
            let value = Number(target.value);
            value++;
            target.value = value;
        }

        const decrementButtons = document.querySelectorAll('button[data-action="decrement"]');
        const incrementButtons = document.querySelectorAll('button[data-action="increment"]');

        decrementButtons.forEach(btn => {
            btn.addEventListener("click", decrement);
        });

        incrementButtons.forEach(btn => {
            btn.addEventListener("click", increment);
        });
    });
</script>
<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __($project->name) }}
        </h2>
    </x-slot>
    <div class="py-12">

        <div class="w-full mx-auto sm:px-6 lg:px-8 space-y-2">
            <div class="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                <div class="w-full">
                    <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Edit your project
                    </h2>
                    <form method="post" action="{{ route('projects.update', $project->id) }}" class="mt-6 space-y-6">
                        @csrf
                        @method('PUT')

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <x-input-label for="name" :value="__('Name')" />
                                <x-text-input id="name" name="name" type="text" class="mt-1 block w-full"
                                    value="{{ $project->name }}" required autofocus autocomplete="name" />
                                <x-input-error class="mt-2" :messages="$errors->get('name')" />
                            </div>

                            <div>
                                <x-input-label for="type" :value="__('Type')" />
                                <x-select-input name="type" id="type" class="mt-1 block w-full" :options="$typeProps"
                                    :selected="$project->type" />
                                <x-input-error class="mt-2" :messages="$errors->get('type')" />
                            </div>

                            <!-- <div class="grid grid-cols-2 gap-2"> -->
                            <div>
                                <x-input-label for="start_time" :value="__('Start Time')" />
                                <x-date-input id="start_time" name="start_time" :defaultValue="$start_time"
                                    class="mt-1 block w-full" />
                                <x-input-error :messages="$errors->get('start_time')" class="mt-2" />
                            </div>
                            <div>
                                <x-input-label for="end_time" :value="__('End Time')" />
                                <x-date-input id="end_time" name="end_time" :defaultValue="$end_time"
                                    class="mt-1 block w-full" />
                                <x-input-error :messages="$errors->get('end_time')" class="mt-2" />
                            </div>
                            <!-- </div> -->
                            <div>
                                <x-input-label for="irb_data" :value="__('Irb Data')" />
                                <x-text-input id="irb_data" name="irb_data" type="text" class="mt-1 block w-full"
                                    value="{{ $project->irb_data }}" />
                                <x-input-error :messages="$errors->get('irb_data')" class="mt-2" />
                            </div>

                            <div>
                                <x-input-label for="status" :value="__('Project Status')" />
                                <x-select-input name="status" id="status" class="mt-1 block w-full"
                                    :options="$statusProps" :selected="$selectedStatus" />
                                <x-input-error :messages="$errors->get('status')" class="mt-2" />
                            </div>
                            <div class="custom-number-input">
                                <x-input-label for="fleet_number" :value="__('Fleet Selection')" />
                                <div class="flex items-center h-10 w-full rounded-lg relative bg-transparent mt-1">
                                    <button type="button" data-action="decrement"
                                        class="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-10 rounded-l cursor-pointer outline-none">
                                        <span class="m-auto text-2xl font-thin">−</span>
                                    </button>
                                    <input type="number"
                                        class="outline-none focus:outline-none text-center w-full bg-gray-100 font-semibold text-md hover:text-black focus:text-black md:text-base flex items-center text-gray-700"
                                        name="fleet_number" value="{{ $fleet_number }}" min="0">
                                    <button type="button" data-action="increment"
                                        class="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-10 rounded-r cursor-pointer">
                                        <span class="m-auto text-2xl font-thin">+</span>
                                    </button>
                                </div>
                                <x-input-error :messages="$errors->get('fleet_number')" class="mt-2" />
                            </div>
                            <div>
                                <x-input-label for="select_attrbs[]" :value="__('Select Attributes')" />
                                <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                    {{ __('Define data policy for a project. Which data are available for a project..') }}
                                </p>
                                <x-custom-select-input name="select_attrbs[]" class="mt-1 block w-full"
                                    id="select_attrbs[]" :options="$attributeProps" :selected="$selectedAttributeIds" />
                                <x-input-error :messages="$errors->get('select_attrbs[]')" class="mt-2" />
                            </div>
                        </div>
                        <div class="flex items-end justify-end gap-2">
                            <div class="h-5">
                                <form method="post" action="{{ route('projects.edit', $project->id) }}" class="">
                                    @csrf
                                    @method('put')
                                    <x-primary-button>{{ __('Save') }}</x-primary-button>
                                </form>
                            </div>
                            <div class="h-5">
                                <form method="post" action="{{ route('projects.destroy', $project->id) }}" class="">
                                    @csrf
                                    @method('delete')
                                    <x-danger-button>{{ __('Delete') }}</x-danger-button>
                                </form>
                            </div>

                            @if (session('status') === 'project-updated')
                                <p x-data="{ show: true }" x-show="show" x-transition
                                    x-init="setTimeout(() => show = false, 2000)"
                                    class="text-sm text-gray-600 dark:text-gray-400">{{ __('Saved') }}</p>
                            @endif
                        </div>
                    </form>

                </div>
            </div>
        </div>
    </div>
    <div class="w-full mx-auto sm:px-6 lg:px-8 space-y-2 pb-12">
        <div class="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
            <div class="max-w-xl">
                <div class="">
                    <div>
                        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                            Map tool
                        </h2>
                    </div>

                </div>
                <div class="bg-gray-50 h-56 mt-3">
                </div>
            </div>
            <hr class="m-5"/>
            <form action="{{ route('projects.download', $project->id) }}" method="POST">
                @csrf
                <div class="my-5 flex">
                    <div class="w-[200px]">
                        <x-input-label for="file_type" :value="__('Select File Type')" />
                        <x-select-input name="file_type" id="file_type" class="mt-1 block w-full"
                            :options="$downloadTypes" />
                    </div>
                    <div class="mt-9 ml-4"><x-primary-button type="submit">{{ __('Download') }}</x-primary-button></div>
                    <div class="my-5 flex"></div>
            </form>
            @if (session('status') === 'download-error')
                <p x-data="{ show: true }" x-show="show" x-transition x-init="setTimeout(() => show = false, 2000)"
                    class="text-sm text-gray-600 dark:text-gray-400">{{ __('Error downloading your data.') }}</p>
            @endif

            @if (session('status') === 'download-success')
                <p x-data="{ show: true }" x-show="show" x-transition x-init="setTimeout(() => show = false, 2000)"
                    class="text-sm text-gray-600 dark:text-gray-400">{{ __('Download complete') }}</p>
            @endif
            <!-- </div> -->
        </div>
    </div>
</x-app-layout>