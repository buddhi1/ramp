@php
    $users = App\Models\User::all(); // Fetch all users from the database
    $attributes = App\Models\Attribute::all(); // Fetch all users from the database
    $userProps = [];
    $attributeProps = [];

    foreach ($users as $user) {
        $userProps[$user->id] = $user->name;
    }

    foreach ($attributes as $attribute) {
        $attributeProps[$attribute->id] = $attribute->name;
    }
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
<section>
    <header>
        <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">
            {{ __('Create Project') }}
        </h2>
    </header>

    <form method="post" action="{{ route('projects.store') }}" class="mt-6 space-y-6">
        @csrf
        @method('post')

        <div>
            <x-input-label for="name" :value="__('Name')" />
            <x-text-input id="name" name="name" type="text" class="mt-1 block w-full" required autofocus autocomplete="name" />
            <x-input-error class="mt-2" :messages="$errors->get('name')" />
        </div>

        <div>
            <x-input-label for="type" :value="__('Type')" />
            <x-select-input name="type" id="type" class="mt-1 block w-full" :options="$typeProps" />
            <x-input-error class="mt-2" :messages="$errors->get('type')" />
        </div>

        <div>
            <x-input-label for="select_user" :value="__('Select User')" />
            <x-select-input name="select_user" id="select_user" class="mt-1 block w-full" :options="$userProps" />
            <x-input-error :messages="$errors->get('select_user')" class="mt-2" />
        </div>

        <div>
            <x-input-label for="select_attrbs[]" :value="__('Select Attributes')" />
            <x-custom-select-input name="select_attrbs[]" class="mt-1 block w-full" id="select_attrbs[]" :options="$attributeProps" />
            <x-input-error :messages="$errors->get('select_attrbs[]')" class="mt-2" />
        </div>

        <div>
            <x-input-label for="irb_data" :value="__('Irb Data')" />
            <x-text-input id="irb_data" name="irb_data" type="text" class="mt-1 block w-full" />
            <x-input-error :messages="$errors->get('irb_data')" class="mt-2" />
        </div>
        <div class="grid grid-cols-2 gap-2">
        <div>
            <x-input-label for="start_time" :value="__('Start Time')" />
            <x-date-input id="start_time" name="start_time" type="date" class="mt-1 block w-full" />
            <x-input-error :messages="$errors->get('start_time')" class="mt-2" />
        </div>
        <div>
            <x-input-label for="end_time" :value="__('End Time')" />
            <x-date-input id="end_time" name="end_time" type="date" class="mt-1 block w-full" />
            <x-input-error :messages="$errors->get('end_time')" class="mt-2" />
        </div>
        </div>
        <div>
            <x-input-label for="status" :value="__('Project Status')" />
            <x-select-input name="status" id="status" class="mt-1 block w-full" :options="$statusProps" />
            <x-input-error :messages="$errors->get('status')" class="mt-2" />
        </div>

        <div class="flex items-center gap-4">
            <x-primary-button>{{ __('Create Project') }}</x-primary-button>

            @if (session('status') === 'project-created')
                <p
                    x-data="{ show: true }"
                    x-show="show"
                    x-transition
                    x-init="setTimeout(() => show = false, 2000)"
                    class="text-sm text-gray-600 dark:text-gray-400"
                >{{ __('Project Created.') }}</p>
            @endif
        </div>
    </form>
</section>
