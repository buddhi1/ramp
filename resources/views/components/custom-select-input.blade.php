@props(['disabled' => false, 'options' => [], 'selected' => []])

<select multiple {{ $disabled ? 'disabled' : '' }} {!! $attributes->merge(['class' => 'select2-multiple form-control border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm']) !!}>
<option value="">Select</option>    
@foreach($options as $key => $value)
        <option value="{{ $key }}" {{ in_array($key, $selected) ? 'selected' : '' }}>{{ $value }}</option>
    @endforeach
</select>

