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
            <x-text-input id="type" name="type" type="text" class="mt-1 block w-full" required autofocus autocomplete="type" />
            <x-input-error class="mt-2" :messages="$errors->get('type')" />
        </div>

        <div>
            <x-input-label for="status" :value="__('Project Status')" />
            <x-text-input id="status" name="status" type="text" class="mt-1 block w-full" />
            <x-input-error :messages="$errors->get('status')" class="mt-2" />
        </div>

        <div>
            <x-input-label for="irb_data" :value="__('irb_data')" />
            <x-text-input id="irb_data" name="irb_data" type="text" class="mt-1 block w-full" />
            <x-input-error :messages="$errors->get('irb_data')" class="mt-2" />
        </div>

        <div>
            <x-input-label for="status" :value="__('Project Status')" />
            <x-text-input id="status" name="status" type="text" class="mt-1 block w-full" />
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
