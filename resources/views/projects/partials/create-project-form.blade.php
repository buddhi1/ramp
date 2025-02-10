@php
    $users = App\Models\User::all();
    $attributes = App\Models\Attribute::all();
    $userProps = [];
    $attributeProps = [];
    $fleet_number = 0;
    $currentuser = Auth::user();
    if ($currentuser->isAdmin()) {
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

    $daysOfWeek = [
        'monday' => 'Monday',
        'tuesday' => 'Tuesday',
        'wednesday' => 'Wednesday',
        'thursday' => 'Thursday',
        'friday' => 'Friday',
        'saturday' => 'Saturday',
        'sunday' => 'Sunday',
    ];
@endphp

<html>
<head>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.13.1/css/bootstrap-select.css" />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.13.1/js/bootstrap-select.min.js"></script>
    <style>
        .time-slot {
            display: none;
        }
        .time-slot.active {
            display: block;
        }

        .schedule-container {
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 0.5rem;
            padding: 0.5rem;
        }

        .day-row {
            display: flex;
            align-items: center;
            padding: 0.75rem;
            border-bottom: 1px solid #e2e8f0;
            transition: all 0.2s;
        }

        .day-row:last-child {
            border-bottom: none;
        }

        .day-row:hover {
            background: #ffffff;
        }

        .day-checkbox-wrapper {
            display: flex;
            align-items: center;
            min-width: 150px;
        }

        .day-checkbox {
            width: 1.2rem;
            height: 1.2rem;
            margin-right: 0.75rem;
            cursor: pointer;
        }

        .day-label {
            font-weight: 500;
            color: #1a202c;
        }

        .time-slot {
            display: none;
            flex-grow: 1;
            transition: all 0.3s ease;
        }

        .time-slot.active {
            display: flex;
            gap: 1rem;
        }

        .time-input-wrapper {
            position: relative;
            flex: 1;
        }

        .time-input {
            width: 100%;
            padding: 0.5rem;
            border: 1px solid #e2e8f0;
            border-radius: 0.375rem;
            background: #ffffff;
        }

        .time-label {
            font-size: 0.875rem;
            color: #4a5568;
            margin-bottom: 0.25rem;
        }

        /* Optional: Add some visual feedback for disabled state */
        .day-row.disabled {
            opacity: 0.6;
        }

        .schedule-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            cursor: pointer;
            padding: 0.75rem 0;
        }

        .schedule-header:hover {
            opacity: 0.8;
        }

        .collapse-icon {
            transition: transform 0.3s ease;
        }

        .collapse-icon.collapsed {
            transform: rotate(-180deg);
        }

        .schedule-content {
            max-height: 1000px;
            overflow: hidden;
            transition: max-height 0.3s ease-in-out;
        }

        .schedule-content.collapsed {
            max-height: 0;
        }

        /* Optional: Add some styling for the chevron icon */
        .chevron-icon {
            width: 20px;
            height: 20px;
        }
    </style>
</head>
<script>
    document.addEventListener("DOMContentLoaded", function () {
        function decrement(e) {
            const btn = e.target.closest('[data-action="decrement"]');
            if (!btn) return;
            
            const target = btn.parentNode.querySelector('input[type="number"]');
            let value = Number(target.value);
            if (value > 0) {
                value--;
                target.value = value;
            }
        }

        function increment(e) {
            const btn = e.target.closest('[data-action="increment"]');
            if (!btn) return;
            
            const target = btn.parentNode.querySelector('input[type="number"]');
            let value = Number(target.value);
            value++;
            target.value = value;
        }

        const decrementButtons = document.querySelectorAll('[data-action="decrement"]');
        const incrementButtons = document.querySelectorAll('[data-action="increment"]');

        decrementButtons.forEach(btn => {
            btn.addEventListener("click", decrement);
        });

        incrementButtons.forEach(btn => {
            btn.addEventListener("click", increment);
        });
    });
</script>

