<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __($project->name) }}
        </h2>
    </x-slot>
    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
            <div class="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                <div class="max-w-xl">
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
            <x-text-input id="type" name="type" type="text" class="mt-1 block w-full" value="{{ $project->type }}" required autofocus autocomplete="type" />
            <x-input-error class="mt-2" :messages="$errors->get('type')" />
        </div>

        <div>
            <x-input-label for="irb_data" :value="__('Irb Data')"  />
            <x-text-input id="irb_data" name="irb_data" type="text" class="mt-1 block w-full" value="{{ $project->irb_data }}" />
            <x-input-error :messages="$errors->get('irb_data')" class="mt-2" />
        </div>

        <div>
            <x-input-label for="status" :value="__('Project Status')" />
            <x-text-input id="status" name="status" type="text" class="mt-1 block w-full" value="{{ $project->status }}" />
            <x-input-error :messages="$errors->get('status')" class="mt-2" />
        </div>

        <div class="flex items-center gap-4">
        <form method="post" action="{{ route('projects.edit', $project->id) }}" class="p-6">
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
</x-app-layout>
