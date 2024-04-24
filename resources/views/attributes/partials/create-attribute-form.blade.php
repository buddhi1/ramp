<section>
    <header>
        <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">
            {{ __('Create attribute') }}
        </h2>
    </header>

    <form method="post" action="{{ route('attributes.store') }}" class="mt-6 space-y-6">
        @csrf
        @method('post')

        <div>
            <x-input-label for="name" :value="__('Name')" />
            <x-text-input id="name" name="name" type="text" class="mt-1 block w-full" required autofocus autocomplete="name" />
            <x-input-error class="mt-2" :messages="$errors->get('name')" />
        </div>

        <div>
            <x-input-label for="description" :value="__('Description')" />
            <x-text-input id="description" name="description" type="text" class="mt-1 block w-full" required autofocus autocomplete="description" />
            <x-input-error class="mt-2" :messages="$errors->get('description')" />
        </div>

        <div>
            <x-input-label for="data" :value="__('Data')" />
            <x-text-input id="data" name="data" type="text" class="mt-1 block w-full" required autofocus autocomplete="data" />
            <x-input-error class="mt-2" :messages="$errors->get('data')" />
        </div>

        <div class="flex items-center gap-4">
            <x-primary-button>{{ __('Create attribute') }}</x-primary-button>

            @if (session('status') === 'attribute-created')
                <p
                    x-data="{ show: true }"
                    x-show="show"
                    x-transition
                    x-init="setTimeout(() => show = false, 2000)"
                    class="text-sm text-gray-600 dark:text-gray-400"
                >{{ __('attribute Created.') }}</p>
            @endif
        </div>
    </form>
</section>