<section class="bg-white rounded-md">
    <!-- <header class="mb-4">
        <h2 class="text-xl font-bold text-gray-900 dark:text-gray-100">
            {{ __('Create Project') }}
        </h2>
        <div class="w-fill bg-gray-300 mt-2"> </div>
    </header> -->

    @if ($errors->any())
        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <ul>
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

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

            <div class="w-full">
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
                    <div data-action="decrement"
                        class="flex-1 h-full w-10 rounded-l cursor-pointer px-2 bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400">
                        <button type="button" class="w-full h-full flex items-center justify-center">
                            <span class="text-2xl font-thin select-none">−</span>
                        </button>
                    </div>
                    <input type="number"
                        class="outline-none focus:outline-none text-center w-full bg-gray-100 font-semibold text-md hover:text-black focus:text-black md:text-base flex items-center text-gray-700"
                        name="fleet_number" value="0" min="0">
                    <div data-action="increment"
                        class="flex-1 h-full w-10 rounded-r cursor-pointer px-2 bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400">
                        <button type="button" class="w-full h-full flex items-center justify-center">
                            <span class="text-2xl font-thin select-none">+</span>
                        </button>
                    </div>
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

            <div>
                <x-input-label for="start_time" :value="__('Project Start Time')" />
                <x-date-input id="start_time" name="start_time" type="datetime-local"
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm" required />
                <x-input-error :messages="$errors->get('start_time')" class="mt-2" />
            </div>

            <div>
                <x-input-label for="end_time" :value="__('Project End Time')" />
                <x-date-input id="end_time" name="end_time" type="datetime-local"
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm" required />
                <x-input-error :messages="$errors->get('end_time')" class="mt-2" />
            </div>
        </div>

        <div class="mt-6">
            <div class="schedule-container">
                <div class="schedule-header" onclick="toggleSchedule()">
                    <h3 class="text-lg font-semibold text-gray-900">{{ __('Schedule') }}</h3>
                    <svg class="chevron-icon collapse-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </div>

                <div class="schedule-content">
                    <div class="day-row border-b-2 border-gray-300 mb-2">
                        <div class="day-checkbox-wrapper">
                            <input type="checkbox" 
                                   id="select_all_days" 
                                   class="day-checkbox"
                                   onchange="toggleAllDays()"
                                   checked>
                            <label for="select_all_days" class="day-label font-bold">Select All (24hr)</label>
                        </div>
                    </div>

                    @foreach($daysOfWeek as $value => $label)
                    <div class="day-row">
                        <div class="day-checkbox-wrapper">
                            <input type="checkbox" 
                                   id="day_{{ $value }}" 
                                   name="selected_days[]" 
                                   value="{{ $value }}"
                                   class="day-checkbox"
                                   onchange="toggleTimeSlot('{{ $value }}')"
                                   checked>
                            <label for="day_{{ $value }}" class="day-label">{{ $label }}</label>
                        </div>
                        
                        <div id="time_{{ $value }}" class="time-slot active">
                            <div class="time-input-wrapper">
                                <label class="time-label">{{ __('Start Time') }}</label>
                                <input type="time" 
                                       name="start_time_{{ $value }}" 
                                       class="time-input"
                                       value="09:00">
                            </div>
                            <div class="time-input-wrapper">
                                <label class="time-label">{{ __('End Time') }}</label>
                                <input type="time" 
                                       name="end_time_{{ $value }}" 
                                       class="time-input"
                                       value="17:00">
                            </div>
                        </div>
                    </div>
                    @endforeach
                </div>
            </div>
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
<script type="text/javascript">
    $(document).ready(function() {
        $('select').selectpicker();
    });
</script>
<script>
    function toggleAllDays() {
        const selectAllCheckbox = document.getElementById('select_all_days');
        const dayCheckboxes = document.querySelectorAll('.day-checkbox:not(#select_all_days)');
        const allChecked = selectAllCheckbox.checked;
        
        dayCheckboxes.forEach(checkbox => {
            checkbox.checked = allChecked;
            const day = checkbox.value;
            const timeSlot = document.getElementById(`time_${day}`);
            const row = checkbox.closest('.day-row');
            
            if (allChecked) {
                timeSlot.classList.add('active');
                row.classList.remove('disabled');
                // Set 24 hour schedule
                row.querySelector('input[name^="start_time_"]').value = '00:00';
                row.querySelector('input[name^="end_time_"]').value = '23:59';
            } else {
                timeSlot.classList.remove('active');
                row.classList.add('disabled');
                // Reset to default times
                row.querySelector('input[name^="start_time_"]').value = '09:00';
                row.querySelector('input[name^="end_time_"]').value = '17:00';
            }
        });
    }

    function toggleTimeSlot(day) {
        const checkbox = document.getElementById(`day_${day}`);
        const row = checkbox.closest('.day-row');
        const timeSlot = document.getElementById(`time_${day}`);
        
        if (checkbox.checked) {
            timeSlot.classList.add('active');
            row.classList.remove('disabled');
        } else {
            timeSlot.classList.remove('active');
            row.classList.add('disabled');
        }

        // Update select all checkbox state
        const allDayCheckboxes = document.querySelectorAll('.day-checkbox:not(#select_all_days)');
        const selectAllCheckbox = document.getElementById('select_all_days');
        const allChecked = Array.from(allDayCheckboxes).every(cb => cb.checked);
        selectAllCheckbox.checked = allChecked;
    }

    // Add event listener when document is loaded
    document.addEventListener('DOMContentLoaded', function() {
        const selectAllCheckbox = document.getElementById('select_all_days');
        selectAllCheckbox.addEventListener('change', toggleAllDays);
        
        // Initialize all checkboxes
        const dayCheckboxes = document.querySelectorAll('.day-checkbox:not(#select_all_days)');
        dayCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => toggleTimeSlot(checkbox.value));
        });
    });

    function toggleSchedule() {
        const content = document.querySelector('.schedule-content');
        const icon = document.querySelector('.collapse-icon');
        
        content.classList.toggle('collapsed');
        icon.classList.toggle('collapsed');

        // Optional: Save state to localStorage
        const isCollapsed = content.classList.contains('collapsed');
        localStorage.setItem('scheduleCollapsed', isCollapsed);
    }

    // Optional: Restore collapse state on page load
    document.addEventListener('DOMContentLoaded', function() {
        const isCollapsed = localStorage.getItem('scheduleCollapsed') === 'true';
        if (isCollapsed) {
            const content = document.querySelector('.schedule-content');
            const icon = document.querySelector('.collapse-icon');
            content.classList.add('collapsed');
            icon.classList.add('collapsed');
        }

        // Existing time validation code remains here
    });
</script>
</html>