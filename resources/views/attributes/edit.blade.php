<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __($attribute->name) }}
        </h2>
    </x-slot>
    <div class="py-12">
        
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-2">
            <div class="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                <div class="max-w-xl">
                <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Edit your attribute
        </h2>
    <form method="post" action="{{ route('attributes.update', $attribute->id) }}" class="space-y-2">
        @csrf
        @method('PUT')

        <div>
            <x-input-label for="name" :value="__('Name')" />
            <x-text-input id="name" name="name" type="text" class="mt-1 block w-full" value="{{ $attribute->name }}" required autofocus autocomplete="name" />
            <x-input-error class="mt-2" :messages="$errors->get('name')" />
        </div>

        <div>
            <x-input-label for="description" :value="__('Description')"  />
            <x-text-input id="description" name="description" type="text" class="mt-1 block w-full" value="{{ $attribute->description }}" />
            <x-input-error :messages="$errors->get('description')" class="mt-2" />
        </div>

        <div>
            <x-input-label for="data" :value="__('Attribute data')" />
            <x-text-input id="data" name="data" type="text" class="mt-1 block w-full" value="{{ $attribute->data }}" />
            <x-input-error :messages="$errors->get('data')" class="mt-2" />
        </div>

        <div class="flex items-center">
        <form method="post" action="{{ route('attributes.edit', $attribute->id) }}" class="">
        @csrf
            @method('put')
            <x-primary-button>{{ __('Save') }}</x-primary-button>
</form>
            <form method="post" action="{{ route('attributes.destroy', $attribute->id) }}" class="p-6">
            @csrf
            @method('delete')
            <x-danger-button type="submit">{{ __('Delete') }}</x-primary-button>
            </form>

            @if (session('status') === 'attribute-updated')
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
</div>
</div>
</div>
</div>
</x-app-layout>
