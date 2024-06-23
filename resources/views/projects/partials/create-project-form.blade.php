@php
    $users = App\Models\User::all();
    $attributes = App\Models\Attribute::all();
    $userProps = [];
    $attributeProps = [];
    $fleet_number = 0;
    $currentuser = Auth::user();
    if ($currentuser->hasRole('ADMIN')) {
        foreach ($users as $user) {
            $userProps[$user->id] = $user->name;
        }
    } else {
        $userProps[$currentuser->id] = $currentuser->name;

    }


    foreach ($attributes as $attribute) {
        $attributeProps[$attribute->id] = $attribute->name;
    }

    $statusProps = [
        'ACTIVE' => 'ACTIVE',
        'INACTIVE' => 'INACTIVE',
        'PENDING' => 'PENDING',
        'COMPLETE' => 'COMPLETE',
    ];

    $typeProps = [
        'PUBLIC' => 'PUBLIC',
        'PRIVATE' => 'PRIVATE',
    ];

    // Hardcoded scooter IDs for now
    $scooterIds = range(0, 9);
    $scooterProps = [];
    foreach ($scooterIds as $id) {
        $scooterProps[$id] = "Scooter $id";
    }
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

<section class="bg-white p-6 rounded-md">
    <header class="mb-4">
        <h2 class="text-xl font-bold text-gray-900 dark:text-gray-100">
            {{ __('Create Project') }}
        </h2>
        <div class="w-fill h-1 bg-gray-300 mt-2"> </div>
    </header>

    <form method="post" action="{{ route('projects.store') }}" class="space-y-6">
        @csrf
        @method('post')

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <x-input-label for="name" :value="__('Name')" />
                <x-text-input id="name" name="name" type="text"
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm" required autofocus
                    autocomplete="name" />
                <x-input-error class="mt-2" :messages="$errors->get('name')" />
            </div>

            <div>
                <x-input-label for="type" :value="__('Type')" />
                <x-select-input name="type" id="type"
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm" :options="$typeProps" />
                <x-input-error class="mt-2" :messages="$errors->get('type')" />
            </div>

            <div>
                <x-input-label for="select_user" :value="__('Select User')" />
                <x-select-input name="select_user" id="select_user"
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm" :options="$userProps" />
                <x-input-error :messages="$errors->get('select_user')" class="mt-2" />
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
                        name="fleet_number" value="0" min="0">
                    <button type="button" data-action="increment"
                        class="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-10 rounded-r cursor-pointer">
                        <span class="m-auto text-2xl font-thin">+</span>
                    </button>
                </div>
                <x-input-error :messages="$errors->get('fleet_number')" class="mt-2" />
            </div>

            <div>
                <x-input-label for="irb_data" :value="__('IRB Data')" />
                <x-text-input id="irb_data" name="irb_data" type="text"
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm" />
                <x-input-error :messages="$errors->get('irb_data')" class="mt-2" />
            </div>

            <div>
                <x-input-label for="status" :value="__('Project Status')" />
                <x-select-input name="status" id="status"
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm" :options="$statusProps" />
                <x-input-error :messages="$errors->get('status')" class="mt-2" />
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
                <x-input-label for="start_time" :value="__('Start Time')" />
                <x-text-input id="start_time" name="start_time" type="datetime-local"
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm" required />
                <x-input-error class="mt-2" :messages="$errors->get('start_time')" />
            </div>

            <div>
                <x-input-label for="end_time" :value="__('End Time')" />
                <x-text-input id="end_time" name="end_time" type="datetime-local"
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm" required />
                <x-input-error class="mt-2" :messages="$errors->get('end_time')" />
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
                <x-input-label for="select_attrbs[]" :value="__('Select Attributes')" />
                <x-custom-select-input name="select_attrbs[]"
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm" id="select_attrbs[]"
                    :options="$attributeProps" />
                <x-input-error :messages="$errors->get('select_attrbs[]')" class="mt-2" />
            </div>


            <!-- <div class="cursor-none">
                <x-input-label for="scooters" :value="__('Select Scooters')" />
                <x-custom-select-input name="scooters[]"
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm" id="scooters[]"
                    :options="$scooterProps" multiple />
                <x-input-error :messages="$errors->get('scooters[]')" class="mt-2" />
            </div> -->
        </div>

        <div class="flex items-right justify-end gap-4 mt-6">
            <x-primary-button type="submit">{{ __('Create Project') }}</x-primary-button>

            @if (session('status') === 'project-created')
                <p x-data="{ show: true }" x-show="show" x-transition x-init="setTimeout(() => show = false, 2000)"
                    class="text-sm text-gray-600 dark:text-gray-400">{{ __('Project Created.') }}</p>
            @endif
        </div>
    </form>
</section>