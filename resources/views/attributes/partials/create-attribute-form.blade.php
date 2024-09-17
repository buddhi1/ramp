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
            <div id="data-wrapper">
                @if (isset($attribute) && is_array($attribute->data))
                    @foreach ($attribute->data as $data)
                        <div class="flex gap-3 mt-2">
                            <x-text-input name="data[]" type="text" value="{{ $data }}" class="mt-1 block w-full" readonly />
                            <x-primary-button type="button" class="remove-data-btn">{{ __('-') }}</x-primary-button>
                        </div>
                    @endforeach
                @endif
            </div>
            

            <div class="flex gap-3 mt-2">
                <x-text-input id="new-data" type="text" class="mt-1 block w-full" placeholder="Enter new value" />
                <x-primary-button type="button" id="add-data-btn">{{ __('+') }}</x-primary-button>
            </div>
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
                >{{ __('Attribute Created.') }}</p>
            @endif
        </div>
    </form>
</section>

<script>
    document.addEventListener('DOMContentLoaded', function () {
        const dataWrapper = document.getElementById('data-wrapper');
        const newDataInput = document.getElementById('new-data');

        document.getElementById('add-data-btn').addEventListener('click', function () {
            const newValue = newDataInput.value.trim();

            if (newValue !== '') {
                const newInputDiv = document.createElement('div');
                newInputDiv.classList.add('flex', 'gap-3', 'mt-2');
                newInputDiv.innerHTML = `
                    <x-text-input name="data[]" type="text" value="${newValue}" class="mt-1 block w-full" readonly />
                    <x-primary-button type="button" class="remove-data-btn">{{ __('-') }}</x-primary-button>
                `;

                dataWrapper.appendChild(newInputDiv);

                newInputDiv.querySelector('.remove-data-btn').addEventListener('click', function () {
                    dataWrapper.removeChild(newInputDiv);
                });

                newDataInput.value = '';
            }
        });

        document.querySelectorAll('.remove-data-btn').forEach(function (btn) {
            btn.addEventListener('click', function () {
                const inputDiv = btn.parentElement;
                dataWrapper.removeChild(inputDiv);
            });
        });
    });
</script>
